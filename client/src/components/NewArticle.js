import React, { Component } from "react";
import { postArticle } from "../services/articles";

export default class NewArticle extends Component {
  state = {
    title: "",
    content: "",
    category: "",
    message: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { title, content, category } = this.state;

    postArticle(title, content, category).then((data) => {
      if (data.message) {
        this.setState({
          message: data.message,
          title: "",
          content: "",
          category: "",
        });
      }
    });
  };

  render() {
    return (
      <div>
        <h1>Write a new article !</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
            id="title"
            placeholder="Add a title..."
          />

          <select name="category" onChange={this.handleChange} id="category">
            <option value="">Select a category</option>
            <option value="analysis">Analysis</option>
            <option value="stocks">Stocks</option>
            <option value="options">Options</option>
            <option value="comodities">Comodities</option>
            <option value="opinion">Opinion</option>
            <option value="Due-Diligence">Due Diligence</option>
          </select>

          <input
            type="text"
            name="content"
            value={this.state.content}
            onChange={this.handleChange}
            id="content"
            placeholder="...and write some content."
          />
          {this.state.message && <span>{this.state.message}</span>}
          <button type="submit"> Submit </button>
        </form>
      </div>
    );
  }
}
