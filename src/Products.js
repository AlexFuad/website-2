import React from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Search, Smartphone, Cloud, TrendingUp, ArrowRight, Check } from 'lucide-react';

const Products = () => {
  const products = [
    {
      id: 1,
      name: 'Agency Dashboard',
      desc: 'Complete admin CMS with WYSIWYG editor for managing content, products, portfolio, and users.',
      icon: Code,
      color: 'from-blue-500 to-indigo-600',
      features: ['RichText Editor', 'Multi-collection', 'User Management', 'Responsive'],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800'
    },
    {
      id: 2,
      name: 'Marketing Website',
      desc: 'Modern marketing sites with hero sliders, service grids, and conversion-focused design.',
      icon: Palette,
      color: 'from-purple-500 to-pink-600',
      features: ['Hero Sliders', 'Service Grids', 'Testimonials', 'Contact Forms'],
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800'
    },
    {
      id: 3,
      name: 'E-commerce Platform',
      desc: 'Scalable online stores with inventory, payments, and customer management.',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-600',
      features: ['Product Catalog', 'Shopping Cart', 'Payment Gateway', 'Order Management'],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800'
    },
    {
      id: 4,
      name: 'Mobile App Landing',
      desc: 'App showcase pages optimized for conversions and feature demonstrations.',
      icon: Smartphone,
      color: 'from-orange-500 to-red-600',
      features: ['App Store Badges', 'Feature Sections', 'Testimonials', 'Screenshots'],
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800'
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.h1
            className="text-5xl md:text-7xl font-black mb-6"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          >
            Our Products
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
          >
            Ready-made solutions for your business needs
          </motion.p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-12">
            {products.map((product, index) => {
              const Icon = product.icon;
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden h-full flex flex-col border border-gray-100 dark:border-gray-700 hover:shadow-3xl transition-all duration-500">
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className={`absolute top-4 left-4 px-4 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r ${product.color}`}>
                        Live Demo
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-8 flex-1 flex flex-col">
                      <div className={`p-4 w-fit rounded-2xl mb-6 bg-gradient-to-br ${product.color}`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-3xl font-black mb-4 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{product.name}</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-8 flex-1 leading-relaxed">{product.desc}</p>
                      
                      {/* Features */}
                      <div className="space-y-3 mb-10">
                        <h4 className="font-bold text-lg text-gray-900 dark:text-white">Features</h4>
                        {product.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors">
                            <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <motion.button
                        className="mt-auto w-full flex items-center justify-center gap-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        View Product
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
              Choose from our products or let's build something custom together
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/contact"
                className="bg-white text-indigo-600 px-10 py-6 rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-500 flex items-center justify-center gap-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Custom Project
                <ArrowRight className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="/services"
                className="border-2 border-white text-white px-10 py-6 rounded-3xl font-bold text-xl hover:bg-white hover:text-indigo-600 transition-all duration-500 flex items-center justify-center gap-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Services
                <ArrowRight className="w-6 h-6" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Products;
