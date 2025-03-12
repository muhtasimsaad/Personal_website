import nodemailer from "nodemailer";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { to, subject, message } = req.body;

    // Configure Nodemailer with Gmail (Use App Password, NOT your real password)
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL, // Your Gmail
            pass: process.env.EMAIL_PASS, // App Password (from Google)
        },
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to,
        subject,
        text: message,
    };

    try {
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
        return res.status(500).json({ error: "Error sending email", details: error });
    }
}
