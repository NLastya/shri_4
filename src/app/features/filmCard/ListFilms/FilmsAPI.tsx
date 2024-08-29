import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { URL_API } from '../../../config';

interface IFilmCard {
  id: string;
  title: string;
  description: string;
  genre: string;
  release_year: number;
}

interface ISearchResponse {
  search_result: IFilmCard[];
  total_pages: number; 
}

interface IErrorResponse {
  error: string;
}

const filmsApi = createApi({
  reducerPath: 'filmsApi',  
  baseQuery: fetchBaseQuery({ baseUrl: `${URL_API}/api/v1` }), 
  endpoints: (builder) => ({
    searchFilms: builder.query<ISearchResponse, { title?: string; genre?: string; release_year?: string; page?: number }>({
      query: ({ title='', genre='0', release_year='0', page=1 }) => {
        const params = new URLSearchParams();
        
        if (title) {
          params.append('title', title);
        }
        if (genre && genre !== '0') {
          params.append('genre', genre);
        }
        if (release_year && release_year !== '0') {
          params.append('release_year', release_year);
        }
        if (page && page !== 1) {
          params.append('page', page.toString());
        }

        return `search?${params.toString()}`;
      },
      transformResponse: (response: ISearchResponse) => {
        return response ? response : { search_result: [], total_pages: 1 };
      },
    }),
    getMovieById: builder.query<IFilmCard, string>({
      query: (id) => `movie/${id}`,
      transformResponse: (response: IFilmCard | IErrorResponse, meta, arg) => {
        if ('error' in response) {
          throw new Error(response.error);
        }
        return response;
      }
    }),
  }),
});

export const { useGetMovieByIdQuery, useSearchFilmsQuery } = filmsApi;
export default filmsApi;








// 
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { URL_API } from '../../../config';
// import { handleFetchBaseQueryError } from '../../../utils/ErrorHandle';

// interface IFilmCard {
//   id: string;
//   title: string;
//   description: string;
//   genre: string;
//   release_year: number;
// }

// interface ISearchResponse {
//   search_result: IFilmCard[];
//   total_pages: number; 
// }

// interface IErrorResponse {
//   error: string;
// }

// const filmsApi = createApi({
//   reducerPath: 'filmsApi',  
//   baseQuery: fetchBaseQuery({ 
//     baseUrl: `${URL_API}/api/v1`,
//     prepareHeaders: (headers, { getState }) => {
//       const token = localStorage.getItem('token');
//       if (token) {
//         headers.set('Authorization', `Bearer ${token}`);
//       }
//       return headers;
//     }
//   }).enhanceEndpoints({
//     addErrorHandler: (error, previousBaseQuery) => {
//       handleFetchBaseQueryError(error);
//       return previousBaseQuery;
//     }
//   }),  
//   endpoints: (builder) => ({
//     searchFilms: builder.query<ISearchResponse, { title?: string; genre?: string; release_year?: string; page?: number }>({
//       query: ({ title='', genre='0', release_year='0', page=1 }) => {
//         const params = new URLSearchParams();
        
//         if (title) {
//           params.append('title', title);
//         }
//         if (genre && genre !== '0') {
//           params.append('genre', genre);
//         }
//         if (release_year && release_year !== '0') {
//           params.append('release_year', release_year);
//         }
//         if (page && page !== 1) {
//           params.append('page', page.toString());
//         }

//         return `search?${params.toString()}`;
//       },
//       transformResponse: (response: ISearchResponse) => {
//         return response ? response : { search_result: [], total_pages: 1 };
//       },
//     }),
//     getMovieById: builder.query<IFilmCard, string>({
//       query: (id) => `movie/${id}`,
//       transformResponse: (response: IFilmCard | IErrorResponse, meta, arg) => {
//         if ('error' in response) {
//           throw new Error(response.error);
//         }
//         return response;
//       }
//     }),
//   }),
// });

// export const { useGetMovieByIdQuery, useSearchFilmsQuery } = filmsApi;
// export default filmsApi;