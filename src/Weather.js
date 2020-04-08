import React from 'react';

export default function Weather(props) {

  return (
    <>
      <div className='col'>
        <h1>{props.city}</h1>
        <p>{props.time}</p>
        <p>{props.description}</p>
      </div>
      <div className='row'>
        <div className='col-6'>
          <img src={props.icon} alt={props.description} />
          {props.temperature}
        </div>
        <div className='col-6'>
          <p>humidity: {props.humidity} %</p>
          <p>wind speed: {props.wind} m/s</p>
        </div>
      </div>
    </>
  )
}