export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, type, msg } = req.body || {};

  if (!name || !email || !msg) {
    return res.status(400).json({ error: 'Missing required fields (name, email, msg).' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;
  if (!apiKey || !to) {
    console.error('[contact] Missing RESEND_API_KEY or CONTACT_EMAIL env var');
    return res.status(500).json({ error: 'Email service is not configured.' });
  }

  const safe = (s) => String(s).replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]));

  const html = `
    <!DOCTYPE html>
    <html lang="en"><body style="margin:0;padding:0;background:#0a0a0f;font-family:-apple-system,Segoe UI,Arial,sans-serif;color:#f0f0f0;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0f;padding:32px 0;">
        <tr><td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#0d0e14;border:1px solid #1b1d26;border-radius:10px;overflow:hidden;">
            <tr><td style="padding:24px 32px;border-bottom:1px solid #1b1d26;">
              <p style="margin:0;font-family:monospace;font-size:11px;color:#00ffd1;letter-spacing:0.1em;text-transform:uppercase;">// new inquiry · zdenek.dev</p>
            </td></tr>
            <tr><td style="padding:28px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="font-family:monospace;font-size:13px;color:#f0f0f0;">
                <tr><td style="padding:6px 0;color:#6b7280;width:90px;">NAME</td><td style="padding:6px 0;">${safe(name)}</td></tr>
                <tr><td style="padding:6px 0;color:#6b7280;">EMAIL</td><td style="padding:6px 0;"><a href="mailto:${safe(email)}" style="color:#00ffd1;">${safe(email)}</a></td></tr>
                <tr><td style="padding:6px 0;color:#6b7280;">TYPE</td><td style="padding:6px 0;">${safe(type || '—')}</td></tr>
              </table>
              <div style="margin-top:20px;padding-top:18px;border-top:1px dashed #1b1d26;">
                <p style="margin:0 0 10px;font-family:monospace;font-size:11px;color:#6b7280;letter-spacing:0.1em;text-transform:uppercase;">BRIEF</p>
                <p style="margin:0;font-size:14px;line-height:1.6;color:#f0f0f0;white-space:pre-wrap;">${safe(msg)}</p>
              </div>
            </td></tr>
            <tr><td style="padding:16px 32px;border-top:1px solid #1b1d26;font-family:monospace;font-size:11px;color:#6b7280;">
              ${new Date().toISOString()} · via contact form
            </td></tr>
          </table>
        </td></tr>
      </table>
    </body></html>`;

  try {
    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'zdenek.dev <onboarding@resend.dev>',
        to: [to],
        reply_to: email,
        subject: `[zdenek.dev] New inquiry from ${name}`,
        html,
      }),
    });

    if (!resp.ok) {
      const detail = await resp.text();
      console.error('[contact] Resend API error:', resp.status, detail);
      return res.status(502).json({ error: 'Failed to send email.' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('[contact] Exception:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}
