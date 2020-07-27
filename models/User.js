const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    displayName: String,
    username: String,
    password: String,
    email: String,
    githubId: String,
    googleId: String,
    linkedinId: String,
    articles: [{ type: Schema.Types.ObjectId, ref: "Article" }],
    avatarUrl: String,
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
