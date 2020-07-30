import React, { Component } from "react";
import axios from "axios";
import { forkArticle } from "../services/articles";
import { Redirect } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";

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

    if (this.props.user) {
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
    } else {
      return this.props.history.push("/login");
    }
  };

  componentDidMount() {
    axios
      .get(`/api/articles/findonearticle/${this.props.match.params.id}`)
      .then((response) => {
        this.setState({
          displayContent: response.data.content,
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
        <div className="feed">
          <div className="article-head">
            <h1 classname="fork-title">{this.state.article.title}</h1>
            <h2 className="category">{this.state.article.category}</h2>
            <button className="fork-button" onClick={this.handleFork}>
              Fork {console.log(this.state.displayContent)}
            </button>
          </div>
          <div>
            <div
              className="article-container"
              dangerouslySetInnerHTML={{ __html: this.state.displayContent }}
            />
            {/* <Editor
              className="input-text"
              type="text"
              name="content"
              value={this.state.article.content}
              id="content"
              placeholder="Your Article:"
              cols="10"
              rows="20"
              init={{
                skin: "fabric",
                icon: "jam",
                height: 600,
                readonly: true,
              }}
            /> */}
          </div>
          <button className="fork-button" onClick={this.handleFork}>
            Fork
          </button>
        </div>
      </>
    );
  }
}
