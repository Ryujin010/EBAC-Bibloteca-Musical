import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    // Agrega una canción verificando que no exista previamente
    addSong: (state, action) => {
        const exists = state.some((song) => song.id === action.payload.id);
        if (!exists) {
            state.push(action.payload);
        }
    },
    // Elimina una canción según su ID
    removeSong: (state, action) => {
      return state.filter((song) => song.id !== action.payload);
    },
  },
});


// Exportar acciones generadas automáticamente
export const { addSong, removeSong } = librarySlice.actions;

// Exportar el reducer para incluirlo en el store
export default librarySlice.reducer;