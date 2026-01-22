import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  IoAttach,
  IoSendSharp,
  IoRefresh,
  IoCopyOutline,
} from 'react-icons/io5';
import {
  FaThumbsUp,
  FaThumbsDown,
  FaChevronDown,
  FaChevronUp,
} from 'react-icons/fa';
import { FaMicrophone, FaUpDown } from 'react-icons/fa6';
import { MdImage, MdDescription } from 'react-icons/md';
import AiImage from '../assets/ai_logo.png';
import userImage from '../assets/file (5).png';
import md5 from 'md5';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { selectAccessToken, selectUser } from '../features/auth/authSlice';
import Loader from './Loader';
import { RichTextDisplay } from './RichTextDisplay';
import { VoiceRecorder } from './VoiceRecorder';
import { VoiceMessagePlayer } from './VoiceMessagePlayer';
import axios from 'axios';
import { useChat } from '../context/ChatContext';
import { useGetTokensQuery } from '../features/token/token';
import { useAuth } from '../context/AuthContext';
import {
  useGetChatContentsQuery,
  useGetChatsQuery,
} from '../features/chat/chatApi';
import { ArrowDownNarrowWide } from 'lucide-react';

const MODELS = {
  CartWright: { name: 'CartWright', label: 'Get Advice', icon: '🧠' },
  TranscriptX: { name: 'TranscriptX', label: 'Brainstorm', icon: '💡' },
  Redactify: { name: 'Redactify', label: 'Analyze Images', icon: '📸' },
  Validify: { name: 'Validify', label: 'Deep Search', icon: '🔍' },
};

