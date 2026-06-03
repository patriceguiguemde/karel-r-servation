<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Confirmation de réservation</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 8px; border: 1px solid #e2e8f0;">
        
        <h2 style="color: #2d3748; margin-top: 0;">Bonjour {{ $reservation->prenom ?? 'Client' }},</h2>
        
        <p style="color: #4a5568; font-size: 16px; line-height: 1.5;">
            Nous avons le plaisir de vous informer que votre réservation a été <strong style="color: #38a169;">confirmée</strong> par notre équipe.
        </p>

        <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #38a169;">
            <h3 style="margin-top: 0; color: #2d3748; font-size: 16px;">Détails de la réservation :</h3>
            <p style="margin: 8px 0; color: #4a5568;"><strong>Nom :</strong> {{ $reservation->nom }} {{ $reservation->prenom }}</p>
            <p style="margin: 8px 0; color: #4a5568;"><strong>Service :</strong> {{ ucfirst($reservation->service_type ?? 'Non spécifié') }}</p>
            <p style="margin: 8px 0; color: #4a5568;"><strong>Référence :</strong> #{{ $reservation->id }}</p>
        </div>

        <p style="color: #718096; font-size: 14px; margin-top: 30px;">
            Cordialement,<br>
            <strong>L'équipe d'administration</strong>
        </p>
    </div>
</body>
</html>