// # [MODIFICADO] Se mockea fetch en lugar de las acciones, y se verifica el estado del store
import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../test-utils';
import SearchBar from '../components/SearchBar';

// Mock global.fetch para evitar peticiones HTTP reales
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ album: [] }),
    })
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Componente SearchBar', () => {
  it('renderiza el input y el botón "Buscar"', () => {
    renderWithProviders(<SearchBar />);
    const input = screen.getByPlaceholderText(/buscar artista/i);
    const button = screen.getByRole('button', { name: /buscar/i });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('permite al usuario escribir en el input', () => {
    renderWithProviders(<SearchBar />);
    const input = screen.getByPlaceholderText(/buscar artista/i);

    fireEvent.change(input, { target: { value: 'Coldplay' } });

    expect(input).toHaveValue('Coldplay');
  });

  it('despacha fetchSongs al hacer clic en "Buscar"', async () => {
    const { store } = renderWithProviders(<SearchBar />);
    const input = screen.getByPlaceholderText(/buscar artista/i);
    const button = screen.getByRole('button', { name: /buscar/i });

    fireEvent.change(input, { target: { value: 'Oasis' } });
    fireEvent.click(button);

    // Esperamos que el thunk se procese y actualice el estado
    await waitFor(() => {
      expect(store.getState().search.lastTerm).toBe('Oasis');
    });

    // Verificamos que fetch fue llamado con la URL correcta
    expect(global.fetch).toHaveBeenCalledWith('/searchalbum.php?s=Oasis');
   
    // Verificamos que no hay errores
    expect(store.getState().search.error).toBeNull();
  });

  it('despacha fetchSongs al presionar Enter', async () => {
    const { store } = renderWithProviders(<SearchBar />);
    const input = screen.getByPlaceholderText(/buscar artista/i);
    const form = input.closest('form');

    fireEvent.change(input, { target: { value: 'Queen' } });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(store.getState().search.lastTerm).toBe('Queen');
    });

    expect(global.fetch).toHaveBeenCalledWith('/searchalbum.php?s=Queen');
  });

  it('no despacha fetchSongs si el input está vacío', () => {
    const { store } = renderWithProviders(<SearchBar />);
    const button = screen.getByRole('button', { name: /buscar/i });

    const stateBefore = store.getState().search;
    fireEvent.click(button);
    const stateAfter = store.getState().search;

    // El estado no cambió y fetch no fue llamado
    expect(stateAfter).toEqual(stateBefore);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('no despacha fetchSongs si el input solo tiene espacios', () => {
    const { store } = renderWithProviders(<SearchBar />);
    const input = screen.getByPlaceholderText(/buscar artista/i);
    const button = screen.getByRole('button', { name: /buscar/i });

    fireEvent.change(input, { target: { value: '   ' } });
    const stateBefore = store.getState().search;
    fireEvent.click(button);
    const stateAfter = store.getState().search;

    expect(stateAfter).toEqual(stateBefore);
    expect(global.fetch).not.toHaveBeenCalled();
  });
});