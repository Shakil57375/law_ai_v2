import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      navbar: {
        home: 'Home',
        about: 'About',
        support: 'Support',
        contact: 'Contact',
        reviews: 'Reviews',
        getStarted: 'Get Started Now',
      },
      banner: {
        title: 'AI-Powered Legal Assistant',
        subtitle: 'with Verified Law References',
        description:
          'Understand laws, access complete legal information, solve your legal queries instantly',
        logIn: 'Log In',
        signUp: 'Sign Up',
        appStore: 'App Store',
        googlePlay: 'Google Play',
      },
      problems: {
        title: 'What Problems Do We Solve?',
        confusing: 'Confusing legal language',
        time: 'Time-consuming searches',
        searching: 'Searching through huge law books',
        consultations: 'Expensive consultations for basic queries',
      },
      whoFor: {
        title: 'Who Is This For',
        description:
          'Our platform offers AI-driven legal services designed to provide quick, reliable, and easy-to-understand legal assistance. Through intelligent chatbot support and structured case studies, we help users understand complex legal issues.',
        judges: 'Judges',
        laws: 'Laws',
        advocates: 'Advocates',
        students: 'Law Students',
        government: 'Government',
      },
      howWorks: {
        title: 'How It Works',
        step1: 'Ask your legal question or upload a case',
        step2: 'AI analyzes laws, precedents & references',
        step3: 'Get structured, citation-based answers instantly',
      },
      tutorial: {
        title: 'Tutorial',
      },
      aboutUs: {
        title: 'About US',
        description:
          'Our platform serves as a resource for improving your legal acumen and making sure you stay in high demand.',
        startNow: 'Start a new legal →',
      },
      blog: {
        title: 'Our Recent Blog',
        subtitle: 'By Our Experts',
        description: 'Explore insights on AI-powered legal technology, legal awareness, and case-based learning—designed to keep you informed, educated, and up to date.',
        viewWork: 'View Work',
        chatBot: 'Chat Bot',
      },
      footer: {
        product: 'Product',
        resources: 'Resources',
        features: 'Features',
        pricing: 'Pricing',
        digital: 'Digital Marketing',
        company: 'Company',
        about: 'About',
        careers: 'Careers',
        contact: 'Contact us',
        blog: 'Blog',
        legal: 'Legal',
        privacy: 'Privacy Policy',
        terms: 'Terms & Conditions',
      },
    },
  },
  bn: {
    translation: {
      navbar: {
        home: 'হোম',
        about: 'আমাদের সম্পর্কে',
        support: 'সাপোর্ট',
        contact: 'যোগাযোগ',
        reviews: 'রিভিউ',
        getStarted: 'এখনই শুরু করুন',
      },
      banner: {
        title: 'এআই-চালিত আইনজীবীর ডেডিকেটেড সহায়ক',
        subtitle: 'যাচাইকৃত আইনি রেফারেন্স সহ',
        description:
          'আইন বুঝুন, সম্পূর্ণ আইনি তথ্য অ্যাক্সেস করুন, তাৎক্ষণিকভাবে আপনার আইনি প্রশ্নের সমাধান করুন',
        logIn: 'লগইন করুন',
        signUp: 'সাইন আপ করুন',
        appStore: 'অ্যাপ স্টোর',
        googlePlay: 'গুগল প্লে',
      },
      problems: {
        title: 'আমরা কোন সমস্যার সমাধান করি?',
        confusing: 'বিভ্রান্তিকর আইনি ভাষা',
        time: 'সময়সাপেক্ষ অনুসন্ধান',
        searching: 'বিশাল আইন বই দিয়ে অনুসন্ধান',
        consultations: 'মৌলিক প্রশ্নের জন্য ব্যয়বহুল পরামর্শ',
      },
      whoFor: {
        title: 'এটি কার জন্য',
        description:
          'আমাদের প্ল্যাটফর্ম এআই-চালিত আইনি সেবা প্রদান করে যা দ্রুত, নির্ভরযোগ্য এবং সহজবোধ্য আইনি সহায়তা প্রদান করে।',
        judges: 'বিচারক',
        laws: 'আইন',
        advocates: 'অ্যাডভোকেট',
        students: 'আইন ছাত্র',
        government: 'সরকার',
      },
      howWorks: {
        title: 'এটি কিভাবে কাজ করে',
        step1: 'আপনার আইনি প্রশ্ন জিজ্ঞাসা করুন বা কেস আপলোড করুন',
        step2: 'এআই আইন, নজির এবং রেফারেন্স বিশ্লেষণ করে',
        step3: 'তাৎক্ষণিক কাঠামোগত, উদ্ধৃতি-ভিত্তিক উত্তর পান',
      },
      tutorial: {
        title: 'টিউটোরিয়াল',
      },
      aboutUs: {
        title: 'আমাদের সম্পর্কে',
        description:
          'আমাদের প্ল্যাটফর্ম আপনার আইনি জ্ঞান উন্নত করার এবং নিশ্চিত করে যে আপনি অত্যন্ত চাহিদা সম্পন্ন থাকেন।',
        startNow: 'নতুন আইনি শুরু করুন →',
      },
      blog: {
        title: 'আমাদের সাম্প্রতিক ব্লগ',
        subtitle: 'আমাদের বিশেষজ্ঞদের দ্বারা',
        description: 'এআই-চালিত আইনি প্রযুক্তি, আইনি সচেতনতা এবং কেস-ভিত্তিক শিক্ষণ সম্পর্কে অন্তর্দৃষ্টি অন্বেষণ করুন—আপনাকে অবহিত, শিক্ষিত এবং আপ-টু-ডেট রাখার জন্য ডিজাইন করা হয়েছে।',
        viewWork: 'কাজ দেখুন',
        chatBot: 'চ্যাট বট',
      },
      footer: {
        product: 'পণ্য',
        resources: 'রিসোর্স',
        features: 'ফিচার',
        pricing: 'মূল্য নির্ধারণ',
        digital: 'ডিজিটাল মার্কেটিং',
        company: 'কোম্পানি',
        about: 'সম্পর্কে',
        careers: 'ক্যারিয়ার',
        contact: 'যোগাযোগ করুন',
        blog: 'ব্লগ',
        legal: 'আইনি',
        privacy: 'গোপনীয়তা নীতি',
        terms: 'শর্তাবলী',
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'bn',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
