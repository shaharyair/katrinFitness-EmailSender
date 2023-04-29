const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const sendEmailRouter = require("./send-email"); // import the send-email router module

require("dotenv").config();

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname + "/public")));

// use the sendEmailRouter for the /send-email endpoint
app.use("/send-email", sendEmailRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
