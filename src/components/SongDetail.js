import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAlbumDetail, clearDetail } from '../redux/slices/detailSlice';

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
  const dispatch = useDispatch();
  const { album, tracks, loading, error } = useSelector((state) => state.detail);

    // Carga detalles a montar o cuando cambie de id
  useEffect(() => {
    if (id) {
      dispatch(fetchAlbumDetail(id));
    }

    // Limpia el detalle al desmotar
    return() => {
      dispatch(clearDetail());
    };
  }, [dispatch, id]);

  // reitentar la carga

  const handleRetry = () => {
    if (id) {
      dispatch(fetchAlbumDetail(id));
    }
  };

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
          <RetryButton onClick={handleRetry}>Reintentar</RetryButton>
        </Message>
      </DetailContainer>
    );
  }

  if (!album) {
    return (
      <DetailContainer>
        <Message>No se encontraron detalles para este álbum.</Message>
        <BackLink to="/">Volver a la búsqueda</BackLink>
      </DetailContainer>
    );
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
          <p><strong>Año:</strong> {' '} 
          {album.strReleaseDate ? 
          album.strReleaseDate.substring(0, 4) 
          : 'N/A'}
          </p>
          <p><strong>Género:</strong> {album.strGenre || 'N/A'}</p>
          <p><strong>Descripción:</strong> {' '}
          {album.strDescriptionEN || 'Sin descripción disponible'}
          </p>
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
            <ul style={{ listStyle: 'none', padding: 0}}>
              {tracks.map((track, index) => (
                <TrackItem key={track.idTrack || index}>
                   {track.intTrackNumber || index + 1}. 
                   {track.strTrack}
                </TrackItem>
              ))}
            </ul>
          </TrackList>
        )}
      </AlbumDetail>
    </DetailContainer>
  );
}

export default SongDetail;