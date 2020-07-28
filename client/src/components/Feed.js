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
        <h1>
          Your daily articles and analysis {console.log(this.state.articles)}
        </h1>
        {this.state.articles.map((article) => {
          return (
            <div>
              <Link to={`/userpage/${article.author[0]._id}`}>
                <img src={article.author[0].avatarUrl} />
                {article.author[0].username}
              </Link>
              <Link to={`/article/${article._id}`}>{article.title}</Link>
            </div>
          );
        })}
      </>
    );
  }
}
