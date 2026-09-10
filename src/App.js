import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Library from './components/Library';
import SongDetail from './components/SongDetail';
import useFetch from './hooks/useFetch';

import {
  AppContainer,
  ContentContainer,
  Message,
  ErrorMessage,
  RetryButton,
} from './components/App.styled';


function App() {
  const [searchTerm, setSearchTerm] = useState('');

  // URL usando el proxy local
  const apiUrl = searchTerm
    ? `/searchalbum.php?s=${encodeURIComponent(searchTerm)}`
    : '';

  const { data, loading, error, refetch } = useFetch(apiUrl);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (data && data.album) {
      const albums = data.album.map((album) => ({
        id: album.idAlbum,
        title: album.strAlbum,
        artist: album.strArtist,
        album: album.strAlbum,
        //thumb: album.strAlbumThumb,
        duration: album.strReleaseDate ? album.strReleaseDate.substring(0, 4) : 'N/A',
        albumId: album.idAlbum
      }));
      setSearchResults(albums);
    } else {
      setSearchResults([]);
    }
  }, [data]);

  
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleRetry = () => {
    refetch();
  };

  return (
    <AppContainer className="App">
      <Header />
      <ContentContainer>
        <SearchBar onSearch={handleSearch} />

        <Routes>
          <Route 
            path="/" 
            element={
              <>
                {loading && <Message>Cargando canciones...</Message>}
                {error && (
                  <ErrorMessage>
                    <p>Hubo un problema al cargar los datos: {error}</p>
                    <RetryButton onClick={handleRetry}>Reintentar</RetryButton>
                  </ErrorMessage>
                )}
                {!loading && !error && (
                  <>
                    <SearchResults songs={searchResults} />
                    <Library />
                  </>
                )}
              </>
            } 
          />
          <Route path="/song/:id" element={<SongDetail />} />
        </Routes>
      </ContentContainer>
    </AppContainer>
  );
}

export default App;