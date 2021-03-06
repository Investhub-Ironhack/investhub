const express = require("express");
const Article = require("../models/Article");
const router = express.Router();
const User = require("../models/User");

router.post("/postArticle", async (req, res) => {
  const { title, content, category, author } = req.body;
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
        author: author,
      });

      await User.findByIdAndUpdate(createdArticle.author, {
        $push: { articles: createdArticle },
      });
      res.json(createdArticle);
    } catch (err) {
      console.log(err);
    }
  }
});

router.get("/findarticles", (req, res) => {
  Article.find()
    .sort({ created_at: -1 })
    .populate("author")
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/findarticle/:id", (req, res) => {
  User.findById(req.params.id)
    .populate("articles")
    .then((articles) => {
      console.log(articles);
      res.status(200).json(articles);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/findonearticle/:id", (req, res) => {
  Article.findById(req.params.id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/updatearticle/:id", (req, res) => {
  Article.findByIdAndUpdate(
    { _id: req.params.id },
    { content: req.body.content }
  )
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.patch("/likearticle/:id", (req, res) => {
  Article.findByIdAndUpdate(
    { _id: req.params.id },
    { $addToSet: { like: req.body.user }}
  )
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.patch("/unlikearticle/:id", (req, res) => {
  Article.findByIdAndUpdate(
    { _id: req.params.id },
    { $pull: { like: req.body.user }}
  )
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
