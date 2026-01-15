'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../lib/language-context';
import { getTranslation } from '../../lib/i18n';

export default function BlogSection() {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);
  const [currentSlide, setCurrentSlide] = useState(0);

  const blogPosts = [
    {
      id: 1,
      title: t('blog.chatBot'),
      image: '/ui-design-showcase-for-chatbot-interface-mockup.jpg',
    },
    {
      id: 2,
      title: t('blog.chatBot'),
      image: '/premium-websites-and-apps-for-startups-mockup.jpg',
    },
    {
      id: 3,
      title: t('blog.chatBot'),
      image: '/texas-transaction-coordinator-app-mockup.jpg',
    },
    {
      id: 4,
      title: t('blog.chatBot'),
      image: '/additional-design-project-mockup.jpg',
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % (blogPosts.length - 2));
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + (blogPosts.length - 2)) % (blogPosts.length - 2)
    );
  };

  return (
    <section className="bg-white px-6 py-20 md:px-12 relative w-full">
      <div className="flex flex-col items-center text-center absolute top-16 left-1/3 transform -translate-x-1/2 z-50">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-2 leading-tight">
          {t('blog.title')}
        </h1>
        <p className="text-2xl md:text-3xl font-light text-gray-900">
          {t('blog.subtitle')}
        </p>
      </div>
      <div className="flex min-h-96 relative justify-end items-end">
        <div className="w-1/4 flex flex-col justify-between items-start pr-8">
          <div />
        </div>

        <div className="w-3/4 bg-cyan-50 rounded-tl-[300px] overflow-hidden">
          <div className="p-12">
            {/* Header Section */}
            <div className="grid grid-cols-2 gap-12 mb-16 z-50">
              <div></div>
              <div>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                  {t('blog.description')}
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-lg">
                <div
                  className="flex transition-transform duration-500 ease-out gap-6"
                  style={{
                    transform: `translateX(-${
                      currentSlide * (100 / 3 + 2.4)
                    }%)`,
                  }}
                >
                  {blogPosts.map((post) => (
                    <div
                      key={post.id}
                      className="flex-shrink-0 w-1/3 bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
                    >
                      <div className="aspect-square bg-gray-200 overflow-hidden">
                        <img
                          src={post.image || '/placeholder.svg'}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="p-8 flex flex-col items-center justify-center gap-6">
                        <h3 className="text-2xl font-bold text-gray-900">
                          {post.title}
                        </h3>
                        <button className="px-8 py-3 border-2 border-gray-900 text-gray-900 rounded-full font-medium hover:bg-gray-900 hover:text-white transition-colors text-lg">
                          {t('blog.viewWork')}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-4 mt-8 justify-start">
              <button
                onClick={prevSlide}
                className="w-12 h-12 rounded-full border-2 border-gray-400 flex items-center justify-center hover:bg-gray-400 hover:text-white transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextSlide}
                className="w-12 h-12 rounded-full border-2 border-gray-400 flex items-center justify-center hover:bg-gray-400 hover:text-white transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
