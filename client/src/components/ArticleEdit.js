import React, { Component } from "react";
import axios from "axios";
import { updateArticle } from "../services/articles";
import { Editor } from "@tinymce/tinymce-react";

export default class ArticleEdit extends Component {
  state = {
    article: this.props.match.params.id,
    content: "",
    message: "",
  };

  componentDidMount() {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/articles/findonearticle/${this.props.match.params.id}`
      )
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

  handleEditorChange = (content, editor) => {
    this.setState({ content: content });
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { content, article } = this.state;
    updateArticle(content, article).then((data) => {
      if (data.message) {
        this.setState({
          message: data.message,
        });
      } else {
        this.props.history.push(`/userpage/${this.props.user._id}`);
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
          <div className="new">
            <form className="form-add-article" onSubmit={this.handleSubmit}>
              {/* <textarea
              className="article-field"
              type="text"
              name="content"
              value={this.state.content}
              onChange={this.handleChange}
              id="content"
            /> */}

              <Editor
                className="input-field"
                type="text"
                name="content"
                value={this.state.content}
                onEditorChange={this.handleEditorChange}
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
                    },
                    {
                      name: "preview",
                      items: ["fullscreen", "preview", "save", "print"],
                    },
                    {
                      name: "indentation",
                      items: ["outdent", "indent"],
                    },
                    {
                      name: "list",
                      items: ["numlist", "bullist"],
                    },
                    {
                      name: "color",
                      items: ["forecolor", "backcolor", "removeformat"],
                    },
                    {
                      name: "emoticons",
                      items: ["charmap", "emoticons"],
                    },
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
              />

              <button className="btn-save" type="submit">
                Save
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }
}
