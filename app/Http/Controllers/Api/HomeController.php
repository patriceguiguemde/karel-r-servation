<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;

class HomeController extends Controller
{
    public function index()
    {
        $services = Service::where('is_active', true)
            ->orderBy('type')
            ->get()
            ->groupBy('type');

        return response()->json([
            'success' => true,
            'data' => [
                'hero' => [
                    'title' => '✈️ Karel Travels Excursion',
                    'subtitle' => 'Vols • Hôtels • Excursions • Location de véhicules',
                    'description' => 'Votre partenaire de confiance au Burkina Faso pour des voyages sans stress.'
                ],
                'services' => $services->map(fn($items, $type) => 
                    $items->map(fn($s) => [
                        'id' => $s->id,
                        'name' => $s->name,
                        'description' => $s->description,
                        'price' => (float) $s->price,
                        'image' => $s->image ? asset($s->image) : null,
                        'details' => $s->details,
                    ])
                ),
                'about' => [
                    'title' => 'À Propos de Nous',
                    'content' => 'Fondée en 2020 à Ouagadougou, Karel Travels Excursion est votre agence de voyage de référence au Burkina Faso.',
                    'stats' => [
                        ['icon' => '🤝', 'label' => 'Confiance', 'value' => '+5000 clients satisfaits'],
                        ['icon' => '⚡', 'label' => 'Rapidité', 'value' => 'Devis sous 2h'],
                        ['icon' => '🌍', 'label' => 'Couverture', 'value' => 'Afrique, Europe & Moyen-Orient']
                    ]
                ],
                'contact' => [
                    'phone' => '+226 XX XX XX XX',
                    'email' => 'contact@kareltravels.bf',
                    'address' => 'Ouagadougou, Burkina Faso',
                    'whatsapp' => 'https://wa.me/226XXXXXXXX'
                ]
            ]
        ]);
    }
}