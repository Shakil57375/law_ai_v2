import { useState, useLayoutEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { blogPosts } from '../../lib/blogData';
import { useLanguage } from '../../lib/language-context';
import { getTranslation } from '../../lib/i18n';
import { useGetAllBlogsQuery } from '../features/api/apiSlice';

export default function BlogSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const {data : blogsData } = useGetAllBlogsQuery();
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);
  const blogs = blogsData || []; // Declare the blogs variable

  const maxSlide = isMobile ? blogs.length - 1 : blogs.length - 2;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % maxSlide);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + maxSlide) % maxSlide);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section
      id="blog"
      className="bg-white px-4 sm:px-6 lg:px-12 py-8 sm:py-12 lg:py-20 relative w-full "
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex flex-col items-center  text-center z-10 absolute lg:top-16 -top-5 lg:left-1/4 left-1 transform lg:-translate-x-1 translate-x-1/2"
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-2 sm:mb-4 leading-tight">
          {t('blog.title')}
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-light text-gray-900 ">
          {t('blog.subtitle')}
        </p>
        <span className='border-4 border-yellow-400 w-28 absolute top-28 right-36 hidden lg:block'></span>
      </motion.div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex min-h-96 relative justify-end items-end">
        <div className="w-1/4 flex flex-col justify-between items-start pr-8">
          <div />
        </div>

        <div className="w-3/4 bg-cyan-50 rounded-tl-[300px] overflow-hidden">
          <div className="p-8 lg:p-12">
            {/* Header Section */}
            <div className="grid grid-cols-2 gap-8 lg:gap-12 mb-12 lg:mb-16 z-10">
              <div></div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <p className="text-base lg:text-lg text-gray-700 leading-relaxed">
                  {t('blog.description')}
                </p>
              </motion.div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-lg">
                <motion.div
                  className="flex gap-6"
                  animate={{ x: `-${currentSlide * (100 / 3 + 2.4)}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  {blogs.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex-shrink-0 w-1/3 bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
                    >
                      <motion.div
                        className="aspect-square bg-gray-200 overflow-hidden"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <img
                          src={post.featuredImage || '/placeholder.svg'}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>

                      <div className="p-6 lg:p-8 flex flex-col items-center justify-center gap-4 lg:gap-6">
                        <h3 className="text-xl lg:text-2xl font-bold text-gray-900 text-center">
                          {post.title}
                        </h3>
                        <Link to={`/blog/${post.slug}`}>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 lg:px-8 py-2 lg:py-3 border-2 border-gray-900 text-gray-900 rounded-full font-medium hover:bg-gray-900 hover:text-white transition-colors text-base lg:text-lg"
                          >
                            {t('blog.viewWork')}
                          </motion.button>
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex gap-4 mt-8 justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: '#d1d5db' }}
                whileTap={{ scale: 0.95 }}
                onClick={prevSlide}
                className="w-12 h-12 rounded-full border-2 border-gray-400 flex items-center justify-center hover:bg-gray-400 hover:text-white transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: '#d1d5db' }}
                whileTap={{ scale: 0.95 }}
                onClick={nextSlide}
                className="w-12 h-12 rounded-full border-2 border-gray-400 flex items-center justify-center hover:bg-gray-400 hover:text-white transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight size={20} />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Layout */}
      <div className="lg:hidden">
        <div className="bg-cyan-50 rounded-2xl overflow-hidden">
          <div className="p-4 sm:p-6">
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-6 sm:mb-8"
            >
              
            </motion.div>

            <div className="relative">
              <div className="overflow-hidden rounded-lg">
                <motion.div
                  className="flex gap-3 sm:gap-4"
                  animate={{ x: `-${currentSlide * 100}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  {blogs.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex-shrink-0 w-full bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                    >
                      <motion.div
                        className="aspect-square bg-gray-200 overflow-hidden"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <img
                          src={post.featuredImage || '/placeholder.svg'}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>

                      <div className="p-3 sm:p-4 flex flex-col items-center justify-center gap-2 sm:gap-3">
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 text-center">
                          {post.title}
                        </h3>
                        <Link to={`/blog/${post.slug}`}>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 sm:px-6 py-2 border-2 border-gray-900 text-gray-900 rounded-full font-medium hover:bg-gray-900 hover:text-white transition-colors text-xs sm:text-sm"
                          >
                            View Post
                          </motion.button>
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex gap-2 sm:gap-3 mt-4 sm:mt-6 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={prevSlide}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-gray-400 flex items-center justify-center hover:bg-gray-400 hover:text-white transition-colors flex-shrink-0"
                aria-label="Previous slide"
              >
                <ChevronLeft size={16} className="sm:w-5 sm:h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextSlide}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-gray-400 flex items-center justify-center hover:bg-gray-400 hover:text-white transition-colors flex-shrink-0"
                aria-label="Next slide"
              >
                <ChevronRight size={16} className="sm:w-5 sm:h-5" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
