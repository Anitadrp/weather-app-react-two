import React from 'react';

export default function Forecast(props) {
  return (
    <div className='col-2'>
      <div>
        <p>{props.temperature}</p>
        <p>{props.time.slice(11, 16)}</p>
        <img src={props.icon} alt={props.description} />
      </div>
    </div>
  )
}