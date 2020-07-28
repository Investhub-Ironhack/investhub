const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const articleSchema = new Schema(
  {
    title: String,
    author: [{ type: Schema.Types.ObjectId, ref: "User" }],
    original: String,
    category: String,
    link: String,
    content: String,
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Article = model("Article", articleSchema);
module.exports = Article;
