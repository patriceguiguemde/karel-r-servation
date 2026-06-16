
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: DejaVu Sans, sans-serif; padding: 40px; }
        .ticket { border: 2px dashed #0000ff; border-radius: 10px; padding: 30px; }
        .header { text-align: center; margin-bottom: 20px; }
        .logo { width: 80px; height: 80px; margin-bottom: 10px; }
        .company-name { color: #0000ff; font-size: 20px; font-weight: bold; margin-bottom: 5px; }
        .title { text-align: center; color: #ff0000; font-size: 24px; font-weight: bold; margin-bottom: 20px; border-top: 1px solid #eee; padding-top: 15px; }
        table { width: 100%; border-collapse: collapse; }
        td { padding: 10px 5px; border-bottom: 1px solid #eee; }
        td:last-child { text-align: right; font-weight: bold; }
        .stamp { text-align: center; margin-top: 30px; color: #0000ff; font-size: 18px; font-weight: bold; border: 3px solid #0000ff; display: inline-block; padding: 6px 18px; border-radius: 5px; }
    </style>
</head>
<body>
    <div class="ticket">

        {{-- En-tête avec logo et nom de l'entreprise --}}
        
<div class="header" style="margin-bottom: 25px; border-bottom: 1px solid #eee; padding-bottom: 15px;">
    <table style="width: 100%; border-collapse: collapse; border: none;">
        <tr>
            <td style="width: 90px; border-bottom: none; padding: 0; text-align: left; vertical-align: middle;">
                <img 
                    src="data:image/jpeg;base64,{{ base64_encode(file_get_contents(public_path('images/pdflogo.jpeg'))) }}" 
                    alt="Logo" 
                    style="width: 80px; height: 80px; object-fit: contain;"
                />
            </td>
            
            <td style="border-bottom: none; padding: 0 0 0 15px; text-align: left; vertical-align: middle;">
                <h1 class="company-name" style="margin: 0; color: #0000ff; font-size: 20px; font-weight: bold; line-height: 1.2;">
                    KAREL TRAVELS EXCURSIONS
                </h1>
                <div style="color: #555; font-size: 13px; margin-top: 5px;">
                    E-mail: <span style="font-weight: normal;">karelvoyages@gmail.com</span>
                </div>
                <div style="color: #555; font-size: 13px; margin-top: 2px;">
                    Tel: <span style="font-weight: normal;">+226 74 19 97 97 / 70 22 06 63</span>
                </div>
            </td>
        </tr>
    </table>
</div>
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