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

  handleEditorChange = (content, editor) => {
    this.setState({ content: content });
    console.log("Content was updated:", content);
  };

  handleChange = (event) => {
    console.log(event.target.value.toString());
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, content, category, author } = this.state;
    console.log(content);
    postArticle(title, content, category, author).then((data) => {
      if (data.message) {
        this.setState({
          message: data.message,
          title: "",
          content: "",
          category: "",
          author: "",
        });
      } else {
        this.props.history.push(`/userpage/${this.props.user._id}`);
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
              className="input-text"
              type="text"
              name="content"
              value={this.state.content}
              id="content"
              placeholder="Your Article:"
              cols="10"
              rows="20"
              init={{
                skin: "fabric",
                icon: "jam",
                branding: false,
                plugins:
                  "print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons autoresize",
                menubar: "file edit view insert format tools table help",
                toolbar_mode: "floating",
                toolbar: [
                  {
                    name: "history",
                    items: ["undo", "redo"],
                  },
                  {
                    name: "formatting",
                    items: ["bold", "italic", "underline", "strikethrough"],
                  },
                  {
                    name: "alignment",
                    items: [
                      "alignleft",
                      "aligncenter",
                      "alignright",
                      "alignjustify",
                    ],
                  }, {
                    name: "preview",
                    items:["fullscreen", "preview" ,"save", "print" ],
                  },
                  {
                    name: "indentation",
                    items: ["outdent", "indent"],
                  }, {
                    name: "list",
                    items:["numlist" , "bullist"],
                  }, {
                    name: "color",
                    items:["forecolor", "backcolor", "removeformat" ],
                  }, {
                    name: "emoticons",
                    items:["charmap", "emoticons" ],
                  }
                ],
                toolbar_sticky: true,
                image_advtab: true,
                template_cdate_format:
                  "[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]",
                template_mdate_format:
                  "[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]",
                min_height: 600,
                width: 600,
                min_width: 600,
                resize: false,
                statusbar: false,
                image_caption: true,
                quickbars_selection_toolbar:
                  "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
                noneditable_noneditable_class: "mceNonEditable",
                contextmenu: "link image imagetools table",
              }}
              onEditorChange={this.handleEditorChange}
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
