import { Navbar } from './Home/Navbar';
import Footer from '../components/Footer';
import { useLanguage } from '../../lib/language-context';
import { getTranslation } from '../../lib/i18n';

const PrivacyAndPolicy = () => {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 bg-white mt-20 mb-10 rounded shadow">
        <h1 className="text-3xl font-bold mb-4">
          {t('privacyAndPolicy.title')}
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          {t('privacyAndPolicy.effectiveDate')}
        </p>
        <p className="mb-8 text-gray-700 leading-relaxed">
          {t('privacyAndPolicy.introduction')}
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">
              {t('privacyAndPolicy.section1.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('privacyAndPolicy.section1.content')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">
              {t('privacyAndPolicy.section2.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('privacyAndPolicy.section2.content')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">
              {t('privacyAndPolicy.section3.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('privacyAndPolicy.section3.content')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">
              {t('privacyAndPolicy.section4.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('privacyAndPolicy.section4.content')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">
              {t('privacyAndPolicy.section5.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('privacyAndPolicy.section5.content')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">
              {t('privacyAndPolicy.section6.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('privacyAndPolicy.section6.content')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">
              {t('privacyAndPolicy.section7.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('privacyAndPolicy.section7.content')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">
              {t('privacyAndPolicy.section8.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('privacyAndPolicy.section8.content')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">
              {t('privacyAndPolicy.section9.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('privacyAndPolicy.section9.content')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">
              {t('privacyAndPolicy.section10.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('privacyAndPolicy.section10.content')}
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyAndPolicy;
