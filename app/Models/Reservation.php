<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Reservation extends Model
{
    use HasFactory;

    public const STATUS_PENDING    = 'en_attente';
    public const STATUS_PROCESSING = 'en_traitement';
    public const STATUS_CONFIRMED  = 'confirme';
    public const STATUS_PAID       = 'paye';
    public const STATUS_CANCELLED  = 'annule';

    //  CHAMPS ASSIGNABLES - Version COMPLÈTE
    protected $fillable = [
        // Identifiants & référence
        'reference',
        'user_id',
        
        // Client
        'nom',
        'prenom',
        'email',
        'telephone',
        
        // Service
        'service_type',
        'message',
        
        //  Champs pour les VOLS
        'departure_country',
        'arrival_country',
        'departure_city',
        'arrival_city',
        'departure_date',      
        'return_date',         
        
        //  Champs pour les HÔTELS
        'destination',
        'check_in',
        'check_out',
        'rooms',               
        'adults',              
        'children',            
        
        //  Champs pour les VÉHICULES
        'pickup_location',
        'dropoff_location',
        'pickup_date',         
        'dropoff_date',        
        'vehicle_type',        
        'transmission',        
        'additional_driver',   
        'insurance',           
        
        //  Champs pour les EXCURSIONS
        'excursion_type',
        'duration',            
        'participants',        
        'tour_type',           
        'language',            
        'difficulty',          
        
        //  Champs numériques communs
        'nb_passengers',
        'nb_rooms',
        'nb_nights',
        
        // Paiement & statut
        'total_amount',
        'status',
        'payment_method',
        'payment_reference',
        'payment_proof',
        'validated_at',
    ];

    //  CASTS - Avec les types corrects pour les dates et nombres
    protected $casts = [
        'total_amount' => 'decimal:2',
        'validated_at' => 'datetime',
        
        // Dates
        'check_in' => 'date',
        'check_out' => 'date',
        'departure_date' => 'date',
        'return_date' => 'date',
        'pickup_date' => 'datetime',
        'dropoff_date' => 'datetime',
        
        // Entiers
        'rooms' => 'integer',
        'adults' => 'integer',
        'children' => 'integer',
        'participants' => 'integer',
        'nb_passengers' => 'integer',
        'nb_rooms' => 'integer',
        'nb_nights' => 'integer',
    ];

    // Relations (inchangées)
    public function user() {
        return $this->belongsTo(User::class);
    }

    public function services() {
        return $this->belongsToMany(Service::class, 'reservation_service')
                    ->withPivot('quantity', 'unit_price', 'subtotal')
                    ->withTimestamps();
    }

    public function histories() {
        return $this->hasMany(StatusHistory::class);
    }

    // Calcul du montant total (inchangé)
    public function getTotalAmountAttribute($value) {
        if ($value > 0) {
            return $value;
        }
        return $this->services->sum(fn($s) => $s->pivot->subtotal);
    }

    // Accesseurs pour compatibilité (inchangés)
    public function getClientNameAttribute() {
        return $this->attributes['client_name'] ?? trim(($this->nom ?? '') . ' ' . ($this->prenom ?? ''));
    }

    public function getClientEmailAttribute() {
        return $this->attributes['client_email'] ?? $this->email ?? null;
    }

    public function getClientPhoneAttribute() {
        return $this->attributes['client_phone'] ?? $this->telephone ?? null;
    }

    //  FORMATAGE API - Version complète
    public function toApiArray() {
        return [
            'id' => $this->id,
            'reference' => $this->reference,
            
            'client' => [
                'nom' => $this->nom,
                'prenom' => $this->prenom,
                'name' => $this->client_name,
                'email' => $this->getClientEmailAttribute(),
                'phone' => $this->getClientPhoneAttribute(),
            ],
            
            'service_type' => $this->service_type,
            'message' => $this->message,
            
            //  Tous les champs spécifiques
            'departure_country' => $this->departure_country,
            'arrival_country' => $this->arrival_country,
            'departure_city' => $this->departure_city,
            'arrival_city' => $this->arrival_city,
            'departure_date' => $this->departure_date?->format('Y-m-d'),
            'return_date' => $this->return_date?->format('Y-m-d'),
            'destination' => $this->destination,
            'check_in' => $this->check_in?->format('Y-m-d'),
            'check_out' => $this->check_out?->format('Y-m-d'),
            'rooms' => $this->rooms,
            'adults' => $this->adults,
            'children' => $this->children,
            'pickup_location' => $this->pickup_location,
            'dropoff_location' => $this->dropoff_location,
            'pickup_date' => $this->pickup_date?->format('Y-m-d H:i'),
            'dropoff_date' => $this->dropoff_date?->format('Y-m-d H:i'),
            'vehicle_type' => $this->vehicle_type,
            'transmission' => $this->transmission,
            'additional_driver' => $this->additional_driver,
            'insurance' => $this->insurance,
            'excursion_type' => $this->excursion_type,
            'duration' => $this->duration,
            'participants' => $this->participants,
            'tour_type' => $this->tour_type,
            'language' => $this->language,
            'difficulty' => $this->difficulty,
            'nb_passengers' => $this->nb_passengers,
            'nb_rooms' => $this->nb_rooms,
            'nb_nights' => $this->nb_nights,
            
            'status' => $this->status,
            'total_amount' => (float) $this->total_amount,
            
            'services' => $this->services->map(fn($s) => [
                'id' => $s->id,
                'name' => $s->name,
                'type' => $s->type,
                'price' => (float) $s->price,
                'quantity' => $s->pivot->quantity,
                'unit_price' => (float) $s->pivot->unit_price,
                'subtotal' => (float) $s->pivot->subtotal,
                'image' => asset($s->image ?? ''),
            ]),
            
            'payment' => [
                'method' => $this->payment_method,
                'reference' => $this->payment_reference,
                'proof' => $this->payment_proof ? asset('storage/' . $this->payment_proof) : null,
            ],
            
            'created_at' => $this->created_at?->format('d/m/Y H:i'),
            'validated_at' => $this->validated_at?->format('d/m/Y H:i'),
        ];
    }
}