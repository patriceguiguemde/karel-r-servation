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
use App\Mail\ReservationConfirmed;
use Illuminate\Support\Facades\Log; 

// ====================  ROUTES PUBLIQUES ====================
Route::get('/home', [HomeController::class, 'index']);
Route::get('/services', [ServiceController::class, 'index']);
Route::get('/services/{id}', [ServiceController::class, 'show']);
Route::post('/reservations', [ReservationController::class, 'store']);

// ====================  AUTHENTIFICATION ====================
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

// ====================  ROUTES PROTÉGÉES (auth:sanctum) ====================
Route::middleware('auth:sanctum')->group(function () {
    
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    
    Route::post('/logout', function (Request $request) {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['success' => true, 'message' => 'Déconnexion réussie']);
    });
    
    // ====================  ADMIN SEULEMENT ====================
    Route::prefix('admin')->group(function () {
        
        // Dashboard principal
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
      

        // 📋 Liste simple
        Route::get('/reservations', function (Request $request) {
            if (!in_array($request->user()->role, ['admin', 'agent'])) {
                return response()->json(['success' => false, 'message' => 'Accès refusé'], 403);
            }
            // ✅ Changé : latest() → orderBy('id', 'asc')
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

        // 🔄 Modifier statut
        Route::patch('/reservations/{id}/status', function (Request $request, $id) {
            if (!in_array($request->user()->role, ['admin', 'agent'])) {
                return response()->json(['success' => false, 'message' => 'Accès refusé'], 403);
            }
            $request->validate([
                'status' => 'required|in:en_attente,en_traitement,confirme,paye,annule',
            ]);
            $reservation = Reservation::findOrFail($id);
             $oldStatus = $reservation->status; // 🌟 NOUVEAU : On garde l'ancien statut en mémoire
            $reservation->update(['status' => $request->status]);

            if ($request->status === 'confirme' && $oldStatus !== 'confirme') {
                $emailClient = $reservation->email; // L'email est stocké directement dans la réservation
                
                if ($emailClient) {
                    try {
                        // Envoi du mail
                        Mail::to($emailClient)->send(new ReservationConfirmed($reservation));
                    } catch (\Exception $e) {
                        // Si le mail échoue, on l'écrit dans les logs mais on ne bloque pas la réponse à React
                        Log::error('Erreur envoi mail confirmation: ' . $e->getMessage());
                    }
                }
            }
            return response()->json(['success' => true, 'data' => $reservation->fresh()]);
        });

        
        // 🗑 Supprimer réservation
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