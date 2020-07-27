import React, { Component } from "react";
import { findArticle } from "../services/articles";
import axios from "axios";

export default class UserPage extends Component {
  state = {
    user: this.props.match.params.id,
    articles: [],
  };
  componentDidMount() {
    axios
      .get(`/api/articles/findarticle/${this.props.match.params.id}`)
      .then((response) => {
        this.setState({
          user: response.data,
          articles: response.data.articles,
        });
      })
      .catch((err) => {
        return err.response.data;
      });
  }

  render() {
    console.log(this.state.articles);
    return (
      <>
        <h1>{this.state.user.username}</h1>
        <img src={this.state.user.avatarUrl} />
        <h1>{console.log(this.state.articles)}</h1>
        {this.state.articles.map((article) => {
          return <h1>{article.title}</h1>;
        })}
      </>
    );
  }
}
