import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import filterReducer from '../features/filterCard/filterSlice';
import filmsApi from '../features/filmCard/ListFilms/FilmsAPI';
import authApi from '../features/auth/authAPI';
import rateMovieApi from '../widgets/raiting/RaitingAPI'; 

const store = configureStore({
  reducer: {
    auth: authReducer,
    filters: filterReducer,
    [filmsApi.reducerPath]: filmsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [rateMovieApi.reducerPath]: rateMovieApi.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(filmsApi.middleware, authApi.middleware, rateMovieApi.middleware), 
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;