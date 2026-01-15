import axiosClient from "./axiosClient"

const chatService = {
  // Create a new chat
  createChat: async (message_content, attached_files = {}) => {
    const formData = new FormData()
    formData.append("message_content", message_content)

    if (attached_files.documents) {
      attached_files.documents.forEach((file) => {
        formData.append("documents", file)
      })
    }
    if (attached_files.case_studies) {
      attached_files.case_studies.forEach((file) => {
        formData.append("case_studies", file)
      })
    }

    const response = await axiosClient.post("/chat/create_chat/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    return response.data
  },

  // Add message to existing chat
  addMessageToChat: async (chatId, message_content, attached_files = {}) => {
    const formData = new FormData()
    formData.append("chat_id", chatId)
    formData.append("message_content", message_content)

    if (attached_files.documents) {
      attached_files.documents.forEach((file) => {
        formData.append("documents", file)
      })
    }
    if (attached_files.case_studies) {
      attached_files.case_studies.forEach((file) => {
        formData.append("case_studies", file)
      })
    }

    const response = await axiosClient.post("/chat/add_message_to_chat/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    return response.data
  },

  // Get all chats
  getAllChats: async () => {
    const response = await axiosClient.get("/chat/get_all_chat/")
    return response.data
  },

  // Get single chat by ID
  getSingleChat: async (chatId) => {
    const response = await axiosClient.get(`/chat/get_single_chat/${chatId}/`)
    return response.data
  },

  // Update chat title
  updateChatTitle: async (chatId, newTitle) => {
    const response = await axiosClient.patch(`/chat/update_chat_title/${chatId}/`, {
      title: newTitle,
    })
    return response.data
  },

  // Delete chat
  deleteChat: async (chatId) => {
    const response = await axiosClient.delete(`/chat/delete_chat/${chatId}/`)
    return response.data
  },
}

export default chatService
