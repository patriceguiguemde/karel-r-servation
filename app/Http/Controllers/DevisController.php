<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Devis;

class DevisController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'email' => 'required|email',
            'telephone' => 'required|string',
            'service' => 'required|string',
            'destination' => 'nullable|string',
            'dateDepart' => 'nullable|date',
            'dateRetour' => 'nullable|date|after_or_equal:dateDepart',
            'nombrePersonnes' => 'required|integer|min:1',
            'budget' => 'nullable|string',
            'message' => 'nullable|string',
        ]);

        Devis::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Votre demande a été envoyée avec succès'
        ], 200);
    }
}