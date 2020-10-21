import React, { Component } from "react";
import { Link } from "react-router-dom";
import { logout } from "../services/auth";
import investhubLogo from "../images/investhub-logo.png";

const handleLogout = (props) => {
  logout().then(() => {
    props.setUser(null);
  });
};

class Navbar extends Component {
  componentDidMount() {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        {
          proName: "FOREXCOM:SPXUSD",
          title: "S&P 500",
        },
        {
          proName: "FOREXCOM:NSXUSD",
          title: "Nasdaq 1000",
        },
        {
          proName: "FX_IDC:EURUSD",
          title: "EUR/USD",
        },
        {
          proName: "BITSTAMP:BTCUSD",
          title: "BTC/USD",
        },
        {
          proName: "BITSTAMP:ETHUSD",
          title: "ETH/USD",
        },
      ],
      colorTheme: "dark",
      isTransparent: false,
      displayMode: "adaptive",
      locale: "en",
    });
    document.getElementById("tradingview-widget-container").appendChild(script);
  }
  render() {
    return (
      <>
        <div id="tradingview-widget-container">
          <div className="tradingview-widget-container__widget"></div>
        </div>

        <nav className="navbar">
          <div className="container">
            <Link href="/">
              <img
                className="navbar-logo"
                src={investhubLogo}
                alt="Investhub's Logo"
              />
            </Link>

            <Link className="btn" to="/feed">
              Feed
            </Link>

            <Link className="btn" to="/article">
              Articles
            </Link>
            <Link className="btn" to="/market">
              Markets
            </Link>

            {!this.props.user && (
              <>
                <Link className="btn" to="/login">
                  Login
                </Link>

                <Link className="btn" to="/signup">
                  Signup
                </Link>
              </>
            )}
            {this.props.user && (
              <Link
                className="btn btn-secundary"
                to="/"
                onClick={() => handleLogout(this.props)}
              >
                Logout
              </Link>
            )}
          </div>
        </nav>
      </>
    );
  }
}

export default Navbar;
