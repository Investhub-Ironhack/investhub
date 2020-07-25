import React, { Component, Form, Button, Alert } from "react";
import { login } from "../services/auth";

class Login extends Component {
  state = {
    username: "",
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

    const { username, password } = this.state;

    login(username, password).then((data) => {
      if (data.message) {
        this.setState({
          message: data.message,
          username: "",
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
      <>
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
            id="username"
          />

          <div>
            <a href="/auth/linkedin"></a>
            <a href="http://localhost:5555/api/auth/linkedin">
              Login via LinkedIn
            </a>
          </div>

          <div>
            <a href="/auth/github"></a>
            <a href="http://localhost:5555/api/auth/github">
              Login via Github
            </a>
          </div>

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
      </>
    );
  }
}

export default Login;
