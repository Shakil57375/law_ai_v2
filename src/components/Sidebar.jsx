import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { LuLibraryBig, LuLogOut } from 'react-icons/lu';
import { CgPushChevronLeft } from 'react-icons/cg';
import { FaAngleDown, FaAngleUp, FaBars } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { selectAccessToken, userLoggedOut } from '../features/auth/authSlice';
import {
  useDeleteChatMutation,
  useGetChatsQuery,
  useUpdateChatTitleMutation,
} from '../features/chat/chatApi';
import { useChat } from '../context/ChatContext';
import { useGetUserProfileQuery } from '../features/auth/authApi';
import { format, isToday, isYesterday } from 'date-fns';
import toast from 'react-hot-toast';
import FeedbackForm from './FeedbackForm';
import { FiCheck, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';
import { MdDeleteSweep } from 'react-icons/md';
import axios from 'axios';
import './sidebar.css';
import { ChevronsLeftIcon } from './ChevronsLeftIcon';
import { MenuIcon } from './MenuIcon';
import logo from '../assets/logo.png';
import { useLanguage } from '../../lib/language-context';
import { getTranslation } from '../../lib/i18n';

export function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
  closeBothSidebars,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);
  const [searchTerm, setSearchTerm] = useState('');
  const [editChatId, setEditChatId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showChatHistory, setShowChatHistory] = useState(true);
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);
  const [hoveredChatId, setHoveredChatId] = useState(null);
  const [showDeleteChatModal, setShowDeleteChatModal] = useState(false);
  const [chatToDelete, setChatToDelete] = useState(null);

  const token = useSelector(selectAccessToken);

  const { data: user } = useGetUserProfileQuery();
  const { data: chats = [], refetch } = useGetChatsQuery();
  const [renameChat] = useUpdateChatTitleMutation();
  const [deleteChat] = useDeleteChatMutation();
  const { handleClearId } = useChat();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (showDeleteAllModal) {
          setShowDeleteAllModal(false);
          setIsDeleting(false);
        }
        if (showDeleteChatModal) {
          setShowDeleteChatModal(false);
          setChatToDelete(null);
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showDeleteChatModal, showDeleteAllModal]);

  const handleDeleteAllChats = async () => {
    setIsDeleting(true);
    try {
      await axios.delete(
        'https://parliament-curves-cancel-foreign.trycloudflare.com/api/chat/delete_all_chats/',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success('All chats deleted successfully!');
      setShowDeleteAllModal(false);
      refetch();
      handleClearId();
      navigate('/');
    } catch (error) {
      console.error('Error deleting all chats:', error);
      toast.error('Failed to delete all chats.');
    } finally {
      setIsDeleting(false);
    }
  };

  const groupChatsByDate = (chats) => {
    const sortedChats = [...(chats?.data || [])].sort((a, b) => {
      return new Date(b.timestamp) - new Date(a.timestamp);
    });

    const groupedChats = {
      today: [],
      yesterday: [],
      other: {},
    };

    sortedChats.forEach((chat) => {
      const chatDate = new Date(chat.timestamp);
      if (isToday(chatDate)) {
        groupedChats.today.push(chat);
      } else if (isYesterday(chatDate)) {
        groupedChats.yesterday.push(chat);
      } else {
        const formattedDate = format(chatDate, 'yyyy-MM-dd');
        if (!groupedChats.other[formattedDate]) {
          groupedChats.other[formattedDate] = [];
        }
        groupedChats.other[formattedDate].push(chat);
      }
    });

    return groupedChats;
  };

  const groupedChats = groupChatsByDate(chats);

  const handleSaveEdit = async () => {
    if (editTitle.trim() === '') {
      toast.error('Chat name cannot be empty!');
      return;
    }

    try {
      await renameChat({ chatId: editChatId, title: editTitle }).unwrap();
      toast.success('Chat renamed successfully!');
      setEditChatId(null);
      setEditTitle('');
      refetch();
    } catch (error) {
      console.error('Error renaming chat:', error);
      toast.error('Failed to rename chat.');
    }
  };

  const handleDeleteChat = async (chatId) => {
    try {
      await deleteChat(chatId);
      toast.success('Chat deleted successfully!');
      refetch();
      handleClearId();
      navigate('/');
      if (chatId === window.location.pathname.split('/').pop()) {
        navigate('/');
      }
    } catch (error) {
      console.error('Error deleting chat:', error);
      toast.error('Failed to delete chat.');
    }
  };

  const isChatEmpty = (groupedChats) => {
    const { today, yesterday, other } = groupedChats;
    return (
      today.length === 0 &&
      yesterday.length === 0 &&
      Object.keys(other).every((key) => other[key].length === 0)
    );
  };

  const searchChats = (chats) => {
    return chats?.data?.filter((chat) => {
      const matchesSearch =
        debouncedSearchTerm === '' ||
        chat.title?.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      return matchesSearch;
    });
  };

  const filteredTodayChats = searchChats({ data: groupedChats.today });
  const filteredYesterdayChats = searchChats({ data: groupedChats.yesterday });
  const filteredOtherChats = Object.keys(groupedChats.other).reduce(
    (acc, date) => {
      acc[date] = searchChats({ data: groupedChats.other[date] });
      return acc;
    },
    {}
  );

  const renderChatItem = (chat) => (
    <div
      key={chat.id}
      className="relative group mb-1"
      onMouseEnter={() => setHoveredChatId(chat.id)}
      onMouseLeave={() => setHoveredChatId(null)}
    >
      {editChatId === chat.id ? (
        <div className="flex items-center gap-2 px-2 py-2 bg-gray-50 dark:bg-gray-600 rounded-lg">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white text-black"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSaveEdit();
              if (e.key === 'Escape') {
                setEditChatId(null);
                setEditTitle('');
              }
            }}
          />
          <button
            onClick={handleSaveEdit}
            className="p-1.5 text-green-600 hover:bg-green-50 dark:hover:bg-green-900 rounded transition-colors"
            title="Save"
          >
            <FiCheck className="text-base" />
          </button>
          <button
            onClick={() => {
              setEditChatId(null);
              setEditTitle('');
            }}
            className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded transition-colors"
            title="Cancel"
          >
            <FiX className="text-base" />
          </button>
        </div>
      ) : (
        <div className="relative flex items-center">
          <NavLink
            to={`/chat/${chat.id}`}
            onClick={handleChatClick}
            className={({ isActive }) =>
              `flex-1 px-3 py-2 rounded-lg transition-all text-sm ${
                isActive
                  ? 'bg-teal-100 dark:bg-teal-900 text-teal-900 dark:text-teal-100 font-semibold border-l-gray-500 border-l-4'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200'
              }`
            }
          >
            <span className="block truncate">
              {chat?.title.length > 30
                ? chat.title.slice(0, 30) + '...'
                : chat.title}
            </span>
          </NavLink>

          <AnimatePresence>
            {hoveredChatId === chat.id && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                className="absolute right-2 flex items-center gap-1 bg-white dark:bg-gray-700 rounded-lg shadow-md border border-gray-200 dark:border-gray-600 px-1 py-1 z-10"
              >
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setEditChatId(chat.id);
                    setEditTitle(chat.title || 'Untitled Chat');
                    setHoveredChatId(null);
                  }}
                  className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded transition-colors"
                  title="Rename"
                >
                  <FiEdit2 className="text-sm" />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setChatToDelete(chat.id);
                    setShowDeleteChatModal(true);
                    setHoveredChatId(null);
                  }}
                  className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded transition-colors"
                  title="Delete"
                >
                  <FiTrash2 className="text-sm" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );

  const handleNewChat = () => {
    handleClearId();
    navigate('/');
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  const handleChatClick = () => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  const handleLogOut = () => {
    dispatch(userLoggedOut());
    navigate('/login');
  };

  const handleToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative">
      {/* Mobile Backdrop with Blur Effect */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={closeBothSidebars}
          style={{
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          }}
        />
      )}

      {/* Sidebar Toggle Button - Fixed Position (Desktop Only) */}
      {!isSidebarOpen && (
        <div className="fixed top-2 left-4 z-50 block">
          <button
            onClick={handleToggle}
            className="p-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl shadow-lg transition-all duration-200 hover:scale-105"
            title="Open Sidebar"
          >
            <MenuIcon size={24} duration={1} />
          </button>
        </div>
      )}

      {/* Sidebar Content */}
      <div
        className={`fixed  lg:static inset-y-0 left-0 z-50 lg:z-auto bg-white dark:bg-gray-800 shadow-xl flex flex-col h-screen transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        style={{
          width: window.innerWidth < 1024 ? '66.666%' : '100%', // 2/3 on mobile, full on desktop
          maxWidth: window.innerWidth < 1024 ? '66.666%' : 'none',
        }}
      >
        {/* Header */}
        <div className="flex-shrink-0 px-4 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <Link
              to="/home"
              className="text-xl font-bold text-teal-600 dark:text-teal-400"
            >
              <img src={logo} alt="" className="lg:w-16 lg:h-16 w-12 h-12" />
            </Link>
            <button
              onClick={handleToggle}
              title="Close Sidebar"
              className="relative top-1"
            >
              <ChevronsLeftIcon
                size={32}
                duration={1}
                className="text-cyan-600 cursor-pointer"
              />
            </button>
          </div>

          {/* New Chat Button */}
          <button
            onClick={handleNewChat}
            className="w-full py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
          >
            <span className="text-xl">+</span>
            <span>{t('chat.newChat')}</span>
          </button>
        </div>

        {/* Search */}
        <div className="flex-shrink-0 px-4 py-3">
          <input
            type="text"
            placeholder={t('chat.searchChats')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>

        {/* Library Toggle */}
        <div
          className="flex-shrink-0 px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          onClick={() => setShowChatHistory(!showChatHistory)}
        >
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <LuLibraryBig className="text-lg" />
            <span className="font-semibold text-sm">{t('chat.library')}</span>
          </div>
          {showChatHistory ? (
            <FaAngleDown className="text-gray-500" />
          ) : (
            <FaAngleUp className="text-gray-500" />
          )}
        </div>

        {/* Chat List */}
        {showChatHistory && (
          <div className="flex-1 overflow-y-auto px-4 py-2 custom-scrollbar ml-10 max-h-80">
            {isChatEmpty(groupedChats) ? (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {t('chat.noChats')}
                </p>
                <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
                  {t('chat.startConversation')}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTodayChats?.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-2">
                      {t('chat.today')}
                    </h3>
                    {filteredTodayChats.map(renderChatItem)}
                  </div>
                )}

                {filteredYesterdayChats?.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-2">
                      {t('chat.yesterday')}
                    </h3>
                    {filteredYesterdayChats.map(renderChatItem)}
                  </div>
                )}

                {Object.entries(filteredOtherChats).map(
                  ([date, chats]) =>
                    chats?.length > 0 && (
                      <div key={date}>
                        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-2">
                          {format(new Date(date), 'MMM dd, yyyy')}
                        </h3>
                        {chats.map(renderChatItem)}
                      </div>
                    )
                )}
              </div>
            )}
          </div>
        )}

        {/* Delete All Chats Button */}
        {!isChatEmpty(groupedChats) && (
          <div className="flex-shrink-0 px-4 py-1.5">
            <button
              onClick={() => setShowDeleteAllModal(true)}
              className="w-full py-2 px-3 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 font-medium rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <MdDeleteSweep className="text-lg" />
              <span>Delete All Chats</span>
            </button>
          </div>
        )}

        <div className="absolute lg:bottom-0 bottom-12 w-full">
          {/* Feedback Form */}
          <div className="px-4 py-3  border-gray-200 dark:border-gray-700">
            <FeedbackForm />
          </div>
        </div>
      </div>

      {/* Delete All Confirmation Modal */}
      {showDeleteAllModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4"
          onClick={() => setShowDeleteAllModal(false)}
        >
          <AnimatePresence>
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: -20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                  <MdDeleteSweep className="text-2xl text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Delete All Chats?
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                This will permanently delete all your chat history. This action
                cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteAllModal(false)}
                  disabled={isDeleting}
                  className="flex-1 py-2.5 px-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAllChats}
                  disabled={isDeleting}
                  className="flex-1 py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isDeleting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <>
                      <FiTrash2 />
                      <span>Delete All</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* Delete Single Chat Confirmation Modal */}
      {showDeleteChatModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4"
          onClick={() => {
            setShowDeleteChatModal(false);
            setChatToDelete(null);
          }}
        >
          <AnimatePresence>
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: -20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                  <FiTrash2 className="text-2xl text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Delete Chat?
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                This will permanently delete this chat. This action cannot be
                undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDeleteChatModal(false);
                    setChatToDelete(null);
                  }}
                  className="flex-1 py-2.5 px-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (chatToDelete) {
                      handleDeleteChat(chatToDelete);
                    }
                    setShowDeleteChatModal(false);
                    setChatToDelete(null);
                  }}
                  className="flex-1 py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <FiTrash2 className="text-lg" />
                  <span>Delete</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
