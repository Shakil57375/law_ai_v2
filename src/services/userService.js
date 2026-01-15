import axiosClient from "./axiosClient"

const userService = {
  // Get user profile
  getUserProfile: async () => {
    const response = await axiosClient.get("/auth/user-info/")
    return response.data
  },

  // Update user profile
  updateUserProfile: async (profileData) => {
    const formData = new FormData()

    if (profileData.full_name) {
      formData.append("full_name", profileData.full_name)
    }
    if (profileData.designation) {
      formData.append("designation", profileData.designation)
    }
    if (profileData.university) {
      formData.append("university", profileData.university)
    }
    if (profileData.image instanceof File) {
      formData.append("image", profileData.image)
    }

    const response = await axiosClient.patch("/auth/update-profile/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    return response.data
  },
}

export default userService
