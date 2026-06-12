<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: DejaVu Sans, sans-serif; padding: 40px; }
        .ticket { border: 2px dashed #8a9e6e; border-radius: 10px; padding: 30px; }
        .title { text-align: center; color: #8a9e6e; font-size: 24px; font-weight: bold; margin-bottom: 20px; }
        table { width: 100%; border-collapse: collapse; }
        td { padding: 10px 5px; border-bottom: 1px solid #eee; }
        td:last-child { text-align: right; font-weight: bold; }
        .stamp { text-align: center; margin-top: 30px; color: #8a9e6e; font-size: 30px; font-weight: bold; border: 3px solid #8a9e6e; display: inline-block; padding: 10px 30px; border-radius: 5px; }
    </style>
</head>
<body>
    <div class="ticket">
        <div class="title">TICKET DE RÉSERVATION</div>
        <table>
            <tr>
                <td>N° Ticket</td>
                <td>{{ $reservation->id }}</td>
            </tr>
            <tr>
                <td>Nom</td>
                <td>{{ $reservation->nom . ' ' . $reservation->prenom }}</td>
            </tr>
            <tr>
                <td>Email</td>
                <td>{{ $reservation->email }}</td>
            </tr>
            <tr>
                <td>Service</td>
                <td>{{ ucfirst($reservation->service_type) }}</td>
            </tr>
            <tr>
                <td>Date</td>
                <td>{{ $reservation->created_at->format('d/m/Y H:i') }}</td>
            </tr>
            <tr>
                <td>Statut</td>
                <td style="color:green;">CONFIRMÉE</td>
            </tr>
        </table>
        <div style="text-align:center; margin-top:30px;">
            <div class="stamp">CONFIRMÉ</div>
        </div>
    </div>
</body>
</html>