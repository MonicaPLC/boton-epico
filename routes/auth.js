const { Router } = require("express");
const bcrypt = require("bcrypt");
const router = Router();

router.get("/", function (req, res) {
  res.render("index.ejs");
});

module.exports = router;
