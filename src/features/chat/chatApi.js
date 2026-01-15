import { apiSlice } from '../api/apiSlice';

export const chatApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChats: builder.query({
      query: () => '/chat/get_all_chat/',
      providesTags: ['Chats'],
    }),
    getChatContents: builder.query({
      query: (chatId) => `/chat/get_single_chat/${chatId}/`,
      providesTags: (result, error, chatId) => [
        { type: 'ChatContents', id: chatId },
      ],
    }),
    updateChatTitle: builder.mutation({
      query: ({ chatId, title }) => ({
        url: `/chat/update_chat_title/${chatId}/`,
        method: 'PATCH',
        body: { title },
      }),
      invalidatesTags: (result, error, { chatId }) => [
        { type: 'ChatContents', id: chatId },
        'Chats',
      ],
    }),
    deleteChat: builder.mutation({
      query: (chatId) => ({
        url: `/chat/delete_chat/${chatId}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Chats'],
    }),
  }),
});

export const {
  useGetChatsQuery,
  useGetChatContentsQuery,
  useUpdateChatTitleMutation,
  useDeleteChatMutation,
} = chatApi;
