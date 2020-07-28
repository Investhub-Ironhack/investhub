import React, { Component } from "react";

class Stock extends Component {
  componentDidMount() {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.innerHTML = new window.TradingView.widget({
      autosize: true,
      symbol: "NASDAQ:AAPL",
      interval: "5",
      timezone: "exchange",
      theme: "light",
      style: "1",
      locale: "en",
      toolbar_bg: "#f1f3f6",
      enable_publishing: false,
      withdateranges: true,
      hide_side_toolbar: false,
      allow_symbol_change: true,
      show_popup_button: true,
      popup_width: "1000",
      popup_height: "650",
      container_id: "technical-analysis",
    });
    document.getElementById("myContainer").appendChild(script);
  }

  render() {
    return (
      <>
        <div id="myContainer">
          <div className="tradingview-widget-container">
            <div id="technical-analysis"></div>
            <div className="tradingview-widget-copyright">
              <a
                href="https://br.tradingview.com/symbols/AAPL/"
                rel="noopener noreferrer"
                target="_blank"
              ></a>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Stock;
