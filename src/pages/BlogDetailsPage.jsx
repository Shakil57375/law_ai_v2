import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { blogPosts } from '../../lib/blogData';
import { ChevronRight, Clock, Calendar } from 'lucide-react';
import Footer from '../components/Footer';
import { Navbar } from './Home/Navbar';

const BlogDetailsPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [imageIndex, setImageIndex] = useState(0);

  // Ensure scroll to top when slug changes
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    scrollToTop();
    const timer = setTimeout(scrollToTop, 100);
    return () => clearTimeout(timer);
  }, [slug]);

  // Debug: Log the slug and available slugs
  console.log('Looking for slug:', slug);
  console.log(
    'Available slugs:',
    blogPosts.map((p) => p.slug)
  );

  // Find the blog post by slug
  const post = blogPosts.find((p) => p.slug === slug);

  console.log('Found post:', post ? post.title : 'Not found');

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Blog Post Not Found
          </h1>
          <Link
            to="/blog"
            className="text-teal-500 hover:text-teal-600 font-semibold"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const handleNextImage = () => {
    setImageIndex((prev) => (prev + 1) % (post.contentImages?.length || 1));
  };

  const handlePrevImage = () => {
    setImageIndex(
      (prev) =>
        (prev - 1 + (post.contentImages?.length || 1)) %
        (post.contentImages?.length || 1)
    );
  };

  return (
    <div>
      <Navbar />
      <div className="bg-white">
        {/* Breadcrumb Navigation */}
        <div className="max-w-5xl mx-auto px-4 py-6 md:px-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-teal-500">
              Home
            </Link>
            <ChevronRight size={16} />
            <Link to="/blog" className="hover:text-teal-500">
              Blog
            </Link>
            <ChevronRight size={16} />
            <span className="text-gray-900 font-medium">{post.title}</span>
          </div>
        </div>

        {/* Featured Image with Category Badge */}
        <div className="relative max-w-5xl mx-auto px-4 md:px-6">
          <div className="relative rounded-2xl overflow-hidden bg-gray-200 h-96 md:h-[500px]">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            {/* Category Badge */}
            <div
              className="absolute top-6 left-6 px-4 py-2 rounded-lg text-white font-semibold flex items-center gap-2 backdrop-blur-sm"
              style={{
                backgroundColor: post.category.color + '99',
              }}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: post.category.color }}
              />
              {post.category.name}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-12">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} />
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Author Section */}
          <div className="flex items-center gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-gray-900">{post.author.name}</p>
              <p className="text-sm text-gray-600">{post.author.bio}</p>
            </div>
          </div>

          {/* Introduction */}
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            {post.content}
          </p>

          {/* Content Sections */}
          {post.sections?.map((section, index) => (
            <div key={index} className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {section.title}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {section.content}
              </p>

              {/* Insert content images between sections */}
              {post.contentImages && index < post.contentImages.length && (
                <div className="my-8 rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={post.contentImages[index].url}
                    alt={post.contentImages[index].caption}
                    className="w-full h-auto object-cover"
                  />
                  <p className="text-sm text-gray-600 p-4 text-center bg-gray-50">
                    {post.contentImages[index].caption}
                  </p>
                </div>
              )}
            </div>
          ))}

          {/* Key Points Section */}
          {post.keyPoints && post.keyPoints.length > 0 && (
            <div className="my-12 p-6 bg-teal-50 rounded-lg border border-teal-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                This accessibility is particularly beneficial for:
              </h3>
              <ul className="space-y-3">
                {post.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-semibold">
                        •
                      </span>
                    </div>
                    <span className="text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="my-8 pt-8 border-t border-gray-200">
              <h4 className="text-sm font-semibold text-gray-600 mb-3">
                Tags:
              </h4>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 cursor-pointer transition"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Related Posts Section */}
        {post.relatedPosts && post.relatedPosts.length > 0 && (
          <div className="bg-gray-50 py-16 mt-12">
            <div className="max-w-6xl mx-auto px-4 md:px-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
                Related Articles
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {post.relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    to={`/blog/${relatedPost.slug}`}
                    className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                  >
                    <div className="relative h-48 bg-gray-200 overflow-hidden">
                      <img
                        src={relatedPost.featuredImage}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span
                          className="px-3 py-1 rounded-full text-white text-xs font-semibold"
                          style={{
                            backgroundColor:
                              blogPosts.find((p) => p.id === relatedPost.id)
                                ?.category?.color || '#3B82F6',
                          }}
                        >
                          {relatedPost.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-teal-500 transition">
                        {relatedPost.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock size={14} />
                        <span>{relatedPost.readTime} read</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 transition"
            >
              ← Back
            </button>
            <Link
              to="/blog"
              className="px-6 py-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition text-center"
            >
              View All Articles →
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogDetailsPage;
