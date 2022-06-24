const express = require("express");
const router = express.Router();

router.get("/", async function (req, res) {
  return res.send("<h1>Cache Api</h1>");
});

module.exports = router;
