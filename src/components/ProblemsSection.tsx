'use client';

import { useEffect, useRef } from 'react';
import image from '../../src/assets/Group (1).png';
import { useLanguage } from '../../lib/language-context';
import { getTranslation } from '../../lib/i18n';

export default function ProblemsSection() {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);

  const headingRef = useRef(null);
  const listItemsRef = useRef([]);
  const imageRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
    script.async = true;

    script.onload = () => {
      const { gsap } = window;

      // Set initial states
      gsap.set(headingRef.current, { opacity: 0, y: -30 });
      gsap.set(imageRef.current, { opacity: 0, x: -50, scale: 0.9 });
      gsap.set(listItemsRef.current, { opacity: 0, x: 30 });

      // Create animation timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Animate heading
      tl.to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
      });

      // Animate image
      tl.to(
        imageRef.current,
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
        },
        '-=0.5'
      );
      tl.to(
        listItemsRef.current,
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.15,
        },
        '-=0.5'
      );

      // Add subtle floating animation to image
      gsap.to(imageRef.current, {
        y: -15,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: 1.5,
      });
    };

    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const problems = [
    t('problems.item1'),
    t('problems.item2'),
    t('problems.item3'),
    t('problems.item4'),
  ];

  return (
    <div className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Side - Image */}
          <div
            ref={imageRef}
            className="flex justify-center lg:justify-start order-2 lg:order-1"
          >
            <img src={image || '/placeholder.svg'} alt="" className="" />
          </div>

          {/* Right Side - Content */}
          <div className="order-1 lg:order-2">
            <h1
              ref={headingRef}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 lg:mb-12"
            >
              {t('problems.title')}
            </h1>

            <ul className="space-y-6 lg:space-y-8">
              {problems.map((problem, index) => (
                <li
                  key={index}
                  ref={(el) => (listItemsRef.current[index] = el)}
                  className="flex items-start gap-3 sm:gap-4"
                >
                  <div className="flex-shrink-0 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-gray-900 rounded-full mt-2"></div>
                  <p className="text-base sm:text-lg lg:text-xl text-gray-800 leading-relaxed font-medium">
                    {problem}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
