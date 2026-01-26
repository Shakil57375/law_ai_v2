import { useState } from 'react';
import { useGetUserProfileQuery } from '../features/auth/authApi.js';
import { IoMoon, IoSunny } from 'react-icons/io5';
import ProfileModal from './ProfileModal';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';
import { useLanguage } from '../../lib/language-context';
import { motion } from 'framer-motion';
import userImage from '../assets/fahad_Bhai.png';

export function Header() {
  const { data: userProfile } = useGetUserProfileQuery();
  const [dark, setDark] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  const user = userProfile?.data;

  const darkModeHandler = () => {
    const newMode = !dark;
    setDark(newMode);
    document.body.classList.toggle('dark', newMode);
    localStorage.setItem('darkMode', newMode);
  };

  return (
    <>
      <div className="w-full ml-auto">
        <header className="bg-transparent dark:text-white text-[#161C2D] px-2 sm:px-3 py-2 flex items-center justify-end z-40 fixed top-0 right-0 w-full md:w-auto lg:rounded-bl-2xl ">
          <div className="flex items-center gap-3 w-full justify-end">
            {/* Language Toggle */}
            <div className="flex items-center bg-teal-100 dark:bg-teal-900 rounded-full p-1 relative">
              <motion.div
                className="absolute top-1 bottom-1 bg-teal-600 dark:bg-teal-500 rounded-full"
                initial={false}
                animate={{
                  left: language === 'bn' ? '4px' : '50%',
                  right: language === 'en' ? '4px' : '50%',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
              <button
                onClick={() => setLanguage('bn')}
                className={`relative z-10 px-3 sm:px-4 py-1.5 rounded-full font-medium text-xs sm:text-sm transition-colors ${
                  language === 'bn'
                    ? 'text-white'
                    : 'text-teal-700 dark:text-teal-300'
                }`}
              >
                বাং
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`relative z-10 px-3 sm:px-4 py-1.5 rounded-full font-medium text-xs sm:text-sm transition-colors ${
                  language === 'en'
                    ? 'text-white'
                    : 'text-teal-700 dark:text-teal-300'
                }`}
              >
                EN
              </button>
            </div>

            {/* Dark Mode Toggle */}
            <div
              onClick={darkModeHandler}
              className={`relative flex items-center w-12 sm:w-14 h-7 sm:h-9 rounded-full cursor-pointer shadow-lg p-1 transition-colors duration-700 ease-in-out ${
                dark ? 'bg-blue-800' : 'bg-yellow-400'
              }`}
            >
              {/* Moon */}
              <div
                className={`absolute left-0 lg:top-1.5  flex items-center justify-center w-6 h-6 rounded-full transform transition-all duration-700 ease-in-out ${
                  dark
                    ? 'translate-x-[4px] opacity-100 bg-white text-blue-800'
                    : 'translate-x-[40px] opacity-0'
                }`}
              >
                <IoMoon size={14} />
              </div>

              {/* Sun */}
              <div
                className={`absolute lg:top-1.5  right-12 flex items-center justify-center w-6 h-6 rounded-full transform transition-all duration-700 ease-in-out ${
                  dark
                    ? '-translate-x-[30px] opacity-0'
                    : 'translate-x-[45px] opacity-100 bg-white text-yellow-500'
                }`}
              >
                <IoSunny size={14} />
              </div>
            </div>
            {/* Profile Section */}
            <div
              onClick={() => setIsProfileModalOpen(true)}
              className="flex items-center gap-3 cursor-pointer select-none"
            >
              <img
                src={user?.profile_picture || userImage}
                alt="Profile"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover ring-2 ring-teal-500 ring-offset-2"
              />

              {isProfileModalOpen ? (
                <FaChevronUp
                  className="cursor-pointer"
                  onClick={() => setIsProfileModalOpen(false)}
                />
              ) : (
                <FaChevronDown
                  className="cursor-pointer"
                  onClick={() => setIsProfileModalOpen(true)}
                />
              )}
            </div>
          </div>
        </header>
      </div>

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </>
  );
}
