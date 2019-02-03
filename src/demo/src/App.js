import React, { Component } from "react";
import JSLive from "react-js-live";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <JSLive id="test" />
      </div>
    );
  }
}

export default App;
