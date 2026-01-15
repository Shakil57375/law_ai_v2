import { apiSlice } from '../api/apiSlice';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => '/auth/user-info/',
    }),
    updateUserProfile: builder.mutation({
      query: (formData) => ({
        url: '/auth/update-profile/',
        method: 'PATCH',
        body: formData,
      }),
    }),
    sendFeedback: builder.mutation({
      query: (data) => ({
        url: '/utilities/feedback/',
        method: 'POST',
        body: data,
      }),
    }),
    helpSupport: builder.mutation({
      query: (data) => ({
        url: '/utilities/help-support/',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useSendFeedbackMutation,
  useHelpSupportMutation,
} = authApi;
