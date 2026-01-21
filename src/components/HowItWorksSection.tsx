'use client';

import { useRef } from 'react';
import { getTranslation } from '../../lib/i18n';
import { useLanguage } from '../../lib/language-context';
import img1 from '../assets/HTW/Group (4).png';
export default function HowItWorksSection() {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);
  const headerRef = useRef(null);
  const step1Ref = useRef(null);
  const step2Ref = useRef(null);
  const step3Ref = useRef(null);

  const steps = [
    { title: t('howWorks.step1'), icon: '📝' },
    { title: t('howWorks.step2'), icon: '🤖' },
    { title: t('howWorks.step3'), icon: '✨' },
  ];

  return (
    <div className="px-4 py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto">
        {/* Header */}
        <h1
          ref={headerRef}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-gray-800 mb-8 sm:mb-12 lg:mb-16"
        >
          কিভাবে এটা কাজ করে
        </h1>

        {/* Steps Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Step 1 */}
          <div ref={step1Ref} className="relative">
            <div className="border-2 border-teal-400 rounded-lg p-4 sm:p-6 lg:p-8 bg-purple-50 bg-opacity-30 h-full flex flex-col items-center transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-teal-500">
              {/* Illustration */}
              <div className="-mt-12 sm:-mt-14 lg:-mt-16 bg-purple-50 rounded-full w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 flex items-center justify-center flex-shrink-0">
                <img
                  src={img1}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Title */}
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 text-center mt-4 sm:mt-6 lg:mt-8">
                আপনার প্রম্প্ট ডিজাইন করুন
              </h2>

              {/* Description */}
              <p className="text-gray-700 text-center text-xs sm:text-sm lg:text-base leading-relaxed">
                আপনার আইএ প্রম্প্ট বাংলা বা ইংরেজিতে টাইপ করুন অথবা বলুন। আমাদের
                সিস্টেম নির্ভুলভাবে ব্যাখ্যা করবে ডায়ালগ।
              </p>

              {/* Step Badge */}
              <div className="absolute bottom-2 sm:bottom-3 lg:bottom-4 right-2 sm:right-3 lg:right-4">
                <span className="step-badge text-cyan-400 font-bold text-sm sm:text-base lg:text-lg">
                  step 1
                </span>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div ref={step2Ref} className="relative">
            <div className="border-2 border-teal-400 rounded-lg p-4 sm:p-6 lg:p-8 bg-purple-50 bg-opacity-30 h-full flex flex-col items-center transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-teal-500">
              {/* Illustration */}
              <div className="-mt-12 sm:-mt-14 lg:-mt-16 bg-purple-50 rounded-full w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 flex items-center justify-center flex-shrink-0">
                <img
                  src={img1}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Title */}
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 text-center mt-4 sm:mt-6 lg:mt-8">
                এআই বিশ্লেষণ
              </h2>

              {/* Description */}
              <p className="text-gray-700 text-center text-xs sm:text-sm lg:text-base leading-relaxed">
                আপনার প্রম্প্ট বাংলাদেশের মার্কেটকৃত আইএ, আইএন এবং ঘাসালা
                কিংবদের ডিজিটাল বিশ্লেষণ করা হবেছে।
              </p>

              {/* Step Badge */}
              <div className="absolute bottom-2 sm:bottom-3 lg:bottom-4 right-2 sm:right-3 lg:right-4">
                <span className="step-badge text-cyan-400 font-bold text-sm sm:text-base lg:text-lg">
                  step 2
                </span>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div ref={step3Ref} className="relative">
            <div className="border-2 border-teal-400 rounded-lg p-4 sm:p-6 lg:p-8 bg-purple-50 bg-opacity-30 h-full flex flex-col items-center transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-teal-500">
              {/* Illustration */}
              <div className="-mt-12 sm:-mt-14 lg:-mt-16 bg-purple-50 rounded-full w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 flex items-center justify-center flex-shrink-0">
                <img
                  src={img1}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Title */}
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 text-center mt-4 sm:mt-6 lg:mt-8">
                বিত্তরতি উত্তর পান
              </h2>

              {/* Description */}
              <p className="text-gray-700 text-center text-xs sm:text-sm lg:text-base leading-relaxed">
                যথাযথ উদ্ধৃতি এবং রেফারেন্স সহ স্পষ্ট, সুগঠিত আইএন উত্তর্গুছি
                পান।
              </p>

              {/* Step Badge */}
              <div className="absolute bottom-2 sm:bottom-3 lg:bottom-4 right-2 sm:right-3 lg:right-4">
                <span className="step-badge text-cyan-400 font-bold text-sm sm:text-base lg:text-lg">
                  step 3
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
