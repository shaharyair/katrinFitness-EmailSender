const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const sgMail = require("@sendgrid/mail");

require("dotenv").config();

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname + "/public")));

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.get("/send-email", (req, res) => {
  res.send("This is the send email endpoint");
});

app.post("/send-email", async (req, res) => {
  console.log("Endpoint hit!");
  const { fullName, phoneNumber } = req.body;

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
    await sgMail.send(mailOptions);
    console.log("Email sent");
    res.header("Access-Control-Allow-Origin", "*");
    res.send("המייל נשלח בהצלחה!");
  } catch (error) {
    console.error(error);
    res.status(500).send("קרתה שגיאה בשליחת המייל.");
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

module.exports = app;
