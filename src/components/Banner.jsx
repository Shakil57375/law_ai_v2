import { useEffect, useRef } from 'react';
import backgroundImages from '../../src/assets/Group 1597882512 1.png';
import { useLanguage } from '../../lib/language-context';
import { getTranslation } from '../../lib/i18n';
import banner from '../assets/baner-image.png';
import { Link } from 'react-router-dom';

export default function Banner() {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);

  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonsRef = useRef(null);
  const downloadRef = useRef(null);
  const appScreenRef = useRef(null);
  const dotsRef = useRef(null);

  useEffect(() => {
    // Dynamically load GSAP from CDN
    const script = document.createElement('script');
    script.src =
      'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
    script.async = true;

    script.onload = () => {
      const { gsap } = window;

      // Set initial states for animation
      gsap.set(
        [
          headingRef.current,
          descriptionRef.current,
          buttonsRef.current,
          downloadRef.current,
        ],
        {
          opacity: 0,
          y: 30,
        }
      );

      gsap.set(appScreenRef.current, {
        opacity: 0,
        x: 50,
        scale: 0.95,
      });

      // Animate dots (Add delay for stagger effect)
      if (dotsRef.current) {
        const dots = dotsRef.current.children;
        gsap.fromTo(
          dots,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            stagger: 0.02,
            ease: 'back.out(1.7)',
            delay: 0.2,
          }
        );
      }

      // Create timeline for left content animation
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.3,
      })
        .to(
          descriptionRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          '-=0.6'
        )
        .to(
          buttonsRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          '-=0.6'
        )
        .to(
          downloadRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          '-=0.6'
        );

      // Animate app screen (with floating animation)
      gsap.to(appScreenRef.current, {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.5,
      });

      gsap.to(appScreenRef.current, {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: 1.5,
      });

      // Button hover animations
      const buttons = document.querySelectorAll('.hover-button');
      buttons.forEach((button) => {
        button.addEventListener('mouseenter', () => {
          gsap.to(button, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out',
          });
        });

        button.addEventListener('mouseleave', () => {
          gsap.to(button, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out',
          });
        });
      });
    };

    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <section
      id="banner"
      style={{
        backgroundImage: `url(${backgroundImages})`,
      }}
      className="overflow-hidden min-h-[90vh] mt-16 relative bg-bottom bg-no-repeat bg-cover"
    >
      {/* Decorative dots pattern */}
      <div
        ref={dotsRef}
        className="absolute top-4 sm:top-8 right-4 sm:right-12 grid grid-cols-7 gap-1 sm:gap-2"
        aria-hidden="true"
      >
        {[...Array(35)].map((_, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#130D3A] rounded-full"
          ></div>
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="text-white space-y-6 sm:space-y-8">
            <h1
              ref={headingRef}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
            >
              {t('banner.title')}
            </h1>

            <p ref={descriptionRef} className="text-base sm:text-lg opacity-90">
              {t('banner.description')}
            </p>

            <div
              ref={buttonsRef}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <Link
                to={'/login'}
                className="hover-button bg-white text-teal-600 px-6 sm:px-8 py-3 rounded-lg font-semibold transition w-full sm:w-auto"
              >
                {t('banner.logIn')}
              </Link>
              <Link
                to={'/signup'}
                className="hover-button bg-teal-700 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold transition w-full sm:w-auto"
              >
                {t('banner.signUp')}
              </Link>
            </div>

            <div ref={downloadRef} className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                {/* App Store */}
                <div className="relative group w-full sm:w-auto">
                  <a
                    href="#"
                    className="block hover-button pointer-events-none"
                  >
                    <img
                      src="https://i.ibb.co.com/1gYMq68/App-Store.png"
                      alt="Download on App Store"
                      className="h-11 sm:h-12 w-auto mx-auto sm:mx-0 opacity-80"
                    />
                  </a>

                  {/* Tooltip */}
                  <div
                    className="absolute -top-10 left-1/2 -translate-x-1/2
      whitespace-nowrap rounded-md bg-black px-3 py-1 text-xs text-white
      opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    Coming Soon
                  </div>
                </div>

                {/* Play Store */}
                <div className="relative group w-full sm:w-auto">
                  <a
                    href="#"
                    className="block hover-button pointer-events-none"
                  >
                    <img
                      src="https://i.ibb.co.com/8gNnx8GK/Play-Store.png"
                      alt="Get it on Google Play"
                      className="h-11 sm:h-12 w-auto mx-auto sm:mx-0 opacity-80"
                    />
                  </a>

                  {/* Tooltip */}
                  <div
                    className="absolute -top-10 left-1/2 -translate-x-1/2
      whitespace-nowrap rounded-md bg-black px-3 py-1 text-xs text-white
      opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    Coming Soon
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - App Screenshot */}
          <div ref={appScreenRef} className="relative mt-20 lg:mt-6">
            <img src={banner} alt="App Screenshot" className="w-full" />
            <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-white" />
          </div>
        </div>
      </div>
    </section>
  );
}
