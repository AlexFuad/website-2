import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import ArticleEditor from '../components/blog/ArticleEditor';
import toast from 'react-hot-toast';

const NewsEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    toast.error('Please login first');
    navigate('/login');
    return null;
  }

  const loadArticle = () => {
    if (id) {
      const blogs = JSON.parse(localStorage.getItem('caniel_blogs')) || [];
      return blogs.find(b => b.id.toString() === id);
    }
    return null;
  };

  const handleSave = (savedArticle) => {
    const blogs = JSON.parse(localStorage.getItem('caniel_blogs')) || [];
    
    if (id) {
      const updated = blogs.map(b => b.id.toString() === id ? savedArticle : b);
      localStorage.setItem('caniel_blogs', JSON.stringify(updated));
      toast.success('Blog post updated!');
    } else {
      savedArticle.id = Date.now();
      blogs.unshift(savedArticle);
      localStorage.setItem('caniel_blogs', JSON.stringify(blogs));
      toast.success('Blog post created!');
    }
    
    setTimeout(() => navigate('/admin/blogs'), 800);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      <ArticleEditor
        isOpen={true}
        article={loadArticle()}
        collection="blogs"
        onSave={handleSave}
        onBack={() => navigate('/admin')}
      />
    </div>
  );
};

export default NewsEditor;
