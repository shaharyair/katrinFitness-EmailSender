require("dotenv").config();
const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
const AppError = require("../utils/appError");

const sendEmail = async (req, res, next) => {
  const { fullName, phoneNumber } = req.body;

  const emailTemplatePath = path.join(
    process.cwd(),
    "templates",
    "email-template.html"
  );

  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: "קאתרין יאיר מאמנת כושר - מתעניינת חדשה!",
    html: fs
      .readFileSync(emailTemplatePath, "utf-8")
      .replace(/{{ fullName }}/g, fullName)
      .replace(/{{ phoneNumber }}/g, phoneNumber),
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email was sent successfully." });
  } catch (err) {
    next(new AppError("There was an error sending the email", 500));
  }
};

module.exports = sendEmail;
