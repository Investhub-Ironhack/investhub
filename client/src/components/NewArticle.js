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
    this.setState({content: content})
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
              <option value="markets">Markets</option>
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
                plugins: 'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
                menubar: 'file edit view insert format tools table help',
                toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
                toolbar_sticky: true,
                image_advtab: true,
                link_list: [
                  { title: 'My page 1', value: 'http://www.tinymce.com' },
                  { title: 'My page 2', value: 'http://www.moxiecode.com' }
                ],
                image_list: [
                  { title: 'My page 1', value: 'http://www.tinymce.com' },
                  { title: 'My page 2', value: 'http://www.moxiecode.com' }
                ],
                image_class_list: [
                  { title: 'None', value: '' },
                  { title: 'Some class', value: 'class-name' }
                ],
                templates: [
                  { title: 'New Table', description: 'creates a new table', content: '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>' },
                  { title: 'Starting my story', description: 'A cure for writers block', content: 'Once upon a time...' },
                  { title: 'New list with dates', description: 'New List with dates', content: '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>' }
                ],
                template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
                template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
                height: 600,
                image_caption: true,
                quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
                noneditable_noneditable_class: "mceNonEditable",
                toolbar_mode: 'sliding',
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
