import React from 'react';
import axios from 'axios';

export default function Info() {

  const apiKey = "3fceae23dde22994db28dbf0244f6a96";
  const forecastApi = `https://api.openweathermap.org/data/2.5/forecast?q=London&units=metric&appid=${apiKey}`;
  axios
    .get(forecastApi)
    .then(handleForecast)
    .catch(handleError);


  function handleError(error) {
    return
  }

  /*function createVariables() {
    var accounts = [];

    for (var i = 0; i <= 20; ++i) {
      accounts[i] = "whatever";
    }

    return accounts;
  } */

  function handleForecast(response) {
    let date = response.data.list[0].dt_txt.slice(0, 10);
    for (let i = 0; i < response.data.list.length; i++) {

      console.log(date);
    }
  }

  return (
    <p>Hello</p>
  )
}

