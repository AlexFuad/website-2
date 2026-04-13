import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Users, Target, Lightbulb, Heart, Award, Globe } from 'lucide-react';

const FadeInSection = ({ children, className = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const About = () => {
  const stats = [
    { number: '100+', label: 'Projects Completed' },
    { number: '50+', label: 'Happy Clients' },
    { number: '15+', label: 'Team Members' },
    { number: '5+', label: 'Years Experience' }
  ];

  const values = [
    {
      icon: <Target className="h-8 w-8" />,
      title: 'Mission-Driven',
      description: 'Every project starts with a clear understanding of your goals. We align our expertise to deliver measurable results that matter.'
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: 'Innovation First',
      description: 'We stay at the forefront of technology, constantly exploring new tools and methods to give your business a competitive edge.'
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: 'Client-Centric',
      description: 'Your satisfaction is our priority. We build lasting relationships through transparency, communication, and exceptional delivery.'
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: 'Quality Obsessed',
      description: 'From pixel-perfect design to clean, maintainable code — we sweat the details so you don\'t have to.'
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: 'Global Reach',
      description: 'We serve clients worldwide, understanding diverse markets and creating solutions that resonate across cultures.'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Collaborative Spirit',
      description: 'Great things happen when great minds work together. We treat every client partnership as a shared journey to success.'
    }
  ];

  return (
    <div className="relative">
      {/* ==============================
          1. HERO SECTION
          ============================== */}
      <section className="min-h-screen relative overflow-hidden flex items-center">
        {/* Gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, 20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute top-1/3 -left-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
            animate={{ scale: [1, 1.3, 1], x: [0, -20, 0], y: [0, 30, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-20 right-1/4 w-72 h-72 bg-pink-500/15 rounded-full blur-3xl"
            animate={{ scale: [1, 1.25, 1], x: [0, 25, 0], y: [0, -15, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-gradient mb-6 leading-tight">
              About Caniel Agency
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
              We are a passionate team of digital creators, engineers, and strategists dedicated to transforming your vision into reality.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center gap-4 flex-wrap"
            >
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg"
                >
                  Work With Us
                </motion.button>
              </Link>
              <Link to="/products">
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.2)' }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 glass-card text-white font-semibold rounded-xl"
                >
                  See Our Work
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ==============================
          2. INFORMATION SECTION (Flex with images)
          ============================== */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Row 1: Image Left, Text Right */}
          <FadeInSection>
            <div className="flex flex-col md:flex-row items-center gap-12 mb-20">
              <div className="md:w-1/2">
                <div className="glass-card overflow-hidden">
                  <img
                    src="https://placehold.co/800x500/1e293b/60a5fa?text=Our+Story"
                    alt="Our Story"
                    className="w-full h-72 md:h-96 object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="md:w-1/2">
                <span className="text-sm font-semibold text-blue-400 mb-2 block">Our Story</span>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
                  From Humble Beginnings to Digital Excellence
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-6">
                  Founded in 2020, Caniel Agency started as a small team of three passionate developers 
                  working from a shared workspace. What began as a simple mission — to make great digital 
                  experiences accessible to businesses of all sizes — quickly grew into something much bigger.
                </p>
                <p className="text-gray-400 text-lg leading-relaxed mb-6">
                  Today, we are a full-service digital agency with a diverse team of designers, developers, 
                  strategists, and project managers. We've helped over 100 clients across industries build 
                  powerful digital products that drive real business results.
                </p>
                <Link to="/contact" className="inline-flex items-center text-blue-400 hover:text-blue-300 font-semibold group">
                  Learn More About Us
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </FadeInSection>

          {/* Row 2: Text Left, Image Right */}
          <FadeInSection>
            <div className="flex flex-col md:flex-row-reverse items-center gap-12">
              <div className="md:w-1/2">
                <div className="glass-card overflow-hidden">
                  <img
                    src="https://placehold.co/800x500/1e293b/a78bfa?text=Our+Approach"
                    alt="Our Approach"
                    className="w-full h-72 md:h-96 object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="md:w-1/2">
                <span className="text-sm font-semibold text-purple-400 mb-2 block">Our Approach</span>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
                  Strategy-First, Execution-Always
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-6">
                  We believe that great digital products start with great strategy. Before writing a single 
                  line of code or designing a pixel, we take the time to deeply understand your business, 
                  your audience, and your goals.
                </p>
                <p className="text-gray-400 text-lg leading-relaxed mb-6">
                  Our process is collaborative and transparent. You'll be involved at every stage — from 
                  discovery and ideation through design, development, and launch. The result? A final product 
                  that truly serves your needs and delights your users.
                </p>
                <Link to="/products" className="inline-flex items-center text-purple-400 hover:text-purple-300 font-semibold group">
                  See Our Services
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ==============================
          STATS BANNER
          ============================== */}
      <section className="py-16 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <FadeInSection key={i} className="text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                >
                  <div className="text-4xl md:text-5xl font-black text-gradient mb-2">{stat.number}</div>
                  <div className="text-gray-400 font-medium">{stat.label}</div>
                </motion.div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ==============================
          3. VALUES SECTION (Flex with images)
          ============================== */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gradient mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The principles that guide everything we do — and why our clients trust us with their most important projects.
            </p>
          </FadeInSection>

          {/* Row 1: Image Left, Values Right */}
          <FadeInSection>
            <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
              <div className="md:w-1/2">
                <div className="glass-card overflow-hidden">
                  <img
                    src="https://placehold.co/800x500/1e293b/f472b6?text=Our+Values"
                    alt="Our Values"
                    className="w-full h-72 md:h-80 object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {values.slice(0, 4).map((v, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -4 }}
                    className="glass-card p-6"
                  >
                    <div className="text-blue-400 mb-3">{v.icon}</div>
                    <h3 className="text-lg font-bold text-white mb-2">{v.title}</h3>
                    <p className="text-gray-400 text-sm">{v.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeInSection>

          {/* Row 2: Values Left, Image Right */}
          <FadeInSection>
            <div className="flex flex-col md:flex-row-reverse items-center gap-12">
              <div className="md:w-1/2">
                <div className="glass-card overflow-hidden">
                  <img
                    src="https://placehold.co/800x500/1e293b/34d399?text=Team+Work"
                    alt="Team Work"
                    className="w-full h-72 md:h-80 object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {values.slice(4, 6).map((v, i) => (
                  <motion.div
                    key={i + 4}
                    whileHover={{ y: -4 }}
                    className="glass-card p-6"
                  >
                    <div className="text-purple-400 mb-3">{v.icon}</div>
                    <h3 className="text-lg font-bold text-white mb-2">{v.title}</h3>
                    <p className="text-gray-400 text-sm">{v.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <FadeInSection>
          <div className="max-w-4xl mx-auto text-center">
            <div className="glass-card p-12">
              <h2 className="text-3xl md:text-4xl font-black text-gradient mb-4">
                Ready to Work Together?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Let's discuss your project and see how we can help bring your vision to life.
              </p>
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg"
                >
                  Get In Touch
                </motion.button>
              </Link>
            </div>
          </div>
        </FadeInSection>
      </section>
    </div>
  );
};

export default About;
