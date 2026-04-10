import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Eye, Tag, Share2, ThumbsUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { useAuth } from '../AuthContext';
import toast from 'react-hot-toast';

const NewsDetail = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    loadBlog();
  }, [id]);

  const loadBlog = () => {
    setLoading(true);
    const blogs = JSON.parse(localStorage.getItem('caniel_blogs')) || [];
    const foundBlog = blogs.find(b => b.id.toString() === id);
    
    if (foundBlog) {
      // Simulate view count
      const views = (foundBlog.views || 0) + 1;
      foundBlog.views = views;
      
      const updatedBlogs = blogs.map(b => b.id.toString() === id ? foundBlog : b);
      localStorage.setItem('caniel_blogs', JSON.stringify(updatedBlogs));
      
      setBlog(foundBlog);
      setLikes(foundBlog.likes || 0);
    }
    setLoading(false);
  };

  const handleLike = () => {
    const newLikes = likes + 1;
    setLikes(newLikes);
    
    // Update localStorage
    if (blog) {
      blog.likes = newLikes;
      const blogs = JSON.parse(localStorage.getItem('caniel_blogs')) || [];
      const updatedBlogs = blogs.map(b => b.id.toString() === id ? blog : b);
      localStorage.setItem('caniel_blogs', JSON.stringify(updatedBlogs));
    }
    
    toast.success('Thanks for the like!');
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading post...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center max-w-md mx-auto p-12">
          <div className="text-8xl mb-8 opacity-30">📭</div>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Post not found</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/news"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <ArrowLeft className="w-5 h-5 rotate-180" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900">
      {/* Back Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/news"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Blog
        </Link>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 rounded-3xl overflow-hidden shadow-2xl bg-white dark:bg-gray-800"
        >
          <img 
            src={blog.image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200'} 
            alt={blog.title}
            className="w-full h-96 object-cover"
          />
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex items-center gap-6 mb-6 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{format(new Date(blog.date), 'MMMM dd, yyyy')}</span>
            </div>
            <div className="w-px h-4 bg-gray-300 dark:bg-gray-600" />
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span>{(blog.views || 0).toLocaleString()} views</span>
            </div>
            {blog.readingTime && (
              <>
                <div className="w-px h-4 bg-gray-300 dark:bg-gray-600" />
                <span>{blog.readingTime} min read</span>
              </>
            )}
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-8 leading-tight">
            {blog.title}
          </h1>

          {blog.tags && (
            <div className="flex flex-wrap gap-3">
              {blog.tags.slice(0, 4).map((tag, idx) => (
                <span key={idx} className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-blue-800 dark:text-blue-300 text-sm font-semibold rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </motion.header>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-lg dark:prose-invert max-w-none mb-16"
          dangerouslySetInnerHTML={{ __html: blog.content || '<p>Content will be loaded from admin editor...</p>' }}
        />

        {/* Meta Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center gap-6 bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-sm">CA</span>
            </div>
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">{blog.author}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{format(new Date(blog.date), 'MMM dd, yyyy')}</div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={handleLike}
              className="flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-2xl font-semibold transition-all group"
            >
              <ThumbsUp className="w-5 h-5 group-hover:fill-blue-500 group-hover:text-blue-500 transition-all" />
              Like ({likes})
            </button>
            
            <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-2xl font-semibold transition-all">
              <Share2 className="w-5 h-5" />
              Share
            </button>
          </div>

          {isAuthenticated && (
            <div className="ml-auto flex gap-2">
              <Link
                to={`/admin/news/edit/${id}`}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold rounded-2xl hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2"
              >
                Edit Post
              </Link>
            </div>
          )}
        </motion.div>

        {/* Related Posts - Simplified */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">Related Posts</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {blogs.slice(0, 3).filter(b => b.id.toString() !== id).map(related => (
              <Link key={related.id} to={`/news/${related.id}`} className="group block">
                <div className="h-48 bg-gray-200 dark:bg-gray-800 rounded-2xl overflow-hidden mb-4 group-hover:scale-105 transition-transform">
                  <img src={related.image} alt={related.title} className="w-full h-full object-cover group-hover:scale-110" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">{related.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">{related.excerpt}</p>
              </Link>
            ))}
          </div>
        </motion.section>
      </article>
    </div>
  );
};

export default NewsDetail;
