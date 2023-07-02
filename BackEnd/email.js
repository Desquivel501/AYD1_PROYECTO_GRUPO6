const nodemailer = require("nodemailer");
require("dotenv").config();
const user = process.env.EMAIL_APP + "";
const pass = process.env.PASS_EMAIL_APP + "";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user,
    pass,
  },
});

function sendEmail(to, subject, title, message) {
  const mailOptions = {
    from: user,
    to,
    subject,
    text: message,
    html: `<h1>${title}</h1><p>${message}</p>`,
  };
  
  return transporter.sendMail(mailOptions)
  .then(res=> {console.log(res.response); return res.response})
  .catch(e=>console.log(e));
}
module.exports = sendEmail;
