import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoMdCamera, IoMdClose } from 'react-icons/io';
import { FiEdit2, FiSave, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { userUpdated } from '../../features/auth/authSlice';
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from '../../features/auth/authApi';
import { useLanguage } from '../../../lib/language-context';
import { getTranslation } from '../../../lib/i18n';

const ProfileModal = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState({
    full_name: '',
    designation: '',
    university: '',
    profile_picture: null,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const dispatch = useDispatch();

  const {
    data: userProfile,
    isLoading,
    error,
    refetch,
  } = useGetUserProfileQuery();

  const [updateUserProfile, { isLoading: isUpdating }] =
    useUpdateUserProfileMutation();

  useEffect(() => {
    if (userProfile?.data) {
      const profile = userProfile.data;
      setTempData({
        full_name: profile.full_name || '',
        designation: profile.designation || '',
        university: profile.university || '',
        profile_picture: null,
      });
      setPreviewImage(profile.profile_picture || null);
      dispatch(userUpdated(profile));
    }
  }, [userProfile, dispatch]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      setTempData({ ...tempData, profile_picture: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('full_name', tempData.full_name || '');
      formData.append('designation', tempData.designation || '');
      formData.append('university', tempData.university || '');

      if (tempData.profile_picture instanceof File) {
        formData.append('image', tempData.profile_picture);
      }

      const response = await updateUserProfile(formData).unwrap();
      dispatch(userUpdated(response.data));
      toast.success('Profile updated successfully!');
      refetch();
      setIsEditing(false);
    } catch (err) {
      toast.error(err?.data?.error?.[0] || 'Failed to update profile');
    }
  };

  const handleCancel = () => {
    if (userProfile?.data) {
      const profile = userProfile.data;
      setTempData({
        full_name: profile.full_name || '',
        designation: profile.designation || '',
        university: profile.university || '',
        profile_picture: null,
      });
      setPreviewImage(profile.profile_picture || null);
    }
    setIsEditing(false);
  };

  const handleClose = () => {
    handleCancel();
    onClose();
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={handleClose}
        >
          <motion.div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <IoMdClose className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>

            {/* Content */}
            <div className="p-6 sm:p-8 lg:p-10">
              {isLoading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : error ? (
                <div className="text-center py-20 text-red-500">
                  Error loading profile
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Header */}
                  <div className="text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
                      {isEditing
                        ? t('profile.editProfile')
                        : t('profile.myProfile')}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">
                      {isEditing
                        ? t('profile.updateInformation')
                        : t('profile.viewDetails')}
                    </p>
                  </div>

                  {/* Profile Image */}
                  <motion.div
                    className="flex justify-center"
                    whileHover={{ scale: isEditing ? 1.05 : 1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="relative">
                      <img
                        src={
                          previewImage ||
                          'https://i.ibb.co.com/tdxM1S4/fahad-Bhai.png'
                        }
                        alt="Profile"
                        className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-teal-500 shadow-lg"
                      />
                      {isEditing && (
                        <motion.label
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute bottom-2 right-2 p-3 rounded-full bg-teal-600 text-white shadow-lg cursor-pointer hover:bg-teal-700 transition-colors"
                        >
                          <IoMdCamera className="w-5 h-5" />
                          <input
                            type="file"
                            className="hidden"
                            onChange={handleImageUpload}
                            accept="image/*"
                          />
                        </motion.label>
                      )}
                    </div>
                  </motion.div>

                  {/* Form Fields */}
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        {t('profile.fullName')}
                      </label>
                      <input
                        type="text"
                        value={tempData.full_name}
                        onChange={(e) =>
                          setTempData({
                            ...tempData,
                            full_name: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                        placeholder={t('profile.enterFullName')}
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600  text-[#161C2D] dark:bg-gray-700 dark:text-white focus:border-teal-500 focus:ring-2 focus:ring-teal-200 dark:focus:ring-teal-800 disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:cursor-not-allowed transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        {t('profile.designation')}
                      </label>
                      <input
                        type="text"
                        value={tempData.designation}
                        onChange={(e) =>
                          setTempData({
                            ...tempData,
                            designation: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                        placeholder={t('profile.enterDesignation')}
                        className="w-full px-4 py-3 rounded-lg border-2 text-[#161C2D] border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-teal-500 focus:ring-2 focus:ring-teal-200 dark:focus:ring-teal-800 disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:cursor-not-allowed transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        {t('profile.university')}
                      </label>
                      <input
                        type="text"
                        value={tempData.university}
                        onChange={(e) =>
                          setTempData({
                            ...tempData,
                            university: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                        placeholder={t('profile.enterUniversity')}
                        className="w-full px-4 py-3 rounded-lg border-2 text-[#161C2D] border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-teal-500 focus:ring-2 focus:ring-teal-200 dark:focus:ring-teal-800 disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:cursor-not-allowed transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        {t('profile.email')}
                      </label>
                      <input
                        type="email"
                        value={userProfile?.data?.email || ''}
                        disabled
                        className="w-full px-4 py-3 rounded-lg border-2 text-[#161C2D] border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 dark:text-gray-400 cursor-not-allowed"
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    {isEditing ? (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleSave}
                          disabled={isUpdating}
                          className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg text-white font-semibold bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transition-all"
                        >
                          {isUpdating ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              {t('profile.updating')}...
                            </>
                          ) : (
                            <>
                              <FiSave className="w-5 h-5" />
                              {t('profile.save')}
                            </>
                          )}
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleCancel}
                          className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg border-2 border-gray-300 dark:border-gray-600 font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                        >
                          <FiX className="w-5 h-5" />
                          {t('profile.cancel')}
                        </motion.button>
                      </>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsEditing(true)}
                        className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg text-white font-semibold bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 shadow-lg transition-all"
                      >
                        <FiEdit2 className="w-5 h-5" />
                        {t('profile.editProfile')}
                      </motion.button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProfileModal;
