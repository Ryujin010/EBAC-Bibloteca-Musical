import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../test-utils';
import App from '../App';

// Datos simulados que devolverá la API mockeada
const mockApiResponse = {
  album: [
    {
      idAlbum: '111',
      strAlbum: 'Definitely Maybe',
      strArtist: 'Oasis',
      strReleaseDate: '1994-08-29',
    },
    {
      idAlbum: '222',
      strAlbum: '(What\'s the Story) Morning Glory?',
      strArtist: 'Oasis',
      strReleaseDate: '1995-10-02',
    },
  ],
};

describe('App - Test de integración', () => {
  beforeEach(() => {
    // Mock global.fetch para devolver la respuesta simulada
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockApiResponse),
      })
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renderiza los componentes principales (Header y SearchBar)', () => {
    renderWithProviders(<App />);

    // Header
    expect(screen.getByText(/biblioteca musical/i)).toBeInTheDocument();
    expect(
      screen.getByText(/descubre y guarda tus canciones favoritas/i)
    ).toBeInTheDocument();

    // SearchBar
    expect(
      screen.getByPlaceholderText(/buscar artista/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /buscar/i })).toBeInTheDocument();
  });

  it('flujo completo: buscar, agregar y eliminar una canción', async () => {
    const { store } = renderWithProviders(<App />);

    // 1. Estado inicial: biblioteca vacía
    expect(store.getState().library).toHaveLength(0);

    // 2. Buscar 'Oasis'
    const input = screen.getByPlaceholderText(/buscar artista/i);
    const searchButton = screen.getByRole('button', { name: /buscar/i });

    fireEvent.change(input, { target: { value: 'Oasis' } });
    fireEvent.click(searchButton);

    // Esperamos a que los resultados aparezcan
    await waitFor(() => {
      expect(store.getState().search.results).toHaveLength(2);
    });

    // Verificamos que los resultados se muestran en el DOM
    expect(screen.getByText('Definitely Maybe')).toBeInTheDocument();
    expect(
      screen.getByText(/What's the Story.*Morning Glory/i)
    ).toBeInTheDocument();

    // 3. Agregar la primera canción a la biblioteca
    const addButtons = screen.getAllByRole('button', {
      name: /agregar a mi biblioteca/i,
    });
    expect(addButtons).toHaveLength(2);
    fireEvent.click(addButtons[0]);

    // Verificamos que se agregó al estado
    expect(store.getState().library).toHaveLength(1);
    expect(store.getState().library[0].id).toBe('111');

    // Verificamos que aparece en el DOM (en la Library)
    expect(screen.getByText(/mi biblioteca \(1\)/i)).toBeInTheDocument();

    // 4. Eliminar la canción de la biblioteca
    const removeButtons = screen.getAllByRole('button', {
      name: /eliminar/i,
    });
    expect(removeButtons).toHaveLength(1);
    fireEvent.click(removeButtons[0]);

    // Verificamos que se eliminó del estado
    expect(store.getState().library).toHaveLength(0);

    // Verificamos que el mensaje de biblioteca vacía aparece
    expect(
      screen.getByText(/no hay canciones en tu biblioteca aún/i)
    ).toBeInTheDocument();
  });

  it('la búsqueda vacía no ejecuta fetch', () => {
    renderWithProviders(<App />);

    const searchButton = screen.getByRole('button', { name: /buscar/i });
    fireEvent.click(searchButton);

    // Fetch no debe haber sido llamado
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('maneja errores de la API correctamente', async () => {
    // Reemplazamos el mock para simular un error
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        json: () => Promise.resolve({}),
      })
    );

    const { store } = renderWithProviders(<App />);

    const input = screen.getByPlaceholderText(/buscar artista/i);
    const searchButton = screen.getByRole('button', { name: /buscar/i });

    fireEvent.change(input, { target: { value: 'Oasis' } });
    fireEvent.click(searchButton);

    // Esperamos a que el error se registre
    await waitFor(() => {
      expect(store.getState().search.error).not.toBeNull();
    });

    // Verificamos que el mensaje de error aparece en el DOM
    expect(
      screen.getByText(/hubo un problema al cargar los datos/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /reintentar/i })
    ).toBeInTheDocument();
  });

  ///////////////////////////////

    it('al hacer clic en "Reintentar" se ejecuta fetch nuevamente', async () => {
    // Mock con contador interno: primer llamado falla, siguientes tienen éxito
    let callCount = 0;
    global.fetch = jest.fn(() => {
      callCount += 1;
      if (callCount === 1) {
        return Promise.resolve({
          ok: false,
          status: 500,
          json: () => Promise.resolve({}),
        });
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockApiResponse),
      });
    });

    const { store } = renderWithProviders(<App />);

    const input = screen.getByPlaceholderText(/buscar artista/i);
    const searchButton = screen.getByRole('button', { name: /buscar/i });

    fireEvent.change(input, { target: { value: 'Oasis' } });
    fireEvent.click(searchButton);

    // Esperamos el error
    await waitFor(() => {
      expect(store.getState().search.error).not.toBeNull();
    });

    // Hacemos clic en "Reintentar"
    const retryButton = screen.getByRole('button', { name: /reintentar/i });
    fireEvent.click(retryButton);

    // Verificamos que fetch fue llamado de nuevo (2 veces en total)
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    // Verificamos que ahora sí hay resultados
    await waitFor(() => {
      expect(store.getState().search.results).toHaveLength(2);
    });
  });

});