import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addSong } from '../redux/slices/librarySlice';
import Song from './Song';

import {
  ResultsContainer,
  ResultsTitle,
  EmptyMessage,
  SongItem,
  SongLink,
  AddButton,
} from './SearchResults/SearchResults.styled';


function SearchResults() {
  const dispach = useDispatch();
  const songs = useSelector((state) => state.search.results);

  const handleAdd = (song) => {
    dispach(addSong(song));
  }

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
              <AddButton onClick={() => handleAdd(song)}>             
                Agregar a mi Biblioteca
              </AddButton>
            </SongItem>
          ))}
        </div>
      )}
    </ResultsContainer>
  );
}

export default SearchResults;