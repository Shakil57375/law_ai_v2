"use client"

import { useRef } from "react";
import { getTranslation } from "../../lib/i18n"
import { useLanguage } from "../../lib/language-context"
import img1 from "../assets/HTW/Group (4).png"
export default function HowItWorksSection() {
  const { language } = useLanguage()
  const t = (key) => getTranslation(language, key);
  const headerRef = useRef(null);
  const step1Ref = useRef(null);
  const step2Ref = useRef(null);
  const step3Ref = useRef(null);

  const steps = [
    { title: t("howWorks.step1"), icon: "📝" },
    { title: t("howWorks.step2"), icon: "🤖" },
    { title: t("howWorks.step3"), icon: "✨" },
  ]

  return (
    <div className="px-4 py-12">
      <div className="container mx-auto">
        {/* Header */}
        <h1
          ref={headerRef}
          className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16"
        >
          কিভাবে এটা কাজ করে
        </h1>

        {/* Steps Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {/* Step 1 */}
          <div ref={step1Ref} className="relative">
            <div className="border-2 border-teal-400 rounded-lg p-8 bg-purple-50 bg-opacity-30 h-full flex flex-col items-center transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-teal-500">
              {/* Illustration */}
              <div className="-mt-20 bg-purple-50 rounded-full">
                <img src={img1} alt="" />
              </div>

              {/* Title */}
              <h2 className="text-xl font-bold text-gray-800 mb-4 text-center mt-10">
                আপনার প্রম্প্ট ডিজাইন করুন
              </h2>

              {/* Description */}
              <p className="text-gray-700 text-center text-sm leading-relaxed">
                আপনার আইএ প্রম্প্ট বাংলা বা ইংরেজিতে টাইপ করুন অথবা বলুন। আমাদের
                সিস্টেম নির্ভুলভাবে ব্যাখ্যা করবে ডায়ালগ।
              </p>

              {/* Step Badge */}
              <div className="absolute bottom-4 right-4">
                <span className="step-badge text-cyan-400 font-bold text-lg">
                  step 1
                </span>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div ref={step2Ref} className="relative">
            <div className="border-2 border-teal-400 rounded-lg p-8 bg-purple-50 bg-opacity-30 h-full flex flex-col items-center transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-teal-500">
              {/* Illustration */}
              <div className="-mt-20 bg-purple-50 rounded-full">
                <img src={img1} alt="" />
              </div>

              {/* Title */}
              <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
                এআই বিশ্লেষণ
              </h2>

              {/* Description */}
              <p className="text-gray-700 text-center text-sm leading-relaxed mt-10">
                আপনার প্রম্প্ট বাংলাদেশের মার্কেটকৃত আইএ, আইএন এবং ঘাসালা
                কিংবদের ডিজিটাল বিশ্লেষণ করা হবেছে।
              </p>

              {/* Step Badge */}
              <div className="absolute bottom-4 right-4">
                <span className="step-badge text-cyan-400 font-bold text-lg">
                  step 2
                </span>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div ref={step3Ref} className="relative">
            <div className="border-2 border-teal-400 rounded-lg p-8 bg-purple-50 bg-opacity-30 h-full flex flex-col items-center transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-teal-500">
              {/* Illustration */}
              <div className="-mt-20 bg-purple-50 rounded-full">
                <img src={img1} alt="" />
              </div>

              {/* Title */}
              <h2 className="text-xl font-bold text-gray-800 mb-4 text-center mt-10">
                বিত্তরতি উত্তর পান
              </h2>

              {/* Description */}
              <p className="text-gray-700 text-center text-sm leading-relaxed">
                যথাযথ উদ্ধৃতি এবং রেফারেন্স সহ স্পষ্ট, সুগঠিত আইএন উত্তর্গুছি
                পান।
              </p>

              {/* Step Badge */}
              <div className="absolute bottom-4 right-4">
                <span className="step-badge text-cyan-400 font-bold text-lg">
                  step 3
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

