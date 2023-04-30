const app = require("../server");

module.exports = (req, res) => {
  // Call the Express.js app to handle the HTTP request
  app(req, res);
};
