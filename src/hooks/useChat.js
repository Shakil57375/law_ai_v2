"use client"

import { useState } from "react"
import chatService from "../services/chatService"
import toast from "react-hot-toast"

export function useChat() {
  const [loading, setLoading] = useState(false)
  const [chats, setChats] = useState([])
  const [currentChat, setCurrentChat] = useState(null)

  const createChat = async (message_content, attached_files = {}) => {
    setLoading(true)
    try {
      const response = await chatService.createChat(message_content, attached_files)
      if (response.status === "success") {
        toast.success("Chat created successfully!")
        return response.data
      }
    } catch (error) {
      console.error("Error creating chat:", error)
      toast.error(error.response?.data?.error?.[0] || "Failed to create chat")
      throw error
    } finally {
      setLoading(false)
    }
  }

  const addMessageToChat = async (chatId, message_content, attached_files = {}) => {
    setLoading(true)
    try {
      const response = await chatService.addMessageToChat(chatId, message_content, attached_files)
      if (response.status === "success") {
        setCurrentChat(response.data)
        return response.data
      }
    } catch (error) {
      console.error("Error adding message:", error)
      toast.error(error.response?.data?.error?.[0] || "Failed to add message")
      throw error
    } finally {
      setLoading(false)
    }
  }

  const getAllChats = async () => {
    setLoading(true)
    try {
      const response = await chatService.getAllChats()
      if (response.status === "success") {
        setChats(response.data)
        return response.data
      }
    } catch (error) {
      console.error("Error fetching chats:", error)
      toast.error("Failed to load chats")
      throw error
    } finally {
      setLoading(false)
    }
  }

  const getSingleChat = async (chatId) => {
    setLoading(true)
    try {
      const response = await chatService.getSingleChat(chatId)
      if (response.status === "success") {
        setCurrentChat(response.data)
        return response.data
      }
    } catch (error) {
      console.error("Error fetching chat:", error)
      toast.error("Failed to load chat")
      throw error
    } finally {
      setLoading(false)
    }
  }

  const updateChatTitle = async (chatId, newTitle) => {
    try {
      const response = await chatService.updateChatTitle(chatId, newTitle)
      if (response.status === "success") {
        toast.success("Chat renamed successfully!")
        return response.data
      }
    } catch (error) {
      console.error("Error updating chat title:", error)
      toast.error("Failed to rename chat")
      throw error
    }
  }

  const deleteChat = async (chatId) => {
    try {
      const response = await chatService.deleteChat(chatId)
      if (response.status === "success") {
        toast.success("Chat deleted successfully!")
        setChats(chats.filter((chat) => chat.id !== chatId))
        return true
      }
    } catch (error) {
      console.error("Error deleting chat:", error)
      toast.error("Failed to delete chat")
      throw error
    }
  }

  return {
    loading,
    chats,
    currentChat,
    createChat,
    addMessageToChat,
    getAllChats,
    getSingleChat,
    updateChatTitle,
    deleteChat,
  }
}
