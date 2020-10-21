import axios from "axios";

const postArticle = (title, content, category, author) => {
  return axios
    .post(`${process.env.REACT_APP_API_URL}/api/articles/postArticle`, {
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

const forkArticle = (article, user) => {
  return axios
    .post(`${process.env.REACT_APP_API_URL}/api/articles/postArticle`, {
      title: article.title + "  => " + `(${user.username})`,
      content: article.content,
      category: article.category,
      author: user,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

const updateArticle = (content, article) => {
  return axios
    .post(
      `${process.env.REACT_APP_API_URL}/api/articles/updatearticle/${article._id}`,
      {
        content: content,
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export { postArticle, forkArticle, updateArticle };
