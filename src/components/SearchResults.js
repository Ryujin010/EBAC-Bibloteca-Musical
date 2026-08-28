import React from 'react';
import { Link } from 'react-router-dom';
import './SearchResults/styles.css';
import Song from './Song';

function SearchResults({ songs, onAdd }) {
  return (
    <div className="search-results">
      <h2>Resultados de búsqueda</h2>
      {songs.length === 0 ? (
        <p className="empty-message">No hay canciones para mostrar. Realiza una búsqueda.</p>
      ) : (
        <div className="song-list">
          {songs.map((song) => (
            <div key={song.id} className="song-item">
              <Link to={`/song/${song.id}`} className="song-link">
                <Song
                  title={song.title}
                  artist={song.artist}
                  duration={song.duration}
                  thumb={song.thumb}
                />
              </Link>
              <button
                className="add-button"
                onClick={() => onAdd(song)}
              >
                Agregar a mi biblioteca
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResults;