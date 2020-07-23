const express = require("express");
const Article = require("../models/Article");
const router = express.Router();

router.post("/postArticle", (req, res) => {
  const { title, content, category } = req.body;
  console.log("is it working?");
  if (!title || title.length < 8 || title.length > 200) {
    return res.status(400).json({
      message:
        "The title should be at least 8 characters and maximum 200 characters!",
    });
  } else if (!content || content < 10) {
    return res
      .status(400)
      .json({ message: "The content should be at least 500 characters." });
  } else if (!category) {
    return res.status(400).json({ message: "Please add a category." });
  } else {
    return Article.create({
      title: title,
      content: content,
      category: category,
    })
      .then((response) => res.json(response))
      .catch((err) => {
        res.json(err);
      });
  }
});

module.exports = router;
