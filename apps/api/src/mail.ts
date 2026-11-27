import nodemailer from "nodemailer";

export async function sendArtistInvite(input: {
  to: string;
  name: string;
  temporaryPassword: string;
  resetLink: string;
  cmsUrl: string;
}) {
  const host = process.env.SMTP_HOST;
  if (!host) return { emailed: false };

  const port = Number(process.env.SMTP_PORT || 587);
  const transport = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      : undefined,
  });

  await transport.sendMail({
    from: process.env.SMTP_FROM || "Ô musiki <noreply@omusiki.test>",
    to: input.to,
    subject: "Votre compte artiste Ô musiki",
    text: [
      `Bonjour ${input.name},`,
      "",
      "Un administrateur a créé votre compte artiste sur Ô musiki.",
      `Mot de passe temporaire : ${input.temporaryPassword}`,
      "",
      "Choisissez votre propre mot de passe avant de vous connecter :",
      input.resetLink,
      "",
      `Ensuite, ouvrez le backoffice : ${input.cmsUrl}`,
    ].join("\n"),
  });

  return { emailed: true };
}
