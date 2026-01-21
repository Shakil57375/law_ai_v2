// WhoIsForSection.jsx
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import imge1 from '../../src/assets/Card/Group (3) - Copy.png';
import imge2 from '../../src/assets/Card/Group (2) - Copy.png';
import imge3 from '../../src/assets/Card/10137 [Converted].png';
import imge4 from '../../src/assets/Card/Layer_4.png';
import { useLanguage } from '../../lib/language-context';
import { getTranslation } from '../../lib/i18n';

export default function WhoIsForSection() {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);

  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardsRef = useRef([]);
  const detailBoxRef = useRef(null);
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
    script.async = true;

    script.onload = () => {
      const { gsap } = window;

      // Set initial states
      gsap.set(headingRef.current, { opacity: 0, y: -30 });
      gsap.set(subtitleRef.current, { opacity: 0, y: -20 });
      gsap.set(cardsRef.current, { opacity: 0, y: 50, scale: 0.9 });
      gsap.set(detailBoxRef.current, { opacity: 0, y: 30 });

      // Create animation timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
      })
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
          },
          '-=0.4'
        )
        .to(
          cardsRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.15,
          },
          '-=0.3'
        )
        .to(
          detailBoxRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          '-=0.4'
        );
    };

    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const handleCardClick = (id) => {
    setActiveCard(id);

    if (window.gsap && detailBoxRef.current) {
      const { gsap } = window;

      gsap.fromTo(
        detailBoxRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      );
    }
  };

  const audiences = [
    {
      id: 0,
      title: t('whoIsFor.users'),
      image: imge1,
      icon: 'law-scale',
      color: 'bg-blue-100',
      heading: t('whoIsFor.users'),
      description: t('whoIsFor.users_description'),
      points: [
        {
          title: t('whoIsFor.users_point1_title'),
          desc: t('whoIsFor.users_point1_desc'),
        },
        {
          title: t('whoIsFor.users_point2_title'),
          desc: t('whoIsFor.users_point2_desc'),
        },
        {
          title: t('whoIsFor.users_point3_title'),
          desc: t('whoIsFor.users_point3_desc'),
        },
      ],
    },
    {
      id: 1,
      title: t('whoIsFor.law'),
      icon: 'student',
      image: imge2,
      color: 'bg-teal-100',
      heading: t('whoIsFor.law'),
      description: t('whoIsFor.law_description'),
      points: [
        {
          title: t('whoIsFor.law_point1_title'),
          desc: t('whoIsFor.law_point1_desc'),
        },
        {
          title: t('whoIsFor.law_point2_title'),
          desc: t('whoIsFor.law_point2_desc'),
        },
        {
          title: t('whoIsFor.law_point3_title'),
          desc: t('whoIsFor.law_point3_desc'),
        },
      ],
    },
    {
      id: 2,
      title: t('whoIsFor.advocates'),
      icon: 'lawyer',
      image: imge3,
      color: 'bg-gray-100',
      heading: t('whoIsFor.advocates'),
      description: t('whoIsFor.advocates_description'),
      points: [
        {
          title: t('whoIsFor.advocates_point1_title'),
          desc: t('whoIsFor.advocates_point1_desc'),
        },
        {
          title: t('whoIsFor.advocates_point2_title'),
          desc: t('whoIsFor.advocates_point2_desc'),
        },
        {
          title: t('whoIsFor.advocates_point3_title'),
          desc: t('whoIsFor.advocates_point3_desc'),
        },
      ],
    },
    {
      id: 3,
      title: t('whoIsFor.lawFirms'),
      image: imge4,
      icon: 'organization',
      color: 'bg-purple-100',
      heading: t('whoIsFor.lawFirms'),
      description: t('whoIsFor.lawFirms_description'),
      points: [
        {
          title: t('whoIsFor.lawFirms_point1_title'),
          desc: t('whoIsFor.lawFirms_point1_desc'),
        },
        {
          title: t('whoIsFor.lawFirms_point2_title'),
          desc: t('whoIsFor.lawFirms_point2_desc'),
        },
        {
          title: t('whoIsFor.lawFirms_point3_title'),
          desc: t('whoIsFor.lawFirms_point3_desc'),
        },
      ],
    },
  ];

  return (
    <div id="whoIsFor" className="sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h1
            ref={headingRef}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6"
          >
            {t('whoIsFor.title')}
          </h1>
          <p
            ref={subtitleRef}
            className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            {t('whoIsFor.description')}
          </p>
        </motion.div>

        {/* Cards Section */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-12 lg:mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
          viewport={{ once: true }}
        >
          {audiences.map((audience, index) => (
            <motion.div
              key={audience.id}
              ref={(el) => (cardsRef.current[index] = el)}
              onClick={() => handleCardClick(audience.id)}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
              className={`${
                audience.color
              } rounded-2xl p-4 sm:p-5 lg:p-6 cursor-pointer transition-all duration-300 hover:shadow-xl ${
                activeCard === audience.id
                  ? 'ring-4 ring-teal-500 shadow-lg'
                  : ''
              }`}
            >
              <div className="flex flex-col items-center text-center">
                {/* Icon SVG */}
                <motion.div
                  className="w-full h-24 sm:h-28 lg:h-32 flex items-center justify-center mb-2"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={audience.image || '/placeholder.svg'}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </motion.div>
                <h3 className="text-xs sm:text-sm lg:text-base font-bold text-gray-900 leading-tight">
                  {audience.title}
                </h3>
                <button className="mt-2 text-gray-600">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Detail Box */}
        <motion.div
          ref={detailBoxRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-xl p-4 sm:p-6 lg:p-12 border border-gray-200"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
            {/* Left Content */}
            <motion.div
              className="order-2 lg:order-1"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                {audiences[activeCard].heading}
              </h2>

              <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed mb-4 sm:mb-6">
                {audiences[activeCard].description}
              </p>

              <ul className="space-y-3 sm:space-y-4">
                {audiences[activeCard].points.map((point, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-2 sm:gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <span className="text-teal-600 font-bold mt-1 flex-shrink-0">
                      •
                    </span>
                    <p className="text-sm sm:text-base text-gray-700">
                      <strong className="text-gray-900">{point.title}</strong> —{' '}
                      {point.desc}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Right Illustration */}
            <motion.div
              className="flex justify-center order-1 lg:order-2 w-full h-auto"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <img
                className="w-full h-auto max-w-xs sm:max-w-sm lg:max-w-md"
                src={audiences[activeCard].image || '/placeholder.svg'}
                alt={audiences[activeCard].title}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
