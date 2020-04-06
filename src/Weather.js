import React from 'react';

export default function Weather(props) {

  return (
    <div>
      <div>
        <h1>{props.city}</h1>
        <p>date</p>
      </div>
    </div>
  )
}