import React, { Component } from "react";
import { login } from "../services/auth";
import githubLogoColor from "../images/github_color.png";
import linkedinLogoColor from "../images/linkedin_color.png";

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
        this.props.history.push(`/userPage/${data._id}`);
      }
    });
  };

  render() {
    return (
      <>
        <div className="login-page">
          <div>
            <form className="login-form" onSubmit={this.handleSubmit}>
              <h1>Welcome Back!</h1>
              <label htmlFor="username">Username: </label>
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
                id="username"
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

              <p className="message">
                Don't have an account?{" "}
                <a href="/signup">
                  <u>Sign up!</u>
                </a>
              </p>
            </form>
          </div>

          <div className="social-signin">
            <p>Or log in with your social account</p>
            <div>
              <img
                className="social-logo"
                src={linkedinLogoColor}
                alt="Linkedin's Logo"
              />
              <a href="/api/auth/linkedin">
                Login via LinkedIn
              </a>
            </div>

            <div>
              <img
                className="social-logo"
                src={githubLogoColor}
                alt="Linkedin's Logo"
              />
              <a href="/api/auth/github">
                Login via Github
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Login;

// <div class="login-page">
//   <div>
//     <form class="login-form" action="/auth/login" method="POST">
//       <h2>Welcome back!</h2>
//       <input type="text" name="username" placeholder="Username" required /><br>
//       <input type="password" name="password" placeholder="Password" required /><br>
//       <button>Login</button>
//       {{#if errorMessage}}
//       <div class="error-message">{{errorMessage}}</div>
//       {{/if}}
//       <p class="message">Don't have an account? <a href="/auth/signup"><u>Sign up!</u></a></p>
//     </form>
//   </div>
//   <div class="social-signin">
//     <p>or log in with your social account.</p>
//     <div>
//       <a href="/auth/github">
//         <img src="/images/github_color.png" alt="public/images/github_color.png">
//       </a>
//       <a href="/auth/github">Login via Github</a>
//     </div>
//     <div>
//       <a href="/auth/linkedin">
//         <img src="/images/linkedIn_color.png" alt="public/images/linkedIn_color.png">
//       </a>
//       <a href="/auth/linkedin">Login via LinkedIn</a>
//     </div>
//     <div>
//       <a href="/auth/google">
//         <img src="/images/google_color.png" alt="public/images/google_color.png">
//       </a>
//       <a href="/auth/google">Login via Google</a>
//     </div>
//     <div>
//       <a href="/auth/xing">
//         <img src="/images/xing_color.png" alt="public/images/xing_color.png">
//       </a>
//       <a href="/auth/xing">Login via Xing</a>
//     </div>
//   </div>
// </div>
