import nodemailer from "nodemailer";
import { FormData } from "../types/formTypes";

if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
  throw new Error("GMAIL_USER en GMAIL_PASS zijn vereist in het .env bestand");
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export async function sendEmail(data: FormData): Promise<void> {
  try {
    const mailOptions = {
      from: `"${data.firstName} ${data.lastName}" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: "Nieuw specie gevangen!",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Email Template</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    width: 100%;
                    max-width: 600px;
                    margin: 20px auto;
                    background: #ffffff;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                }
                .header {
                    background: #007BFF;
                    color: #ffffff;
                    text-align: center;
                    padding: 15px;
                    font-size: 22px;
                    font-weight: bold;
                    border-radius: 10px 10px 0 0;
                }
                .content {
                    padding: 20px;
                    font-size: 16px;
                    color: #333;
                    line-height: 1.5;
                }
                .footer {
                    text-align: center;
                    font-size: 12px;
                    color: #666;
                    margin-top: 20px;
                }
                @media (max-width: 600px) {
                    .container {
                        width: 95%;
                    }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">Syntra - Node Team</div>
                <div class="content">
                    <p>🎉 Je hebt een nieuwe "specie" gevangen! 🐍</p>
                    <p>Check de vangst:</p>
                    <ul>
                        <li><strong>Naam:</strong> ${data.firstName} ${
        data.lastName
      }</li>
                        <li><strong>Geboortedatum:</strong> ${
                          data.birthDate
                        }</li>
                        <li><strong>Haarkleur:</strong> ${data.hairColor}</li>
                        <li><strong>Lengte:</strong> ${data.height} cm</li>
                        <li><strong>Geslacht:</strong> ${data.gender}</li>
                        ${
                          data.comments
                            ? `<li><strong>Opmerking:</strong> ${data.comments}</li>`
                            : ""
                        }
                    </ul>
                    <p>Mission accomplished! 🔥</p>
                    <p>Groeten,<br>Syntra - Node Team</p>
                </div>
                <div class="footer">
                    &copy; 2025 Syntra - Node Team | <a href="https://syntra.be" style="color: #007BFF; text-decoration: none;">Website</a>
                </div>
            </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email verzonden");
  } catch (error) {
    console.error("Error bij versturen email:", error);
    throw new Error("Email versturen mislukt");
  }
}
