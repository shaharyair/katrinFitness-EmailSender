const nodemailer = require("nodemailer");
const fs = require("fs");

module.exports = async (req, res) => {
  const { fullName, phoneNumber } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "shaharyair12@gmail.com",
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: "shaharyair12@gmail.com",
    to: "shaharyair12@gmail.com",
    subject: "קאתרין יאיר מאמנת כושר - מתעניינת חדשה!",
    html: fs
      .readFileSync(__dirname + "/email-template.html", "utf-8")
      .replace(/%fullName%/g, fullName)
      .replace(/%phoneNumber%/g, phoneNumber),
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent");
    res.send("המייל נשלח בהצלחה!");
  } catch (error) {
    console.log(error);
    res.status(500).send("קרתה שגיאה בשליחת המייל.");
  }
};
