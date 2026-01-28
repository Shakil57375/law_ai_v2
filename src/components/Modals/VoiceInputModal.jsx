import React, { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { FaMicrophone } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import './VoiceInputModal.css';

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();
mic.continuous = true;
mic.interimResults = true;
mic.lang = 'en-US';

export function VoiceInputModal({ isOpen, onClose, onSubmit }) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');

  // Framer Motion animation variants
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.5 },
    exit: { opacity: 0 },
  };

  useEffect(() => {
    handleListen();
    return () => {
      mic.stop();
    };
  }, [isListening]);

  const handleListen = () => {
    if (isListening) {
      mic.start();
      mic.onend = () => {
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        setIsSpeaking(false);
      };
    }

    mic.onstart = () => {
    };

    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join('');

      setTranscript(transcript);
      setIsSpeaking(true);

      setTimeout(() => {
        setIsSpeaking(false);
      }, 1000);
    };

    mic.onerror = (event) => {
      setIsListening(false);
      setIsSpeaking(false);
    };
  };

  const handleSubmit = () => {
    if (transcript.trim()) {
      onSubmit(transcript);
      setTranscript('');
      setIsListening(false);
      setIsSpeaking(false);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Background Overlay */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={overlayVariants}
            transition={{ duration: 0.3 }}
            onClick={() => {
              setIsListening(false);
              setIsSpeaking(false);
              onClose();
            }}
          />

          {/* Modal Content */}
          <motion.div className="fixed inset-0 flex items-center justify-center z-50">
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-lg p-6 w-[90%] max-w-lg"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={modalVariants}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold dark:text-white">
                  Voice Input
                </h2>
                <button
                  onClick={() => {
                    setIsListening(false);
                    setIsSpeaking(false);
                    onClose();
                  }}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <IoClose size={24} />
                </button>
              </div>

              <div className="mb-6 min-h-[100px] bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                  {transcript || 'Click the microphone to start speaking...'}
                </p>
              </div>

              <div className="flex flex-col items-center gap-6">
                <button
                  onClick={() => setIsListening((prevState) => !prevState)}
                  className="relative group"
                >
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
                      isListening
                        ? 'bg-red-500'
                        : 'bg-[#15B8A6] hover:bg-[#15B8A6]'
                    }`}
                  >
                    <FaMicrophone size={24} className="text-white" />
                    {isSpeaking && (
                      <>
                        <span className="absolute inset-0 rounded-full animate-ping bg-red-400 opacity-75"></span>
                        <span className="absolute -inset-2 rounded-full animate-pulse-ring border-2 border-red-500 opacity-75"></span>
                      </>
                    )}
                  </div>
                  <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    {isListening ? 'Tap to stop' : 'Tap to speak'}
                  </span>
                </button>

                <button
                  onClick={handleSubmit}
                  disabled={!transcript.trim()}
                  className="px-6 py-2 bg-indigo-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-600 transition-colors mt-8"
                >
                  Add
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
