<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Service extends Model
{
    use HasFactory;

    protected $fillable = ['type', 'name', 'description', 'price', 'image', 'details', 'is_active'];

    protected $casts = [
        'details' => 'array',
        'price' => 'decimal:2',
        'is_active' => 'boolean'
    ];

    // Relation Many-to-Many avec Reservation
    public function reservations() {
        return $this->belongsToMany(Reservation::class, 'reservation_service')
                    ->withPivot('quantity', 'unit_price', 'subtotal');
    }
}