import nodemailer from "nodemailer";
import { envs } from "../../../config/envs";

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  body: string;
}

export class SendEmail {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    from: envs.MAILER_EMAIL,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  async sendEmail(options: SendEmailOptions): Promise<boolean> {
    const { to, subject, body } = options;
    try {
      await this.transporter.sendMail({
        to,
        subject,
        html: body,
      } as any);
      return true;
    } catch (error) {
      console.log(error);

      return false;
    }
  }



}
