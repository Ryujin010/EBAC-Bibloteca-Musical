import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { configureStore } from '@reduxjs/toolkit';
import { theme } from './styles/theme';
import libraryReducer from './redux/slices/librarySlice';
import searchReducer from './redux/slices/searchSlice';
import detailReducer from './redux/slices/detailSlice';

// Crea un store de prueba con los reducers reales
export const createTestStore = (preloadedState) =>
  configureStore({
    reducer: {
      library: libraryReducer,
      search: searchReducer,
      detail: detailReducer,
    },
    preloadedState,
  });

/**
 * Renderiza un componente con todos los providers necesarios:
 * - Redux Provider (con store de prueba)
 * - ThemeProvider (styled-components)
 * - MemoryRouter (React Router)
 *
 * @param {React.ReactElement} ui - El componente a renderizar.
 * @param {Object} options - Opciones adicionales.
 * @param {Object} options.preloadedState - Estado inicial del store.
 * @param {Object} options.store - Store ya creado (opcional).
 * @param {Array<string>} options.route - Ruta inicial (por defecto '/').
 */
export function renderWithProviders(
  ui,
  { preloadedState = {}, store = createTestStore(preloadedState), route = '/' } = {}
) {
  return {
    store,
    ...render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <MemoryRouter
            initialEntries={[route]}
            future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
          >
            {ui}
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    ),
  };
}