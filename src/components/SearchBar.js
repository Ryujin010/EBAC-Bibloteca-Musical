import React, { useState } from 'react';
import './SearchBar/styles.css';

function SearchBar({ onSearch }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        placeholder="Buscar artista (ej. Coldplay)"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit">Buscar</button>
    </form>
  );
}

export default SearchBar;