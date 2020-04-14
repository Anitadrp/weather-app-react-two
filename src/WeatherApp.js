import React, { useState, useEffect } from 'react';
import Search from './Search';
import Weather from './Weather';
import Forecast from './Forecast';
import axios from 'axios';
import './App.css';

export default function WeatherApp() {
  const [city, setCity] = useState({ name: 'London' });
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [isMetric, setIsMetric] = useState(true);
  const [forecastDaily, setForecastDaily] = useState(true);
  const [favourites] = useState([
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

  function handleCurrentLocationClick() {
    navigator.geolocation.getCurrentPosition(currentPositionCoords);
  }

  function currentPositionCoords(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setCity({ latitude, longitude });
  }

  function handleToggleIsMetric() {
    setIsMetric(!isMetric);
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
      realFeel: response.data.main.feels_like,
      wind: response.data.wind.speed,
      icon: `http://openweathermap.org/img/wn/${
        response.data.weather[0].icon
        }@2x.png`
    })
  }

  function handleForecast(response) {
    setForecastData(response.data.list);
  }

  function onToggleForecast(event) {
    event.preventDefault();
    setForecastDaily(!forecastDaily);
  }

  useEffect(() => {
    const apiKey = "3fceae23dde22994db28dbf0244f6a96";
    if (city.name) {
      const weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&units=metric&appid=${apiKey}`;
      const forecastApi = `https://api.openweathermap.org/data/2.5/forecast?q=${city.name}&units=metric&appid=${apiKey}`;

      axios
        .get(weatherApi)
        .then(handleWeather)
        .catch(handleError);
      axios
        .get(forecastApi)
        .then(handleForecast)
        .catch(handleError);
    } else {
      const weatherCityCoordinates = `https://api.openweathermap.org/data/2.5/weather?lat=${city.latitude}&lon=${city.longitude}&units=metric&appid=${apiKey}`;
      const forecastCityCoordinates = `https://api.openweathermap.org/data/2.5/forecast?lat=${city.latitude}&lon=${city.longitude}&units=metric&appid=${apiKey}`;
      axios
        .get(weatherCityCoordinates)
        .then(handleWeather)
        .catch(handleError);

      axios
        .get(forecastCityCoordinates)
        .then(handleForecast)
        .catch(handleError);
    }
  }, [city]);

  function handleError() {
    alert('hello, enter city');
  }

  return (
    <>
      <div className='favourites'>
        <ul>
          {
            favourites.map(favourite => (
              <li
                key={favourite.name}
                onClick={() => handleFavourite(favourite)}>
                <i className="far fa-star"></i>{' '}{favourite.name}
              </li>
            ))
          }
        </ul>
      </div>
      <div className='container display'>
        <div className='row'>
          <Search
            onSubmit={handleSearch}
            onCurrentLocationClick={handleCurrentLocationClick} />
        </div>
        <div className='row weather'>
          {
            weatherData && (
              <Weather
                isMetric={isMetric}
                onToggleIsMetric={handleToggleIsMetric}
                city={weatherData.city}
                time={weatherData.time}
                temperature={weatherData.temperature}
                description={weatherData.description}
                humidity={weatherData.humidity}
                realFeel={weatherData.realFeel}
                wind={weatherData.wind}
                icon={weatherData.icon}
              />
            )
          }
        </div>
        <button className='forecastButton'
          onClick={onToggleForecast}>{forecastDaily ? 'View Hourly' : 'View Daily'}</button>
        <div className='row forecast'>
          <Forecast
            data={forecastData}
            isDaily={forecastDaily}
            isMetric={isMetric} />
        </div>
      </div>
      <div className='footNote'>
        Open source code on
        <a href="https://github.com/Anitadrp/weather-app-react-two" target='_blank'> GitHub </a>by
        Anitadrp
      </div>
    </>
  );
}
