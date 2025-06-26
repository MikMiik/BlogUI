import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_LOCAL_URL }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: ({ limit, page }) => `posts?limit=${limit}&page=${page}`,
      transformResponse: (response) => response.data,
    }),
    getOnePost: builder.query({
      query: (slug) => `posts/${slug}`,
      transformResponse: (response) => response.data,
      providesTags: (result) => {
        return result ? [{ type: 'Post', id: result.id }] : []
      },
    }),

    createPost: builder.mutation({
      query: (data) => ({
        url: 'posts',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response) => response.data,
    }),
    updatePost: builder.mutation({
      query: ({ id, data }) => ({
        url: `posts/${id}`,
        method: 'PATCH',
        body: data,
      }),
      transformResponse: (response) => response.data,
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `posts/${id}`,
        method: 'DELETE',
      }),
    }),
    createComment: builder.mutation({
      query: (data) => ({
        url: 'comments',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result, error, { postId }) => [{ type: 'Post', id: postId }],
    }),
    updateComment: builder.mutation({
      query: ({ id, data }) => ({
        url: `comments/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { postId }) => [{ type: 'Post', id: postId }],
    }),
    deleteComment: builder.mutation({
      query: (id) => ({
        url: `comments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { postId }) => [{ type: 'Post', id: postId }],
    }),
  }),
})

export const {
  useGetAllPostsQuery,
  useGetOnePostQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = postsApi
