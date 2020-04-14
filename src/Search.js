import React, { useState } from 'react';

export default function Search(props) {
  const [search, setSearch] = useState('')

  function handleSubmit(event) {
    event.preventDefault();
    props.onSubmit(search);
  }

  function handleSearch(event) {
    event.preventDefault();
    setSearch(event.target.value);
  }

  function currentLocation(event) {
    event.preventDefault();
    props.onCurrentLocationClick();
  }

  return (
    <div className='search'>
      <form onSubmit={handleSubmit}>
        <input className='formStyle' onChange={handleSearch} value={search} type='text' placeholder='type a city..'></input>
        <input className='formStyle' type='submit' value='Search'></input>
        <input className='formStyle' onClick={currentLocation} type='submit' value='Location'></input>
      </form>
    </div>
  )
}
