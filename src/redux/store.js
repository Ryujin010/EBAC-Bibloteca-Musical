import { configureStore } from '@reduxjs/toolkit';
import libraryReducer from './slices/librarySlice';
import searchReducer from './slices/searchSlice';
import detailReducer from './slices/detailSlice';

const store = configureStore({
    reducer: {
        library: libraryReducer,
        search: searchReducer,
        detail: detailReducer,
    },
});

export default store;