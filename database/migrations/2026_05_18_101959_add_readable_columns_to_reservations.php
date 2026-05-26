<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('reservations', function (Blueprint $table) {
            if (!Schema::hasColumn('reservations', 'departure_city')) {
                $table->string('departure_city')->nullable()->after('details');
            }
            if (!Schema::hasColumn('reservations', 'arrival_city')) {
                $table->string('arrival_city')->nullable()->after('departure_city');
            }
            if (!Schema::hasColumn('reservations', 'destination')) {
                $table->string('destination')->nullable()->after('arrival_city');
            }
            if (!Schema::hasColumn('reservations', 'check_in')) {
                $table->date('check_in')->nullable()->after('destination');
            }
            if (!Schema::hasColumn('reservations', 'pickup_location')) {
                $table->string('pickup_location')->nullable()->after('check_in');
            }
            if (!Schema::hasColumn('reservations', 'excursion_type')) {
                $table->string('excursion_type')->nullable()->after('pickup_location');
            }
        });

        // Migration des données avec syntaxe compatible MySQL 5.7
        // L'opérateur ->> extrait ET enlève les guillemets automatiquement
        DB::statement("
            UPDATE reservations 
            SET 
                departure_city = details->>'$.departure_city',
                arrival_city = details->>'$.arrival_city',
                destination = details->>'$.destination',
                check_in = details->>'$.check_in',
                pickup_location = details->>'$.pickup_location',
                excursion_type = details->>'$.excursion_type'
            WHERE details IS NOT NULL AND JSON_VALID(details)
        ");
    }

    public function down(): void
    {
        Schema::table('reservations', function (Blueprint $table) {
            $columns = [
                'departure_city', 'arrival_city', 'destination',
                'check_in', 'pickup_location', 'excursion_type'
            ];
            foreach ($columns as $column) {
                if (Schema::hasColumn('reservations', $column)) {
                    $table->dropColumn($column);
                }
            }
        });
    }
};