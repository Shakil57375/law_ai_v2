import { Navbar } from './Home/Navbar';
import Footer from '../components/Footer';
import { useLanguage } from '../../lib/language-context';
import { getTranslation } from '../../lib/i18n';

const TermsAndConditions = () => {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 bg-white mt-20 mb-10 rounded shadow">
        <h1 className="text-3xl font-bold mb-4">
          {t('termsAndConditions.title')}
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          {t('termsAndConditions.effectiveDate')}
        </p>
        <p className="mb-8 text-gray-700 leading-relaxed">
          {t('termsAndConditions.introduction')}
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">
              {t('termsAndConditions.section1.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('termsAndConditions.section1.content')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">
              {t('termsAndConditions.section2.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('termsAndConditions.section2.content')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">
              {t('termsAndConditions.section3.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('termsAndConditions.section3.content')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">
              {t('termsAndConditions.section4.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('termsAndConditions.section4.content')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">
              {t('termsAndConditions.section5.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('termsAndConditions.section5.content')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">
              {t('termsAndConditions.section6.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('termsAndConditions.section6.content')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">
              {t('termsAndConditions.section7.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('termsAndConditions.section7.content')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">
              {t('termsAndConditions.section8.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('termsAndConditions.section8.content')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">
              {t('termsAndConditions.section9.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('termsAndConditions.section9.content')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">
              {t('termsAndConditions.section10.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('termsAndConditions.section10.content')}
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsAndConditions;
