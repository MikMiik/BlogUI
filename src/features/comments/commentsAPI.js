import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_LOCAL_URL }),
  tagTypes: ['Comment'],
  endpoints: (builder) => ({
    getAllComments: builder.query({
      query: () => `comments`,
      providesTags: ['Comment'],
    }),
    getOneComment: builder.query({
      query: (id) => `comments/${id}`,
    }),
  }),
})

export const { useGetAllCommentsQuery, useGetOneCommentQuery } = commentsApi
