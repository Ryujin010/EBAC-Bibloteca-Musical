import React from 'react';
import './Library/styles.css';

function Library({ songs, onRemove }) {
  return (
    <div className="library">
      <h2>📚 Mi Biblioteca ({songs.length})</h2>
      {songs.length === 0 ? (
        <p className="empty-message">No hay canciones en tu biblioteca aún.</p>
      ) : (
        songs.map(song => (
          <div key={song.id} className="song-item">
            <div className="song-info">
              <h3>{song.title}</h3>
              <p>{song.artist}</p>
              <span>Duración: {song.duration}</span>
            </div>
            <button className="remove-btn" onClick={() => onRemove(song.id)}>
              ❌ Eliminar
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Library;