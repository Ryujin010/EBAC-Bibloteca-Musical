import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk para obtener los detalles de un álbum por ID
export const fetchAlbumDetail = createAsyncThunk(
  'detail/fetchAlbumDetail',
  async (albumId, { rejectWithValue }) => {
    try {
      // Se hacen ambas peticiones en paralelo para optimizar
      const [albumResponce, trackResponce] = await Promise.all([
        fetch(`/album.php?m=${albumId}`),
        fetch(`/track.php?m=${albumId}`),
      ]);

      if (!albumResponce.ok) {
        throw new Error(`Error HTTP (álbum) : ${albumResponce.status}`);
      }

      if (!trackResponce.ok){
        throw new Error(`Error HTTP (canciones) : ${trackResponce.status}`);
      }

      const albumData = await albumResponce.json();
      const tracksData = await trackResponce.json();

      // Extraer el álbum (puede ser null si no existe)
      const album = albumData.album ? albumData.album[0] : null;

      // Extraer las canciones (puede ser null si no existe)
      const tracks = tracksData.track || [];


      // Si no hay álbum, retornamos null para que el componente muestre "no encontrado"
      if (!album){
        return null;
        }

      return { album, tracks};

    } catch (error) {
      return rejectWithValue(error.message || 'Error al obtener los detalles');
    }
  }
);

// Estado inicial del slice
const initialState = {
  album: null,
  tracks: [],
  loading: false,
  error: null,
};

const detailSlice = createSlice({
  name: 'detail',
  initialState,
  reducers: {
    // Limpia el detalle actual (útil al salir de la página)
    clearDetail: (state) => {
      state.album = null;
      state.tracks = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbumDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.album = null;
        state.tracks = [];
      })
      .addCase(fetchAlbumDetail.fulfilled, (state, action) => {
        state.loading = false;
        
        if (action.payload){
          state.album = action.payload.album;
          state.tracks = action.payload.tracks;
        } else {
          state.album = null;
          state.tracks = [];
        }
      })
      .addCase(fetchAlbumDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error desconocido';
        state.album = null;
        state.tracks = [];
      });
  },
});

// Exportar acciones
export const { clearDetail } = detailSlice.actions;

// Exportar el reducer
export default detailSlice.reducer;