import React, { Component } from "react";
import { postArticle } from "../services/articles";

export default class NewArticle extends Component {
  state = {
    title: "",
    content: "",
    category: "",
    author: this.props.user,
    message: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    const { title, content, category, author } = this.state;

    postArticle(title, content, category, author).then((data) => {
      if (data.message) {
        this.setState({
          message: data.message,
          title: "",
          content: "",
          category: "",
          author: "",
        });
      }
    });
  };

  render() {
    return (
      <div>
        <div className="new">
          <h1>Write a new article !</h1>
          <form className="article-new" onSubmit={this.handleSubmit}>
            <input
              className="new-title"
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
              id="title"
              placeholder="Add a title..."
            />

            <select
              className="new-category"
              name="category"
              onChange={this.handleChange}
              id="category"
            >
              <option value="">Select a category</option>
              <option value="analysis">Analysis</option>
              <option value="stocks">Stocks</option>
              <option value="options">Options</option>
              <option value="comodities">Comodities</option>
              <option value="opinion">Opinion</option>
              <option value="Due-Diligence">Due Diligence</option>
            </select>

            <textarea
              className="new-content"
              type="text"
              name="content"
              value={this.state.content}
              onChange={this.handleChange}
              id="content"
              placeholder="...and write some content."
            />

            {this.state.message && <span>{this.state.message}</span>}
            <button className="submit-button" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}
