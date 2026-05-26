<?php
// Script simple pour vérifier la syntaxe des fichiers config

$configPath = __DIR__.'/config';
$files = glob($configPath.'/*.php');

echo "Vérification syntaxique des fichiers config...\n\n";

foreach ($files as $file) {
    $filename = basename($file);
    echo "Vérification : $filename\n";
    
    // Vérifier la syntaxe PHP
    $output = [];
    $return_var = 0;
    exec("php -l " . escapeshellarg($file) . " 2>&1", $output, $return_var);
    
    if ($return_var !== 0) {
        echo "❌ ERREUR DE SYNTAXE dans $filename\n";
        echo "   " . implode("\n   ", $output) . "\n\n";
    } else {
        echo "   ✓ Syntaxe OK\n";
    }
}

echo "\n✅ Vérification terminée.\n";
echo "\nMaintenant, testez : php artisan serve\n";