import React, { Component } from "react";
// import { findArticle } from "../services/articles";
import axios from "axios";
import { Link } from "react-router-dom";

export default class UserPage extends Component {
  state = {
    user: this.props.match.params.id,
    articles: [],
  };
  componentDidMount() {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/articles/findarticle/${this.props.match.params.id}`
      )
      .then((response) => {
        this.setState({
          user: response.data,
          articles: response.data.articles.reverse(),
        });
      })
      .catch((err) => {
        return err.response.data;
      });
  }

  render() {
    return (
      <>
        <div className="user-page">
          <div className="profile">
            <h1>{this.state.user.username}</h1>
            <img src={this.state.user.avatarUrl} alt="avatar" />
          </div>
          <table className="user-articles">
            {this.state.articles.map((article) => {
              return (
                <tr>
                  <td>
                    <span className="category-userpage">
                      {article.category}
                    </span>
                  </td>
                  <td className="table-text">
                    <Link to={`/article/${article._id}`}>{article.title}</Link>
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </>
    );
  }
}
