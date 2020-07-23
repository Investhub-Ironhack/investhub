import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Redirect } from "react-router-dom";
import Article from "./components/Article";

class App extends Component {
  state = {};

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Route exact path="/article" component={Article} />
        </header>
      </div>
    );
  }
}

export default App;
