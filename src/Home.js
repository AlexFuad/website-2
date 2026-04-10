import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Code, DesignTools, Smartphone, TrendingUp } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section with Slides */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/20" />
          {/* Slides - Auto carousel */}
          <div className="h-full w-full relative">
            <div className="absolute inset-0">
              <div className="h-full w-full bg-gradient-to-r from-blue-800/50 to-purple-800/50 flex items-center justify-center">
                <motion.div
                  className="text-center text-white max-w-4xl mx-8"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                    Caniel Agency
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
                    Elevating Digital Experiences
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl"
                    >
                      Get Started <ArrowRight className="inline ml-2" />
                    </motion.button>
                    <motion.div
                      className="flex items-center gap-2 text-white/80 bg-white/10 px-6 py-4 rounded-2xl backdrop-blur-sm cursor-pointer hover:bg-white/20"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Play className="w-5 h-5" />
                      Watch Demo
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
          {['1', '2', '3'].map((dot, idx) => (
            <div key={idx} className="w-3 h-3 rounded-full bg-white/50 cursor-pointer hover:bg-white transition-all" />
          ))}
        </div>
      </section>

      {/* Flex Pic + Content Sections */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Feature 1 */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 md:order-1"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Creative Design
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Transform your vision into stunning digital experiences with our creative design solutions.
              </p>
              <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                <li className="flex items-center gap-3"><DesignTools className="w-6 h-6 text-blue-500" /> Pixel-perfect UI/UX</li>
                <li className="flex items-center gap-3"><Play className="w-6 h-6 text-purple-500" /> Interactive prototypes</li>
                <li className="flex items-center gap-3"><TrendingUp className="w-6 h-6 text-green-500" /> Brand identity</li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 md:order-2 relative h-96 bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20" />
              <div className="absolute top-12 left-12 w-64 h-64 bg-white/20 rounded-3xl -rotate-12" />
              <div className="absolute bottom-12 right-12 w-48 h-48 bg-white/10 rounded-2xl blur-xl" />
              <div className="relative z-10 flex items-center justify-center h-full">
                <div className="text-white text-center">
                  <DesignTools className="w-24 h-24 mx-auto mb-4 opacity-80" />
                  <div className="bg-white/10 backdrop-blur-sm px-8 py-4 rounded-2xl">
                    Design Mockup
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Feature 2 - Reversed */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:order-2"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Development Excellence
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Robust, scalable applications built with modern technologies and best practices.
              </p>
              <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                <li className="flex items-center gap-3"><Code className="w-6 h-6 text-green-500" /> React & Next.js</li>
                <li className="flex items-center gap-3"><Smartphone className="w-6 h-6 text-emerald-500" /> Mobile-first</li>
                <li className="flex items-center gap-3"><TrendingUp className="w-6 h-6 text-blue-500" /> Performance optimized</li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:order-1 relative h-96 bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20" />
              <div className="absolute top-16 right-16 w-72 h-72 bg-white/20 rounded-3xl rotate-6" />
              <div className="absolute bottom-16 left-16 w-56 h-56 bg-white/10 rounded-2xl blur-xl" />
              <div className="relative z-10 flex items-center justify-center h-full">
                <div className="text-white text-center">
                  <Code className="w-24 h-24 mx-auto mb-4 opacity-80" />
                  <div className="bg-white/10 backdrop-blur-sm px-8 py-4 rounded-2xl">
                    Code Preview
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Carousel Section - Stats/Services Carousel */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Why Choose Us
          </h2>
          <div className="relative">
            {/* Carousel Container */}
            <div className="flex gap-8 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory">
              {[
                { title: '500+', desc: 'Projects Completed', icon: '📊' },
                { title: '50+', desc: 'Happy Clients', icon: '👥' },
                { title: '24/7', desc: 'Support', icon: '🛠️' },
                { title: '100%', desc: 'Satisfaction', icon: '⭐' },
                { title: '5+', desc: 'Years Experience', icon: '⚡' }
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  className="flex-none w-64 text-center p-8 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 hover:bg-white/20 transition-all snap-center"
                  whileHover={{ scale: 1.05, y: -10 }}
                >
                  <div className="text-4xl mb-4">{stat.icon}</div>
                  <h3 className="text-3xl font-black mb-2">{stat.title}</h3>
                  <p className="text-lg opacity-90">{stat.desc}</p>
                </motion.div>
              ))}
            </div>
            {/* Arrows - Simplified for demo */}
            <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none">
              <div className="w-12 h-12 bg-white/20 rounded-full backdrop-blur-sm pointer-events-auto" />
              <div className="w-12 h-12 bg-white/20 rounded-full backdrop-blur-sm pointer-events-auto" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
