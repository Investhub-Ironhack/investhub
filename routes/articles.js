const express = require("express");
const Article = require("../models/Article");
const router = express.Router();

router.post("/postArticle", async (req, res) => {
  const { title, content, category } = req.body;
  console.log("is it working?");
  if (!title || title.length < 8 || title.length > 200) {
    return res.status(400).json({
      message:
        "The title should be at least 8 characters and maximum 200 characters!",
    });
  } else if (!content || content.length < 200) {
    return res
      .status(400)
      .json({ message: "The content should be at least 200 characters." });
  } else if (!category) {
    return res.status(400).json({ message: "Please add a category." });
  } else {
    try {
      const createdArticle = await Article.create({
        title: title,
        content: content,
        category: category,
      });
      res.json(createdArticle);
    } catch (err) {
      console.log(err);
    }
  }
});

module.exports = router;
