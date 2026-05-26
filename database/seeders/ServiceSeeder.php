<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Service;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            // ✈️ VOLS
            ['type' => 'vol', 'name' => 'Ouaga → Paris CDG', 'description' => 'Air France, 1 escale, 6h25, bagage 23kg inclus', 'price' => 245000, 'image' => 'images/vol-paris.jpg', 'details' => ['compagnie' => 'Air France', 'duree' => '6h25', 'escale' => '1']],
            ['type' => 'vol', 'name' => 'Ouaga → Abidjan', 'description' => 'ASKY Airlines, direct, 2h15, économique', 'price' => 180000, 'image' => 'images/vol-abidjan.jpg', 'details' => ['compagnie' => 'ASKY', 'duree' => '2h15', 'escale' => '0']],
            
            // 🏨 HOTELS
            ['type' => 'hotel', 'name' => 'Hôtel Bravia Ouaga', 'description' => '4★, piscine, wifi fibre, petit-déj buffet, centre-ville', 'price' => 65000, 'image' => 'images/hotel-bravia.jpg', 'details' => ['etoiles' => 4, 'petit_dej' => true, 'piscine' => true]],
            ['type' => 'hotel', 'name' => 'Azalai Indéni', 'description' => '3★, climatisation, parking sécurisé, restaurant gastronomique', 'price' => 45000, 'image' => 'images/hotel-azalai.jpg', 'details' => ['etoiles' => 3, 'petit_dej' => false, 'parking' => true]],
            
            // 🗺️ SITES TOURISTIQUES
            ['type' => 'site_touristique', 'name' => 'Ruines de Loropéni', 'description' => 'Site UNESCO, guide francophone, 4h, transport A/R inclus', 'price' => 25000, 'image' => 'images/loropeni.jpg', 'details' => ['duree' => '4h', 'guide' => true, 'transport' => true]],
            ['type' => 'site_touristique', 'name' => 'Lac de Bangr-Weogo', 'description' => 'Promenade en pirogue, nature, 3h, photos professionnelles incluses', 'price' => 15000, 'image' => 'images/lac-bangr.jpg', 'details' => ['duree' => '3h', 'activite' => 'pirogue', 'photos' => true]],
            
            // 🚗 LOCATION VÉHICULE
            ['type' => 'vehicule', 'name' => 'Toyota Land Cruiser', 'description' => '4x4 climatisé, chauffeur professionnel inclus, 200km/jour', 'price' => 85000, 'image' => 'images/4x4-toyota.jpg', 'details' => ['type_vehicule' => '4x4', 'chauffeur' => true, 'km_jour' => 200]],
            ['type' => 'vehicule', 'name' => 'Bus Touristique 30 places', 'description' => 'Climatisation, micro, TV, idéal groupes scolaires/entreprises', 'price' => 150000, 'image' => 'images/bus-30p.jpg', 'details' => ['places' => 30, 'chauffeur' => true, 'equipement' => 'micro+TV']],
        ];

        foreach ($services as $data) {
            Service::create($data);
        }
    }
}