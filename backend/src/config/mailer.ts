import dotenv from 'dotenv';
import ejs from 'ejs';
import nodemailer, { Transporter } from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import path from 'path';

dotenv.config();

interface MailCutomerWelcomeData {
   userName: string;
   otp: string;
}

const smtpPort: number = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
const transporter: Transporter = nodemailer.createTransport(
   smtpTransport({
      service: 'gmail',
      auth: {
         user: process.env.EMAIL_USER,
         pass: process.env.EMAIL_PASSWORD
      }
   })
);

export const sendMailSignOtp = async (to: string, subject: string, data: MailCutomerWelcomeData): Promise<any> => {
   try {
      const html: string = await ejs.renderFile(path.join(__dirname, '../views/index.ejs'), data);
      const mailOptions = {
         from: "abhimanyujune3@gmail.com",
         to: to,
         subject: subject,
         html: html,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log(`Email sent: ${info.messageId}`);
      return "Email sent"
   } catch (err: any) {
      console.error(`Error sending email: ${err}`);
      return err;
   }
};