import React from 'react';
import logo from './logo.svg';
import Search from './Search';
import Weather from './Weather';
import Forecast from './Forecast';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Search />
        <Weather />
        <Forecast />
      </header>
    </div>
  );
}

export default App;
