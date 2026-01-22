import { useEffect, useState } from 'react';
import { getTranslation } from '../../../lib/i18n';
import { useLanguage } from '../../../lib/language-context';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/logo.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUp } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectAccessToken } from '../../features/auth/authSlice';

// Navbar Component
export const Navbar = () => {
  const { language, setLanguage } = useLanguage();
  const t = (key) => getTranslation(language, key);
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const token = useSelector(selectAccessToken);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);

    if (element) {
      // Element exists on current page, scroll to it
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    } else if (location.pathname !== '/home') {
      // Element doesn't exist and we're not on home page
      // Navigate to home page first, then scroll
      navigate('/home');
      setMobileMenuOpen(false);

      // Scroll to section after navigation completes
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
  };

  const handleHomeClick = () => {
    if (location.pathname === '/home') {
      // Already on home page, scroll to banner
      scrollToSection('banner');
    } else {
      // Navigate to home (will show banner by default)
      navigate('/home');
      setMobileMenuOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const menuItems = [
    { label: t('navbar.home'), id: 'banner', href: '/home', action: 'home' },
    { label: t('navbar.features'), id: 'features' },
    { label: t('navbar.whoIsFor'), id: 'whoIsFor' },
    { label: t('navbar.howWorks'), id: 'howWorks' },
    { label: t('navbar.about'), id: 'about' },
    { label: t('navbar.blog'), id: 'blog' },
    { label: t('navbar.contact'), id: 'contact', href: '/contact' },
  ];
  const menuVariants = {
    hidden: { opacity: 0, x: -300 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    exit: {
      opacity: 0,
      x: -300,
      transition: { duration: 0.3, ease: 'easeIn' },
    },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.3 },
    }),
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-lg' : 'bg-white text-[#161C2D]'
        }`}
      >
        <div className="w-full lg:px-52 px-4 sm:px-6 mx-auto">
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

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-6">
              {menuItems.map((item) => {
                const commonProps = {
                  key: item.id,
                  whileHover: { scale: 1.05 },
                  whileTap: { scale: 0.95 },
                  className: `hover:opacity-80 transition font-medium ${
                    scrolled ? 'text-gray-700' : ''
                  }`,
                };

                if (item.action === 'home') {
                  return (
                    <motion.button
                      key={item.id}
                      {...commonProps}
                      onClick={handleHomeClick}
                    >
                      {item.label}
                    </motion.button>
                  );
                }

                if (item.href) {
                  return (
                    <Link key={item.id} to={item.href}>
                      <motion.div
                        {...commonProps}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </motion.div>
                    </Link>
                  );
                }

                return (
                  <motion.button
                    key={item.id}
                    {...commonProps}
                    onClick={() => scrollToSection(item.id)}
                  >
                    {item.label}
                  </motion.button>
                );
              })}
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              {/* Desktop Language Toggle */}
              <div className="hidden lg:flex items-center bg-teal-100 rounded-full p-1 relative">
                <motion.div
                  className="absolute top-1 bottom-1 bg-teal-600 rounded-full"
                  initial={false}
                  animate={{
                    left: language === 'bn' ? '4px' : '50%',
                    right: language === 'en' ? '4px' : '50%',
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
                <button
                  onClick={() => setLanguage('bn')}
                  className={`relative z-10 px-4 py-1.5 rounded-full font-medium text-sm transition-colors ${
                    language === 'bn' ? 'text-white' : 'text-teal-700'
                  }`}
                >
                  বাং
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`relative z-10 px-4 py-1.5 rounded-full font-medium text-sm transition-colors ${
                    language === 'en' ? 'text-white' : 'text-teal-700'
                  }`}
                >
                  EN
                </button>
              </div>

              {token ? (
                <Link to="/">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition cursor-pointer ${
                      scrolled
                        ? 'bg-teal-600 hover:bg-teal-700 text-white'
                        : 'text-white  bg-teal-600'
                    }`}
                  >
                    {t('navbar.getStarted')}
                  </motion.div>
                </Link>
              ) : (
                <Link to="/login">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition cursor-pointer ${
                      scrolled
                        ? 'bg-teal-600 hover:bg-teal-700 text-white'
                        : 'text-white  bg-teal-600'
                    }`}
                  >
                    {t('navbar.getStarted')}
                  </motion.div>
                </Link>
              )}

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 md:hidden "
              style={{
                backdropFilter: 'blur(5px)',
                WebkitBackdropFilter: 'blur(5px)',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
              }}
            />
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed left-0 top-16 h-screen w-64 bg-white shadow-xl z-40 md:hidden overflow-y-auto"
            >
              <div className="p-6 space-y-4">
                {menuItems.map((item, i) => {
                  const commonProps = {
                    key: item.id,
                    custom: i,
                    variants: menuItemVariants,
                    initial: 'hidden',
                    animate: 'visible',
                    whileHover: { x: 10, backgroundColor: '#f3f4f6' },
                    whileTap: { scale: 0.95 },
                    className:
                      'w-full text-left px-4 py-3 rounded-lg text-gray-700 font-medium transition hover:text-teal-600',
                  };

                  if (item.action === 'home') {
                    return (
                      <motion.button
                        key={item.id}
                        {...commonProps}
                        onClick={handleHomeClick}
                      >
                        {item.label}
                      </motion.button>
                    );
                  }

                  if (item.href) {
                    return (
                      <Link key={item.id} to={item.href}>
                        <motion.div
                          {...commonProps}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.label}
                        </motion.div>
                      </Link>
                    );
                  }

                  return (
                    <motion.button
                      key={item.id}
                      {...commonProps}
                      onClick={() => scrollToSection(item.id)}
                    >
                      {item.label}
                    </motion.button>
                  );
                })}

                <motion.div
                  variants={menuItemVariants}
                  custom={menuItems.length}
                  initial="hidden"
                  animate="visible"
                  className="border-t pt-4"
                >
                  <p className="text-sm text-gray-600 px-4 mb-3">Language</p>
                  <div className="px-4">
                    <div className="flex items-center bg-teal-100 rounded-full p-1 relative">
                      <motion.div
                        className="absolute top-1 bottom-1 bg-teal-600 rounded-full"
                        initial={false}
                        animate={{
                          left: language === 'bn' ? '4px' : '50%',
                          right: language === 'en' ? '4px' : '50%',
                        }}
                        transition={{
                          type: 'spring',
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                      <button
                        onClick={() => setLanguage('bn')}
                        className={`relative z-10 flex-1 px-4 py-2 rounded-full font-medium text-sm transition-colors ${
                          language === 'bn' ? 'text-white' : 'text-teal-700'
                        }`}
                      >
                        বাং
                      </button>
                      <button
                        onClick={() => setLanguage('en')}
                        className={`relative z-10 flex-1 px-4 py-2 rounded-full font-medium text-sm transition-colors ${
                          language === 'en' ? 'text-white' : 'text-teal-700'
                        }`}
                      >
                        EN
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-4 sm:right-6 z-40 bg-teal-600 hover:bg-teal-700 text-white p-3 sm:p-4 rounded-full shadow-lg transition"
          >
            <ArrowUp size={20} className="sm:w-6 sm:h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};
