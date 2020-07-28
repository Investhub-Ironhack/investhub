import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Feed extends Component {
  state = {
    articles: [],
  };

  componentDidMount() {
    axios
      .get("api/articles/findarticle")
      .then((response) => this.setState({ articles: response.data }))
      .catch((err) => {
        return err.response.message;
      });
  }

  render() {
    return (
      <>
        <h1 className="feed-title">Your daily articles and analysis</h1>
        {this.state.articles.map((article) => {
          return (
            <div class="feed-el">
              <Link
                className="feed-link"
                to={`/userpage/${article.author[0]._id}`}
              >
                <img
                  className="feed-image"
                  src={article.author[0].avatarUrl}
                  alt="author's avatar"
                />
                {article.author[0].username}
              </Link>
              <Link className="feed-article" to={`/article/${article._id}`}>
                {article.title}
              </Link>
            </div>
          );
        })}
      </>
    );
  }
}
