import React from 'react';
import './Library/styles.css';
import Song from './Song';


function Library({ songs, onRemove }) {
  return (
    <div className="library">
      <h2>📚 Mi Biblioteca ({songs.length})</h2>
      {songs.length === 0 ? (
        <p>No hay canciones en tu biblioteca aún.</p>
      ) : (
        <div className="song-list">
          {songs.map((song) => (
            <div key={song.id} className="song-item">
              <Song
                title={song.title}
                artist={song.artist}
                duration={song.duration}
                thumb={song.thumb}
              />
              <button
                className="remove-btn"
                onClick={() => onRemove(song.id)}
              >
                ❌ Eliminar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Library;