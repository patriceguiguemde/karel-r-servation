<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    /**
     * Liste tous les services actifs
     */
    public function index(Request $request)
    {
        $query = Service::where('is_active', true);

        // Filtre par type (vol, hotel, site_touristique, vehicule)
        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        $services = $query->orderBy('type')->orderBy('price')->get();

        return response()->json([
            'success' => true,
            'data' => $services->map(fn($s) => [
                'id' => $s->id,
                'type' => $s->type,
                'name' => $s->name,
                'description' => $s->description,
                'price' => (float) $s->price,
                'image' => $s->image ? asset($s->image) : null,
                'details' => $s->details,
            ])
        ]);
    }

    /**
     * Affiche un service spécifique
     */
    public function show($id)
    {
        $service = Service::findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $service->id,
                'type' => $service->type,
                'name' => $service->name,
                'description' => $service->description,
                'price' => (float) $service->price,
                'image' => $service->image ? asset($service->image) : null,
                'details' => $service->details,
            ]
        ]);
    }
}