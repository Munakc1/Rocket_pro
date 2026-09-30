// import nodemailer from "nodemailer";
// import { config } from "../config/config.js";

// const transporter = nodemailer.createTransport({
//   host: config.smtpHost,
//   port: config.smtpPort,
//   secure: config.smtpPort === 465,

//   auth: {
//     user: config.smtpUser,
//     pass: config.smtpPassword,
//   },
// });

// export const sendPasswordResetEmail = async (
//   email: string,
//   resetUrl: string
// ) => {
//   await transporter.sendMail({
//     from: `"Rocket Pro" <${config.smtpUser}>`,
//     to: email,
//     subject: "Reset your Rocket Pro password",

//     html: `
//       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
//         <h2 style="color: #0aa852;">
//           Rocket Pro
//         </h2>

//         <p>
//           We received a request to reset your Rocket Pro password.
//         </p>

//         <p>
//           Click the button below to create a new password.
//         </p>

//         <a
//           href="${resetUrl}"
//           style="
//             display:inline-block;
//             padding:12px 20px;
//             background:#0aa852;
//             color:white;
//             text-decoration:none;
//             border-radius:8px;
//           "
//         >
//           Reset Password
//         </a>

//         <p style="margin-top:20px;color:#666;">
//           This link will expire in 15 minutes.
//         </p>

//         <p style="color:#999;font-size:12px;">
//           If you did not request this password reset, you can ignore this email.
//         </p>
//       </div>
//     `,
//   });
// };

import {
  createTransport,
  createJsonTransport,
  mailerFromEnv,
  type Transport,
} from "@lacspace/mailer";

import {
  passwordResetEmail,
  toPlainText,
} from "@lacspace/email-templates";

// Use real SMTP when SMTP_HOST is configured.
// Otherwise, print the email to the terminal.
export const transport: Transport = process.env.SMTP_HOST
  ? createTransport(mailerFromEnv())
  : createJsonTransport((json) =>
      console.log(
        "\n[email:dev] Set SMTP_* in .env to deliver real email:\n" +
          JSON.stringify(json, null, 2) +
          "\n"
      )
    );

const FROM =
  process.env.SMTP_FROM ?? "Rocket Pro <no-reply@rocketpro.com>";

export const sendPasswordResetEmail = async (
  email: string,
  resetUrl: string
) => {
  const html = passwordResetEmail({
    resetUrl,
    expiresMinutes: 15,
    brandName: "Rocket Pro",
  });

  await transport.send({
    from: FROM,
    to: email,
    subject: "Reset your Rocket Pro password",
    html,
    text: toPlainText(html),
  });
};