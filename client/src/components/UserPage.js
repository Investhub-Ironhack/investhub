import React, { Component } from "react";

export default class UserPage extends Component {
  render() {
    console.log(this.props);
    return (
      <>
        <h1>{this.props.user.username}</h1>
        <img src={this.props.user.avatarUrl} />
      </>
    );
  }
}
