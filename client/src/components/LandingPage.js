import React, { Component } from "react";

import manImage from "../images/walking-man.png";
// import arrowRight from "../images/arrow-right.png";

// import deskImage from "./images/working-desk.png";

class LandingPage extends Component {
  state = {
    user: this.props.user,
  };

  render() {
    return (
      <section className="main-content">
        <div className="hero-text">
          <h1 className="hero-title">Investing Made Easy</h1>
          <p className="text-hero-index">
            We have everything about Investing, Financial analysis & stocks in
            one place for you.
          </p>
          <a className="btn-primary" href="/auth/login">
            Enter the Platform
          </a>
          <div className="btn-group">
            <a className="btn-linked" href="/auth/signup">
              Not a Member yet?
              {/* <img
                class="img-index"
                src={arrowRight}
                alt="arrow pointing to the right"
              /> */}
            </a>
            {/* <img class="btn-icon" src={deskImage} alt="" /> */}
          </div>
        </div>
        <div className="index-ilustration">
          <img className="img-index" src={manImage} alt="" />
        </div>
      </section>
    );
  }
}

export default LandingPage;
