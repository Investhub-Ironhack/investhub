import React, { Component } from "react";
// import { findArticle } from "../services/articles";
import axios from "axios";

export default class UserPage extends Component {
  state = {
    user: this.props.user,
    articles: [],
  };
  componentDidMount() {
    axios
      .get(`/api/articles/findarticle/${this.props.user._id}`)
      .then((response) => {
        this.setState({ articles: response.data.articles });
      })
      .catch((err) => {
        return err.response.data;
      });
  }

  render() {
    return (
      <>
        <h1>{this.props.user.username}</h1>
        <img src={this.props.user.avatarUrl} />
        <h1>{console.log(this.state.articles)}</h1>
        {this.state.articles.map((article) => {
          return <h1>{article.title}</h1>;
        })}
      </>
    );
  }
}
