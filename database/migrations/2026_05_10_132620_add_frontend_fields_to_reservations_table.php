<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('reservations', function (Blueprint $table) {
            // Champs directs du frontend React
            if (!Schema::hasColumn('reservations', 'prenom')) {
                $table->string('prenom', 100)->nullable()->after('client_phone');
            }
            if (!Schema::hasColumn('reservations', 'nom')) {
                $table->string('nom', 100)->nullable()->after('prenom');
            }
            if (!Schema::hasColumn('reservations', 'email')) {
                $table->string('email', 150)->nullable()->after('nom');
            }
            if (!Schema::hasColumn('reservations', 'telephone')) {
                $table->string('telephone', 20)->nullable()->after('email');
            }
            if (!Schema::hasColumn('reservations', 'service_type')) {
                $table->string('service_type', 50)->nullable()->after('telephone');
            }
            if (!Schema::hasColumn('reservations', 'message')) {
                $table->text('message')->nullable()->after('service_type');
            }
            if (!Schema::hasColumn('reservations', 'details')) {
                $table->json('details')->nullable()->after('message');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('reservations', function (Blueprint $table) {
            // Supprimer uniquement les colonnes qu'on a ajoutées
            $columns = ['prenom', 'nom', 'email', 'telephone', 'service_type', 'message', 'details'];
            
            foreach ($columns as $column) {
                if (Schema::hasColumn('reservations', $column)) {
                    $table->dropColumn($column);
                }
            }
        });
    }
};