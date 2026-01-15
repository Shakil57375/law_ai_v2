import { createContext, useContext, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/auth/authSlice';
import {
  useGetChatsQuery,
  useGetChatContentsQuery,
} from '../features/chat/chatApi';

const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [chatId, setChatId] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);

  const user = useSelector(selectUser);

  const {
    data: chatsData = {},
    isLoading: isChatsLoading,
    refetch: refetchChats,
  } = useGetChatsQuery();

  const {
    data: chatContentsData,
    isLoading: isChatLoading,
    refetch: refetchChatContents,
  } = useGetChatContentsQuery(chatId, {
    skip: !chatId || !user,
  });

  // Sync chat messages with fetched chat contents
  useEffect(() => {
    if (chatContentsData?.data?.messages) {
      setChatMessages(chatContentsData.data.messages);
    }
  }, [chatContentsData]);

  const handleClearId = () => {
    setChatId(null);
    setChatMessages([]);
  };

  return (
    <ChatContext.Provider
      value={{
        chats: chatsData.data || [],
        chatMessages,
        setChatMessages,
        chatId,
        setChatId,
        isChatsLoading,
        handleClearId,
        refetchChats,
        refetchChatContents,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
