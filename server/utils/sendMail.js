const nodemailer = require("nodemailer");

const sendMail = async (mailOptions) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });
  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log("Error while sending an email: ", err);
  }
};

module.exports = { sendMail };
