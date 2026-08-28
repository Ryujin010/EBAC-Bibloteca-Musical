import React from 'react';
import { useParams, Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import './SongDetail/styles.css';

function SongDetail() {
  const { id } = useParams();

  // URL usando el proxy local para obtener detalles del álbum
  const apiUrl = `/album.php?m=${id}`;

  const { data, loading, error, refetch } = useFetch(apiUrl);

  if (loading) {
    return (
      <div className="detail-container">
        <p className="message">Cargando detalles del álbum...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="detail-container">
        <div className="message error">
          <p>Hubo un problema al cargar los detalles: {error}</p>
          <button onClick={refetch} className="retry-button">Reintentar</button>
        </div>
      </div>
    );
  }

  if (!data || !data.album || data.album.length === 0) {
    return (
      <div className="detail-container">
        <p className="message">No se encontraron detalles para este álbum.</p>
        <Link to="/" className="back-link">Volver a la búsqueda</Link>
      </div>
    );
  }

  const album = data.album[0];

  // Extraer lista de canciones (strTrack1 ... strTrack20)
  const tracks = [];
  for (let i = 1; i <= 20; i++) {
    const trackKey = `strTrack${i}`;
    if (album[trackKey]) {
      tracks.push(album[trackKey]);
    }
  }

  return (
    <div className="detail-container">
      <Link to="/" className="back-link">← Volver a la búsqueda</Link>
      
      <div className="album-detail">
        <h1>{album.strAlbum}</h1>
        <div className="album-info">
          <p><strong>Artista:</strong> {album.strArtist}</p>
          <p><strong>Año:</strong> {album.strReleaseDate ? album.strReleaseDate.substring(0, 4) : 'N/A'}</p>
          <p><strong>Género:</strong> {album.strGenre || 'N/A'}</p>
          <p><strong>Descripción:</strong> {album.strDescriptionEN || 'Sin descripción disponible'}</p>
          {album.strAlbumThumb && (
            <img 
              src={album.strAlbumThumb} 
              alt={album.strAlbum}
              className="album-art"
            />
          )}
        </div>

        {tracks.length > 0 && (
          <div className="track-list">
            <h2>Lista de canciones</h2>
            <ul>
              {tracks.map((track, index) => (
                <li key={index}>{index + 1}. {track}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default SongDetail;