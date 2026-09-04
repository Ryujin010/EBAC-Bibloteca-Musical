import React from 'react';
import { useParams, Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

import {
  DetailContainer,
  BackLink,
  AlbumDetail,
  AlbumTitle,
  AlbumInfo,
  AlbumArt,
  TrackList,
  TrackListTitle,
  TrackItem,
  Message,
  RetryButton,
} from './SongDetail/SongDetail.styled';

function SongDetail() {
  const { id } = useParams();

  // URL usando el proxy local para obtener detalles del álbum
  const apiUrl = `/album.php?m=${id}`;

  const { data, loading, error, refetch } = useFetch(apiUrl);

  if (loading) {
    return (
      <DetailContainer>
        <Message>Cargando detalles del álbum...</Message>
      </DetailContainer>
    );
  }

  if (error) {
    return (
      <DetailContainer>
        <Message $error={true}>
          <p>Hubo un problema al cargar los detalles: {error}</p>
          <RetryButton onClick={refetch}>Reintentar</RetryButton>
        </Message>
      </DetailContainer>
    );
  }

  if (!data || !data.album || data.album.length === 0) {
    return (
      <DetailContainer>
        <Message>No se encontraron detalles para este álbum.</Message>
        <BackLink to="/">Volver a la búsqueda</BackLink>
      </DetailContainer>
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
    <DetailContainer>
      <BackLink as={Link} to="/">
        ← Volver a la búsqueda
      </BackLink>
      <AlbumDetail>
        <AlbumTitle>{album.strAlbum}</AlbumTitle>
        <AlbumInfo>
          <p><strong>Artista:</strong> {album.strArtist}</p>
          <p><strong>Año:</strong> {album.strReleaseDate ? album.strReleaseDate.substring(0, 4) : 'N/A'}</p>
          <p><strong>Género:</strong> {album.strGenre || 'N/A'}</p>
          <p><strong>Descripción:</strong> {album.strDescriptionEN || 'Sin descripción disponible'}</p>
          {album.strAlbumThumb && (
            <AlbumArt
              src={album.strAlbumThumb} 
              alt={album.strAlbum} 
              className="album-art"
            />
          )}
        </AlbumInfo>

        {tracks.length > 0 && (
          <TrackList>
            <TrackListTitle>Lista de canciones</TrackListTitle>
            <ul>
              {tracks.map((track, index) => (
                <TrackItem key={index}>{index + 1}. {track}</TrackItem>
              ))}
            </ul>
          </TrackList>
        )}
      </AlbumDetail>
    </DetailContainer>
  );
}

export default SongDetail;