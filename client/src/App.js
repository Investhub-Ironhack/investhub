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
          <p class="footer-social">Connect with us</p>
          <div class="footer-social-logos"></div>

          <p class="footer-copyright">
            2020© All Rights Reserved. Made in Berlin
          </p>
        </div>
      </div>
    );
  }
}

export default App;
