import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailValues {
    to: string;
    subject: string;
    text: string;
};

export async function sendEmail({ to, subject, text }: SendEmailValues) {
    await resend.emails.send({
        // TODO: completar el from con el dominio verificado, la primer parte puede ser cualquiera, pero el dominio debe ser existente
        from: "verification-noreply@yourdomain.com",
        to,
        subject,
        text
    })
};