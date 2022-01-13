import nodemailer from 'nodemailer';
import {
  EMAIL_PASS, EMAIL_USER, EMAIL_HOST, EMAIL_PORT,
} from '../config/env_variables';

/**
 *
 * @param {*} from -- sender email
 * @param {*} to -- receiver email
 * @param {*} subject -- email subject
 * @param {*} text -- email text
 */

async function sendMail({
  to, subject, html,
}) {
  console.log('send mail !!!!!!!!!!');
  const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to, // list of receivers
    subject, // Subject line
    html, // html body
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}

export default sendMail;
