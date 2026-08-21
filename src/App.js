import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import SearchResults from './components/SearchResults';
import Library from './components/Library';


function App() {
  const [searchResults, setSearchResults] = useState([
    { id: 1, title: 'Bohemian Rhapsody', artist: 'Queen', duration: '5:55' },
    { id: 2, title: 'Imagine', artist: 'John Lennon', duration: '3:03' },
    { id: 3, title: 'Billie Jean', artist: 'Michael Jackson', duration: '4:54' }
  ]);

  //setSearchResults();

  const [library, setLibrary] = useState([]);


  const addToLibrary = (song) => {
    const exists = library.some(item => item.id === song.id);
    if (exists) {
      alert('Esta canción ya está en tu biblioteca');
      return;
    }
    setLibrary([...library, song]);
  };


  // Función para eliminar canciones de la biblioteca
  const removeFromLibrary = (songId) => {
    setLibrary(library.filter(song => song.id !== songId));
  };


  useEffect(() => {
    if (library.length === 0) {
      console.log('La biblioteca está vacía. ¡Agrega canciones!');
    } else {
      console.log(`La biblioteca tiene ${library.length} canciones: ${library.map(s => s.title).join(', ')}`);
    }
  }, [library]);


  return (
    <div className="App">
      <Header />
      <div className="container">
        <SearchResults songs={searchResults} onAdd={addToLibrary} />
        <Library songs={library} onRemove={removeFromLibrary} />
      </div>
    </div>
  );
}

export default App;