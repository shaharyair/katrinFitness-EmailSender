require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const moment = require("moment");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

const emailRouter = require("./routes/emailRouter");

const app = express();

app.use(express.json());

app.use(cors());

if (process.env.NODE_ENV === "dev") app.use(morgan("tiny"));

app.use(helmet());

const limiter = rateLimit({
  max: 5,
  windowMs: moment.duration(1, "hours").asMilliseconds(),
  message: "Too many requests from this user, try again in an hour.",
});

app.use("/api", limiter);

app.use("/api", emailRouter);

module.exports = app;
