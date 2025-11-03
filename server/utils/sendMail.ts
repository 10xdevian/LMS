import ejs from "ejs";
import nodemailer, { Transporter, createTransport } from "nodemailer";
import { EmailOptions } from "../types/user.type";
import {
  SMTP_HOST,
  SMTP_MAIL,
  SMTP_PASSWORD,
  SMTP_PORT,
  SMTP_SERVICE,
  SMTP_USER,
} from "../config";
import path from "path";

const sendMail = async (options: EmailOptions): Promise<void> => {
  const transporter: Transporter = createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT || "587"),
    service: SMTP_SERVICE,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASSWORD,
    },
  });

  const { email, subject, template, data } = options;

  // get tje path to the email template file
  const templatePath = path.join(__dirname, "../mails", template);

  // render the email template
  const html: string = await ejs.renderFile(templatePath, data);

  const mailOptions = {
    from: SMTP_MAIL,
    to: email,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};

export default sendMail;
