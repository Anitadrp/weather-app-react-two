import React from 'react';

export default function Weather(props) {
  let temperature = Math.round(props.temperature);
  let realFeel = Math.round(props.realFeel);
  let wind = props.wind;
  if (!props.isMetric) {
    temperature = Math.round((temperature * 9) / 5 + 32);
    wind = Math.round(wind * 2.237);
    realFeel = Math.round((realFeel * 9) / 5 + 32);
  }


  return (
    <>
      <div className='col city'>
        <h1>{props.city}</h1>
        <p>{props.time}</p>
        <p>{props.description}</p>
      </div>
      <div className='col temperature'>
        <img src={props.icon} alt={props.description} />
        {temperature} {props.isMetric ? "˚C" : "˚F"}
        <span>
          <button
            className="temperatureButton"
            onClick={props.onToggleIsMetric}
          >
            {props.isMetric ? "˚F" : "˚C"}
          </button>{" "}
        </span>
      </div>
      <div className='col data'>
        <p>humidity: <span className='largeValue'>{props.humidity}</span> %</p>
        <p>wind speed: <span className='largeValue'>{wind}</span> {props.isMetric ? "m/s" : "mph"}</p>
        <p>feels like: <span className='largeValue'>{realFeel}</span> {props.isMetric ? "˚C" : "˚F"}</p>
      </div>
    </>
  )
}