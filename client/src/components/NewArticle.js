import React, { Component } from "react";
import { postArticle } from "../services/articles";
import { Editor } from "@tinymce/tinymce-react";

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
          <h1>Write a new article!</h1>
          <form className="form-add-article" onSubmit={this.handleSubmit}>
            <input
              className="input-text"
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
              id="title"
              placeholder="Title"
            />

            <select
              className="input-text"
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

            {/* <textarea
              className="input-text"
              type="text"
              name="content"
              value={this.state.content}
              onChange={this.handleChange}
              id="content"
              placeholder="Your Article:"
              cols="10"
              rows="20"
            /> */}

            <Editor
              initialValue="<p></p>"
              init={{
                icon: "jam",
                height: 500,
                skin: "fabric",
                menubar: true,
                resize: false,
                plugins : 'advlist autolink link image lists charmap print preview help searchreplace visualblocks code insertdatetime media table paste wordcount',
                toolbar:
                  "undo redo | styleselect | forecolor | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | link image | code",
              }}
              onChange={this.handleEditorChange}
            />

            {this.state.message && <span>{this.state.message}</span>}
            <div>
              <button className="btn-primary" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
