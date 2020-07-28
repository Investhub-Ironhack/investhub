import React, { Component } from "react";

class Stock extends Component {
  componentDidMount() {
    const symbolInfoScript = document.createElement("script");
    symbolInfoScript.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js";
    symbolInfoScript.innerHTML = JSON.stringify({
      symbol: "FX:EURUSD",
      width: "100%",
      locale: "en",
      colorTheme: "light",
      isTransparent: true,
    });
    document
      .getElementById("mySymbolInfoContainer")
      .appendChild(symbolInfoScript);

    const graphicscript = document.createElement("script");
    graphicscript.src = "https://s3.tradingview.com/tv.js";
    graphicscript.innerHTML = new window.TradingView.widget({
      autosize: true,
      symbol: "FX:EURUSD",
      interval: "1",
      timezone: "Europe/Berlin",
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
    document.getElementById("myGraphContainer").appendChild(graphicscript);
  }

  render() {
    return (
      <div className="stock">
        <div id="mySymbolInfoContainer"></div>
        <div id="myGraphContainer">
          <div id="technical-analysis"></div>
        </div>
      </div>
    );
  }
}
export default Stock;
