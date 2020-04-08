import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import Search from './Search';
import Weather from './Weather';
import Forecast from './Forecast';
import axios from 'axios';
import './App.css';

export default function WeatherApp() {
  const [city, setCity] = useState({ name: 'London' });
  const [weatherData, setWeatherData] = useState({});
  const [favourites, setFavourites] = useState([
    { name: 'London' },
    { name: 'Paris' },
    { name: 'Lisbon' },
    { name: 'San Francisco' },
  ]);

  function handleFavourite(favourite) {
    setCity(favourite);
  }
  function handleSearch(city) {
    setCity({ name: city });
  }

  function handleWeather(response) {
    const date = new Date(response.data.dt * 1000);
    setWeatherData({
      city: response.data.name,
      time: `${date.toLocaleDateString()} ${date
        .toLocaleTimeString()
        .slice(0, 5)}`,
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      icon: `http://openweathermap.org/img/wn/${
        response.data.weather[0].icon
        }@2x.png`
    })

  }

  useEffect(() => {
    const apiKey = "3fceae23dde22994db28dbf0244f6a96";
    const weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&units=metric&appid=${apiKey}`;

    axios
      .get(weatherApi)
      .then(handleWeather)
      .catch(handleError);

    console.log(weatherApi)
  }, [city]);

  function handleError(error) {
    alert('hello, enter city');
  }

  return (
    <div className="container">

      <div className="App">

        <ul>
          <img src={logo} className="App-logo" alt="logo" />
          {
            favourites.map(favourite => (
              <li
                key={favourite.name}
                onClick={() => handleFavourite(favourite)}
              >
                {favourite.name}
              </li>
            ))
          }
        </ul>
        <div className='row'>
          <Search onSubmit={handleSearch} /></div>
        <div className='row'>
          <Weather
            city={weatherData.city}
            time={weatherData.time}
            temperature={weatherData.temperature}
            description={weatherData.description}
            humidity={weatherData.humidity}
            wind={weatherData.wind}
            icon={weatherData.icon}
          /></div>
        <div className='row'>
          <Forecast />
        </div>
      </div>
      <p>
        Open source code on
        <a href="https://github.com/Anitadrp/weather-app-react-two"> GitHub </a>by
        Anitadrp
      </p>
    </div>
  )
}


