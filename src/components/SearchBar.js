import React, { useState } from 'react';
import { Form, Input, Button } from './SearchBar/SearchBar.styled';


function SearchBar({ onSearch }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue.trim());
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="search-bar">
      <Input
        type="text"
        placeholder="Buscar artista (ej. Coldplay)"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button type="submit">Buscar</Button>
    </Form>
  );
}

export default SearchBar;