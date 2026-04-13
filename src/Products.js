import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Code, Palette, BarChart3, Shield, Zap, Globe, Smartphone, Database, Cloud, Settings, LineChart } from 'lucide-react';

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

const Products = () => {
  const products = [
    {
      icon: <Code className="h-10 w-10" />,
      title: 'Web Development',
      description: 'Custom websites and web applications built with React, Next.js, and modern frameworks for optimal performance and scalability.',
      image: 'https://placehold.co/800x500/1e293b/60a5fa?text=Web+Development',
      features: ['React / Next.js', 'Responsive Design', 'SEO Optimized', 'Fast Loading']
    },
    {
      icon: <Smartphone className="h-10 w-10" />,
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile applications for iOS and Android using React Native and Flutter.',
      image: 'https://placehold.co/800x500/1e293b/a78bfa?text=Mobile+Apps',
      features: ['iOS & Android', 'React Native', 'Native Performance', 'App Store Ready']
    },
    {
      icon: <Palette className="h-10 w-10" />,
      title: 'UI/UX Design',
      description: 'Beautiful, intuitive interfaces designed with user research, wireframing, prototyping, and usability testing.',
      image: 'https://placehold.co/800x500/1e293b/f472b6?text=UI+UX+Design',
      features: ['User Research', 'Wireframing', 'Prototyping', 'Usability Testing']
    },
    {
      icon: <Database className="h-10 w-10" />,
      title: 'Backend & APIs',
      description: 'Robust backend infrastructure, RESTful APIs, GraphQL, and microservices architecture for scalable applications.',
      image: 'https://placehold.co/800x500/1e293b/34d399?text=Backend+%26+APIs',
      features: ['RESTful APIs', 'GraphQL', 'Node.js', 'Microservices']
    },
    {
      icon: <Cloud className="h-10 w-10" />,
      title: 'Cloud Solutions',
      description: 'Cloud hosting, deployment, and DevOps on AWS, Google Cloud, and Azure with CI/CD pipelines.',
      image: 'https://placehold.co/800x500/1e293b/fbbf24?text=Cloud+Solutions',
      features: ['AWS / GCP / Azure', 'CI/CD Pipelines', 'Auto Scaling', 'Monitoring']
    },
    {
      icon: <Shield className="h-10 w-10" />,
      title: 'Cybersecurity',
      description: 'Comprehensive security audits, penetration testing, and implementation of enterprise-grade security solutions.',
      image: 'https://placehold.co/800x500/1e293b/f87171?text=Cybersecurity',
      features: ['Security Audits', 'Penetration Testing', 'SSL/TLS', 'Data Encryption']
    }
  ];

  const services = [
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: 'Digital Marketing',
      description: 'Strategic campaigns across search, social, and display to boost your online presence and drive measurable results.',
      image: 'https://placehold.co/600x400/1e293b/60a5fa?text=Digital+Marketing'
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'Performance Optimization',
      description: 'Speed up your existing applications with advanced caching, code splitting, and infrastructure optimization.',
      image: 'https://placehold.co/600x400/1e293b/a78bfa?text=Performance'
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: 'SEO Services',
      description: 'Improve your search engine rankings and increase organic traffic with proven SEO strategies and content optimization.',
      image: 'https://placehold.co/600x400/1e293b/f472b6?text=SEO+Services'
    },
    {
      icon: <Settings className="h-8 w-8" />,
      title: 'Maintenance & Support',
      description: 'Ongoing maintenance, bug fixes, feature updates, and 24/7 monitoring to keep your applications running smoothly.',
      image: 'https://placehold.co/600x400/1e293b/34d399?text=Maintenance'
    },
    {
      icon: <LineChart className="h-8 w-8" />,
      title: 'Analytics & Reporting',
      description: 'Custom dashboards and reporting solutions to track KPIs, user behavior, and business metrics in real-time.',
      image: 'https://placehold.co/600x400/1e293b/fbbf24?text=Analytics'
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: 'Custom Development',
      description: 'Tailored software solutions built from scratch to address your unique business challenges and workflows.',
      image: 'https://placehold.co/600x400/1e293b/f87171?text=Custom+Dev'
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
              Our Products & Services
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
              Comprehensive digital solutions designed to elevate your business and drive measurable growth.
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
                  Get a Quote
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
          </motion.div>
        </div>
      </section>

      {/* ==============================
          2. PRODUCTS SECTION (Flex with images)
          ============================== */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gradient mb-4">Our Products</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore our core product offerings — each one crafted with precision, quality, and your success in mind.
            </p>
          </FadeInSection>

          {products.map((product, i) => (
            <FadeInSection key={i}>
              <motion.div
                whileHover={{ y: -4 }}
                className={`glass-card overflow-hidden mb-12 flex flex-col ${
                  i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'
                }`}
              >
                {/* Image */}
                <div className="md:w-1/2 relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-64 md:h-80 object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent md:bg-gradient-to-r" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-3">
                    <div className="text-blue-400 bg-white/10 backdrop-blur-md p-2 rounded-lg">
                      {product.icon}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="md:w-1/2 p-8 flex flex-col justify-center">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{product.title}</h3>
                  <p className="text-gray-400 text-lg leading-relaxed mb-6">{product.description}</p>

                  {/* Features List */}
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {product.features.map((feature, fi) => (
                      <div key={fi} className="flex items-center gap-2 text-gray-300">
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link to="/contact" className="inline-flex items-center text-blue-400 hover:text-blue-300 font-semibold group">
                    Get Started
                    <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* ==============================
          3. SERVICES SECTION (Flex with images)
          ============================== */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gradient mb-4">Additional Services</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Beyond our core products, we offer specialized services to cover every aspect of your digital journey.
            </p>
          </FadeInSection>

          {/* Row 1: Services with alternating layout */}
          {services.map((service, i) => (
            <FadeInSection key={i}>
              <motion.div
                whileHover={{ y: -4 }}
                className={`glass-card overflow-hidden mb-10 flex flex-col ${
                  i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'
                }`}
              >
                <div className="md:w-2/5 relative overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-48 md:h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="md:w-3/5 p-6 md:p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-purple-400">{service.icon}</div>
                    <h3 className="text-xl font-bold text-white">{service.title}</h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed mb-6">{service.description}</p>
                  <Link to="/contact" className="inline-flex items-center text-purple-400 hover:text-purple-300 font-semibold group">
                    Learn More
                    <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <FadeInSection>
          <div className="max-w-4xl mx-auto text-center">
            <div className="glass-card p-12">
              <h2 className="text-3xl md:text-4xl font-black text-gradient mb-4">
                Need Something Custom?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                We specialize in building tailored solutions for unique business challenges. Let's talk about your project.
              </p>
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg"
                >
                  Start a Conversation
                </motion.button>
              </Link>
            </div>
          </div>
        </FadeInSection>
      </section>
    </div>
  );
};

export default Products;
