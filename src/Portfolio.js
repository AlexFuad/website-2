import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Github, Eye } from 'lucide-react';

const Portfolio = () => {
  const [filter, setFilter] = useState('all');
  const [activeCategory, setActiveCategory] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'E-commerce Platform',
      category: 'web',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
      description: 'Full-stack e-commerce solution with payment integration and admin dashboard.',
      tech: ['React', 'Node.js', 'MongoDB', 'Tailwind'],
      live: 'https://example.com',
      github: 'https://github.com'
    },
    {
      id: 2,
      title: 'Marketing Agency',
      category: 'web',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
      description: 'Modern marketing agency website with CMS and lead generation features.',
      tech: ['Next.js', 'Tailwind', 'Framer Motion', 'Vercel'],
      live: 'https://example.com',
      github: 'https://github.com'
    },
    {
      id: 3,
      title: 'Mobile Banking App',
      category: 'mobile',
      image: 'https://images.unsplash.com/photo-1618005182386-a1a8fd68b2c6?w=800',
      description: 'React Native mobile banking app with biometric auth and real-time notifications.',
      tech: ['React Native', 'Expo', 'Firebase', 'Stripe'],
      live: 'https://example.com',
      github: 'https://github.com'
    },
    {
      id: 4,
      title: 'SaaS Dashboard',
      category: 'web',
      image: 'https://images.unsplash.com/photo-1586717790536-274b7a35b5fd?w=800',
      description: 'Advanced SaaS dashboard with charts, analytics, and user management.',
      tech: ['React', 'Chart.js', 'Tailwind', 'Supabase'],
      live: 'https://example.com',
      github: 'https://github.com'
    },
    {
      id: 5,
      title: 'Fitness Tracker',
      category: 'mobile',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
      description: 'Cross-platform fitness app with workout plans and progress tracking.',
      tech: ['Flutter', 'Firebase', 'Google Fit', 'Apple Health'],
      live: 'https://example.com',
      github: 'https://github.com'
    },
    {
      id: 6,
      title: 'Portfolio CMS',
      category: 'web',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800',
      description: 'Custom portfolio CMS with WYSIWYG editor and multi-user support.',
      tech: ['React', 'React Quill', 'localStorage', 'Tailwind'],
      live: 'https://example.com',
      github: 'https://github.com'
    }
  ];

  const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  const categories = [
    { id: 'all', label: 'All', count: projects.length },
    { id: 'web', label: 'Web', count: projects.filter(p => p.category === 'web').length },
    { id: 'mobile', label: 'Mobile', count: projects.filter(p => p.category === 'mobile').length }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-32 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent drop-shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Our Portfolio
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Selected projects showcasing our expertise in web and mobile development
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center mb-20">
            {categories.map(category => (
              <motion.button
                key={category.id}
                className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-blue-500/50'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:shadow-xl hover:-translate-y-1'
                }`}
                onClick={() => {
                  setFilter(category.id);
                  setActiveCategory(category.id);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.label} <span className="text-sm opacity-75">({category.count})</span>
              </motion.button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl hover:shadow-3xl overflow-hidden border border-gray-100 dark:border-gray-700 transition-all duration-500 h-full flex flex-col"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <div className="flex bg-white/90 dark:bg-black/70 backdrop-blur-sm rounded-full p-1 gap-1">
                      <motion.a href={project.live} target="_blank" className="p-2 hover:bg-white rounded-full transition-colors">
                        <Eye className="w-5 h-5 text-gray-700" />
                      </motion.a>
                      <motion.a href={project.github} target="_blank" className="p-2 hover:bg-white rounded-full transition-colors">
                        <Github className="w-5 h-5 text-gray-700" />
                      </motion.a>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex-1 flex flex-col">
                  <span className="inline-block px-4 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-blue-800 dark:text-blue-300 text-sm font-bold rounded-full mb-4">
                    {project.category === 'web' ? 'Web App' : 'Mobile App'}
                  </span>
                  
                  <h3 className="text-2xl font-black mb-4 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6 flex-1 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map((tech, idx) => (
                      <span key={idx} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <motion.button
                    className="mt-auto w-full flex items-center justify-center gap-3 bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-100 dark:to-gray-200 text-white dark:text-gray-900 px-6 py-4 rounded-2xl font-bold text-lg hover:from-blue-600 hover:to-purple-600 dark:hover:from-blue-600 dark:hover:to-purple-600 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 group-hover:scale-[1.02]"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View Project Details
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="col-span-full text-center py-32"
            >
              <div className="text-6xl mb-8 opacity-50">📭</div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">No projects found</h3>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-md mx-auto">
                Try selecting a different category or check back later for new projects.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.h2
            className="text-4xl md:text-5xl font-black mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            Love What You See?
          </motion.h2>
          <p className="text-xl mb-12 opacity-90 max-w-2xl mx-auto">
            Let's create something amazing together. Your next project starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.a
              href="/contact"
              className="bg-white text-blue-600 px-12 py-6 rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-500 flex items-center justify-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Project
              <ArrowRight className="w-6 h-6" />
            </motion.a>
            <motion.button
              className="border-4 border-white/50 text-white px-12 py-6 rounded-3xl font-bold text-xl backdrop-blur-sm hover:bg-white/20 hover:border-white transition-all duration-500 flex items-center justify-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Case Studies
              <ExternalLink className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </section>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;
