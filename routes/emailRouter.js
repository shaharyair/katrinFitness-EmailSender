const express = require("express");
const sendEmail = require("../controllers/sendEmail");

const router = express.Router();

router.post("/sendEmail", sendEmail);

module.exports = router;
