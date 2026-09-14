import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeSong } from '../redux/slices/librarySlice';
import Song from './Song';

import {
  LibraryContainer,
  LibraryTitle,
  EmptyMessage,
  LibraryItem,
  RemoveButton,
} from './Library/Library.styled';


function Library() {

  const songs = useSelector((state) => state.library);
  const dispatch = useDispatch();

  const handleRemove = (songId) => {
    dispatch(removeSong(songId));
  };

  
  return (
    <LibraryContainer>
      <LibraryTitle>📚 Mi Biblioteca ({songs.length})</LibraryTitle>
      {songs.length === 0 ? (
        <EmptyMessage>No hay canciones en tu biblioteca aún.</EmptyMessage>
      ) : (
        <div className="song-list">
          {songs.map((song) => (
            <LibraryItem key={song.id}>
              <Song
                title={song.title}
                artist={song.artist}
                duration={song.duration}
                thumb={song.thumb}
              />
              <RemoveButton
                $danger={true}
                onClick={() => handleRemove(song.id)}
              >
                ❌ Eliminar
              </RemoveButton>
            </LibraryItem>
          ))}
        </div>
      )}
    </LibraryContainer>
  );
}

export default Library;