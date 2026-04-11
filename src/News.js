import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Eye, Tag, ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const News = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = () => {
    const savedBlogs = JSON.parse(localStorage.getItem('caniel_blogs')) || getDemoBlogs();
    setBlogs(savedBlogs);
    setLoading(false);
  };

  const getDemoBlogs = () => [
    {
      id: 1,
      title: 'Welcome to Caniel Agency Blog',
      slug: 'welcome-to-caniel-agency',
      excerpt: 'Discover our latest updates, tech insights, and design trends.',
      content: 'Full content here...',
      date: new Date().toISOString(),
      author: 'Admin',
      category: 'announcement',
      tags: ['caniel', 'agency', 'news'],
      featured: true,
      views: 1250,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800'
    },
    {
      id: 2,
      title: 'React 19 New Features',
      slug: 'react-19-features',
      excerpt: 'Exploring the latest updates in React 19 and what they mean for developers.',
      content: 'Detailed content...',
      date: new Date(Date.now() - 86400000 * 3).toISOString(),
      author: 'Admin',
      category: 'webdev',
      tags: ['react', 'javascript', 'frontend'],
      featured: false,
      views: 892,
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800'
    },
    {
      id: 3,
      title: 'Tailwind CSS 4.0 Preview',
      slug: 'tailwindcss-4-preview',
      excerpt: 'First look at Tailwind CSS 4.0 and its performance improvements.',
      content: 'Detailed content...',
      date: new Date(Date.now() - 86400000 * 7).toISOString(),
      author: 'Admin',
      category: 'design',
      tags: ['tailwind', 'css', 'design'],
      views: 1567,
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800'
    }
  ];

  const filteredBlogs = blogs
    .filter(blog => 
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(blog => selectedCategory === 'all' || blog.category === selectedCategory)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const categories = [
    { id: 'all', label: 'All', count: blogs.length },
    { id: 'announcement', label: 'Announcements', count: blogs.filter(b => b.category === 'announcement').length },
    { id: 'webdev', label: 'Web Dev', count: blogs.filter(b => b.category === 'webdev').length },
    { id: 'design', label: 'Design', count: blogs.filter(b => b.category === 'design').length },
    { id: 'mobile', label: 'Mobile', count: blogs.filter(b => b.category === 'mobile').length }
  ];

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-gray-900 to-gray-800 py-32 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-indigo-600/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Blog & News
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto opacity-90">
              Latest insights, tutorials, and company updates
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Filters & Search */}
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-center mb-16">
          <div className="flex flex-wrap gap-3">
            {categories.map(cat => (
              <motion.button
                key={cat.id}
                className={`px-6 py-3 rounded-2xl font-semibold transition-all shadow-md ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-blue-500/50'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:shadow-lg'
                }`}
                onClick={() => setSelectedCategory(cat.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {cat.label} ({cat.count})
              </motion.button>
            ))}
          </div>
          <div className="relative max-w-md w-full">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all shadow-lg"
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Featured Post */}
        {filteredBlogs.find(b => b.featured) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <Link to={`/news/${filteredBlogs.find(b => b.featured)?.id}`}>
              <div className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 shadow-2xl hover:shadow-3xl transition-all duration-500 aspect-video">
                <img 
                  src={filteredBlogs.find(b => b.featured)?.image} 
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <span className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-full text-sm font-bold mb-4">
                    Featured
                  </span>
                  <h2 className="text-4xl font-black text-white mb-4 leading-tight group-hover:text-blue-400 transition-colors">
                    {filteredBlogs.find(b => b.featured)?.title}
                  </h2>
                  <p className="text-lg text-white/90 mb-6 line-clamp-3">
                    {filteredBlogs.find(b => b.featured)?.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-white/80 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {format(new Date(filteredBlogs.find(b => b.featured)?.date), 'MMM dd, yyyy')}
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      {filteredBlogs.find(b => b.featured)?.views?.toLocaleString() || 0} views
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.slice(1).map((blog, index) => (
            <motion.article
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700 transition-all duration-500 hover:-translate-y-2"
            >
              <Link to={`/news/${blog.id}`} className="block h-48 overflow-hidden relative">
                <img 
                  src={blog.image} 
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {blog.featured && (
                  <span className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                    Featured
                  </span>
                )}
              </Link>
              
              <div className="p-8">
                <Link to={`/news/${blog.id}`}>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {blog.title}
                  </h2>
                </Link>
                <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-2 leading-relaxed">
                  {blog.excerpt}
                </p>
                
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{format(new Date(blog.date), 'MMM dd')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{blog.views?.toLocaleString() || 0} views</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {blog.tags?.slice(0, 3).map((tag, idx) => (
                    <span key={idx} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-300 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>

                <Link
                  to={`/news/${blog.id}`}
                  className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors group-hover:translate-x-2"
                >
                  Read More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {filteredBlogs.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="col-span-full text-center py-32"
          >
            <div className="text-8xl mb-8 opacity-30">📝</div>
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-6">No posts found</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
              Try adjusting your search or category filter. New content added regularly.
            </p>
            <Link
              to="/admin"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              Admin Login to Add Posts
              <ExternalLink className="w-5 h-5" />
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default News;
