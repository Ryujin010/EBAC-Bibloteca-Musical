import React from 'react';
import './Song/styles.css';

function Song({ title, artist, duration, thumb }) {
  return (
    <div className="song">
      {thumb && (
        <img
          src={thumb}
          alt={`Portada de ${title}`}
          className="song-thumb"
        />
      )}
      <div className="song-info">
        <h3>{title}</h3>
        <p>{artist}</p>
        <span>{duration}</span>
      </div>
    </div>
  );
}

export default Song;