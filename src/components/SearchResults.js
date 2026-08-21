import React from 'react';
import Song from './Song';
import './SearchResults/styles.css';

function SearchResults({ songs, onAdd }) {
  return (
    <div className="search-results">
      <h2>🔍 Resultados de búsqueda</h2>
      <div className="results-list">
        {songs.length === 0 ? (
          <p className="empty-message">No hay canciones para mostrar</p>
        ) : (
          songs.map(song => (
            <Song
              key={song.id}
              title={song.title}
              artist={song.artist}
              duration={song.duration}
              onAdd={() => onAdd(song)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default SearchResults;