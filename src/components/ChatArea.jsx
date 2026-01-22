import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoAttach, IoCopyOutline } from 'react-icons/io5';
import { MdImage, MdDescription } from 'react-icons/md';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import AiImage from '../assets/ai_logo.png';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { selectAccessToken, selectUser } from '../features/auth/authSlice';
import { useChat } from '../context/ChatContext';
import {
  useGetChatContentsQuery,
  useGetChatsQuery,
} from '../features/chat/chatApi';
import { useGetUserProfileQuery } from '../features/auth/authApi';
import {
  createChatAxios,
  addMessageToChatAxios,
} from '../services/chatAxiosService';
import Loader from './Loader/Loader';
import { RichTextDisplay } from './RichTextDisplay';
import { LuSend } from 'react-icons/lu';
import ClickOutside from './CloseOutsideClick';
import { useLanguage } from '../../lib/language-context';
import { getTranslation } from '../../lib/i18n';

export function ChatArea() {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);

  const MODELS = {
    CartWright: {
      name: t('chat.models.cartwright.name'),
      label: t('chat.models.cartwright.label'),
      icon: '🧠',
    },
    TranscriptX: {
      name: t('chat.models.transcriptx.name'),
      label: t('chat.models.transcriptx.label'),
      icon: '💡',
    },
    Redactify: {
      name: t('chat.models.redactify.name'),
      label: t('chat.models.redactify.label'),
      icon: '📸',
    },
    Validify: {
      name: t('chat.models.validify.name'),
      label: t('chat.models.validify.label'),
      icon: '🔍',
    },
  };

  const { id: currentChatId } = useParams();
  const navigate = useNavigate();
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('CartWright');
  const [input, setInput] = useState('');
  const [attachedFile, setAttachedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadType, setUploadType] = useState(null);
  const [showMediaDropdown, setShowMediaDropdown] = useState(false);
  const [showModelDropdown, setShowModelDropdown] = useState(false);

  const caseStudyInputRef = useRef(null);
  const documentInputRef = useRef(null);
  const chatContainerRef = useRef(null);
  const mediaDropdownRef = useRef(null);
  const modelDropdownRef = useRef(null);
  const textareaRef = useRef(null);
  const attachButtonRef = useRef(null);
  const modelButtonRef = useRef(null);

  const {
    data: userProfile,
    isLoading,
    error,
    refetch: refetchUserProfile,
  } = useGetUserProfileQuery();
  const user = useSelector(selectUser);
  const token = useSelector(selectAccessToken);
  const { chatMessages, setChatMessages, setChatId, handleClearId } = useChat();
  const { data: chats = [], refetch } = useGetChatsQuery();
  const { data: chatContentsData, refetch: refetchChatContents } =
    useGetChatContentsQuery(currentChatId, {
      skip: !currentChatId,
    });

  useEffect(() => {
    if (chatContentsData?.data?.messages) {
      setChatMessages(chatContentsData.data.messages);
    }
  }, [chatContentsData, setChatMessages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  // Auto-resize textarea with mobile-friendly constraints
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const maxHeight = window.innerWidth < 768 ? 120 : 200; // Smaller max height on mobile
      textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + 'px';
    }
  }, [input]);

  const smoothScrollToBottom = useCallback(() => {
    const chatContainer = chatContainerRef.current;
    if (!chatContainer) return;
    const start = chatContainer.scrollTop;
    const end = chatContainer.scrollHeight;
    const duration = 300;
    const startTime = performance.now();

    const animateScroll = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      chatContainer.scrollTop = start + (end - start) * progress;
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  }, []);

  useEffect(() => {
    smoothScrollToBottom();
  }, [chatMessages, isAiLoading, smoothScrollToBottom]);

  const handleCaseStudyUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedImageTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/svg+xml',
      'image/webp',
    ];

    if (!allowedImageTypes.includes(file.type)) {
      toast.error(
        'Case Study only accepts image files (JPG, PNG, GIF, SVG, WebP)'
      );
      event.target.value = null;
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB');
      event.target.value = null;
      return;
    }

    setAttachedFile(file);
    setUploadType('caseStudy');
    try {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } catch (err) {
      setPreviewUrl(null);
    }
    toast.success('Case Study image selected!');
    setShowMediaDropdown(false);
  };

  const handleDocumentUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedDocTypes = ['application/pdf'];

    if (!allowedDocTypes.includes(file.type)) {
      toast.error('Document upload only accepts PDF files');
      event.target.value = null;
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      toast.error('File size must be less than 50MB');
      event.target.value = null;
      return;
    }

    setAttachedFile(file);
    setUploadType('document');
    setPreviewUrl(null);
    toast.success('PDF document selected!');
    setShowMediaDropdown(false);
  };

  const removeAttachedFile = () => {
    setAttachedFile(null);
    setUploadType(null);
    if (caseStudyInputRef.current) caseStudyInputRef.current.value = null;
    if (documentInputRef.current) documentInputRef.current.value = null;
    if (previewUrl) {
      try {
        URL.revokeObjectURL(previewUrl);
      } catch (e) {
        console.error(e);
      }
      setPreviewUrl(null);
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        try {
          URL.revokeObjectURL(previewUrl);
        } catch (e) {
          console.error(e);
        }
      }
    };
  }, [previewUrl]);

  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (isAiLoading || (!input.trim() && !attachedFile)) return;

    const tempMessageId = `temp-${Date.now()}`;
    const userMessage = {
      id: tempMessageId,
      sent_by: 'user',
      text: input,
      timestamp: new Date().toISOString(),
      model_name: selectedModel,
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setInput('');
    setAttachedFile(null);
    setUploadType(null);
    if (caseStudyInputRef.current) caseStudyInputRef.current.value = null;
    if (documentInputRef.current) documentInputRef.current.value = null;
    setIsAiLoading(true);

    try {
      let newChatId = currentChatId;

      if (!currentChatId) {
        const formData = new FormData();
        formData.append('text', input);
        if (attachedFile) {
          if (uploadType === 'document') {
            formData.append('documents', attachedFile);
          } else if (uploadType === 'caseStudy') {
            formData.append('case_studies', attachedFile);
          }
        }

        const response = await createChatAxios(formData);
        refetch();
        newChatId = response?.data?.id;
        setChatId(newChatId);
        navigate(`/chat/${newChatId}`);
      } else {
        const formData = new FormData();
        formData.append('chat_id', currentChatId);
        formData.append('text', input);
        if (attachedFile) {
          if (uploadType === 'document') {
            formData.append('documents', attachedFile);
          } else if (uploadType === 'caseStudy') {
            formData.append('case_studies', attachedFile);
          }
        }

        await addMessageToChatAxios(formData);
        await refetchChatContents();
      }
    } catch (error) {
      console.error('Error:', error);
      setChatMessages((prev) => prev.filter((msg) => msg.id !== tempMessageId));
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    // Submit on Enter (without Shift)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
    // Submit on Ctrl+Enter or Cmd+Enter
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleCopy = (content) => {
    navigator.clipboard
      .writeText(content)
      .then(() => {
        toast.success('Response copied to clipboard!');
      })
      .catch((err) => {
        console.error('Failed to copy:', err);
        toast.error('Failed to copy response.');
      });
  };

  const handleModelSelect = (modelName) => {
    setSelectedModel(modelName);
    setShowModelDropdown(false);
    if (!currentChatId) {
      navigate('/');
      handleClearId();
    }
  };

  const isInitialScreen = !chatMessages?.length && !currentChatId;

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-white to-[#15B8A6] dark:from-gray-800 dark:to-gray-900">
      <div className="flex-1 flex flex-col overflow-hidden relative min-h-0">
        <div
          ref={chatContainerRef}
          className="chat-container flex-1 overflow-y-auto px-4 md:px-6 lg:px-8 space-y-6 pt-32 md:pt-28 pb-4 max-w-4xl w-full mx-auto min-w-[300px]"
        >
          {isInitialScreen ? (
            <div className="flex flex-col items-center justify-center h-full max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <div className="inline-block mb-6 p-4 bg-white rounded-full shadow-lg">
                  <img
                    src={AiImage || '/placeholder.svg'}
                    alt="AI"
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full"
                  />
                </div>
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-teal-600 mb-2">
                  Hey {user?.name === 'null' ? 'Armando' : user?.name}!
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl text-gray-700 font-semibold mb-4">
                  Can I help you with anything?
                </p>
                <p className="text-gray-600 mb-8">
                  Ready to assist you with anything you need.
                </p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 justify-center items-center mb-8 w-full max-w-2xl px-4">
                {Object.entries(MODELS).map(([key, model]) => (
                  <button
                    key={key}
                    onClick={() => handleModelSelect(key)}
                    className={`py-2 px-3 rounded-xl font-semibold transition-all duration-200 text-sm ${
                      selectedModel === key
                        ? 'bg-teal-500 text-white border-2 border-teal-600 shadow-md'
                        : 'bg-white border-2 border-teal-400 text-teal-600 hover:bg-teal-50 hover:shadow-md'
                    }`}
                  >
                    <span className="mr-2">{model.icon}</span>
                    {model.label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {chatMessages?.map((message, index) => (
                <div
                  key={message.id}
                  className={`flex gap-3 md:gap-4 max-w-4xl min-w-[300px] ${
                    message.sent_by === 'user'
                      ? 'ml-auto justify-end'
                      : 'mr-auto justify-start'
                  }`}
                >
                  {message.sent_by === 'bot' && (
                    <img
                      src={AiImage || '/placeholder.svg'}
                      alt="AI"
                      className="w-7 h-7 md:w-8 md:h-8 rounded-full flex-shrink-0 mt-1"
                    />
                  )}

                  <div className={`flex flex-col max-w-[85%] md:max-w-2xl`}>
                    <div
                      className={`rounded-2xl px-4 py-3 md:px-5 md:py-4 ${
                        message.sent_by === 'bot'
                          ? ' text-gray-800 shadow-sm dark:text-white'
                          : 'bg-teal-500 text-white shadow-sm'
                      }`}
                    >
                      <RichTextDisplay content={message.text} />
                    </div>

                    {/* <div className="text-xs text-gray-500 mt-1.5 px-2">
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div> */}
                    {/* 
                    {message.sent_by === 'bot' && (
                      <div className="flex items-center gap-2 mt-2 px-2">
                        <button
                          onClick={() => handleCopy(message.text)}
                          className="p-1.5 text-gray-500 hover:text-teal-600 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
                          title="Copy response"
                        >
                          <IoCopyOutline className="text-base" />
                        </button>
                      </div>
                    )} */}
                  </div>

                  {message.sent_by === 'user' && (
                    <img
                      src={userProfile?.data?.profile_picture}
                      alt="User"
                      className="w-7 h-7 md:w-8 md:h-8 rounded-full flex-shrink-0 mt-1 object-cover ring-2 ring-teal-500"
                    />
                  )}
                </div>
              ))}

              {isAiLoading && (
                <div className="flex gap-3 md:gap-4 max-w-4xl min-w-[300px]">
                  <img
                    src={AiImage || '/placeholder.svg'}
                    alt="AI"
                    className="w-7 h-7 md:w-8 md:h-8 rounded-full flex-shrink-0"
                  />
                  <div className="bg-white rounded-2xl px-5 py-4 shadow-sm dark:bg-gray-700">
                    <Loader />
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Input Area Container */}
        <div className="flex-shrink-0  border-gray-200 border-opacity-45  pb-safe">
          <div className="max-w-4xl mx-auto px-3 md:px-6 py-3 md:py-4">
            {/* Model Selector */}
            {!isInitialScreen && (
              <div className="pb-2 md:pt-0">
                <div ref={modelDropdownRef} className="relative inline-block">
                  <button
                    ref={modelButtonRef}
                    type="button"
                    onClick={() => setShowModelDropdown(!showModelDropdown)}
                    className="px-2.5 py-1.5 bg-teal-50 text-teal-700 rounded-lg text-xs font-semibold hover:bg-teal-100 transition-colors flex items-center gap-1.5 border border-teal-200"
                    title="Select model"
                  >
                    <span className="text-sm">
                      {MODELS[selectedModel].icon}
                    </span>
                    <span className="hidden sm:inline text-xs">
                      {MODELS[selectedModel].label}
                    </span>
                    <FaChevronUp
                      className={`text-xs transition-transform ${
                        showModelDropdown ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {showModelDropdown && (
                    <ClickOutside
                      onClick={() => setShowModelDropdown(false)}
                      exceptionRef={modelButtonRef}
                    >
                      <div className="absolute bottom-full left-0 mb-2 bg-white dark:bg-gray-700 text-black border border-gray-200 dark:border-gray-600 rounded-xl shadow-xl z-50 min-w-48 overflow-hidden">
                        {Object.entries(MODELS).map(([key, model]) => (
                          <button
                            key={key}
                            type="button"
                            onClick={() => handleModelSelect(key)}
                            className={`w-full text-left px-4 py-2.5 flex items-center gap-2 transition-colors ${
                              selectedModel === key
                                ? 'bg-teal-50 text-teal-700 font-semibold dark:bg-teal-900 dark:text-teal-100'
                                : 'hover:bg-gray-50 dark:hover:bg-gray-600 dark:text-white'
                            }`}
                          >
                            <span>{model.icon}</span>
                            <span>{model.label}</span>
                            {selectedModel === key && (
                              <span className="ml-auto text-teal-600">✓</span>
                            )}
                          </button>
                        ))}
                      </div>
                    </ClickOutside>
                  )}
                </div>
              </div>
            )}

            {/* File Preview */}
            {attachedFile && (
              <div className="mb-2 p-2.5 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 flex items-center gap-2.5">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt={attachedFile.name}
                    className="w-12 h-12 object-cover rounded-lg border border-gray-300"
                  />
                ) : (
                  <div className="w-10 h-10 flex items-center justify-center bg-gray-200 dark:bg-gray-600 rounded-lg">
                    {uploadType === 'document' ? (
                      <MdDescription className="text-xl text-teal-600" />
                    ) : (
                      <MdImage className="text-xl text-teal-600" />
                    )}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-xs truncate">
                    {attachedFile.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {(attachedFile.size / 1024).toFixed(1)} KB •{' '}
                    {uploadType === 'document' ? 'PDF' : 'Image'}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={removeAttachedFile}
                  className="px-2.5 py-1 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 transition-colors flex-shrink-0"
                >
                  Remove
                </button>
              </div>
            )}

            {/* Input Box */}
            <form onSubmit={handleSubmit} className="relative">
              <div className="relative flex items-end gap-1 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-2xl shadow-sm focus-within:border-teal-500 focus-within:shadow-md transition-all">
                {/* Attach Button */}
                <div ref={mediaDropdownRef} className="relative flex-shrink-0">
                  <button
                    ref={attachButtonRef}
                    type="button"
                    onClick={() => setShowMediaDropdown(!showMediaDropdown)}
                    className="p-2 text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors ml-0.5 mb-0.5"
                    title="Attach file"
                  >
                    <IoAttach className="text-lg md:text-xl" />
                  </button>

                  {showMediaDropdown && (
                    <ClickOutside
                      onClick={() => setShowMediaDropdown(false)}
                      exceptionRef={attachButtonRef}
                    >
                      <div className="absolute bottom-full left-0 mb-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl shadow-xl z-50 min-w-56 overflow-hidden">
                        <button
                          type="button"
                          onClick={() => caseStudyInputRef.current?.click()}
                          className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors border-b border-gray-100 dark:border-gray-600"
                        >
                          <MdImage className="text-xl text-teal-600" />
                          <div>
                            <div className="font-semibold text-sm dark:text-white">
                              {t('chat.image')}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              JPG, PNG, GIF, SVG, WebP
                            </div>
                          </div>
                        </button>
                        <button
                          type="button"
                          onClick={() => documentInputRef.current?.click()}
                          className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                        >
                          <MdDescription className="text-xl text-teal-600" />
                          <div>
                            <div className="font-semibold text-sm dark:text-white">
                              {t('chat.document')}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              PDF files only
                            </div>
                          </div>
                        </button>
                      </div>
                    </ClickOutside>
                  )}

                  <input
                    type="file"
                    ref={caseStudyInputRef}
                    onChange={handleCaseStudyUpload}
                    className="hidden"
                    accept="image/jpeg,image/png,image/gif,image/svg+xml,image/webp"
                  />
                  <input
                    type="file"
                    ref={documentInputRef}
                    onChange={handleDocumentUpload}
                    className="hidden"
                    accept="application/pdf"
                  />
                </div>

                {/* Textarea */}
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t('chat.placeholder')}
                  rows={1}
                  className="flex-1 py-2.5 px-1 bg-transparent border-none focus:outline-none resize-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 overflow-y-auto text-sm md:text-base"
                  style={{
                    minHeight: '40px',
                    maxHeight: window.innerWidth < 768 ? '120px' : '200px',
                  }}
                />

                {/* Send Button */}
                <button
                  type="submit"
                  disabled={isAiLoading || (!input.trim() && !attachedFile)}
                  className={`flex-shrink-0 p-2 rounded-lg transition-all mr-1 mb-1 ${
                    isAiLoading || (!input.trim() && !attachedFile)
                      ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed'
                      : 'bg-teal-500 hover:bg-teal-600 text-white shadow-sm hover:shadow-md'
                  }`}
                  title="Send message (Enter or Ctrl+Enter)"
                >
                  <LuSend className="text-lg md:text-xl" />
                </button>
              </div>

              {/* Helper Text */}
              <div className="mt-1.5 text-xs text-gray-500 dark:text-gray-400 text-center hidden md:block">
                Law bot can make mistakes. Please verify critical information
                independently.
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
