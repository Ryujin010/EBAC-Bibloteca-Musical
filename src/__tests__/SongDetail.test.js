import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { Routes, Route } from 'react-router-dom';
import { renderWithProviders } from '../test-utils';
import SongDetail from '../components/SongDetail';

const mockAlbumResponse = {
  album: [
    {
      idAlbum: '111',
      strAlbum: 'Definitely Maybe',
      strArtist: 'Oasis',
      strReleaseDate: '1994-08-29',
      strGenre: 'Rock',
      strDescriptionEN: 'Álbum debut de Oasis',
      strAlbumThumb: 'https://example.com/cover.jpg',
    },
  ],
};

const mockTracksResponse = {
  track: [
    { idTrack: '1', strTrack: "Rock 'n' Roll Star", intTrackNumber: '1' },
    { idTrack: '2', strTrack: 'Shakermaker', intTrackNumber: '2' },
    { idTrack: '3', strTrack: 'Live Forever', intTrackNumber: '3' },
  ],
};

const renderSongDetail = (options = {}) =>
  renderWithProviders(
    <Routes>
      <Route path="/song/:id" element={<SongDetail />} />
    </Routes>,
    options
  );

describe('Componente SongDetail', () => {
  beforeEach(() => {
    global.fetch = jest.fn((url) => {
      if (url.includes('/album.php')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockAlbumResponse),
        });
      }
      if (url.includes('/track.php')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockTracksResponse),
        });
      }
      return Promise.reject(new Error('URL no mockeada: ' + url));
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renderiza el álbum y las canciones cuando la petición es exitosa', async () => {
    const { store } = renderSongDetail({
      preloadedState: {
        search: { results: [], loading: false, error: null, lastTerm: '' },
        library: [],
        detail: { album: null, tracks: [], loading: false, error: null },
      },
      route: '/song/111',
    });

    await waitFor(() => {
      expect(store.getState().detail.album).not.toBeNull();
    });

    // Título del álbum
    expect(screen.getByText('Definitely Maybe')).toBeInTheDocument();

    // Artista: usamos un function matcher que examina el textContent completo del <p>
    const artistParagraph = screen.getByText(
      (content, element) =>
        element.tagName.toLowerCase() === 'p' && /artista:/i.test(element.textContent)
    );
    expect(artistParagraph).toHaveTextContent(/oasis/i);

    // Lista de canciones
    expect(screen.getByText(/rock 'n' roll star/i)).toBeInTheDocument();
    expect(screen.getByText(/shakermaker/i)).toBeInTheDocument();
    expect(screen.getByText(/live forever/i)).toBeInTheDocument();

    // Estado del slice
    expect(store.getState().detail.tracks).toHaveLength(3);
  });

  it('muestra mensaje de error cuando la petición falla', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        json: () => Promise.resolve({}),
      })
    );

    const { store } = renderSongDetail({
      preloadedState: {
        search: { results: [], loading: false, error: null, lastTerm: '' },
        library: [],
        detail: { album: null, tracks: [], loading: false, error: null },
      },
      route: '/song/999',
    });

    await waitFor(() => {
      expect(store.getState().detail.error).not.toBeNull();
    });

    expect(
      screen.getByText(/hubo un problema al cargar los detalles/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /reintentar/i })
    ).toBeInTheDocument();
  });

  it('muestra mensaje cuando el álbum no existe', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ album: null }),
      })
    );

    const { store } = renderSongDetail({
      preloadedState: {
        search: { results: [], loading: false, error: null, lastTerm: '' },
        library: [],
        detail: { album: null, tracks: [], loading: false, error: null },
      },
      route: '/song/000',
    });

    await waitFor(() => {
      expect(store.getState().detail.loading).toBe(false);
    });

    expect(
      screen.getByText(/no se encontraron detalles para este álbum/i)
    ).toBeInTheDocument();
  });
});