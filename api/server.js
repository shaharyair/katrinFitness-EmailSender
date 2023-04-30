const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const fs = require("fs");

require("dotenv").config();

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname + "/public")));

app.post("/send-email", async (req, res) => {
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
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
    res.send("המייל נשלח בהצלחה!");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("קרתה שגיאה בשליחת המייל.");
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
