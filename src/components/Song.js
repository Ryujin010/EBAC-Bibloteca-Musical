import React from 'react';
import { SongContainer, SongTitle, SongArtist, SongDuration } from './Song/Song.styled';

function Song({ title, artist, duration, thumb }) {
  return (
    <SongContainer>
      {thumb && (
        <img
          src={thumb}
          alt={`Portada de ${title}`}
          className="song-thumb"
        />
      )}
      <div className="song-info">
        <SongTitle>{title}</SongTitle>
        <SongArtist>{artist}</SongArtist>
        <SongDuration>{duration}</SongDuration>
      </div>
    </SongContainer>
  );
}

export default Song;