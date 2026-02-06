import nodemailer from "nodemailer";
import { config } from "../config/config.js";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.mailUser,
    pass: config.mailPass
  }
});

transporter.verify((error, success) => {
  if (error) {
    console.error("Error conectando con el servicio de mail:", error);
  } else {
    console.log("Servicio de mail listo para enviar mensajes");
  }
});

export const sendResetEmail = async (to, token) => {
  const resetLink = `http://localhost:8080/api/sessions/reset-password/${token}`;

  await transporter.sendMail({
    from: `"Facundo Lodi - Backend2" <${config.mailUser}>`,
    to,
    subject: "Recuperación de contraseña",
    html: `
      <h2>Recuperación de contraseña</h2>
      <p>Recibimos una solicitud para restablecer tu contraseña.</p>

      <p><b>Opción 1 — Usar el link directamente:</b></p>
      <p>${resetLink}</p>

      <p><b>Opción 2 — Copiar el token manualmente:</b></p>
      <p style="font-size:18px; font-weight:bold;">${token}</p>

      <p>Luego hacé una petición POST a esa URL con el siguiente body:</p>

      <pre>
{
  "password": "NuevaPassword123"
}
      </pre>

      <p>Este enlace/token vence en 1 hora.</p>
    `
  });
};