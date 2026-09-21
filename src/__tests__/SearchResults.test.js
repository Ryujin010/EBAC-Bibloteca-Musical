import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../test-utils';
import SearchResults from '../components/SearchResults';

// Datos simulados para inyectar en el store
const mockSongs = [
  {
    id: '111',
    title: 'Definitely Maybe',
    artist: 'Oasis',
    album: 'Definitely Maybe',
    duration: '1994',
  },
  {
    id: '222',
    title: 'Morning Glory',
    artist: 'Oasis',
    album: 'Morning Glory',
    duration: '1995',
  },
];

describe('Componente SearchResults', () => {
  it('muestra mensaje cuando no hay resultados', () => {
   
    // Estado inicial vacío
    renderWithProviders(<SearchResults />, {
      preloadedState: {
        search: { results: [], loading: false, error: null, lastTerm: '' },
        library: [],
        detail: { album: null, tracks: [], loading: false, error: null },
      },
    });

    expect(
      screen.getByText(/no hay canciones para mostrar/i)
    ).toBeInTheDocument();
  });

  it('renderiza la lista de canciones con datos', () => {
    renderWithProviders(<SearchResults />, {
      preloadedState: {
        search: {
          results: mockSongs,
          loading: false,
          error: null,
          lastTerm: 'Oasis',
        },
        library: [],
        detail: { album: null, tracks: [], loading: false, error: null },
      },
    });

    // Verifica que ambas canciones aparecen
    expect(screen.getByText('Definitely Maybe')).toBeInTheDocument();
    expect(screen.getByText('Morning Glory')).toBeInTheDocument();

    // Verifica que el artista aparece (2 veces porque hay 2 canciones)
    const artists = screen.getAllByText('Oasis');
    expect(artists).toHaveLength(2);

    // Verifica que los años aparecen
    expect(screen.getByText('1994')).toBeInTheDocument();
    expect(screen.getByText('1995')).toBeInTheDocument();
  });

  it('renderiza un botón "Agregar a mi biblioteca" por cada canción', () => {
    renderWithProviders(<SearchResults />, {
      preloadedState: {
        search: {
          results: mockSongs,
          loading: false,
          error: null,
          lastTerm: 'Oasis',
        },
        library: [],
        detail: { album: null, tracks: [], loading: false, error: null },
      },
    });

    const addButtons = screen.getAllByRole('button', {
      name: /agregar a mi biblioteca/i,
    });
    expect(addButtons).toHaveLength(2);
  });

  it('al hacer clic en "Agregar", la canción se agrega a la biblioteca', () => {
    const { store } = renderWithProviders(<SearchResults />, {
      preloadedState: {
        search: {
          results: mockSongs,
          loading: false,
          error: null,
          lastTerm: 'Oasis',
        },
        library: [],
        detail: { album: null, tracks: [], loading: false, error: null },
      },
    });

    // Antes del clic: biblioteca vacía
    expect(store.getState().library).toHaveLength(0);

    // Hacemos clic en el primer botón "Agregar"
    const addButtons = screen.getAllByRole('button', {
      name: /agregar a mi biblioteca/i,
    });
    fireEvent.click(addButtons[0]);

    // Después del clic: la biblioteca tiene 1 canción
    expect(store.getState().library).toHaveLength(1);
    expect(store.getState().library[0].id).toBe('111');
  });

  it('no agrega la misma canción dos veces', () => {
    const { store } = renderWithProviders(<SearchResults />, {
      preloadedState: {
        search: {
          results: mockSongs,
          loading: false,
          error: null,
          lastTerm: 'Oasis',
        },
        library: [],
        detail: { album: null, tracks: [], loading: false, error: null },
      },
    });

    const addButtons = screen.getAllByRole('button', {
      name: /agregar a mi biblioteca/i,
    });

    // Clic dos veces en el mismo botón
    fireEvent.click(addButtons[0]);
    fireEvent.click(addButtons[0]);

    // Solo debe haber 1 canción (el reducer evita duplicados)
    expect(store.getState().library).toHaveLength(1);
  });

  it('cada canción tiene un enlace a /song/:id', () => {
    renderWithProviders(<SearchResults />, {
      preloadedState: {
        search: {
          results: mockSongs,
          loading: false,
          error: null,
          lastTerm: 'Oasis',
        },
        library: [],
        detail: { album: null, tracks: [], loading: false, error: null },
      },
    });

    // Verificamos que hay 2 enlaces con la ruta correcta
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', '/song/111');
    expect(links[1]).toHaveAttribute('href', '/song/222');
  });
});