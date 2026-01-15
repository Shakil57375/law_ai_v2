import { useEffect, useState } from 'react';
import { getTranslation } from '../../../lib/i18n';
import { useLanguage } from '../../../lib/language-context';
import { motion } from 'framer-motion';
import logo from "../../assets/logo.png"
import { Link } from 'react-router-dom';
// Navbar Component
export const Navbar = () => {
  const { language, setLanguage } = useLanguage();
  const t = (key) => getTranslation(language, key);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg' : 'bg-white text-black'
      }`}
    >
      <div className="w-full lg:px-52 px-6 mx-auto">
        <div className="flex items-center justify-between h-16">
          <div
            className={`text-2xl font-bold ${scrolled ? 'text-teal-600' : ''}`}
          >
            <Link
              to="/home"
              className="text-xl font-bold text-teal-600 dark:text-teal-400 py-2"
            >
              <img src={logo} alt="" className="lg:w-16 lg:h-16 w-12 h-12" />
            </Link>
          </div>

          <div className="hidden md:flex gap-6">
            {['home', 'about', 'contact'].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className={`hover:opacity-80 transition font-medium ${
                  scrolled ? 'text-gray-700' : ''
                }`}
              >
                {t(`navbar.${item}`)}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition ${
                scrolled
                  ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  : 'bg-white/20 hover:bg-white/30 '
              }`}
            >
              <span>{language === 'en' ? '🇧🇩' : '🇬🇧'}</span>
              <span className="text-sm hidden sm:inline">
                {language === 'en' ? 'বাংলা' : 'English'}
              </span>
            </button>
            <button
              className={`px-4 py-2 rounded-lg font-medium transition ${
                scrolled
                  ? 'bg-teal-600 hover:bg-teal-700 '
                  : 'bg-white hover:bg-gray-100 text-teal-600'
              }`}
            >
              {t('navbar.getStarted')}
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};
