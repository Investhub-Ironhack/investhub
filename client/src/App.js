import React, { Component } from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
// import Logout from "./services/auth";
import Profile from "./components/Profile";
import NewArticle from "./components/NewArticle";
import Stock from "./components/Stock";
import Navbar from "./components/Navbar";
import UserPage from "./components/UserPage";
import githubLogo from "./images/foundation_social-github.png";
import linkedinLogo from "./images/foundation_social-linkedin.png";
import instagramLogo from "./images/typcn_social-instagram.png";
import facebookLogo from "./images/foundation_social-facebook.png";
import investhubLogo from "./images/investhub-logo.png";

class App extends Component {
  state = {
    user: this.props.user,
  };

  setUser = (user) => {
    this.setState({
      user: user,
    });
  };

  render() {
    return (
      <div className="App">
        <nav class="navbar">
          <div class="container">
            <img
              className="navbar-logo"
              src={investhubLogo}
              alt="Investhub's Logo"
            />

            <div class="menu">
              <a class="btn" href="/vacancies">
                Dashboard
              </a>
              <a class="btn btn-secundary" href="/auth/logout">
                Logout
              </a>
            </div>

            <div class="menu">
              <a class="btn" href="/auth/login">
                Login
              </a>
              <a class="btn btn-secundary" href="/auth/signup">
                Sign Up
              </a>
            </div>
          </div>
        </nav>
        <Navbar user={this.state.user} setUser={this.setUser} />

        <Route exact path="/" render={() => <h1>Home Page</h1>} />

        <Route
          exact
          path="/article"
          render={(props) => <NewArticle user={this.state.user} />}
        />

        <Route
          exact
          path="/userpage"
          render={(props) => <UserPage user={this.state.user} />}
        />

        <Route
          exact
          path="/signup"
          render={(props) => <Signup setUser={this.setUser} {...props} />}
        />

        <Route
          exact
          path="/login"
          render={(props) => <Login setUser={this.setUser} {...props} />}
        />

        {/*     <Route
          exact
          path="/linkedin"
          render={(props) => <Signup setUser={this.setUser} {...props} />}
        /> */}

        <Route
          exact
          path="/profile"
          render={(props) => <Profile setUser={this.setUser} {...props} />}
          path="/stock"
          render={(props) => <Stock setUser={this.setUser} {...props} />}
        />

        <div className="footer">
          <img
            className="footer-logo"
            src={investhubLogo}
            alt="Investhub's Logo"
          />
          <p class="footer-social">Connect with us</p>
          <div class="footer-social-logos">
            <a href="http://github.com/">
              <img
                className="social-logo"
                src={githubLogo}
                alt="Linkedin's Logo"
              />
            </a>

            <a href="https://www.instagram.com/">
              <img
                className="social-logo"
                src={instagramLogo}
                alt="Linkedin's Logo"
              />
            </a>

            <a href="http://facebook.com/">
              <img
                className="social-logo"
                src={facebookLogo}
                alt="Facebook's Logo"
              />
            </a>

            <a href="http://linkedin.com/">
              <img
                className="social-logo"
                src={linkedinLogo}
                alt="Linkedin's Logo"
              />
            </a>
          </div>

          <p class="footer-copyright">
            2020 © All Rights Reserved. Made in Berlin
          </p>
        </div>
      </div>
    );
  }
}

export default App;
