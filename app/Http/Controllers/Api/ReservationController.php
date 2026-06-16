<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Reservation;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;
use App\Mail\ReservationConfirmee;
use Illuminate\Support\Facades\Mail;

class ReservationController extends Controller
{
    private const SERVICE_MAPPING = [
        'vol' => 1,
        'hotel' => 2,
        'vehicule' => 3,
        'excursion' => 4,
    ];

    /**
     * Stocker une nouvelle réservation - SANS JSON "details"
     */
    public function store(Request $request)
    {
        $serviceType = $request->input('service_type');

        try {
            // 1. Validation
            $validated = $this->validateRequest($request, $serviceType);

            // 2. Transaction
            return DB::transaction(function () use ($validated, $serviceType) {
                
                // Préparation des données de base
                $reservationData = [
                    'nom' => $validated['nom'],
                    'prenom' => $validated['prenom'],
                    'email' => $validated['email'],
                    'telephone' => $validated['telephone'],
                    'service_type' => $serviceType,
                    'message' => $validated['message'] ?? '',
                ];

                //  Ajout des champs spécifiques selon le service (directement dans l'array principal)
                $reservationData = array_merge(
                    $reservationData, 
                    $this->extractDirectFields($serviceType, $validated)
                );

                // Création de la réservation
                $reservation = Reservation::create($reservationData);

                return response()->json([
                    'success' => true,
                    'message' => 'Réservation enregistrée avec succès',
                    'reservation_id' => $reservation->id,
                    'reference' => $reservation->reference ?? null,
                ], 201);
            });

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation échouée',
                'errors' => $e->errors()
            ], 422);
            
        } catch (\Exception $e) {
            Log::error('Erreur réservation: ' . $e->getMessage(), [
                'service_type' => $serviceType,
                'payload' => $request->all()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Erreur serveur lors de la réservation'
            ], 500);
        }
    }

    /**
     * Valider la requête selon le type de service
     */
    private function validateRequest(Request $request, string $serviceType): array
    {
        $rules = [
            'nom' => 'required|string|max:100',
            'prenom' => 'required|string|max:100',
            'email' => 'required|email|max:150',
            'telephone' => 'required|string|max:20',
            'service_type' => 'required|in:vol,hotel,vehicule,excursion',
            'message' => 'nullable|string|max:1000',
        ];

        $serviceRules = $this->getServiceRules($serviceType);
        
        return $request->validate(array_merge($rules, $serviceRules));
    }

    public function deleteReservation($id)
{
    try {
        $reservation = Reservation::findOrFail($id);
        $reservation->delete();

        // Si la table est vide après suppression, réinitialiser l'auto-increment
        if (Reservation::count() === 0) {
            DB::statement('ALTER TABLE reservations AUTO_INCREMENT = 1');
        }

        return response()->json([
            'message' => 'Réservation supprimée avec succès'
        ], 200);

    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Erreur lors de la suppression',
            'error' => $e->getMessage()
        ], 500);
    }
}

    /**
     * Règles de validation spécifiques par service
     */
    private function getServiceRules(string $serviceType): array
    {
        return match($serviceType) {
            'vol' => [
                'departure_country' => 'required|string|max:100',
                'arrival_country' => 'required|string|max:100',
                'departure_city' => 'required|string|max:100',
                'arrival_city' => 'required|string|max:100',
                'departure_date' => 'required|date|after_or_equal:today',
                'return_date' => 'nullable|date|after:departure_date',
            ],
            'hotel' => [
                'destination' => 'required|string|max:100',
                'check_in' => 'required|date|after_or_equal:today',
                'check_out' => 'required|date|after:check_in',
                'rooms' => 'required|numeric|min:1',
                'adults' => 'required|numeric|min:1',
            ],
            'vehicule' => [
                'pickup_location' => 'required|string|max:150',
                'dropoff_location' => 'required|string|max:150',
                'pickup_date' => 'required|date|after_or_equal:now',
                'dropoff_date' => 'required|date|after:pickup_date',
                'vehicle_type' => 'nullable|string|max:100',
                 'transmission' => 'required|in:manual,automatic',
],
            'excursion' => [
                'destination' => 'required|string|max:100',
                'excursion_type' => 'required|string|max:100',
                'date' => 'required|date|after_or_equal:today',
                'duration' => 'required|in:half_day,full_day,multi_day',
                'participants' => 'required|integer|min:1',
            ],
            default => [],
        };
    }

    /**
     *  MÉTHODE CORRIGÉE : Extrait les champs pour les stocker DIRECTEMENT
     */
    private function extractDirectFields(string $serviceType, array $data): array
    {
        // Champs spécifiques par service à stocker en colonnes directes
        $include = match($serviceType) {
            'vol' => [
                'departure_city', 'departure_country', 'arrival_city', 'arrival_country', 
                'departure_date', 'return_date'
            ],
            'hotel' => [
                'destination', 'check_in', 'check_out', 'rooms', 'adults', 'children'
            ],
            'vehicule' => [
                'pickup_location', 'dropoff_location', 'pickup_date', 'dropoff_date', 
                'vehicle_type', 'transmission', 'additional_driver', 'insurance'
            ],
            'excursion' => [
                'destination', 'excursion_type', 'date', 'duration', 'participants',
                'tour_type', 'language', 'difficulty'
            ],
            default => [],
        };

        // Filtrer les champs (garder uniquement ceux de $include + non vides)
        $result = array_filter(
            array_intersect_key($data, array_flip($include)),
            fn($value) => $value !== null && $value !== ''
        );

        //  Formatage des dates pour Laravel (Carbon)
        $dateFields = ['check_in', 'check_out', 'departure_date', 'return_date', 'pickup_date', 'dropoff_date', 'date'];
        foreach ($dateFields as $field) {
            if (isset($result[$field]) && is_string($result[$field])) {
                $result[$field] = Carbon::parse($result[$field])->format('Y-m-d H:i:s');
            }
        }

        //  Conversion des nombres en entier (pour correspondre aux casts du Model)
        $intFields = ['rooms', 'adults', 'children', 'participants', 'nb_passengers', 'nb_rooms', 'nb_nights'];
        foreach ($intFields as $field) {
            if (isset($result[$field]) && is_numeric($result[$field])) {
                $result[$field] = (int) $result[$field];
            }
        }

        return $result;
    }

    /**
     * Liste toutes les réservations (pour l'admin)
     */
    public function index()
    {
        try {
            $reservations = Reservation::with('user')
                ->latest()
                ->paginate(20);

            // Formatage avec toApiArray() du Model
            $formattedData = $reservations->getCollection()->map(fn($r) => $r->toApiArray());

            return response()->json([
                'success' => true,
                'data' => $formattedData,
                'pagination' => [
                    'total' => $reservations->total(),
                    'per_page' => $reservations->perPage(),
                    'current_page' => $reservations->currentPage(),
                    'last_page' => $reservations->lastPage(),
                ]
            ]);
        } catch (\Exception $e) {
            Log::error('Erreur liste réservations: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Impossible de récupérer les réservations'
            ], 500);
        }
    }

    /**
     * Afficher une réservation spécifique
     */
    public function show($id)
    {
        try {
            $reservation = Reservation::with('user')->findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $reservation->toApiArray()
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Réservation non trouvée'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération'
            ], 500);
        }
    }

     public function updateStatus(Request $request, $id)
     {
    $reservation = Reservation::findOrFail($id);
    $oldStatus = $reservation->status;

    $reservation->update(['status' => $request->status]);

    // Envoyer le mail uniquement quand on passe à "confirme"
    if ($request->status === 'confirme' && $oldStatus !== 'confirme') {
        Mail::to($reservation->email)->send(new ReservationConfirmee($reservation));
    }

    return response()->json(['message' => 'Statut mis à jour']);
}


  
}