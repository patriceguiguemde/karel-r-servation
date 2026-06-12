<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: DejaVu Sans, sans-serif; background: #f5f5f5; padding: 20px; }
        .container { max-width: 600px; margin: auto; background: white; border-radius: 10px; overflow: hidden; }
        .header { background: #8a9e6e; color: white; padding: 30px; text-align: center; }
        .body { padding: 30px; }
        table { width: 100%; border-collapse: collapse; }
        td { padding: 10px 5px; border-bottom: 1px solid #eee; }
        td:last-child { text-align: right; font-weight: bold; }
        .badge { background: #d4edda; color: #155724; padding: 5px 15px; border-radius: 20px; font-weight: bold; }
        .footer { background: #f8f8f8; padding: 20px; text-align: center; color: #999; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Réservation Confirmée</h1>
            <p>Votre réservation a été confirmée avec succès</p>
        </div>
        <div class="body">
            <p>Bonjour <strong>{{ $reservation->prenom . ' ' . $reservation->nom }}</strong>,</p>
            <p>Nous avons le plaisir de vous confirmer votre réservation :</p>
            <table>
                <tr>
                    <td>N° Réservation</td>
                    <td>{{ $reservation->id }}</td>
                </tr>
                <tr>
                    <td>Service</td>
                    <td>{{ ucfirst($reservation->service_type) }}</td>
                </tr>
                <tr>
                    <td>Date</td>
                    <td>{{ $reservation->created_at->format('d/m/Y') }}</td>
                </tr>
                <tr>
                    <td>Statut</td>
                    <td><span class="badge">Confirmée</span></td>
                </tr>
            </table>
            <p style="margin-top: 20px;">Votre <strong>ticket PDF</strong> est joint en pièce jointe.</p>
            <p>Merci de nous faire confiance !</p>
        </div>
        <div class="footer">Cet email est envoyé automatiquement, merci de ne pas y répondre.</div>
    </div>
</body>
</html>