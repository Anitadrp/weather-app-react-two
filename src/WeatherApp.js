import React, { useState } from 'react';
import logo from './logo.svg';
import Search from './Search';
import Weather from './Weather';
import Forecast from './Forecast';
import './App.css';

export default function WeatherApp() {
  const [city, setCity] = useState('London');

  function handleSearch(city) {
    setCity(city);
  }

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <Search onSubmit={handleSearch} />
      <Weather city={city} />
      <Forecast />
      {city}
    </div>
  )
}


