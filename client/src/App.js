import React, { Component } from "react";
// import './App.css';
import { Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Logout from "./services/auth";
import NewArticle from "./components/NewArticle";
import Stock from "./components/Stock";
import Navbar from "./components/Navbar";

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

        <Route exact path="/" render={() => <div>Home Page</div>} />

        <Route exact path="/article" component={NewArticle} />

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
          path="/stock"
          render={(props) => <Stock setUser={this.setUser} {...props} />}
        />
      </div>
    );
  }
}

export default App;
