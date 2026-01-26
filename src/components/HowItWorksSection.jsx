import { useRef } from 'react';
import { getTranslation } from '../../lib/i18n';
import { useLanguage } from '../../lib/language-context';
import img2 from '../assets/image-1.png';
import img3 from '../assets/image-2.png';
import img1 from '../assets/image-3.png';
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
    <div id="howWorks" className="px-4 py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto">
        {/* Header */}
        <h1
          ref={headerRef}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-gray-800 mb-8 sm:mb-12 lg:mb-16"
        >
          {t('howWorks.title')}
        </h1>

        {/* Steps Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-40 gap-14">
          {/* Step 1 */}
          <div ref={step1Ref} className="relative">
            <div className="border-2 border-teal-400 rounded-lg p-4 sm:p-6 lg:p-8 bg-purple-50 bg-opacity-30 h-full flex flex-col items-center transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-teal-500">
              {/* Illustration */}
              <div className="-mt-12 sm:-mt-14 lg:-mt-16 bg-purple-50 rounded-full w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 flex items-center justify-center flex-shrink-0">
                <img
                  src={img1}
                  alt=""
                  className="w-full h-full object-contain border-8 rounded-full border-white shadow-lg"
                />
              </div>

              {/* Title */}
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 text-center mt-4 sm:mt-6 lg:mt-8">
                {t('howWorks.step1Title')}
              </h2>

              {/* Description */}
              <p className="text-gray-700 text-center text-xs sm:text-sm lg:text-base leading-relaxed">
                {t('howWorks.step1Description')}
              </p>

              {/* Step Badge */}
              <div className="absolute -top-14  lg:top-52 right-6  lg:right-6">
                <span className="step-badge text-cyan-400 font-bold text-sm sm:text-base lg:text-lg px-4 py-2">
                  <p
                    className="text-xl font-extrabold text-teal-500 text-outline bg-white rounded-full px-6 py-4"
                    style={{ WebkitTextStroke: '1px #14b8a6' }}
                  >
                    {t('howWorks.stepBadge1')}
                  </p>
                </span>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div ref={step2Ref} className="relative">
            <div className="border-2 border-bg-gradient-to-right border-teal-400 rounded-lg p-4 sm:p-6 lg:p-8 bg-purple-50 bg-opacity-30 h-full flex flex-col items-center transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-teal-500">
              {/* Illustration */}
              <div className="-mt-12 sm:-mt-14 lg:-mt-16 bg-purple-50 rounded-full w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 flex items-center justify-center flex-shrink-0">
                <img
                  src={img2}
                  alt=""
                  className="w-full h-full object-contain border-8 rounded-full border-white shadow-lg"
                />
              </div>

              {/* Title */}
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 text-center mt-4 sm:mt-6 lg:mt-8">
                {t('howWorks.step2Title')}
              </h2>

              {/* Description */}
              <p className="text-gray-700 text-center text-xs sm:text-sm lg:text-base leading-relaxed">
                {t('howWorks.step2Description')}
              </p>

              {/* Step Badge */}
              <div className="absolute  -top-14  lg:top-52 right-6  lg:right-6">
                <span className="step-badge text-cyan-400 font-bold text-sm sm:text-base lg:text-lg px-4 py-2">
                  <p
                    className="text-xl font-extrabold text-teal-500 text-outline bg-white rounded-full px-6 py-4"
                    style={{ WebkitTextStroke: '1px #14b8a6' }}
                  >
                    {t('howWorks.stepBadge2')}
                  </p>
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
                  src={img3}
                  alt=""
                  className="w-full h-full object-contain border-8 rounded-full border-white shadow-lg"
                />
              </div>

              {/* Title */}
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 text-center mt-4 sm:mt-6 lg:mt-8">
                {t('howWorks.step3Title')}
              </h2>

              {/* Description */}
              <p className="text-gray-700 text-center text-xs sm:text-sm lg:text-base leading-relaxed">
                {t('howWorks.step3Description')}
              </p>

              {/* Step Badge */}
              <div className="absolute  -top-14  lg:top-52 right-6  lg:right-6">
                <span className="step-badge text-cyan-400  font-bold text-sm sm:text-base lg:text-lg px-4 py-2">
                  <p
                    className="text-xl font-extrabold text-teal-500 text-outline bg-white rounded-full px-6 py-4"
                    style={{ WebkitTextStroke: '1px #14b8a6' }}
                  >
                    {t('howWorks.stepBadge3')}
                  </p>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
