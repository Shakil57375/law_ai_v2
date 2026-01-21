import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../lib/language-context';
import { getTranslation } from '../../lib/i18n';

export default function FeedbackForm() {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);

  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [designation, setDesignation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isFeedbackOpen) {
        setFeedback('');
        setRating(0);
        setDesignation('');
        setIsFeedbackOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFeedbackOpen]);

  const handleSubmit = async () => {
    if (!feedback.trim() || rating === 0) {
      alert(t('feedback.pleaseProvide'));
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      alert(t('feedback.thankYou'));
      setFeedback('');
      setRating(0);
      setDesignation('');
      setIsFeedbackOpen(false);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div>
      <div className="relative">
        {/* SVG Icon - positioned absolutely to overlap */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-12 z-10 lg:block hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="136"
            height="136"
            viewBox="0 0 136 136"
            fill="none"
          >
            <g filter="url(#filter0_d_2002_317)">
              <circle
                cx="67.7285"
                cy="52.3423"
                r="33.5372"
                fill="url(#paint0_linear_2002_317)"
              />
              <circle
                cx="67.7285"
                cy="52.3423"
                r="31.4002"
                stroke="white"
                strokeWidth="4.27391"
              />
            </g>
            <path
              d="M59.945 58.2671H74.7336V64.697H59.945V58.2671Z"
              fill="white"
            />
            <path
              d="M75.248 59.6174C75.248 57.5028 74.4148 55.4748 72.9316 53.9796C71.4484 52.4844 69.4368 51.6444 67.3393 51.6444C65.2418 51.6444 63.2302 52.4844 61.747 53.9796C60.2638 55.4748 59.4306 57.5028 59.4306 59.6174L67.3393 59.6174H75.248Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M67.3714 61.6106C71.8991 61.6106 75.5695 57.9402 75.5695 53.4126C75.5695 48.8849 71.8991 45.2145 67.3714 45.2145C62.8438 45.2145 59.1734 48.8849 59.1734 53.4126C59.1734 57.9402 62.8438 61.6106 67.3714 61.6106ZM67.3714 68.0405C75.4502 68.0405 81.9993 61.4914 81.9993 53.4126C81.9993 45.3338 75.4502 38.7847 67.3714 38.7847C59.2927 38.7847 52.7435 45.3338 52.7435 53.4126C52.7435 61.4914 59.2927 68.0405 67.3714 68.0405Z"
              fill="white"
            />
            <defs>
              <filter
                id="filter0_d_2002_317"
                x="1.90735e-05"
                y="-1.62125e-05"
                width="135.457"
                height="135.457"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="15.3861" />
                <feGaussianBlur stdDeviation="17.0956" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.439216 0 0 0 0 0.564706 0 0 0 0 0.690196 0 0 0 0.12 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_2002_317"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_2002_317"
                  result="shape"
                />
              </filter>
              <linearGradient
                id="paint0_linear_2002_317"
                x1="74.2386"
                y1="74.4374"
                x2="88.5029"
                y2="22.8731"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#15B8A6" />
                <stop offset="0.927091" stopColor="#B8F1EB" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Button Card */}
        <button
          onClick={() => setIsFeedbackOpen(true)}
          className="relative w-full lg:pt-20 pt-0 pb-8 px-8 bg-gradient-to-b from-teal-400 to-teal-500 text-white rounded-3xl font-semibold hover:shadow-xl transition-shadow duration-300 text-xl border"
        >
          <span className="relative flex items-center justify-center gap-1 z-10 bg-white/20 backdrop-blur-md p-4 rounded-full text-base border border-white/30 top-4 lg:top-0">
            <span className="lg:block hidden ">
              {t('feedback.writeFeedback')}{' '}
            </span>
            {language === 'en' ? 'Feedback' : 'প্রতিক্রিয়া'}
          </span>
        </button>
      </div>

      {isFeedbackOpen &&
        createPortal(
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => {
              setFeedback('');
              setRating(0);
              setDesignation('');
              setIsFeedbackOpen(false);
            }}
          >
            <AnimatePresence>
              <motion.div
                initial={{ scale: 0.85, opacity: 0, y: -20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.85, opacity: 0, y: -20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="bg-gradient-to-b from-teal-400 to-teal-500 rounded-3xl w-full max-w-2xl p-8"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-3xl font-bold text-center mb-6 text-white">
                  {t('feedback.writeYourFeedback')}
                </h2>

                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full h-32 bg-white rounded-2xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-teal-600 mb-6 text-gray-900"
                  placeholder={t('feedback.placeholder')}
                />

                <div className="mb-6 text-white">
                  <span className="font-semibold mr-4">
                    {t('feedback.rating')}
                  </span>
                  <div className="inline-flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className="text-2xl transition-transform hover:scale-110"
                      >
                        {star <= rating ? '⭐' : '☆'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center gap-4">
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="px-8 py-3 bg-white text-teal-600 rounded-xl font-semibold hover:shadow-lg disabled:opacity-50 transition-all"
                  >
                    {isLoading ? t('feedback.sending') : t('feedback.send')}
                  </button>
                  <button
                    onClick={() => {
                      setFeedback('');
                      setRating(0);
                      setDesignation('');
                      setIsFeedbackOpen(false);
                    }}
                    className="px-8 py-3 bg-transparent text-white rounded-xl font-semibold border-2 border-white hover:bg-white hover:text-teal-600 transition-all"
                  >
                    {t('feedback.cancel')}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>,
          document.body
        )}
    </div>
  );
}
