import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchSongs, resetResults } from '../redux/slices/searchSlice';
import { Form, Input, Button } from './SearchBar/SearchBar.styled';


function SearchBar({ onSearch }) {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const term = inputValue.trim();

    if (term) {
      dispatch(fetchSongs(term));
    } else {
      dispatch(resetResults);
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