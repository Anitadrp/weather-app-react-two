import React from 'react';

export default function Forecast(props) {
  return (
    <div>
      <div>
        <p>{props.temperature}</p>
        <p>{props.time}</p>
        <img src={props.icon} alt={props.description} />
      </div>
    </div>
  )
}