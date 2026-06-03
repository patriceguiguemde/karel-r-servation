<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ReservationConfirmed extends Mailable
{
    use Queueable, SerializesModels;

    public $reservation;

    // On récupère les données de la réservation
    public function __construct($reservation)
    {
        $this->reservation = $reservation;
    }

    // On définit l'objet du mail et le fichier HTML à utiliser
    public function build()
    {
        return $this->subject('Confirmation de votre réservation')
                    ->view('emails.reservation_confirmed');
    }
}