import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../test-utils';
import Library from '../components/Library';

// Datos simulados para inyectar en el store
const mockLibrary = [
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

describe('Componente Library', () => {
  it('muestra mensaje cuando la biblioteca está vacía', () => {
    renderWithProviders(<Library />, {
      preloadedState: {
        search: { results: [], loading: false, error: null, lastTerm: '' },
        library: [],
        detail: { album: null, tracks: [], loading: false, error: null },
      },
    });

    expect(
      screen.getByText(/no hay canciones en tu biblioteca aún/i)
    ).toBeInTheDocument();
    // El contador debe ser 0
    expect(screen.getByText(/mi biblioteca \(0\)/i)).toBeInTheDocument();
  });

  it('renderiza la lista de canciones de la biblioteca', () => {
    renderWithProviders(<Library />, {
      preloadedState: {
        search: { results: [], loading: false, error: null, lastTerm: '' },
        library: mockLibrary,
        detail: { album: null, tracks: [], loading: false, error: null },
      },
    });

    // Contador con 2 canciones
    expect(screen.getByText(/mi biblioteca \(2\)/i)).toBeInTheDocument();

    // Ambas canciones aparecen
    expect(screen.getByText('Definitely Maybe')).toBeInTheDocument();
    expect(screen.getByText('Morning Glory')).toBeInTheDocument();

    // Aparecen los años
    expect(screen.getByText('1994')).toBeInTheDocument();
    expect(screen.getByText('1995')).toBeInTheDocument();
  });

  it('renderiza un botón "Eliminar" por cada canción', () => {
    renderWithProviders(<Library />, {
      preloadedState: {
        search: { results: [], loading: false, error: null, lastTerm: '' },
        library: mockLibrary,
        detail: { album: null, tracks: [], loading: false, error: null },
      },
    });

    const removeButtons = screen.getAllByRole('button', {
      name: /eliminar/i,
    });
    expect(removeButtons).toHaveLength(2);
  });

  it('al hacer clic en "Eliminar", la canción se elimina de la biblioteca', () => {
    const { store } = renderWithProviders(<Library />, {
      preloadedState: {
        search: { results: [], loading: false, error: null, lastTerm: '' },
        library: mockLibrary,
        detail: { album: null, tracks: [], loading: false, error: null },
      },
    });

    // Antes: 2 canciones
    expect(store.getState().library).toHaveLength(2);

    // Clic en el primer "Eliminar"
    const removeButtons = screen.getAllByRole('button', {
      name: /eliminar/i,
    });
    fireEvent.click(removeButtons[0]);

    // Después: 1 canción, y la eliminada es la primera
    expect(store.getState().library).toHaveLength(1);
    expect(store.getState().library[0].id).toBe('222');
  });

  it('eliminar la única canción muestra el mensaje de biblioteca vacía', () => {
    const { store } = renderWithProviders(<Library />, {
      preloadedState: {
        search: { results: [], loading: false, error: null, lastTerm: '' },
        library: [mockLibrary[0]],
        detail: { album: null, tracks: [], loading: false, error: null },
      },
    });

    // Antes: 1 canción
    expect(store.getState().library).toHaveLength(1);

    // Clic en "Eliminar"
    const removeButton = screen.getByRole('button', { name: /eliminar/i });
    fireEvent.click(removeButton);

    // Después: 0 canciones
    expect(store.getState().library).toHaveLength(0);

    // El mensaje de biblioteca vacía aparece en el DOM (re-render automático)
    expect(
      screen.getByText(/no hay canciones en tu biblioteca aún/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/mi biblioteca \(0\)/i)).toBeInTheDocument();
  });

  it('eliminar una canción específica no afecta a las demás', () => {
    const { store } = renderWithProviders(<Library />, {
      preloadedState: {
        search: { results: [], loading: false, error: null, lastTerm: '' },
        library: mockLibrary,
        detail: { album: null, tracks: [], loading: false, error: null },
      },
    });

    // Clic en el segundo "Eliminar"
    const removeButtons = screen.getAllByRole('button', {
      name: /eliminar/i,
    });
    fireEvent.click(removeButtons[1]);

    // Queda la primera canción ('111')
    expect(store.getState().library).toHaveLength(1);
   
    expect(store.getState().library[0].id).toBe('111');
  });
});