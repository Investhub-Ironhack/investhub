import React, { Component } from "react";

class Stock extends Component {
  componentDidMount() {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.innerHTML = new window.TradingView.widget({
      container_id: "technical-analysis",
      width: 998,
      height: 610,
      symbol: "AAPL",
      interval: "D",
      timezone: "exchange",
      theme: "light",
      style: "1",
      toolbar_bg: "#f1f3f6",
      withdateranges: true,
      hide_side_toolbar: false,
      allow_symbol_change: true,
      save_image: false,
      studies: [
        "ROC@tv-basicstudies",
        "StochasticRSI@tv-basicstudies",
        "MASimple@tv-basicstudies",
      ],
      show_popup_button: true,
      popup_width: "1000",
      popup_height: "650",
      locale: "br",
    });
    document.getElementById("myContainer").appendChild(script);
  }

  render() {
    return (
      <div id="myContainer">
        <div className="tradingview-widget-container">
          <div id="technical-analysis"></div>
          <div className="tradingview-widget-copyright">
            <a
              href="https://br.tradingview.com/symbols/AAPL/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="blue-text">Gráfico AAPL</span>
            </a>{" "}
            por TradingView
          </div>
        </div>
      </div>
    );
  }
}
export default Stock;
