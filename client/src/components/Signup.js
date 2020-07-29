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
        console.log("woooorking");
        this.props.setUser(data);
        this.props.history.push(`/userPage/${data._id}`);
      }
    });
  };

  render() {
    return (
      <>
        <div className="signin-page">
          <form className="signin-form" onSubmit={this.handleSubmit}>
            <h1>Sign Up</h1>
            <h3>Create your free account!</h3>
            <label htmlFor="username">Username: </label>
            <input
              className="input-text"
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
              id="username"
            />

            <label htmlFor="email">E-Mail: </label>
            <input
              className="input-text"
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              id="email"
            />

            <label htmlFor="password">Password: </label>
            <input
              className="input-text"
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              id="password"
            />
            {this.state.message && <div>{this.state.message}</div>}
            <button type="submit">Sign Up</button>
          </form>
          <p className="message">
            Already have an account?{" "}
            <a href="/login">
              <u>Log in!</u>
            </a>
          </p>
        </div>
      </>
    );
  }
}

export default Signup;
