import { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaStop } from 'react-icons/fa';

export function VoiceMessagePlayer({
  audioUrl,
  duration = 65,
  isUserMessage = false,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [actualDuration, setActualDuration] = useState(duration);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !audioUrl) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => setIsPlaying(false);
    const handleLoadedMetadata = () => {
      setActualDuration(audio.duration || duration);
      setAudioLoaded(true);
    };
    const handleError = () => {
      console.error('[v0] Error loading audio:', audio.error);
      setAudioLoaded(false);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('error', handleError);
    };
  }, [audioUrl, duration]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((error) => {
          console.error('[v0] Playback error:', error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      setIsPlaying(false);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  const generateWaveform = () => {
    const bars = 40;
    return (
      <div className="flex items-center justify-center gap-0.5 flex-1 mx-3">
        {Array.from({ length: bars }).map((_, i) => {
          const progress =
            actualDuration > 0 ? currentTime / actualDuration : 0;
          const isActive = i / bars < progress;
          return (
            <div
              key={i}
              className={`w-0.5 rounded-full transition-all ${
                isActive ? 'bg-white h-4' : 'bg-white/50 h-2'
              }`}
              style={{
                height: `${8 + Math.random() * 8}px`,
              }}
            />
          );
        })}
      </div>
    );
  };

  const bgColor = isUserMessage ? 'bg-teal-500' : 'bg-teal-500';
  const textColor = 'text-white';

  return (
    <div
      className={`flex items-center gap-3 ${bgColor} ${textColor} rounded-2xl px-4 py-3 max-w-sm w-full shadow-md`}
    >
      <audio ref={audioRef} src={audioUrl} crossOrigin="anonymous" />

      <button
        onClick={togglePlayPause}
        className="p-2 hover:bg-teal-600 rounded-full transition-colors flex-shrink-0"
        title={isPlaying ? 'Pause' : 'Play'}
        disabled={!audioLoaded && !audioUrl}
      >
        {isPlaying ? (
          <FaPause className="text-lg" />
        ) : (
          <FaPlay className="text-lg ml-0.5" />
        )}
      </button>

      {generateWaveform()}

      <div className="text-xs font-semibold whitespace-nowrap">
        {formatTime(currentTime)} / {formatTime(actualDuration)}
      </div>

      <button
        onClick={handleStop}
        className="p-2 hover:bg-teal-600 rounded-full transition-colors flex-shrink-0"
        title="Stop"
      >
        <FaStop className="text-lg" />
      </button>
    </div>
  );
}
