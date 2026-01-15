"use client"

import { Link } from "react-router-dom"
import { getTranslation } from "../../lib/i18n"
import { useLanguage } from "../../lib/language-context"
import logo from "../assets/logo.png"

export default function Footer() {
  const { language } = useLanguage()
  const t = (key) => getTranslation(language, key)

  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 mb-8">
        <div>
          <Link
            to="/home"
            className="text-xl font-bold text-teal-600 dark:text-teal-400"
          >
            <img src={logo} alt="" className="lg:w-16 lg:h-16 w-12 h-12" />
          </Link>
          <p className="text-gray-400 text-sm">{t('footer.about')}</p>
        </div>

        <div>
          <h3 className="font-bold mb-4">{t('footer.company')}</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <a href="#" className="hover:text-white transition">
                {t('footer.aboutUs')}
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                {t('footer.features')}
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                {t('footer.pricing')}
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                {t('footer.support')}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4">{t('footer.resources')}</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <a href="#" className="hover:text-white transition">
                {t('footer.blog')}
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                {t('footer.digitalMarketing')}
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                {t('footer.contentWriting')}
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                {t('footer.raisedAnIssue')}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4">{t('footer.canWeHelp')}</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <a href="#" className="hover:text-white transition">
                {t('footer.contact')}
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                {t('footer.terms')}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-400 text-sm">{t('footer.copyright')}</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="text-gray-400 hover:text-white transition">
            f
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition">
            𝕏
          </a>
        </div>
      </div>
    </footer>
  );
}
