import React, { Component } from "react";
import axios from "axios";
import { forkArticle } from "../services/articles";
import { Redirect } from "react-router-dom";

export default class ArticleView extends Component {
  state = {
    article: this.props.match.params.id,
    user: this.props.user,
    forkedarticleurl: "",
    redirect: null,
    message: "",
  };

  handleFork = (event) => {
    const { article, user } = this.state;

    forkArticle(article, user)
      .then((response) => {
        this.setState({
          forkedarticleurl: `/article/edit/${response._id}`,
        });
      })
      .then(() => {
        this.props.history.push(this.state.forkedarticleurl);
        // this.setState({ redirect: `${this.state.forkedarticleurl}` })
      });
  };

  componentDidMount() {
    axios
      .get(`/api/articles/findonearticle/${this.props.match.params.id}`)
      .then((response) => {
        console.log(response.data);
        this.setState({
          article: response.data,
        });
      })
      .catch((err) => {
        return err.response.data;
      });
  }

  render() {
    return (
      <>
        <h1>{this.state.article.title}</h1>
        <p>{this.state.article.content}</p>
        <button onClick={this.handleFork}>Fork</button>
      </>
    );
  }
}
