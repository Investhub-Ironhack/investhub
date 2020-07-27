import axios from "axios";

const postArticle = (title, content, category, author) => {
  return axios
    .post("/api/articles/postArticle", {
      title: title,
      content: content,
      category: category,
      author: author,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export { postArticle };
