import axios from 'axios';
import store from '../app/store.js';
import { selectAccessToken } from '../features/auth/authSlice';
import toast from 'react-hot-toast';

const API_BASE_URL = 'http://lawbotmvp.duckdns.org/api';

export const createChatAxios = async (formData) => {
  try {
    const state = store.getState();
    const token = selectAccessToken(state);

    const response = await axios.post(
      `${API_BASE_URL}/chat/create_chat/`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.error?.[0] || 'Failed to create chat');
    throw error;
  }
};

export const addMessageToChatAxios = async (formData) => {
  try {
    const state = store.getState();
    const token = selectAccessToken(state);

    const response = await axios.post(
      `${API_BASE_URL}/chat/add_message_to_chat/`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.error?.[0] || 'Failed to send message');
    throw error;
  }
};
