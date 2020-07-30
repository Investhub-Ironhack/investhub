import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Feed extends Component {
  state = {
    articles: [],
  };

  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/articles/findarticles`)
      .then((response) => {
        console.log(response);
        this.setState({ articles: response.data });
      })
      .catch((err) => {
        return err.response.message;
      });
  }

  render() {
    return (
      <>
        <h1 className="feed-title">Your daily articles and analysis</h1>
        <table className="table">
          <tbody>
            {this.state.articles.map((article) => {
              return (
                <tr className="table-row">
                  <td>
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
                  </td>
                  <td>
                    <span className="category-feed">{article.category}</span>
                  </td>
                  <td className="table-text">
                    <Link
                      className="feed-article"
                      to={`/article/${article._id}`}
                    >
                      {article.title}
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
}
