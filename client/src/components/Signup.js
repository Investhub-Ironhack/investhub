import React, { Component } from "react";
import { signup } from "../services/auth";

class Signup extends Component {
  state = {
    username: "",
    email: "",
    password: "",
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

    const { username, email, password } = this.state;

    signup(username, email, password).then((data) => {
      if (data.message) {
        this.setState({
          message: data.message,
          username: "",
          email: "",
          password: "",
        });
      } else {
        // successfully logged in
        // update the state for the parent component
        this.props.setUser(data);
        this.props.history.push("/userPage");
      }
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          name="username"
          value={this.state.username}
          onChange={this.handleChange}
          id="username"
        />

        <label htmlFor="email">E-Mail: </label>
        <input
          type="email"
          name="email"
          value={this.state.email}
          onChange={this.handleChange}
          id="email"
        />

        <label htmlFor="password">Password: </label>
        <input
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handleChange}
          id="password"
        />
        {this.state.message && <div>{this.state.message}</div>}
        <button type="submit">Login</button>
      </form>
    );
  }
}

export default Signup;