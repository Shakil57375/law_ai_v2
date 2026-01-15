"use client"

import { getTranslation } from "../../lib/i18n"
import { useLanguage } from "../../lib/language-context"


export default function TutorialSection() {
  const { language } = useLanguage()
  const t = (key: string) => getTranslation(language, key)

  return (
    <div className="py-16 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">{t("tutorial.title")}</h2>

        <div className="relative bg-gray-300 rounded-lg overflow-hidden aspect-video flex items-center justify-center hover:bg-gray-400 transition cursor-pointer">
          <button className="w-20 h-20 rounded-full bg-teal-500 flex items-center justify-center text-white text-4xl hover:bg-teal-600 transition">
            ▶️
          </button>
        </div>
      </div>
    </div>
  )
}
