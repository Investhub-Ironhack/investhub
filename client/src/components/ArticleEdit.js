import React, { Component } from "react";

export default class ArticleEdit extends Component {
  state = {
    article: this.props.match.params.id,
  };

  render() {
    return <h1>Test</h1>;
  }
}
