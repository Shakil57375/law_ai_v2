'use client';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getTranslation } from '../../lib/i18n';
import { useLanguage } from '../../lib/language-context';
import logo from '../assets/logo.png';
import { FaFacebook } from 'react-icons/fa6';
import { FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/home') {
      navigate('/home');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 mb-8">
        <div>
          <Link
            to="/home"
            className="text-xl font-bold text-teal-600 dark:text-teal-400"
          >
            <img src={logo} alt="" className="lg:w-20 lg:h-20 w-16 h-16" />
          </Link>
          <p className="text-gray-400 text-base mt-3 space-x-4 max-w-52">
            {t('footer.about')}
          </p>

          <div className="flex space-x-4 mt-3">
            <a href="#" className="text-gray-400 hover:text-white transition">
              <FaFacebook className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <FaLinkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-bold mb-4">{t('footer.company')}</h3>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li>
              <button
                onClick={() => scrollToSection('about')}
                className="hover:text-white transition"
              >
                {t('footer.aboutUs')}
              </button>
            </li>

            <li>
              <Link to={'/contact'} className="hover:text-white transition">
                {t('footer.contact')}
              </Link>
            </li>

            <li>
              <button
                onClick={() => scrollToSection('howWorks')}
                className="hover:text-white transition"
              >
                {t('footer.howWorks')}
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4">{t('footer.product')}</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <button
                onClick={() => scrollToSection('features')}
                className="hover:text-white transition"
              >
                {t('footer.features')}
              </button>
            </li>
            <li>
              <a href="/contact" className="hover:text-white transition">
                {t('footer.support')}
              </a>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('blog')}
                className="hover:text-white transition"
              >
                {t('footer.blog')}
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4">{t('footer.canWeHelp')}</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <Link to={'/privacy'} className="hover:text-white transition">
                {t('footer.privacy')}
              </Link>
            </li>
            <li>
              <Link to={'/terms'} className="hover:text-white transition">
                {t('footer.terms')}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
