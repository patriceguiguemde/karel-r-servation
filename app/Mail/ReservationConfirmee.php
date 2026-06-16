<?php

namespace App\Mail;

use App\Models\Reservation;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ReservationConfirmee extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public Reservation $reservation) {}

    public function envelope(): Envelope
    {
        return new Envelope(subject: ' Confirmation de votre réservation #' . $this->reservation->id);
    }

    public function content(): Content
    {
        return new Content(view: 'emails.reservation_confirmee');
    }

    public function attachments(): array
   {
    $pdf = Pdf::loadView('pdf.ticket', ['reservation' => $this->reservation])
        ->setOptions([
            'defaultFont' => 'dejavu sans',
            'isHtml5ParserEnabled' => true,
            'isUtf8Enabled' => true,  
        ]);

    return [
        \Illuminate\Mail\Mailables\Attachment::fromData(
            fn () => $pdf->output(),
            'ticket_' . $this->reservation->id . '.pdf'
        )->withMime('application/pdf'),
    ];
    }
}