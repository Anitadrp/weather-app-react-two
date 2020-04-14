import React from 'react';

export default function ForecastHourly(props) {
  let temperature = Math.round(props.temperature);
  if (!props.isMetric) {
    temperature = Math.round((temperature * 9) / 5 + 32);
  }

  return (
    <div className='col-2'>
      <div>
        <p>{props.time}</p>
        <img src={props.icon} alt={props.description} />
        <p><span className='largeValue'>{temperature}</span> {props.isMetric ? "˚C" : "˚F"}</p>
      </div>
    </div>
  )
}