import { render } from '@react-email/render';
import nodemailer from 'nodemailer';
import { Email } from './testhome';

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false,
  auth: {
    user: 'my_user',
    pass: 'my_password',
  },
});

const emailHtml = render(<Email url="https://example.com" />);

const options = {
  from: 'pspriyanka24997@gmail.com',
  to: 'priyanka.sen24997@gmail.com',
  subject: 'hello world',
  html: emailHtml,
};

transporter.sendMail(options);
