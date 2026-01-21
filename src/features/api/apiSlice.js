import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { selectAccessToken } from '../auth/authSlice';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://lawbotmvp.duckdns.org/api',
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
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useSendOtpMutation,
  useVerifyEmailMutation,
  useResetPasswordMutation,
  useGetUserInfoQuery,
  useUpdateProfileMutation,
} = apiSlice;
