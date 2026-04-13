import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Code, Palette, Rocket, Shield, Zap, Star, ChevronLeft, ChevronRight, TrendingUp, Users, Award, Clock } from 'lucide-react';
import Footer from './Footer';

/* ==============================
   Section Fade-In Wrapper
   ============================== */
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

/* ==============================
   Testimonial Carousel
   ============================== */
const TestimonialCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, TechVision Inc.',
      text: 'Caniel Agency transformed our online presence completely. Their attention to detail and innovative approach exceeded all our expectations. Highly recommended!',
      rating: 5,
      image: 'https://placehold.co/80x80/4f46e5/ffffff?text=SJ'
    },
    {
      name: 'Michael Chen',
      role: 'Founder, GrowthLab',
      text: 'Working with Caniel was a game-changer for our startup. They delivered a stunning website that perfectly represents our brand and helped us secure new clients.',
      rating: 5,
      image: 'https://placehold.co/80x80/7c3aed/ffffff?text=MC'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Marketing Director, Nexus Corp',
      text: 'Professional, creative, and incredibly responsive. The team at Caniel understands modern business needs and delivers solutions that truly make a difference.',
      rating: 5,
      image: 'https://placehold.co/80x80/ec4899/ffffff?text=ER'
    },
    {
      name: 'David Park',
      role: 'CTO, InnovateTech',
      text: 'The technical expertise and design sensibility of Caniel Agency is unmatched. They built us a platform that is both beautiful and highly performant.',
      rating: 5,
      image: 'https://placehold.co/80x80/0ea5e9/ffffff?text=DP'
    }
  ];

  const next = () => setCurrent(prev => (prev + 1) % testimonials.length);
  const prev = () => setCurrent(prev => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  return (
    <div
      className="relative max-w-4xl mx-auto"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Testimonial Card */}
      <div className="glass-card p-8 md:p-12 min-h-[280px] flex flex-col justify-center">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          {/* Stars */}
          <div className="flex justify-center mb-6">
            {Array.from({ length: testimonials[current].rating }).map((_, i) => (
              <Star key={i} className="h-6 w-6 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          {/* Quote */}
          <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed italic">
            "{testimonials[current].text}"
          </p>
          {/* Author */}
          <div className="flex items-center justify-center gap-4">
            <img
              src={testimonials[current].image}
              alt={testimonials[current].name}
              className="w-14 h-14 rounded-full border-2 border-blue-500/50"
            />
            <div className="text-left">
              <p className="font-bold text-white">{testimonials[current].name}</p>
              <p className="text-sm text-gray-400">{testimonials[current].role}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === current ? 'bg-blue-500 w-8' : 'bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

/* ==============================
   Main Home Page
   ============================== */
const Home = () => {
  const expertiseItems = [
    {
      icon: <Code className="h-10 w-10" />,
      title: 'Web Development',
      description: 'Full-stack development with modern frameworks and technologies.',
      image: 'https://placehold.co/600x400/1e293b/60a5fa?text=Web+Development'
    },
    {
      icon: <Palette className="h-10 w-10" />,
      title: 'UI/UX Design',
      description: 'Beautiful, intuitive interfaces crafted for maximum user engagement.',
      image: 'https://placehold.co/600x400/1e293b/a78bfa?text=UI+UX+Design'
    },
    {
      icon: <Rocket className="h-10 w-10" />,
      title: 'Digital Strategy',
      description: 'Strategic planning to accelerate your digital transformation journey.',
      image: 'https://placehold.co/600x400/1e293b/f472b6?text=Digital+Strategy'
    },
    {
      icon: <Shield className="h-10 w-10" />,
      title: 'Cybersecurity',
      description: 'Enterprise-grade security solutions to protect your digital assets.',
      image: 'https://placehold.co/600x400/1e293b/34d399?text=Cybersecurity'
    }
  ];

  const portfolioItems = [
    {
      title: 'E-Commerce Platform',
      category: 'Web Development',
      description: 'A modern e-commerce platform with seamless checkout and inventory management.',
      image: 'https://placehold.co/600x400/1e293b/60a5fa?text=E-Commerce'
    },
    {
      title: 'SaaS Dashboard',
      category: 'UI/UX Design',
      description: 'Intuitive analytics dashboard with real-time data visualization.',
      image: 'https://placehold.co/600x400/1e293b/a78bfa?text=SaaS+Dashboard'
    },
    {
      title: 'Mobile Banking App',
      category: 'App Development',
      description: 'Secure and user-friendly mobile banking application for iOS and Android.',
      image: 'https://placehold.co/600x400/1e293b/f472b6?text=Banking+App'
    }
  ];

  const advantages = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'Lightning Fast Delivery',
      description: 'We deliver projects on time without compromising quality.'
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: 'Premium Quality',
      description: 'Every project undergoes rigorous quality assurance and testing.'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Dedicated Support',
      description: '24/7 dedicated support team ready to assist you anytime.'
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: 'Award-Winning Team',
      description: 'Recognized by industry leaders for excellence and innovation.'
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: 'Scalable Solutions',
      description: 'Built to grow with your business from day one.'
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: '5+ Years Experience',
      description: 'Proven track record with hundreds of successful projects.'
    }
  ];

  const newsItems = [
    {
      date: 'April 10, 2026',
      title: 'The Future of Web Development in 2026',
      excerpt: 'Exploring the latest trends and technologies shaping digital experiences.',
      image: 'https://placehold.co/600x400/1e293b/60a5fa?text=Web+Dev+2026',
      path: '/news'
    },
    {
      date: 'April 5, 2026',
      title: 'How AI is Transforming Digital Marketing',
      excerpt: 'Discover how artificial intelligence is revolutionizing marketing.',
      image: 'https://placehold.co/600x400/1e293b/a78bfa?text=AI+Marketing',
      path: '/news'
    },
    {
      date: 'March 28, 2026',
      title: 'Building Scalable Apps with React',
      excerpt: 'Best practices for building large-scale React applications.',
      image: 'https://placehold.co/600x400/1e293b/f472b6?text=React+Apps',
      path: '/news'
    }
  ];

  return (
    <div className="relative">
      {/* ==============================
          1. HERO SECTION
          ============================== */}
      <section className="min-h-screen relative overflow-hidden flex items-center">
        {/* Animated gradient orbs */}
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

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-gradient mb-6 leading-tight">
              Welcome to Caniel Agency
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto"
            >
              Digital Solutions for the Modern Age
            </motion.p>
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
                  Get Started
                </motion.button>
              </Link>
              <Link to="/about">
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.2)' }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 glass-card text-white font-semibold rounded-xl"
                >
                  Learn More
                </motion.button>
              </Link>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-16"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block text-gray-500"
              >
                <span className="text-sm">Scroll to explore</span>
                <div className="flex justify-center mt-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ==============================
          2. EXPERTISE SECTION
          ============================== */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gradient mb-4">Our Expertise</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We bring deep expertise across a range of digital disciplines, delivering excellence at every step.
            </p>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {expertiseItems.map((item, i) => (
              <FadeInSection key={i}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="glass-card overflow-hidden group cursor-pointer"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-3">
                      <div className="text-blue-400 bg-white/10 backdrop-blur-md p-2 rounded-lg">
                        {item.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white">{item.title}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </motion.div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ==============================
          3. PORTFOLIO / PROJECTS
          ============================== */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gradient mb-4">Featured Projects</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A showcase of our finest work — see how we help clients achieve their digital goals.
            </p>
          </FadeInSection>

          <div className="space-y-12">
            {portfolioItems.map((item, i) => (
              <FadeInSection key={i}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className={`glass-card overflow-hidden flex flex-col ${
                    i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'
                  }`}
                >
                  <div className="md:w-1/2 relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-64 md:h-full object-cover hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent md:bg-gradient-to-r" />
                  </div>
                  <div className="md:w-1/2 p-8 flex flex-col justify-center">
                    <span className="text-sm font-semibold text-blue-400 mb-2">{item.category}</span>
                    <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-gray-400 mb-6">{item.description}</p>
                    <Link to="/products" className="inline-flex items-center text-blue-400 hover:text-blue-300 font-semibold group">
                      View Project
                      <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ==============================
          4. WHY CHOOSE US
          ============================== */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gradient mb-4">Why Choose Us</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We don't just build websites — we build partnerships that drive your business forward.
            </p>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((item, i) => (
              <FadeInSection key={i}>
                <motion.div
                  whileHover={{ y: -6, backgroundColor: 'rgba(255,255,255,0.12)' }}
                  className="glass-card p-8 text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl text-blue-400 mb-5">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </motion.div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ==============================
          5. TESTIMONIALS
          ============================== */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gradient mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Don't just take our word for it — hear from the people who've experienced our work firsthand.
            </p>
          </FadeInSection>

          <FadeInSection>
            <TestimonialCarousel />
          </FadeInSection>
        </div>
      </section>

      {/* ==============================
          6. LATEST NEWS / BLOGS
          ============================== */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gradient mb-4">Latest News & Blogs</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Stay updated with insights, trends, and tips from our expert team.
            </p>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsItems.map((item, i) => (
              <FadeInSection key={i}>
                <Link to={item.path}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    className="glass-card overflow-hidden group"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>
                    <div className="p-6">
                      <span className="text-sm text-gray-500 mb-2 block">{item.date}</span>
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-2 mb-4">{item.excerpt}</p>
                      <span className="inline-flex items-center text-blue-400 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                        Read More <ArrowRight className="h-4 w-4 ml-1" />
                      </span>
                    </div>
                  </motion.div>
                </Link>
              </FadeInSection>
            ))}
          </div>

          <FadeInSection className="text-center mt-12">
            <Link to="/news">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 glass-card hover:bg-white/20 text-white font-semibold rounded-xl inline-flex items-center gap-2"
              >
                View All Articles <ArrowRight className="h-5 w-5" />
              </motion.button>
            </Link>
          </FadeInSection>
        </div>
      </section>

      {/* ==============================
          FOOTER
          ============================== */}
      <Footer />
    </div>
  );
};

export default Home;
