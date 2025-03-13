import { Resend } from 'resend';

const resend = new Resend(process.env.REACT_APP_RESEND);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to : 'muhtasimsaad@gmail.com',
      subject : 'New Activity at Personal Website',
      html : req.body.message,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

}