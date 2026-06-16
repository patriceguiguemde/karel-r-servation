<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Models\User;
use App\Models\Reservation;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\ReservationController;
use App\Http\Controllers\Api\HomeController;
use Illuminate\Support\Facades\Mail;
use App\Mail\ReservationConfirmee;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Auth\PasswordResetController;



// ====================  ROUTES PUBLIQUES ====================
Route::get('/home', [HomeController::class, 'index']);
Route::get('/services', [ServiceController::class, 'index']);
Route::get('/services/{id}', [ServiceController::class, 'show']);
Route::post('/reservations', [ReservationController::class, 'store']);

//   AUTHENTIFICATION 
Route::post('/login', function (Request $request) {
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    $user = User::where('email', $request->email)->first();

    if (!$user || !Hash::check($request->password, $user->password)) {
        throw ValidationException::withMessages([
            'email' => ['Les identifiants sont incorrects.'],
        ]);
    }

    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
        'success' => true,
        'message' => 'Connexion réussie',
        'user' => [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role,
        ],
        'token' => $token,
    ]);
   });
  
    
         // Routes de réinitialisation de mot de passe (publiques)
         Route::post('/forgot-password', [PasswordResetController::class, 'sendResetLink']);
         Route::post('/reset-password', [PasswordResetController::class, 'reset']);

     
           //   ROUTES PROTÉGÉES (auth:sanctum) 
             Route::middleware('auth:sanctum')->group(function () {
    
             Route::get('/user', function (Request $request) {
                 return $request->user();
              });

             
    
           Route::post('/logout', function (Request $request) {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['success' => true, 'message' => 'Déconnexion réussie']);
    });
    
         //  route pour admin SEULEMENT 
           Route::prefix('admin')->group(function () {
        
        // tableau de bord principal de administrateur
        Route::get('/dashboard', function (Request $request) {
            $user = $request->user();
            if (!$user || !in_array($user->role, ['admin', 'agent'])) {
                return response()->json([
                    'success' => false, 
                    'message' => 'Accès refusé. Rôle admin requis.'
                ], 403);
            }
            
            $query = Reservation::query();

            if ($request->filled('service_type')) {
                $query->where('service_type', $request->service_type);
            }
            if ($request->filled('status')) {
                $query->where('status', $request->status);
            }
            if ($request->filled('search')) {
                $s = $request->search;
                $query->where(function($q) use ($s) {
                    $q->where('prenom', 'like', "%{$s}%")
                      ->orWhere('nom', 'like', "%{$s}%")
                      ->orWhere('email', 'like', "%{$s}%")
                      ->orWhere('telephone', 'like', "%{$s}%");
                });
            }

            $reservations = $query->orderBy('id', 'asc')->get();

            $today = now()->startOfDay();
            $stats = [
                'total' => Reservation::count(),
                'today' => Reservation::whereDate('created_at', $today)->count(),
                'pending' => Reservation::where('status', 'en_attente')->count(),
                'confirmed' => Reservation::where('status', 'confirme')->count(),
                'cancelled' => Reservation::where('status', 'annule')->count(),
                'revenue' => Reservation::where('status', 'paye')->sum('total_amount'),
            ];

            return response()->json([
                'success' => true,
                'stats' => $stats,
                'reservations' => $reservations
            ]);
        });

    

        //  Liste simple
        Route::get('/reservations', function (Request $request) {
            if (!in_array($request->user()->role, ['admin', 'agent'])) {
                return response()->json(['success' => false, 'message' => 'Accès refusé'], 403);
            }
            //  Changé : latest() → orderBy('id', 'asc')
            $reservations = Reservation::orderBy('id', 'asc')->paginate(20);
            return response()->json([
                'success' => true,
                'data' => $reservations->items(),
                'pagination' => [
                    'total' => $reservations->total(),
                    'current_page' => $reservations->currentPage(),
                    'last_page' => $reservations->lastPage()
                ]
            ]);
        });

        // route qui modifie le statut
        Route::patch('/reservations/{id}/status', function (Request $request, $id) {
            if (!in_array($request->user()->role, ['admin', 'agent'])) {
                return response()->json(['success' => false, 'message' => 'Accès refusé'], 403);
            }
            $request->validate([
                'status' => 'required|in:en_attente,en_traitement,confirme,paye,annule',
            ]);
            $reservation = Reservation::findOrFail($id);
             $oldStatus = $reservation->status; //   NOUVEAU : On garde l'ancien statut en mémoire
            $reservation->update(['status' => $request->status]);
      //condition pour envoie de mail
         if ($request->status === 'confirme' && $oldStatus !== 'confirme') {
          $emailClient = $reservation->email;
    
         Log::info('=== TENTATIVE ENVOI MAIL ===');
         Log::info('Email client: ' . $emailClient);
         Log::info('Reservation ID: ' . $reservation->id);
    
           if ($emailClient) {
        try {
            Mail::to($emailClient)->send(new ReservationConfirmee($reservation));
            Log::info('=== MAIL ENVOYÉ AVEC SUCCÈS ===');
        } catch (\Exception $e) {
            Log::error('=== ERREUR MAIL: ' . $e->getMessage());
        }
      } else {
        Log::warning('=== EMAIL CLIENT VIDE ===');
        }
}
            return response()->json(['success' => true, 'data' => $reservation->fresh()]);
        });

        
        // route de suppression de réservation
        Route::delete('/reservations/{id}', [ReservationController::class, 'deleteReservation']);
        //Route::delete('/reservations/{id}', function (Request $request, $id) {
    //if (!in_array($request->user()->role, ['admin', 'agent'])) {
        //return response()->json(['success' => false, 'message' => 'Accès refusé'], 403);
   // }
    //$reservation = Reservation::findOrFail($id);
    //$reservation->update(['status' => 'supprimer']);
    //return response()->json(['success' => true, 'message' => 'Réservation supprimée']);
//});
    });
        
      
});