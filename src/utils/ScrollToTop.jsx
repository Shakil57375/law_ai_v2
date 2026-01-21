import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Component to scroll to top on route change
const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    const scrollToTopFunc = () => {
      // Scroll the main container
      const mainContainer = document.getElementById('main-scroll-container');
      if (mainContainer) {
        mainContainer.scrollTop = 0;
      }

      // Also scroll window and document as fallback
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    scrollToTopFunc();

    // Also scroll after a short delay to ensure it overrides any other scroll
    const timer = setTimeout(scrollToTopFunc, 50);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return null;
};

export default ScrollToTop;
