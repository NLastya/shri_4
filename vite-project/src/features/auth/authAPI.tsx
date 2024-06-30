import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { URL_API } from '../../config';

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${URL_API}/api/v1` }), 
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (loginData) => ({
        url: 'login',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: loginData,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
export default authApi;