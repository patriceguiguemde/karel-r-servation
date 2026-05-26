<?php
// Définition d'un env() de secours pour éviter les erreurs fatales
if (!function_exists('env')) {
    function env($key, $default = null) { return $default; }
}

$dir = __DIR__ . '/config';
echo "🔍 Analyse type des valeurs retournées par chaque config...\n\n";

foreach (glob("$dir/*.php") as $file) {
    $name = basename($file, '.php');
    echo "📄 $name.php => ";
    
    try {
        $result = include $file;
        if (is_array($result)) {
            echo "✅ array (" . count($result) . " clés)\n";
        } else {
            echo "❌ " . strtoupper(gettype($result)) . "\n";
            echo "   Valeur : "; var_dump($result); echo "\n";
        }
    } catch (Throwable $e) {
        echo "⚠️ Exception : " . $e->getMessage() . "\n";
    }
}
echo "\n Terminé.\n";