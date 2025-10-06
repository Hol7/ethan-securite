import { NextResponse } from 'next/server';

// POST /api/contact
export async function POST(req: Request) {
  try {
    const apiKey = process.env.BREVO_API_KEY;
    const senderEmail = process.env.BREVO_SENDER_EMAIL;
    const senderName = process.env.BREVO_SENDER_NAME || 'ETHAN SÉCURITÉ';
    const toEmail = process.env.BREVO_TO_EMAIL || 'fabrown40@gmail.com';

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Server misconfiguration: BREVO_API_KEY is missing' },
        { status: 500 }
      );
    }
    if (!senderEmail) {
      return NextResponse.json(
        { error: 'Server misconfiguration: BREVO_SENDER_EMAIL is missing' },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { nom, email, telephone, service, message } = body || {};

    // Basic validation
    if (!nom || !email || !message) {
      return NextResponse.json(
        { error: 'Champs requis manquants: nom, email et message sont obligatoires.' },
        { status: 400 }
      );
    }

    const subject = 'Nouvelle demande de contact - ETHAN SÉCURITÉ';

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Nouvelle demande de contact</h2>
        <p>Vous avez reçu une nouvelle demande depuis le site ETHAN SÉCURITÉ.</p>
        <h3>Détails</h3>
        <ul>
          <li><strong>Nom:</strong> ${escapeHtml(nom)}</li>
          <li><strong>Email:</strong> ${escapeHtml(email)}</li>
          <li><strong>Téléphone:</strong> ${escapeHtml(telephone || '')}</li>
          <li><strong>Service:</strong> ${escapeHtml(service || '')}</li>
        </ul>
        <h3>Message</h3>
        <p>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>
      </div>
    `;

    const payload = {
      sender: { email: senderEmail, name: senderName },
      to: [{ email: toEmail }],
      subject,
      htmlContent,
      replyTo: email ? { email, name: nom } : undefined,
    };

    const brevoRes = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const brevoJson = await brevoRes.json().catch(() => ({}));

    if (!brevoRes.ok) {
      return NextResponse.json(
        {
          error: 'Échec de l\'envoi de l\'email',
          details: brevoJson,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ message: 'Votre message a été envoyé avec succès !' });
  } catch (err) {
    console.error('Erreur API /api/contact:', err);
    return NextResponse.json(
      { error: 'Erreur serveur lors de l\'envoi du message.' },
      { status: 500 }
    );
  }
}

// Simple HTML escaping to avoid accidental HTML injection in the email body
function escapeHtml(input: string) {
  return String(input)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
