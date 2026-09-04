import React from 'react';
import { Link } from 'react-router-dom';
import Song from './Song';

import {
  ResultsContainer,
  ResultsTitle,
  EmptyMessage,
  SongItem,
  SongLink,
  AddButton,
} from './SearchResults/SearchResults.styled';


function SearchResults({ songs, onAdd }) {
  const isInLibrary = false;

  return (
    <ResultsContainer>
      <ResultsTitle>Resultados de búsqueda</ResultsTitle>
      {songs.length === 0 ? (
        <EmptyMessage>No hay canciones para mostrar. Realiza una búsqueda.</EmptyMessage>
      ) : (
        <div className="song-list">
          {songs.map((song) => (
            <SongItem key={song.id}>
              <SongLink as={Link} to={`/song/${song.id}`}>
                <Song
                  title={song.title}
                  artist={song.artist}
                  duration={song.duration}
                  thumb={song.thumb}
                />
              </SongLink>
              <AddButton
                $primary={isInLibrary}     // Cambia el color según si la canción está en la biblioteca
                onClick={() => onAdd(song)}
              >
                {isInLibrary ? 'Eliminar de mi Biblioteca' : 'Agregar a mi Biblioteca'}
              </AddButton>
            </SongItem>
          ))}
        </div>
      )}
    </ResultsContainer>
  );
}

export default SearchResults;