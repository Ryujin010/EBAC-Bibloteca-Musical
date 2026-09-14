import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchSongs = createAsyncThunk(
    'search/fetchSongs',
    async (searchTerm, { rejectWithValue }) => {
        try {
            // Se usa el proxy nativo configurado en package.json
            const response = await fetch(`/searchalbum.php?s=${encodeURIComponent(searchTerm)}`);

            if (!response.ok) {
                throw new Error(`Error HTTP : ${response.status}`);
            }

            const data = await response.json();

            // La API devuelve { album: [...] } o { album: null }
            if (!data.album || data.album.length === 0) {
                return [];
            }

            // Transformar los datos al formato que usa la app
            const albums = data.album.map((album) => ({
                id: album.idAlbum,
                title: album.strAlbum,
                artist: album.strArtist,
                album: album.strAlbum,
                duration: album.strReleaseDate
                ? album.strReleaseDate.substring(0, 4)
                : 'N/A',
                albumId: album.idAlbum,
            }));

            return albums;
        } catch (error) {
            return rejectWithValue(error.message || 'Error al Obtener Datos');
        }
    }
)

// Estado inicial del Slice de búsqueda
const initialState = {
    results: [],
    loading: false,
    error: null,
    lastTerm: '',  // campo para guardar el ultimo termino
};


const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        // Reinicia los resultados y limpia el error
        resetResults: (state) => {
            state.results = [];
            state.error = null;
            state.loading = false;
            state.lastTerm = '';
        },
    },

    extraReducers: (builder) => {
        builder
            // Peticion iniciada
            .addCase(fetchSongs.pending, (state, action) => {
                state.loading = true;
                state.error = null;
                state.lastTerm = action.meta.arg;
            })
            // Peticion exitosa
            .addCase(fetchSongs.fulfilled, (state, action) => {
                state.loading = false;
                state.results = action.payload;
            })
            // Peticion fallida
            .addCase(fetchSongs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Error al Obtener Datos';
                state.results = [];
            });
    },
});

// Exportar acciones generadas automáticamente
export const { resetResults } = searchSlice.actions;

// Exportar el reducer para incluirlo en el store
export default searchSlice.reducer;