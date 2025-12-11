import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const data = await req.json();
    const { name, email, phone, company, subject, message } = data || {};

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    const SENDGRID_FROM = process.env.SENDGRID_FROM || 'no-reply@novelsolutions.com';
    const TO_EMAIL = process.env.CONTACT_RECEIVER || 'novelsolution.trade@gmail.com';

    if (!SENDGRID_API_KEY) {
      return NextResponse.json({ error: 'SendGrid API key not configured on server' }, { status: 500 });
    }

    const subjectLine = `Website Contact: ${subject || 'General Inquiry'} — ${name}`;
    const now = new Date().toISOString();

    const htmlContent = `
      <h2>New contact form submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone || '-')}</p>
      <p><strong>Company:</strong> ${escapeHtml(company || '-')}</p>
      <p><strong>Subject:</strong> ${escapeHtml(subject || '-')}</p>
      <p><strong>Message:</strong><br/>${escapeHtml(message)}</p>
      <hr />
      <p>Received at: ${now}</p>
    `;

    const payload = {
      personalizations: [
        {
          to: [{ email: TO_EMAIL }],
          subject: subjectLine,
        },
      ],
      from: { email: SENDGRID_FROM },
      content: [{ type: 'text/html', value: htmlContent }],
    };

    const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('SendGrid error', res.status, text);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Contact API error', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/\n/g, '<br/>');
}
