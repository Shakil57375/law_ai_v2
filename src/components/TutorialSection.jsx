import { getTranslation } from '../../lib/i18n';
import { useLanguage } from '../../lib/language-context';

export default function TutorialSection() {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);

  return (
    <div className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-12 lg:mb-16 text-gray-900">
          {t('tutorial.title')}
        </h2>

        <div className="relative bg-gray-300 rounded-lg overflow-hidden aspect-[calc(4*2+1)/3] flex items-center justify-center hover:bg-gray-400 transition cursor-pointer shadow-lg hover:shadow-xl">
          <button className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-teal-500 flex items-center justify-center text-white text-2xl sm:text-3xl lg:text-4xl hover:bg-teal-600 transition hover:scale-110">
            ▶️
          </button>
        </div>
      </div>
    </div>
  );
}
