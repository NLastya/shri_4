import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { URL_API } from '../../config';

const rateMovieApi = createApi({
  reducerPath: 'rateMovieApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${URL_API}/api/v1`, 
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    rateMovie: builder.mutation({
      query: ({ movieId, user_rate }) => ({
        url: 'rateMovie',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { movieId, user_rate },
      }),
    }),
  }),
});

export const { useRateMovieMutation } = rateMovieApi;
export default rateMovieApi;