import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Library from './components/Library';
import SongDetail from './components/SongDetail';
import { fetchSongs } from './redux/slices/searchSlice';

import {
  AppContainer,
  ContentContainer,
  Message,
  ErrorMessage,
  RetryButton,
} from './components/App.styled';


function App() {
  const dispatch = useDispatch();
  const { loading, error, lastTerm } = useSelector((state) => state.search);

  const handleRetry = () => {

    if (lastTerm) {
      dispatch(fetchSongs(lastTerm));
    }
  };

  return (
    <AppContainer className="App">
      <Header />
      <ContentContainer>
        
        <SearchBar />

        <Routes>
          <Route 
            path="/" 
            element={
              <>
                {loading && <Message $loading>Cargando canciones...</Message>}
                {error && (
                  <ErrorMessage>
                    <p>Hubo un problema al cargar los datos: {error}</p>
                    <RetryButton onClick={handleRetry}>Reintentar</RetryButton>
                  </ErrorMessage>
                )}
                {!loading && !error && (
                  <>
                    <SearchResults />
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