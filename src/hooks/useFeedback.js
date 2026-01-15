"use client"

import { useState } from "react"
import feedbackService from "../services/feedbackService"
import toast from "react-hot-toast"

export function useFeedback() {
  const [loading, setLoading] = useState(false)

  const sendFeedback = async (feedbackText, stars) => {
    setLoading(true)
    try {
      const response = await feedbackService.sendFeedback(feedbackText, stars)
      if (response.status === "success") {
        toast.success("Feedback submitted successfully!")
        return response.data
      }
    } catch (error) {
      console.error("Error submitting feedback:", error)
      toast.error("Failed to submit feedback")
      throw error
    } finally {
      setLoading(false)
    }
  }

  const submitHelpSupport = async (email, description) => {
    setLoading(true)
    try {
      const response = await feedbackService.submitHelpSupport(email, description)
      if (response.status === "success") {
        toast.success("Support request submitted successfully!")
        return response.data
      }
    } catch (error) {
      console.error("Error submitting support request:", error)
      toast.error("Failed to submit support request")
      throw error
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    sendFeedback,
    submitHelpSupport,
  }
}
