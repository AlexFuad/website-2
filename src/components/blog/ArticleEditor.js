import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import RichTextEditor from './RichTextEditor';
import { Button } from '../../components/ui/Button';
import { X, Save, Image, SaveAll } from 'lucide-react';
import toast from 'react-hot-toast';
import { slugify } from 'slugify';

const ArticleEditor = ({ isOpen, item, collection, onSave, onBack }) => {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('general');
  const [tags, setTags] = useState([]);
  const [featured, setFeatured] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [slug, setSlug] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentTag, setCurrentTag] = useState('');

  const categories = [
    'general', 'announcement', 'webdev', 'design', 'mobile', 'tutorial', 'case-study'
  ];

  useEffect(() => {
    if (item) {
      setTitle(item.title || '');
      setExcerpt(item.excerpt || '');
      setContent(item.content || '');
      setCategory(item.category || 'general');
      setTags(item.tags || []);
      setFeatured(item.featured || false);
      setImageUrl(item.image || '');
      setSlug(item.slug || '');
    } else {
      // Reset form
      setTitle('');
      setExcerpt('');
      setContent('');
      setCategory(collection === 'blogs' ? 'general' : collection);
      setTags([]);
      setFeatured(false);
      setImageUrl('');
      setSlug('');
    }
  }, [item, collection]);

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (!slug) {
      setSlug(slugify(newTitle, { lower: true }));
    }
  };

  const addTag = (e) => {
    if (e.key === 'Enter' && currentTag.trim()) {
      const newTag = currentTag.trim().toLowerCase();
      if (!tags.includes(newTag) && newTag.length > 0) {
        setTags([...tags, newTag]);
      }
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error('Title is required');
      return;
    }

    setLoading(true);
    
    const articleData = {
      title,
      excerpt: excerpt || title.slice(0, 160) + '...',
      content,
      category,
      tags,
      featured,
      image: imageUrl,
      slug: slug || slugify(title, { lower: true }),
      collection
    };

    try {
      await onSave(articleData);
    } catch (error) {
      toast.error('Save failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getCollectionConfig = () => {
    const configs = {
      blogs: { title: 'Blog Post', icon: SaveAll },
      services: { title: 'Service', icon: Package },
      products: { title: 'Product', icon: Package },
      portfolio: { title: 'Portfolio Item', icon: Image },
      users: { title: 'User', icon: Users }
    };
    return configs[collection] || configs.blogs;
  };

  const { title: pageTitle, icon: Icon } = getCollectionConfig();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-screen flex flex-col bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900 text-white overflow-hidden"
    >
      {/* Header */}
      <div className="bg-slate-950/50 backdrop-blur-xl border-b border-slate-800 p-6 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-4">
          <motion.button
            onClick={onBack}
            className="p-3 bg-slate-800/50 hover:bg-slate-700 rounded-2xl border border-slate-700 transition-all hover:shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <X size={20} />
          </motion.button>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
              <Icon size={20} className="text-white drop-shadow-lg" />
            </div>
            <div>
              <h1 className="text-2xl font-black">{pageTitle} Editor</h1>
              <p className="text-slate-400 text-sm">{item ? 'Edit' : 'Create New'}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-sm text-slate-400 bg-slate-800/50 px-4 py-2 rounded-xl backdrop-blur-sm">
            {tags.length} tags • {content.trim().length > 0 ? Math.round(content.trim().length / 500) : 0} min read
          </div>
          
          <motion.button
            onClick={handleSave}
            disabled={loading || !title.trim()}
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-8 py-3 rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Save size={18} />
            {loading ? 'Saving...' : 'Save ' + pageTitle}
          </motion.button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex">
        {/* Sidebar */}
        <div className="w-96 bg-slate-950/80 backdrop-blur-xl border-r border-slate-800 p-8 overflow-y-auto">
          {/* Title */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wide">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              className="w-full px-5 py-4 bg-slate-800/70 border border-slate-700 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-lg font-bold text-xl transition-all"
              placeholder="Enter title..."
            />
            {slug && (
              <div className="mt-3 p-3 bg-slate-800 rounded-xl text-sm text-slate-400">
                Slug: <span className="font-mono text-white">{slug}</span>
              </div>
            )}
          </div>

          {/* Featured Image */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wide flex items-center gap-2">
              <Image size={16} />
              Featured Image
            </label>
            <div className="space-y-3">
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-5 py-4 bg-slate-800/70 border border-slate-700 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-lg transition-all"
                placeholder="https://images.unsplash.com/..."
              />
              {imageUrl && (
                <img 
                  src={imageUrl} 
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-2xl border-2 border-slate-700 shadow-lg"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    toast.error('Invalid image URL');
                  }}
                />
              )}
            </div>
          </div>

          {/* Category */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wide">
              Category
            </label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map(cat => (
                <label key={cat} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800/50 cursor-pointer transition-all group">
                  <input
                    type="radio"
                    name="category"
                    value={cat}
                    checked={category === cat}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-4 h-4 text-blue-600 bg-slate-800 border-slate-700 focus:ring-blue-500 focus:ring-2 rounded"
                  />
                  <span className="text-sm capitalize font-medium text-slate-300 group-hover:text-white transition-colors">{cat.replace('-', ' ')}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wide">
              Tags
            </label>
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyDown={addTag}
                  className="flex-1 px-5 py-3 bg-slate-800/70 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-lg"
                  placeholder="Press Enter to add tag..."
                />
                <motion.button
                  onClick={() => {
                    if (currentTag.trim()) addTag({ key: 'Enter' });
                  }}
                  className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all whitespace-nowrap"
                  whileHover={{ scale: 1.02 }}
                >
                  Add Tag
                </motion.button>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {tags.map(tag => (
                  <motion.div
                    key={tag}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/30 rounded-xl text-sm font-medium flex items-center gap-2 backdrop-blur-sm shadow-lg hover:from-blue-500/30 hover:shadow-xl transition-all"
                    whileHover={{ scale: 1.05 }}
                  >
                    #{tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="ml-1 p-1 hover:bg-white/20 rounded-full transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Featured Toggle */}
          <div className="p-6 bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/20 rounded-2xl backdrop-blur-sm">
            <label className="flex items-center gap-4 cursor-pointer">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-6 h-6 text-emerald-600 bg-slate-800/50 border-slate-700 rounded-lg focus:ring-emerald-500 focus:ring-2 transition-all shadow-lg"
              />
              <div>
                <div className="font-bold text-emerald-400 text-lg">Make Featured</div>
                <div className="text-sm text-emerald-300/80">Appear at top of lists</div>
              </div>
            </label>
          </div>
        </div>

        {/* Main Editor */}
        <div className="flex-1 p-8 flex flex-col overflow-hidden">
          {/* Excerpt */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wide">
              Excerpt (optional)
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full h-32 px-6 py-5 bg-slate-800/70 border border-slate-700 rounded-3xl text-white placeholder-slate-500 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-xl font-medium text-lg leading-relaxed"
              placeholder="Short summary (160 chars)..."
              maxLength={200}
            />
            <div className="text-right mt-2 text-xs text-slate-500">
              {excerpt.length}/200
            </div>
          </div>

          {/* Rich Editor */}
          <div className="flex-1 overflow-y-auto">
            <RichTextEditor
              value={content}
              onChange={setContent}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ArticleEditor;
