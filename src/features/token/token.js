import { apiSlice } from "../api/apiSlice";

export const token = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTokens: builder.query({
      query: () => '/chat/get_user_token_usage_last_30_days/',
    }),
  }),
});

export const { useGetTokensQuery } = token;