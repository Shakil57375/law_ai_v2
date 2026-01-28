import { Link } from 'react-router-dom';
import { getTranslation } from '../../lib/i18n';
import { useLanguage } from '../../lib/language-context';
import about_image from '../assets/baner-image.png';

export default function AboutUsSection() {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);

  return (
    <div
      id="about"
      className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
        <div className="flex justify-center lg:justify-start order-2 lg:order-1 w-full">
          <img
            src={about_image}
            alt="About us"
            className="w-full h-auto max-w-sm lg:max-w-md"
          />
        </div>
        <div className="order-1 lg:order-2">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 lg:mb-8 text-gray-900">
            {t('aboutUs.title')}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
            {t('aboutUs.description')}
          </p>
          <Link
            to="/"
            className="text-teal-600 font-semibold hover:text-teal-700 transition flex items-center gap-2 text-sm sm:text-base"
          >
            {t('aboutUs.learnMore')}
          </Link>
        </div>
      </div>
    </div>
  );
}
