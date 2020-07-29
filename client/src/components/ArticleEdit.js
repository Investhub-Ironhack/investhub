import React, { Component } from "react";
import axios from "axios";
import { updateArticle } from "../services/articles";

export default class ArticleEdit extends Component {
  state = {
    article: this.props.match.params.id,
    content: "",
    message: "",
  };

  componentDidMount() {
    axios
      .get(`/api/articles/findonearticle/${this.props.match.params.id}`)
      .then((response) => {
        this.setState({
          article: response.data,
        });
      })
      .catch((err) => {
        return err.response.data;
      })
      .then(() => this.setState({ content: this.state.article.content }));
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    const { content, article } = this.state;
    updateArticle(content, article).then((data) => {
      if (data.message) {
        this.setState({
          message: data.message,
        });
      }
    });
  };

  render() {
    return (
      <>
        <div class-name="edit">
          <div className="article-head">
            <h1 className="feed-title">{this.state.article.title}</h1>
            <span className="category-fork">{this.state.article.category}</span>
          </div>
          <form className="article-form" onSubmit={this.handleSubmit}>
            <textarea
              className="article-field"
              type="text"
              name="content"
              value={this.state.content}
              onChange={this.handleChange}
              id="content"
            />
            <button className="fork-button" type="submit">
              Save
            </button>
          </form>
        </div>
      </>
    );
  }
}
