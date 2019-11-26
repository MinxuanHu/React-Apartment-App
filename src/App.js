import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import RouteMap from './router/index.jsx'

// git project https://github.com/erikflowers/weather-icons
import "weather-icons/css/weather-icons.css";
class App extends React.Component {
  render() {
    return (
      <div id="App">
          <RouteMap/>
      </div>
    )
  }
}

export default App;
