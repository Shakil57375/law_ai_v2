"use client"

import { Link } from "react-router-dom"
import { getTranslation } from "../../lib/i18n"
import { useLanguage } from "../../lib/language-context"
import about_image from "../assets/baner-image.png"

export default function AboutUsSection() {
  const { language } = useLanguage()
  const t = (key: string) => getTranslation(language, key)

  return (
    <div className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <img src={about_image} alt="About us" className="w-full max-w-sm" />
        </div>
        <div>
          <h2 className="text-4xl font-bold mb-6 text-gray-900">
            {t('aboutUs.title')}
          </h2>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            {t('aboutUs.description')}
          </p>
          <Link
            to="/"
            className="text-teal-600 font-semibold hover:text-teal-700 transition flex items-center gap-2"
          >
            {t('aboutUs.learnMore')}
          </Link>
        </div>
      </div>
    </div>
  );
}
