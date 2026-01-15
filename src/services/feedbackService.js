import axiosClient from "./axiosClient"

const feedbackService = {
  // Send feedback
  sendFeedback: async (feedbackText, stars) => {
    const response = await axiosClient.post("/utilities/feedback/", {
      feedback_text: feedbackText,
      stars: stars,
    })
    return response.data
  },

  // Submit help & support request
  submitHelpSupport: async (email, description) => {
    const response = await axiosClient.post("/utilities/help-support/", {
      email,
      description,
    })
    return response.data
  },
}

export default feedbackService
