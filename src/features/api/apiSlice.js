import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { selectAccessToken } from '../auth/authSlice';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://backend.lexbanglaai.com/api',
    prepareHeaders: (headers, { getState }) => {
      const token = selectAccessToken(getState());
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => ({
        url: '/auth/signup/',
        method: 'POST',
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: '/auth/login/',
        method: 'POST',
        body: data,
      }),
    }),
    // New social login endpoint
    socialLogin: builder.mutation({
      query: (data) => ({
        url: '/auth/signup/',
        method: 'POST',
        body: data,
      }),
    }),
    sendOtp: builder.mutation({
      query: (data) => ({
        url: '/auth/send-otp/',
        method: 'POST',
        body: data,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (data) => ({
        url: '/auth/verify-email/',
        method: 'POST',
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: '/auth/reset-password/',
        method: 'POST',
        body: data,
      }),
    }),
    getUserInfo: builder.query({
      query: () => ({
        url: '/auth/user-info/',
        method: 'GET',
      }),
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: '/auth/update-profile/',
        method: 'PATCH',
        body: data,
      }),
    }),
    getAllBlogs: builder.query({
      query: () => ({
        url: '/blog/get_all_blogs/',
        method: 'GET',
      }),
    }),
    getASingleBlog: builder.query({
      query: (slug) => ({
        url: `/blog/get_single_blog/${slug}/`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useSocialLoginMutation,
  useSendOtpMutation,
  useVerifyEmailMutation,
  useResetPasswordMutation,
  useGetUserInfoQuery,
  useUpdateProfileMutation,
  useGetAllBlogsQuery,
  useGetASingleBlogQuery,
} = apiSlice;
