import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, Clock, Code, DesignTools, Smartphone } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            About Caniel Agency
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We craft digital experiences that drive growth and innovation.
          </p>
        </motion.section>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-8 mb-20"
        >
          <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all">
            <Users className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <div className="text-4xl font-black text-gray-900 dark:text-white mb-2">500+</div>
            <div className="text-gray-600 dark:text-gray-300">Projects</div>
          </div>
          <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all">
            <Award className="w-16 h-16 text-purple-600 mx-auto mb-4" />
            <div className="text-4xl font-black text-gray-900 dark:text-white mb-2">50+</div>
            <div className="text-gray-600 dark:text-gray-300">Clients</div>
          </div>
          <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all">
            <Clock className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <div className="text-4xl font-black text-gray-900 dark:text-white mb-2">24/7</div>
            <div className="text-gray-600 dark:text-gray-300">Support</div>
          </div>
          <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all">
            <Code className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
            <div className="text-4xl font-black text-gray-900 dark:text-white mb-2">5+</div>
            <div className="text-gray-600 dark:text-gray-300">Years</div>
          </div>
        </motion.div>

        {/* Our Story */}
        <section className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Our Story
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Founded with a passion for innovation, Caniel Agency has grown from a small team 
              of developers into a full-service digital agency serving clients worldwide. 
              We combine creativity with technology to deliver exceptional results.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-2xl flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Code className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Expert Team</h3>
                  <p className="text-gray-600 dark:text-gray-300">Experienced developers and designers</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 bg-purple-50 dark:bg-purple-900/20 rounded-2xl">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-2xl flex items-center justify-center flex-shrink-0 mt-0.5">
                  <DesignTools className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Creative Solutions</h3>
                  <p className="text-gray-600 dark:text-gray-300">Unique designs that stand out</p>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-12 shadow-2xl relative overflow-hidden h-96 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-purple-400/30 -skew-x-12 -rotate-3" />
              <div className="relative z-10 text-white text-center">
                <div className="w-32 h-32 bg-white/20 rounded-full mx-auto mb-6 backdrop-blur-sm flex items-center justify-center">
                  <Users className="w-16 h-16" />
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-8 py-4 rounded-2xl font-bold text-2xl">
                  Our Team
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Services Preview */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-12 bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
            What We Do
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Code, title: 'Web Development', desc: 'Custom web applications' },
              { icon: DesignTools, title: 'UI/UX Design', desc: 'Beautiful interfaces' },
              { icon: Smartphone, title: 'Mobile Apps', desc: 'iOS & Android apps' }
            ].map((service, idx) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -10 }}
                  className="group p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all cursor-pointer border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-10 h-10 text-blue-600 group-hover:text-blue-700" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{service.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default About;
