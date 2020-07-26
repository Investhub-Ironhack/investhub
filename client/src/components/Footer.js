import React, { Component } from "react";
import { Link } from "react-router-dom";
import investhubLogo from "../images/investhub-logo.png";
import githubLogo from "../images/foundation_social-github.png";
import linkedinLogo from "../images/foundation_social-linkedin.png";
import instagramLogo from "../images/typcn_social-instagram.png";
import facebookLogo from "../images/foundation_social-facebook.png";

class Footer extends Component {
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
    );
  }
}

export default Footer;
