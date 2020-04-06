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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input onChange={handleSearch} value={search} type='text' placeholder='type a city'></input>
        <input type='submit' value='Search'></input>
      </form>
    </div>
  )
}