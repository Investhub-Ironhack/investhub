const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log(req.user);
  res.json({});
});

module.exports = router;
