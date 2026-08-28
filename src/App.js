import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Library from './components/Library';
import SongDetail from './components/SongDetail';
import useFetch from './hooks/useFetch';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [library, setLibrary] = useState([]);

  // URL usando el proxy local
  const apiUrl = searchTerm
    ? `/searchalbum.php?s=${encodeURIComponent(searchTerm)}`
    : '';

  console.log('🔍 URL (proxy local):', apiUrl);

  const { data, loading, error, refetch } = useFetch(apiUrl);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (data && data.album) {
      const albums = data.album.map(album => ({
        id: album.idAlbum,
        title: album.strAlbum,
        artist: album.strArtist,
        duration: album.strReleaseDate ? album.strReleaseDate.substring(0, 4) : 'N/A',
        albumId: album.idAlbum
      }));
      setSearchResults(albums);
    } else {
      setSearchResults([]);
    }
  }, [data]);

  const addToLibrary = (song) => {
    const exists = library.some(item => item.id === song.id);
    if (exists) {
      alert('Esta canción ya está en tu biblioteca');
      return;
    }
    setLibrary([...library, song]);
  };

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

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleRetry = () => {
    refetch();
  };

  return (
    <div className="App">
      <Header />
      <div className="container">
        <SearchBar onSearch={handleSearch} />

        <Routes>
          <Route 
            path="/" 
            element={
              <>
                {loading && <p className="message">Cargando canciones...</p>}
                {error && (
                  <div className="message error">
                    <p>Hubo un problema al cargar los datos: {error}</p>
                    <button onClick={handleRetry} className="retry-button">Reintentar</button>
                  </div>
                )}
                {!loading && !error && (
                  <>
                    <SearchResults 
                      songs={searchResults} 
                      onAdd={addToLibrary} 
                    />
                    <Library 
                      songs={library} 
                      onRemove={removeFromLibrary} 
                    />
                  </>
                )}
              </>
            } 
          />
          <Route path="/song/:id" element={<SongDetail />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;