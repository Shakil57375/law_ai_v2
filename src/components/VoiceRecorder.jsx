import { useState, useRef, useEffect } from 'react';
import { FaMicrophone, FaStop, FaPlay, FaPause } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import toast from 'react-hot-toast';
import { useLanguage } from '../../lib/language-context';
import { getTranslation } from '../../lib/i18n';

export function VoiceRecorder({ onClose, onSend }) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);
  const [currentPlayTime, setCurrentPlayTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const streamRef = useRef(null);
  const timerRef = useRef(null);
  const audioPreviewRef = useRef(null);

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording]);

  useEffect(() => {
    const audio = audioPreviewRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentPlayTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlayingPreview(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audioURL]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      setRecordingTime(0);

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: 'audio/webm;codecs=opus',
        });
        setRecordedBlob(audioBlob);

        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
        setCurrentPlayTime(0);

        // Stop all audio tracks
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      toast.success(t('toast.recordingStarted'));
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast.error(t('toast.microphoneError'));
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      toast.success(t('toast.recordingStopped'));
    }
  };

  const transcribeAudio = async () => {
    if (!recordedBlob) {
      toast.error(t('toast.noAudioRecorded'));
      return;
    }

    try {
      toast.loading(t('toast.sendingVoice'));

      onSend({
        audioBlob: recordedBlob,
        audioUrl: audioURL,
        duration: Math.round(duration),
        transcript: 'Voice message', // Placeholder transcript
      });

      handleClose();
    } catch (error) {
      console.error('Error sending voice message:', error);
      toast.error(t('toast.voiceSendFailed'));
    }
  };

  const togglePlayPreview = () => {
    if (audioPreviewRef.current) {
      if (isPlayingPreview) {
        audioPreviewRef.current.pause();
      } else {
        audioPreviewRef.current.play();
      }
      setIsPlayingPreview(!isPlayingPreview);
    }
  };

  const handleClose = () => {
    if (isRecording) {
      stopRecording();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    if (audioURL) {
      URL.revokeObjectURL(audioURL);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Record Voice Message
          </h2>
          <button
            onClick={handleClose}
            className="p-2 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <IoClose className="text-2xl" />
          </button>
        </div>

        <div className="flex flex-col items-center gap-6 mb-6">
          {/* Recording Indicator */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
            {isRecording && (
              <div className="w-20 h-20 rounded-full bg-white animate-pulse flex items-center justify-center">
                <FaMicrophone className="text-3xl text-teal-600 animate-bounce" />
              </div>
            )}
            {!isRecording && !audioURL && (
              <FaMicrophone className="text-4xl text-white" />
            )}
            {audioURL && !isRecording && <span className="text-4xl">✓</span>}
          </div>

          {/* Status Text */}
          <div className="text-center">
            {isRecording && (
              <>
                <p className="text-teal-600 font-semibold animate-pulse">
                  Recording...
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {formatTime(recordingTime)}
                </p>
              </>
            )}
            {audioURL && !isRecording && (
              <>
                <p className="text-green-600 font-semibold">
                  Recording Complete
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Duration: {formatTime(duration)}
                </p>
              </>
            )}
            {!isRecording && !audioURL && (
              <p className="text-gray-600 dark:text-gray-400">
                Click start to record
              </p>
            )}
          </div>

          {/* Audio Preview Player */}
          {audioURL && (
            <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlayPreview}
                  className="p-2 bg-teal-500 text-white rounded-full hover:bg-teal-600 transition-colors flex-shrink-0"
                >
                  {isPlayingPreview ? (
                    <FaPause />
                  ) : (
                    <FaPlay className="ml-0.5" />
                  )}
                </button>
                <div className="flex-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-teal-500 transition-all"
                    style={{
                      width: `${
                        duration ? (currentPlayTime / duration) * 100 : 0
                      }%`,
                    }}
                  />
                </div>
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 min-w-fit">
                  {formatTime(currentPlayTime)} / {formatTime(duration)}
                </span>
              </div>
              <audio ref={audioPreviewRef} src={audioURL} className="hidden" />
            </div>
          )}
        </div>

        <div className="flex gap-3">
          {!audioURL ? (
            <>
              <button
                onClick={isRecording ? stopRecording : startRecording}
                className={`flex-1 py-3 rounded-lg font-semibold text-white transition-colors flex items-center justify-center gap-2 ${
                  isRecording
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-teal-500 hover:bg-teal-600'
                }`}
              >
                {isRecording ? (
                  <>
                    <FaStop /> Stop
                  </>
                ) : (
                  <>
                    <FaMicrophone /> Start
                  </>
                )}
              </button>
              <button
                onClick={handleClose}
                className="flex-1 py-3 rounded-lg font-semibold bg-gray-300 hover:bg-gray-400 text-gray-800 transition-colors"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setAudioURL(null);
                  setRecordedBlob(null);
                  setRecordingTime(0);
                  setCurrentPlayTime(0);
                  setDuration(0);
                  if (audioPreviewRef.current) audioPreviewRef.current.pause();
                  setIsPlayingPreview(false);
                }}
                className="flex-1 py-3 rounded-lg font-semibold bg-gray-300 hover:bg-gray-400 text-gray-800 transition-colors"
              >
                Re-record
              </button>
              <button
                onClick={transcribeAudio}
                className="flex-1 py-3 rounded-lg font-semibold bg-teal-500 hover:bg-teal-600 text-white transition-colors"
              >
                Send
              </button>
            </>
          )}
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
          Your voice message will be sent to the chat.
        </p>
      </div>
    </div>
  );
}
