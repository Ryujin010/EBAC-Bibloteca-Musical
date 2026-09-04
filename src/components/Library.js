import React from 'react';
import Song from './Song';

import {
  LibraryContainer,
  LibraryTitle,
  EmptyMessage,
  LibraryItem,
  RemoveButton,
} from './Library/Library.styled';

function Library({ songs, onRemove }) {
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
                onClick={() => onRemove(song.id)}
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