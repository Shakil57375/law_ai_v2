import AboutUsSection from '../../components/AboutUsSection';
import BlogSection from '../../components/BlogSection';
import Footer from '../../components/Footer';
import HowItWorksSection from '../../components/HowItWorksSection';
import ProblemsSection from '../../components/ProblemsSection';
import TutorialSection from '../../components/TutorialSection';
import WhoIsForSection from '../../components/WhoIsForSection';
import { LanguageProvider } from '../../../lib/language-context.jsx';
import Banner from '../../components/Banner.jsx';
import { Navbar } from './Navbar.jsx';
export default function Home() {
  return (
    <LanguageProvider>
      <div className=" bg-white font-sans">
        <Navbar />
        <Banner />
        <ProblemsSection />
        <WhoIsForSection />
        <HowItWorksSection />
        <TutorialSection />
        <AboutUsSection />
        <BlogSection />
        <Footer />
      </div>
    </LanguageProvider>
  );
}
