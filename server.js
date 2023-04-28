const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname + "/public")));

app.post("/send-email", (req, res) => {
  const { fullName, phoneNumber } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "shaharyair12@gmail.com",
      pass: "oczacfbnxjftwaat",
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

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("קרתה שגיאה בשליחת המייל.");
    } else {
      console.log("Email sent");
      res.send("המייל נשלח בהצלחה!");
    }
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
