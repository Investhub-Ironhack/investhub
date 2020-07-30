import React, { Component } from "react";
import "./App.css";
import { Route, Redirect } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
// import Logout from "./services/auth";
import Profile from "./components/Profile";
import NewArticle from "./components/NewArticle";
import Market from "./components/Market";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import UserPage from "./components/UserPage";
import ArticleView from "./components/ArticleView";
import ArticleEdit from "./components/ArticleEdit";
import Feed from "./components/Feed";
import LandingPage from "./components/LandingPage";
// import Article from "../../models/Article";

// import deskImage from "./images/working-desk.png";

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

        <Route
          exact
          path="/"
          render={(props) => <LandingPage user={this.state.user} />}
        />

        <Route
          exact
          path="/article"
          render={(props) => {
            if (this.state.user) {
              return <NewArticle {...props} user={this.state.user} />;
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />
        <Route
          exact
          path="/userpage/:id"
          render={(props) => <UserPage {...props} user={this.state.user} />}
        />

        <Route
          exact
          path="/article/:id"
          render={(props) => <ArticleView {...props} user={this.state.user} />}
        />

        <Route
          exact
          path="/article/edit/:id"
          render={(props) => {
            if (this.state.user) {
              return <ArticleEdit {...props} user={this.state.user} />;
            } else {
              return <Redirect to="/login" />;
            }
          }}
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
        <Route
          exact
          path="/profile"
          render={(props) => <Profile setUser={this.setUser} {...props} />}
        />
        <Route
          exact
          path="/market"
          render={(props) => <Market setUser={this.setUser} {...props} />}
        />

        <Route
          exact
          path="/feed"
          render={(props) => <Feed {...props} user={this.state.user} />}
        />

        <Footer user={this.state.user} setUser={this.setUser} />
      </div>
    );
  }
}

export default App;
