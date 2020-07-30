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
    console.log("Content was updated:", content);
  };

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
                cols="200"
                rows="200"
                init={{
                  skin: "fabric",
                  icon: "jam",
                  plugins:
                    "print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons",
                  menubar: "file edit view insert format tools table help",
                  toolbar:
                    "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl",
                  toolbar_sticky: true,
                  image_advtab: true,
                  link_list: [
                    { title: "My page 1", value: "http://www.tinymce.com" },
                    { title: "My page 2", value: "http://www.moxiecode.com" },
                  ],
                  image_list: [
                    { title: "My page 1", value: "http://www.tinymce.com" },
                    { title: "My page 2", value: "http://www.moxiecode.com" },
                  ],
                  image_class_list: [
                    { title: "None", value: "" },
                    { title: "Some class", value: "class-name" },
                  ],
                  templates: [
                    {
                      title: "New Table",
                      description: "creates a new table",
                      content:
                        '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>',
                    },
                    {
                      title: "Starting my story",
                      description: "A cure for writers block",
                      content: "Once upon a time...",
                    },
                    {
                      title: "New list with dates",
                      description: "New List with dates",
                      content:
                        '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>',
                    },
                  ],
                  template_cdate_format:
                    "[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]",
                  template_mdate_format:
                    "[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]",
                  height: 600,
                  image_caption: true,
                  quickbars_selection_toolbar:
                    "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
                  noneditable_noneditable_class: "mceNonEditable",
                  toolbar_mode: "sliding",
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
