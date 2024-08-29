import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import filterReducer from '../features/filterCard/filterSlice';
import filmsApi from '../features/filmCard/ListFilms/FilmsAPI';
import authApi from '../features/auth/authAPI';
import rateMovieApi from '../widgets/raiting/RaitingAPI'; 

import { useDispatch, useSelector, useStore } from 'react-redux';

export const makeStore = () => {
  return configureStore({
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
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()