"use client"

import { useState } from "react"
import userService from "../services/userService"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { userUpdated } from "../features/auth/authSlice"

export function useUser() {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  const getUserProfile = async () => {
    setLoading(true)
    try {
      const response = await userService.getUserProfile()
      if (response.status === "success") {
        setUser(response.data)
        dispatch(userUpdated(response.data))
        return response.data
      }
    } catch (error) {
      console.error("Error fetching user profile:", error)
      toast.error("Failed to load user profile")
      throw error
    } finally {
      setLoading(false)
    }
  }

  const updateUserProfile = async (profileData) => {
    setLoading(true)
    try {
      const response = await userService.updateUserProfile(profileData)
      if (response.status === "success") {
        setUser(response.data)
        dispatch(userUpdated(response.data))
        toast.success("Profile updated successfully!")
        return response.data
      }
    } catch (error) {
      console.error("Error updating profile:", error)
      toast.error(error.response?.data?.error?.[0] || "Failed to update profile")
      throw error
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    user,
    getUserProfile,
    updateUserProfile,
  }
}
