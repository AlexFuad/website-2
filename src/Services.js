import React from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Search, Smartphone, Cloud, TrendingUp, ArrowRight, Check } from 'lucide-react';

const Services = () => {
  const services = [
    {
      id: 1,
      name: 'Web Development',
      desc: 'Custom web applications with modern technologies ensuring scalability, performance, and exceptional user experience.',
      icon: Code,
      color: 'from-blue-500 to-indigo-600',
      features: ['React & Next.js', 'Node.js API', 'Database Integration', 'Responsive Design']
    },
    {
      id: 2,
      name: 'UI/UX Design',
      desc: 'Intuitive and engaging user interfaces that enhance user satisfaction and drive business growth.',
      icon: Palette,
      color: 'from-purple-500 to-pink-600',
      features: ['User Research', 'Prototyping', 'Visual Design', 'User Testing']
    },
    {
      id: 3,
      name: 'SEO & Marketing',
      desc: 'Increase organic traffic and improve search rankings with data-driven SEO strategies.',
      icon: Search,
      color: 'from-green-500 to-emerald-600',
      features: ['Keyword Research', 'Content Strategy', 'Link Building', 'Analytics']
    },
    {
      id: 4,
      name: 'Mobile Development',
      desc: 'Native and cross-platform mobile apps for iOS and Android with smooth performance.',
      icon: Smartphone,
      color: 'from-orange-500 to-red-600',
      features: ['React Native', 'Flutter', 'Native iOS/Android', 'App Store Ready']
    },
    {
      id: 5,
      name: 'Cloud Solutions',
      desc: 'Scalable cloud infrastructure and DevOps services for reliable applications.',
      icon: Cloud,
      color: 'from-cyan-500 to-blue-600',
      features: ['AWS/Azure/GCP', 'CI/CD Pipelines', 'Monitoring', 'Security']
    },
    {
      id: 6,
      name: 'Digital Strategy',
      desc: 'Comprehensive digital marketing and growth strategies for your business.',
      icon: TrendingUp,
      color: 'from-pink-500 to-rose-600',
      features: ['Social Media', 'Content Marketing', 'Email Campaigns', 'Analytics']
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-emerald-600 via-blue-600 to-indigo-700 py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.h1
            className="text-5xl md:text-7xl font-black mb-6"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          >
            Our Services
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
          >
            Complete digital solutions from concept to deployment
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="bg-white dark:bg-gray-800 h-full rounded-3xl shadow-xl hover:shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-500 group">
                    <div className={`p-8 bg-gradient-to-br ${service.color} relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/10" />
                      <div className="relative flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4 relative z-10">{service.name}</h3>
                    </div>
                    <div className="p-8">
                      <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed flex-1">{service.desc}</p>
                      <div className="space-y-3 mb-8">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-3 text-sm">
                            <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                      <motion.button
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-100 dark:to-gray-200 text-white dark:text-gray-900 px-6 py-4 rounded-2xl font-semibold group-hover:from-blue-600 group-hover:to-purple-600 dark:group-hover:from-blue-600 dark:group-hover:to-purple-600 transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Learn More
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
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">Ready to Start?</h2>
          <p className="text-xl mb-12 opacity-90">Let's discuss your project</p>
          <motion.a
            href="/contact"
            className="inline-flex items-center gap-3 bg-white text-blue-600 px-10 py-6 rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Us
            <ArrowRight className="w-6 h-6" />
          </motion.a>
        </div>
      </section>
    </div>
  );
};

export default Services;
