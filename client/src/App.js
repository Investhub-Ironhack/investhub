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
import Footer from "./components/Footer";
import UserPage from "./components/UserPage";

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
          path="/userpage/:id"
          render={(props) => <UserPage {...props} user={this.state.user} />}
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
          path="/stock"
          render={(props) => <Stock setUser={this.setUser} {...props} />}
        />
        <Footer user={this.state.user} setUser={this.setUser} />
      </div>
    );
  }
}

export default App;