export function ChatArea({
  setIsSidebarOpen,
  showHeaderAndSidebar,
  setInstructionInput,
}) {
  const { id: currentChatId } = useParams();
  const navigate = useNavigate();
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('CartWright');

  const caseStudyInputRef = useRef(null);
  const documentInputRef = useRef(null);
  const [attachedFile, setAttachedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadType, setUploadType] = useState(null); // 'caseStudy' or 'document'
  const [showMediaDropdown, setShowMediaDropdown] = useState(false);
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false);
  const [voiceAudioUrl, setVoiceAudioUrl] = useState(null);

  const { data: chats = [], refetch } = useGetChatsQuery();
  const { data: tokenData, refetch: tokenRefetch } = useGetTokensQuery();
  const { refetch: refetchChatContents } = useGetChatContentsQuery(
    currentChatId,
    { skip: !currentChatId }
  );

  const user = useSelector(selectUser);
  const token = useSelector(selectAccessToken);
  const { openTokenLimitModal } = useAuth();
  const { chatMessages, setChatMessages, setChatId, handleClearId } = useChat();

  const [feedbackState, setFeedbackState] = useState({});
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  const chatContainerRef = useRef(null);
  const mediaDropdownRef = useRef(null);
  const modelDropdownRef = useRef(null);

  const emailHash = user?.email
    ? md5(user.email.trim().toLowerCase())
    : 'default';

  const { data, isLoading: isChatLoading } = useGetChatContentsQuery(
    currentChatId,
    { skip: !currentChatId }
  );

  useEffect(() => {
    if (data?.data?.messages) {
      setChatMessages(data.data.messages);
    }
  }, [data, setChatMessages]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        mediaDropdownRef.current &&
        !mediaDropdownRef.current.contains(e.target)
      ) {
        setShowMediaDropdown(false);
      }
      if (
        modelDropdownRef.current &&
        !modelDropdownRef.current.contains(e.target)
      ) {
        setShowModelDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
    const file = event.target.files[0];
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
    const file = event.target.files[0];
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

  const TOKEN_LIMIT = 1500000;

  const isTokenLimitExceeded = () => {
    return tokenData?.total_usage >= TOKEN_LIMIT;
  };

  const handleTokenLimitExceeded = () => {
    toast.error('Token limit reached! Please subscribe to continue.');
    openTokenLimitModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isTokenLimitExceeded()) {
      handleTokenLimitExceeded();
      return;
    }

    if (isAiLoading || (!input.trim() && !attachedFile)) return;

    const tempMessageId = `temp-${Date.now()}`;
    const userMessage = {
      id: tempMessageId,
      sent_by: 'user',
      message_content: input,
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
        formData.append('model_name', selectedModel);
        formData.append('message_content', input);
        if (attachedFile) {
          formData.append('attached_file', attachedFile);
        }

        const response = await axios.post(
          'https://backend.lexbanglaai.com/api/chat/create_chat/',
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        refetch();
        tokenRefetch();
        newChatId = response?.data?.data?.id;
        setChatId(newChatId);
        navigate(`/chat/${newChatId}`);
      } else {
        const formData = new FormData();
        formData.append('chat_id', currentChatId);
        formData.append('message_content', input);
        formData.append('model_name', selectedModel);
        if (attachedFile) {
          formData.append('attached_file', attachedFile);
        }

        await axios.post(
          'https://backend.lexbanglaai.com/api/chat/add_message_to_chat/',
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        await tokenRefetch();
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

  const handleRegenerate = async (messageId) => {
    if (isTokenLimitExceeded()) {
      handleTokenLimitExceeded();
      return;
    }

    if (isAiLoading) return;

    const messageToRegenerate = chatMessages.find(
      (msg) => msg.id === messageId
    );
    if (!messageToRegenerate || messageToRegenerate.sent_by !== 'user') return;

    setIsAiLoading(true);

    try {
      const formData = new FormData();
      formData.append('chat_id', currentChatId);
      formData.append('message_content', messageToRegenerate.message_content);
      formData.append('model_name', messageToRegenerate.model_name);

      await axios.post(
        'https://backend.lexbanglaai.com/api/chat/add_message_to_chat/',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      await tokenRefetch();
      await refetchChatContents();
      toast.success('Message regenerated successfully!');
    } catch (error) {
      console.error('Error regenerating message:', error);
      toast.error('Failed to regenerate message. Please try again.');
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleLike = (messageId) => {
    setFeedbackState((prev) => {
      const currentState = prev[messageId] || { liked: false, disliked: false };
      if (currentState.liked) {
        return { ...prev, [messageId]: { liked: false, disliked: false } };
      } else {
        return { ...prev, [messageId]: { liked: true, disliked: false } };
      }
    });
  };

  const handleDislike = (messageId) => {
    setFeedbackState((prev) => {
      const currentState = prev[messageId] || { liked: false, disliked: false };
      if (currentState.disliked) {
        return { ...prev, [messageId]: { liked: false, disliked: false } };
      } else {
        return { ...prev, [messageId]: { liked: false, disliked: true } };
      }
    });
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

  const handleVoiceMessage = async (voiceData) => {
    if (isAiLoading) return;
    if (isTokenLimitExceeded()) {
      handleTokenLimitExceeded();
      return;
    }

    const tempMessageId = `temp-${Date.now()}`;
    const userMessage = {
      id: tempMessageId,
      sent_by: 'user',
      message_type: 'voice',
      message_content: '🎤 Voice message',
      audio_url: voiceData.audioUrl, // This is the blob URL for immediate playback
      audio_blob_url: voiceData.audioUrl, // Keep reference to blob URL
      duration: voiceData.duration || 65,
      timestamp: new Date().toISOString(),
      model_name: selectedModel,
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setIsAiLoading(true);

    try {
      let newChatId = currentChatId;

      if (!currentChatId) {
        const formData = new FormData();
        formData.append('model_name', selectedModel);
        formData.append('message_content', '🎤 Voice message');
        formData.append('message_type', 'voice');
        if (voiceData.audioBlob) {
          formData.append(
            'audio_file',
            voiceData.audioBlob,
            'voice_message.webm'
          );
        }

        const response = await axios.post(
          'https://backend.lexbanglaai.com/api/chat/create_chat/',
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        if (response?.data?.data?.id) {
          const backendAudioUrl = response?.data?.data?.audio_url;
          if (backendAudioUrl) {
            setChatMessages((prev) =>
              prev.map((msg) =>
                msg.id === tempMessageId
                  ? { ...msg, audio_url: backendAudioUrl }
                  : msg
              )
            );
          }
        }

        refetch();
        tokenRefetch();
        newChatId = response?.data?.data?.id;
        setChatId(newChatId);
        navigate(`/chat/${newChatId}`);
      } else {
        const formData = new FormData();
        formData.append('chat_id', currentChatId);
        formData.append('message_content', '🎤 Voice message');
        formData.append('message_type', 'voice');
        if (voiceData.audioBlob) {
          formData.append(
            'audio_file',
            voiceData.audioBlob,
            'voice_message.webm'
          );
        }

        const response = await axios.post(
          'https://backend.lexbanglaai.com/api/chat/add_message_to_chat/',
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        if (response?.data?.data?.audio_url) {
          setChatMessages((prev) =>
            prev.map((msg) =>
              msg.id === tempMessageId
                ? { ...msg, audio_url: response.data.data.audio_url }
                : msg
            )
          );
        }

        await tokenRefetch();
        await refetchChatContents();
      }
    } catch (error) {
      console.error('Error sending voice message:', error);
      setChatMessages((prev) => prev.filter((msg) => msg.id !== tempMessageId));
      toast.error('Failed to send voice message. Please try again.');
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleSuggestionClick = async (suggestion) => {
    if (isTokenLimitExceeded()) {
      handleTokenLimitExceeded();
      return;
    }

    if (isAiLoading) return;

    const tempMessageId = `temp-${Date.now()}`;
    const userMessage = {
      id: tempMessageId,
      sent_by: 'user',
      message_content: suggestion,
      timestamp: new Date().toISOString(),
      model_name: selectedModel,
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setIsAiLoading(true);

    try {
      const formData = new FormData();
      formData.append('chat_id', currentChatId);
      formData.append('message_content', suggestion);
      formData.append('model_name', selectedModel);

      await axios.post(
        'https://backend.lexbanglaai.com/api/chat/add_message_to_chat/',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      await tokenRefetch();
      await refetchChatContents();
    } catch (error) {
      console.error('Error sending suggestion:', error);
      setChatMessages((prev) => prev.filter((msg) => msg.id !== tempMessageId));
      toast.error('Failed to send suggestion. Please try again.');
    } finally {
      setIsAiLoading(false);
    }
  };

  const isInitialScreen = !chatMessages?.length && !currentChatId;

  return (
    <div className="flex flex-col h-[calc(100vh-26px)] lg:h-[calc(100vh-96px)] bg-gradient-to-r from-white to-[#8cfcef] dark:from-gray-800 dark:to-gray-900">
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <div
          ref={chatContainerRef}
          className="chat-container flex-1 overflow-y-auto p-4 md:p-8 space-y-4"
        >
          {isInitialScreen ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-center mb-8">
                <div className="inline-block mb-6 p-4 bg-white rounded-full shadow-lg">
                  <img
                    src={AiImage || '/placeholder.svg'}
                    alt="AI"
                    className="w-20 h-20 rounded-full"
                  />
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-teal-600 mb-2">
                  Hey {user?.name === 'null' ? 'Armando' : user?.name}!
                </h1>
                <p className="text-xl md:text-2xl text-gray-700 font-semibold mb-4">
                  Can I help you with anything?
                </p>
                <p className="text-gray-600 mb-8">
                  Ready to assist you with anything you need.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 w-full max-w-2xl">
                {Object.entries(MODELS).map(([key, model]) => (
                  <button
                    key={key}
                    onClick={() => handleModelSelect(key)}
                    className={`py-1 px-3 rounded-full font-semibold transition-all duration-200 ${
                      selectedModel === key
                        ? 'bg-teal-500 text-white border-2 border-teal-600'
                        : 'bg-white border-2 border-teal-400 text-teal-600 hover:bg-teal-50'
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
                  className={`flex gap-4 ${
                    message.sent_by === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.sent_by === 'bot' && (
                    <img
                      src={AiImage || '/placeholder.svg'}
                      alt="AI"
                      className="w-8 h-8 rounded-full flex-shrink-0 mt-1"
                    />
                  )}

                  <div
                    className={`flex flex-col max-w-2xl ${
                      message.sent_by === 'user' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`rounded-2xl p-4 ${
                        message.sent_by === 'bot'
                          ? 'bg-white text-gray-800 shadow-md dark:bg-gray-700 dark:text-white'
                          : 'bg-teal-500 text-white'
                      }`}
                    >
                      {message.message_type === 'voice' && message.audio_url ? (
                        <VoiceMessagePlayer
                          audioUrl={message.audio_url}
                          duration={message.duration || 65}
                          isUserMessage={message.sent_by === 'user'}
                        />
                      ) : (
                        <RichTextDisplay content={message.message_content} />
                      )}
                    </div>

                    <div className="text-xs text-gray-500 mt-1 mb-2">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </div>

                    {message.sent_by === 'bot' && (
                      <div className="flex items-center gap-3 mt-2">
                        {index > 0 &&
                          chatMessages[index - 1].sent_by === 'user' && (
                            <button
                              onClick={() =>
                                handleRegenerate(chatMessages[index - 1].id)
                              }
                              className="p-2 text-teal-600 hover:bg-teal-100 rounded-lg transition-colors"
                              title="Regenerate response"
                              disabled={isAiLoading || isTokenLimitExceeded()}
                            >
                              <IoRefresh className="text-lg" />
                            </button>
                          )}
                        <button
                          onClick={() => handleLike(message.id)}
                          className="p-2 text-gray-500 hover:text-teal-600 transition-colors"
                          title="Like response"
                        >
                          <FaThumbsUp
                            className={`text-lg ${
                              feedbackState[message.id]?.liked
                                ? 'fill-current text-teal-600'
                                : ''
                            }`}
                          />
                        </button>
                        <button
                          onClick={() => handleDislike(message.id)}
                          className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                          title="Dislike response"
                        >
                          <FaThumbsDown
                            className={`text-lg ${
                              feedbackState[message.id]?.disliked
                                ? 'fill-current text-red-600'
                                : ''
                            }`}
                          />
                        </button>
                        <button
                          onClick={() => handleCopy(message.message_content)}
                          className="p-2 text-gray-500 hover:text-teal-600 transition-colors"
                          title="Copy response"
                        >
                          <IoCopyOutline className="text-lg" />
                        </button>
                      </div>
                    )}

                    {message.sent_by === 'bot' && (
                      <div className="flex flex-wrap gap-2 mt-4 w-full justify-start">
                        <button
                          type="button"
                          onClick={() =>
                            handleSuggestionClick('Make Response Shorter')
                          }
                          className="px-4 py-2 bg-teal-500 text-white rounded-full text-sm hover:bg-teal-600 transition-colors disabled:opacity-50"
                          disabled={isAiLoading}
                        >
                          Make Response Shorter
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleSuggestionClick(
                              'Explain it to me like a lawyer'
                            )
                          }
                          className="px-4 py-2 bg-teal-500 text-white rounded-full text-sm hover:bg-teal-600 transition-colors disabled:opacity-50"
                          disabled={isAiLoading}
                        >
                          Explain like a lawyer
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleSuggestionClick('Tell me about more')
                          }
                          className="px-4 py-2 bg-teal-500 text-white rounded-full text-sm hover:bg-teal-600 transition-colors disabled:opacity-50"
                          disabled={isAiLoading}
                        >
                          Tell me about more
                        </button>
                      </div>
                    )}
                  </div>

                  {message.sent_by === 'user' && (
                    <img
                      src={
                        user?.profile_picture
                          ? `https://backend.lexbanglaai.com/api${user.profile_picture}`
                          : userImage
                      }
                      alt="User"
                      className="w-8 h-8 rounded-full flex-shrink-0 mt-1 object-cover"
                    />
                  )}
                </div>
              ))}

              {isAiLoading && (
                <div className="flex gap-4">
                  <img
                    src={AiImage || '/placeholder.svg'}
                    alt="AI"
                    className="w-8 h-8 rounded-full flex-shrink-0"
                  />
                  <div className="bg-white rounded-2xl p-4 shadow-md dark:bg-gray-700">
                    <Loader />
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {attachedFile && (
          <div className="p-4 border-t bg-white dark:bg-gray-800 flex items-center gap-4">
            {previewUrl ? (
              <a href={previewUrl} target="_blank" rel="noreferrer">
                <img
                  src={previewUrl || '/placeholder.svg'}
                  alt={attachedFile.name}
                  className="w-24 h-24 object-cover rounded-lg border-2 border-teal-400"
                />
              </a>
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg">
                  {uploadType === 'document' ? (
                    <MdDescription className="text-3xl text-teal-600" />
                  ) : (
                    <MdImage className="text-3xl text-teal-600" />
                  )}
                </div>
                <div className="text-sm">
                  <div className="font-medium">{attachedFile.name}</div>
                  <div className="text-xs text-gray-500">
                    {(attachedFile.size / 1024).toFixed(1)} KB
                  </div>
                  <div className="text-xs text-teal-600 font-semibold mt-1">
                    {uploadType === 'document'
                      ? 'PDF Document'
                      : 'Case Study Image'}
                  </div>
                </div>
              </div>
            )}
            <button
              type="button"
              onClick={removeAttachedFile}
              className="ml-auto px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Remove
            </button>
          </div>
        )}

        {showVoiceRecorder && (
          <VoiceRecorder
            onClose={() => setShowVoiceRecorder(false)}
            onSend={handleVoiceMessage}
          />
        )}

        <form
          onSubmit={handleSubmit}
          className={`p-4 md:p-6 border-t bg-white dark:bg-gray-800 transition-all duration-300 ${
            isInitialScreen ? 'flex flex-col items-center justify-center' : ''
          }`}
        >
          {!isInitialScreen && (
            <div className="mb-4 w-full flex justify-start">
              <div ref={modelDropdownRef} className="relative">
                <button
                  type="button"
                  onClick={() => setShowModelDropdown(!showModelDropdown)}
                  className="px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold hover:bg-teal-200 transition-colors flex items-center gap-2"
                >
                  <span>{MODELS[selectedModel].icon}</span>
                  {MODELS[selectedModel].label}
                  <span className="text-xs">
                    {!showModelDropdown ? <FaChevronUp /> : <FaChevronDown />}
                  </span>
                </button>

                {showModelDropdown && (
                  <div className="absolute bottom-full left-0 mt-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-50 min-w-48">
                    {Object.entries(MODELS).map(([key, model]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => handleModelSelect(key)}
                        className={`w-full text-left px-4 py-2 flex items-center gap-2 transition-colors ${
                          selectedModel === key
                            ? 'bg-teal-100 text-teal-700 font-semibold'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-600'
                        }`}
                      >
                        <span className="dark:text-white text-[#161C2D]">
                          {model.icon}
                        </span>
                        <span className="dark:text-white text-[#161C2D]">
                          {model.label}
                        </span>
                        {selectedModel === key && (
                          <span className="ml-auto text-teal-600">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex items-end gap-3 w-full">
            <div ref={mediaDropdownRef} className="relative">
              <button
                type="button"
                onClick={() => setShowMediaDropdown(!showMediaDropdown)}
                disabled={isTokenLimitExceeded()}
                className="p-3 text-teal-600 hover:bg-teal-100 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed relative"
                title="Upload file"
              >
                <IoAttach className="text-2xl" />
              </button>

              {showMediaDropdown && (
                <div className="absolute bottom-full left-0 mb-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-50 min-w-56">
                  <button
                    type="button"
                    onClick={() => caseStudyInputRef.current?.click()}
                    className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors border-b border-gray-200 dark:border-gray-600"
                  >
                    <MdImage className="text-2xl text-teal-600" />
                    <div>
                      <div className="font-semibold text-gray-800 dark:text-white">
                        Case Study
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        JPG, PNG, GIF, SVG, WebP
                      </div>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => documentInputRef.current?.click()}
                    className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    <MdDescription className="text-2xl text-teal-600" />
                    <div>
                      <div className="font-semibold text-gray-800 dark:text-white">
                        Document Upload
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        PDF files only
                      </div>
                    </div>
                  </button>
                </div>
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

            <button
              type="button"
              onClick={() => setShowVoiceRecorder(true)}
              disabled={isTokenLimitExceeded()}
              className="p-3 text-teal-600 hover:bg-teal-100 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Record voice message"
            >
              <FaMicrophone className="text-2xl" />
            </button>

            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything you need"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              disabled={isTokenLimitExceeded()}
              className="flex-1 p-3 border-2 border-gray-300 rounded-full focus:outline-none focus:border-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-[#161C2D] disabled:opacity-50"
            />

            <button
              type="submit"
              disabled={
                isAiLoading ||
                (!input.trim() && !attachedFile) ||
                isTokenLimitExceeded()
              }
              className="p-3 bg-teal-500 text-white rounded-full hover:bg-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Send message"
            >
              <IoSendSharp className="text-2xl" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
