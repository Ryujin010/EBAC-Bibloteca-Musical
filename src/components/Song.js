import React from 'react';
import './Song/styles.css';

function Song({ title, artist, duration, onAdd }) {
  return (
    <div className="song-item">
      <div className="song-info">
        <span className="song-title">{title}</span>
        <span className="song-artist">- {artist}</span>
        <span className="song-duration">⏱ {duration}</span>
      </div>
      {onAdd && (
        <div className="song-actions">
          <button className="add-button" onClick={onAdd}>
            ➕ Agregar
          </button>
        </div>
      )}
    </div>
  );
}

export default Song;