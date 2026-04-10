import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { motion } from 'framer-motion';
import { 
  Plus, Edit2, Trash2, LogOut, FileText, Calendar, Eye, 
  TrendingUp, BarChart3, Database, Settings, Share2, Clock,
  ChevronLeft, Search, MoreVertical, LayoutList, Package, Image, Users 
} from 'lucide-react';
import toast from 'react-hot-toast';
import ArticleEditor from '../components/blog/ArticleEditor';
import DeleteConfirmation from '../components/blog/DeleteConfirmation';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('blogs');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Set active tab from URL
    const path = location.pathname.split('/')[2];
    if (path && ['news', 'services', 'products', 'portfolio', 'users'].includes(path)) {
      setActiveTab(path);
    }

    loadItems();
  }, [isAuthenticated, navigate, location.pathname]);

  const loadItems = () => {
    setLoading(true);
    const key = `caniel_${activeTab}`;
    const savedItems = JSON.parse(localStorage.getItem(key)) || [];
    setItems(savedItems);
    setLoading(false);
  };

  const getStats = () => {
    return {
      total: items.length,
      featured: items.filter(i => i.featured).length,
      views: items.reduce((sum, item) => sum + (item.views || 0), 0)
    };
  };

  const handleSaveItem = (savedItem) => {
    const key = `caniel_${activeTab}`;
    let updatedItems;
    
    if (savedItem.id) {
      updatedItems = items.map(item => item.id === savedItem.id ? savedItem : item);
      toast.success(`${getTabName(activeTab)} updated successfully!`);
    } else {
      savedItem.id = Date.now();
      savedItem.createdAt = new Date().toISOString();
      savedItem.views = 0;
      updatedItems = [savedItem, ...items];
      toast.success(`${getTabName(activeTab)} created successfully!`);
    }

    localStorage.setItem(key, JSON.stringify(updatedItems));
    setItems(updatedItems);
    setIsEditing(false);
    setCurrentItem(null);
  };

  const handleDeleteItem = () => {
    const key = `caniel_${activeTab}`;
    const updatedItems = items.filter(item => item.id !== itemToDelete.id);
    localStorage.setItem(key, JSON.stringify(updatedItems));
    setItems(updatedItems);
    setIsDeleteConfirmOpen(false);
    setItemToDelete(null);
    toast.success('Item deleted successfully.');
  };

  const openEditor = (item = null) => {
    setCurrentItem(item);
    setIsEditing(true);
  };

  const openDeleteConfirm = (item) => {
    setItemToDelete(item);
    setIsDeleteConfirmOpen(true);
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const getTabName = (tab) => {
    const names = {
      blogs: 'Blog post',
      services: 'Service',
      products: 'Product',
      portfolio: 'Portfolio item',
      users: 'User'
    };
    return names[tab] || 'Item';
  };

  const tabs = [
    { id: 'blogs', label: 'Blogs/News', icon: FileText },
    { id: 'services', label: 'Services', icon: Package },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'portfolio', label: 'Portfolio', icon: Image },
    { id: 'users', label: 'Users', icon: Users }
  ];

  if (!isAuthenticated) return null;

  return (
    <>
      <DeleteConfirmation 
        isOpen={isDeleteConfirmOpen} 
        onOpenChange={setIsDeleteConfirmOpen} 
        onConfirm={handleDeleteItem} 
      />
      
      {isEditing ? (
        <ArticleEditor
          isOpen={true}
          item={currentItem}
          collection={activeTab}
          onSave={handleSaveItem}
          onBack={() => {
            setIsEditing(false);
            setCurrentItem(null);
          }}
        />
      ) : (
        <div className="flex h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 text-gray-300">
          {/* Sidebar */}
          <aside className="w-64 bg-slate-950/80 backdrop-blur-xl border-r border-slate-800 flex flex-col">
            <div className="p-6 border-b border-slate-800">
              <div className="flex items-center gap-3 mb-4">
                <button 
                  onClick={() => navigate('/')}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
                >
                  <ChevronLeft size={20} />
                </button>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xs">CA</span>
                  </div>
                  <span className="text-lg font-bold text-white">Caniel CMS</span>
                </div>
              </div>
              <div className="text-sm text-slate-400">
                Welcome, <span className="font-semibold text-white capitalize">{user?.username}</span>
                {user?.role === 'admin' && <span className="ml-2 px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">Admin</span>}
              </div>
            </div>

            <nav className="flex-1 p-4 space-y-1">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <Link
                    key={tab.id}
                    to={`/admin/${tab.id}`}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 p-4 rounded-xl transition-all group relative ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/30 shadow-lg shadow-blue-500/25'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50 hover:border-slate-700 border border-transparent'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="font-medium">{tab.label}</span>
                    <span className="ml-auto text-xs bg-slate-800/50 px-2 py-1 rounded-full text-slate-400">
                      {JSON.parse(localStorage.getItem(`caniel_${tab.id}`) || '[]').length}
                    </span>
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t border-slate-800 mt-auto">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 p-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all font-medium"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <header className="bg-slate-950/50 backdrop-blur-xl border-b border-slate-800 p-6 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                  <LayoutList size={32} className={`text-${activeTab === 'blogs' ? 'blue' : activeTab === 'services' ? 'emerald' : activeTab === 'products' ? 'purple' : activeTab === 'portfolio' ? 'orange' : 'cyan'}-400`} />
                  {tabs.find(t => t.id === activeTab)?.label}
                </h1>
                <p className="text-slate-400 mt-1">
                  Manage your {getTabName(activeTab).toLowerCase()} content
                </p>
              </div>
              <motion.button
                onClick={() => openEditor()}
                className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-8 py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center gap-3"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Plus size={20} />
                Create New {getTabName(activeTab)}
              </motion.button>
            </header>

            {/* Content */}
            <div className="flex-1 p-8 overflow-y-auto">
              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
              ) : items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-32"
                >
                  <FileText className="w-24 h-24 text-slate-500 mx-auto mb-6 opacity-50" />
                  <h3 className="text-2xl font-bold text-slate-300 mb-4">No {getTabName(activeTab, true)} yet</h3>
                  <p className="text-slate-500 max-w-md mx-auto mb-8">
                    Get started by creating your first {getTabName(activeTab).toLowerCase()}.
                  </p>
                  <motion.button
                    onClick={() => openEditor()}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center gap-3 mx-auto"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Plus size={20} />
                    Create First {getTabName(activeTab)}
                  </motion.button>
                </motion.div>
              ) : (
                <div>
                  {/* Stats Cards */}
                  <div className="grid md:grid-cols-4 gap-6 mb-12">
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700">
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                          <LayoutList size={20} className="text-blue-400" />
                        </div>
                        <TrendingUp className="text-emerald-400" size={20} />
                      </div>
                      <p className="text-slate-500 text-sm uppercase tracking-wide">Total</p>
                      <p className="text-3xl font-bold text-white">{getStats().total}</p>
                    </div>
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700">
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                          <Eye size={20} className="text-purple-400" />
                        </div>
                        <TrendingUp className="text-emerald-400" size={20} />
                      </div>
                      <p className="text-slate-500 text-sm uppercase tracking-wide">Total Views</p>
                      <p className="text-3xl font-bold text-white">{getStats().views.toLocaleString()}</p>
                    </div>
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700">
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                          <FileText size={20} className="text-emerald-400" />
                        </div>
                        <TrendingUp className="text-emerald-400" size={20} />
                      </div>
                      <p className="text-slate-500 text-sm uppercase tracking-wide">Featured</p>
                      <p className="text-3xl font-bold text-white">{getStats().featured}</p>
                    </div>
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700">
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                          <BarChart3 size={20} className="text-orange-400" />
                        </div>
                      </div>
                      <p className="text-slate-500 text-sm uppercase tracking-wide">Avg Views</p>
                      <p className="text-3xl font-bold text-white">
                        {items.length ? Math.round(getStats().views / items.length) : 0}
                      </p>
                    </div>
                  </div>

                  {/* Search & Actions */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <input
                        type="text"
                        placeholder={`Search ${getTabName(activeTab)}...`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-white placeholder-slate-500 transition-all shadow-lg"
                      />
                    </div>
                  </div>

                  {/* Items Table */}
                  <div className="bg-slate-950/50 backdrop-blur-xl rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-slate-900/50">
                          <tr>
                            <th className="px-8 py-6 text-left text-slate-400 font-semibold text-sm uppercase tracking-wider">
                              Title / Name
                            </th>
                            <th className="px-6 py-6 text-left text-slate-400 font-semibold text-sm uppercase tracking-wider hidden lg:table-cell">
                              Date
                            </th>
                            <th className="px-6 py-6 text-right text-slate-400 font-semibold text-sm uppercase tracking-wider">
                              Views
                            </th>
                            <th className="px-6 py-6 text-right text-slate-400 font-semibold text-sm uppercase tracking-wider hidden md:table-cell">
                              Featured
                            </th>
                            <th className="px-6 py-6 text-right text-slate-400 font-semibold text-sm uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                          {items
                            .filter(item => 
                              item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              item.name?.toLowerCase().includes(searchTerm.toLowerCase())
                            )
                            .map((item) => (
                              <tr key={item.id} className="group/item hover:bg-slate-800/50 transition-colors">
                                <td className="px-8 py-6">
                                  <div className="font-semibold text-white truncate max-w-md group-hover/item:text-blue-400 transition-colors">
                                    {item.title || item.name || 'Untitled'}
                                  </div>
                                  {item.excerpt && (
                                    <div className="text-sm text-slate-500 mt-1 line-clamp-1">
                                      {item.excerpt}
                                    </div>
                                  )}
                                </td>
                                <td className="px-6 py-6 text-sm text-slate-400 hidden lg:table-cell">
                                  {item.createdAt ? format(new Date(item.createdAt), 'MMM dd, yy') : '—'}
                                </td>
                                <td className="px-6 py-6 text-right">
                                  <span className="font-mono text-lg text-white">
                                    {(item.views || 0).toLocaleString()}
                                  </span>
                                </td>
                                <td className="px-6 py-6 text-right hidden md:table-cell">
                                  {item.featured ? (
                                    <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full">
                                      Featured
                                    </span>
                                  ) : (
                                    <span className="text-slate-500 text-xs">—</span>
                                  )}
                                </td>
                                <td className="px-6 py-6 text-right">
                                  <div className="flex items-center gap-2">
                                    <motion.button
                                      onClick={() => openEditor(item)}
                                      className="p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-800/50 rounded-xl transition-all group/item:hover:bg-blue-500/10"
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.95 }}
                                      title="Edit"
                                    >
                                      <Edit2 size={16} />
                                    </motion.button>
                                    <motion.button
                                      onClick={() => openDeleteConfirm(item)}
                                      className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800/50 rounded-xl transition-all group/item:hover:bg-red-500/10"
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.95 }}
                                      title="Delete"
                                    >
                                      <Trash2 size={16} />
                                    </motion.button>
                                    <motion.button
                                      className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-slate-800/50 rounded-xl transition-all"
                                      whileHover={{ scale: 1.1 }}
                                      title="Preview"
                                    >
                                      <Eye size={16} />
                                    </motion.button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {items.filter(item => 
                    item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.name?.toLowerCase().includes(searchTerm.toLowerCase())
                  ).length === 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-32 mt-12"
                    >
                      <LayoutList className="w-24 h-24 text-slate-500 mx-auto mb-6 opacity-50" />
                      <h3 className="text-2xl font-bold text-slate-300 mb-4">
                        No {getTabName(activeTab)} match your search
                      </h3>
                      <p className="text-slate-500 max-w-md mx-auto mb-8">
                        Try adjusting your search terms or create new content.
                      </p>
                      <motion.button
                        onClick={() => {
                          setSearchTerm('');
                        }}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-8 py-4 rounded-2xl font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-3 mx-auto"
                        whileHover={{ scale: 1.05 }}
                      >
                        Clear Search
                      </motion.button>
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default AdminDashboard;
