import React, { Component } from "react";
import axios from "axios";

export default class ArticleEdit extends Component {
  state = {
    article: this.props.match.params.id,
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
    return <h1>{this.state.article.title}</h1>;
  }
}
