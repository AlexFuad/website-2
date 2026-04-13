import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowRight, ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX } from 'lucide-react';

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
   Photo Carousel Component
   ============================== */
const PhotoCarousel = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const next = () => setCurrent(prev => (prev + 1) % images.length);
  const prev = () => setCurrent(prev => (prev - 1 + images.length) % images.length);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, images.length]);

  return (
    <div
      className="relative max-w-5xl mx-auto"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="relative overflow-hidden rounded-2xl glass-card">
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={images[current]}
            alt={`Gallery image ${current + 1}`}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] object-cover"
          />
        </AnimatePresence>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Counter */}
        <div className="absolute top-4 right-4 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full text-sm font-semibold">
          {current + 1} / {images.length}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-14 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-14 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Thumbnails */}
      <div className="flex justify-center gap-2 mt-6 flex-wrap">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all ${
              i === current ? 'border-blue-500 scale-110' : 'border-white/20 hover:border-white/40'
            }`}
          >
            <img src={img} alt={`Thumb ${i + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};

/* ==============================
   Video Section Component
   ============================== */
const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const videos = [
    {
      title: 'Company Overview',
      description: 'Learn more about Caniel Agency and our mission to transform digital experiences.',
      thumbnail: 'https://placehold.co/1200x675/1e293b/60a5fa?text=Company+Overview+Video',
      url: '#'
    },
    {
      title: 'Client Success Stories',
      description: 'Hear from our satisfied clients about how we helped them achieve their digital goals.',
      thumbnail: 'https://placehold.co/1200x675/1e293b/a78bfa?text=Client+Success+Stories',
      url: '#'
    },
    {
      title: 'Behind the Scenes',
      description: 'A peek into our creative process and the talented team behind every project.',
      thumbnail: 'https://placehold.co/1200x675/1e293b/f472b6?text=Behind+The+Scenes',
      url: '#'
    }
  ];

  return (
    <div className="space-y-12">
      {videos.map((video, i) => (
        <FadeInSection key={i}>
          <motion.div
            whileHover={{ y: -4 }}
            className={`glass-card overflow-hidden flex flex-col ${
              i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'
            }`}
          >
            {/* Video/Thumbnail */}
            <div className="md:w-3/5 relative overflow-hidden group cursor-pointer">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-56 md:h-80 object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/40"
                >
                  {isPlaying ? (
                    <Pause className="h-8 w-8 text-white" />
                  ) : (
                    <Play className="h-8 w-8 text-white ml-1" />
                  )}
                </motion.div>
              </div>
              {/* Mute Toggle */}
              <button
                onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }}
                className="absolute bottom-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-black/70 transition-all"
              >
                {isMuted ? <VolumeX className="h-5 w-5 text-white" /> : <Volume2 className="h-5 w-5 text-white" />}
              </button>
            </div>

            {/* Content */}
            <div className="md:w-2/5 p-6 md:p-8 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-white dark:text-gray-900 mb-3">{video.title}</h3>
              <p className="text-gray-400 dark:text-gray-600 leading-relaxed mb-6">{video.description}</p>
              <button className="inline-flex items-center text-blue-400 hover:text-blue-300 font-semibold group">
                Watch Video
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </FadeInSection>
      ))}
    </div>
  );
};

/* ==============================
   Main News Page
   ============================== */
const News = () => {
  const articles = [
    {
      date: 'April 10, 2026',
      category: 'Web Development',
      title: 'The Future of Web Development: What to Expect in 2026',
      excerpt: 'Exploring the latest trends and technologies shaping the future of web development and digital experiences.',
      image: 'https://placehold.co/600x400/1e293b/60a5fa?text=Web+Dev+2026',
      readTime: '5 min read'
    },
    {
      date: 'April 5, 2026',
      category: 'AI & Marketing',
      title: 'How AI is Transforming Digital Marketing',
      excerpt: 'Discover how artificial intelligence is revolutionizing marketing strategies and customer engagement.',
      image: 'https://placehold.co/600x400/1e293b/a78bfa?text=AI+Marketing',
      readTime: '7 min read'
    },
    {
      date: 'March 28, 2026',
      category: 'React',
      title: 'Building Scalable Applications with React',
      excerpt: 'Best practices and architectural patterns for building large-scale React applications.',
      image: 'https://placehold.co/600x400/1e293b/f472b6?text=React+Apps',
      readTime: '10 min read'
    },
    {
      date: 'March 20, 2026',
      category: 'Cybersecurity',
      title: 'The Importance of Cybersecurity in Modern Business',
      excerpt: 'Why cybersecurity should be a top priority for every business in the digital age.',
      image: 'https://placehold.co/600x400/1e293b/34d399?text=Cybersecurity',
      readTime: '6 min read'
    },
    {
      date: 'March 15, 2026',
      category: 'UX Design',
      title: 'UX Design Principles That Drive Conversions',
      excerpt: 'Learn the key UX design principles that can significantly improve your conversion rates.',
      image: 'https://placehold.co/600x400/1e293b/fbbf24?text=UX+Design',
      readTime: '8 min read'
    },
    {
      date: 'March 10, 2026',
      category: 'Cloud Computing',
      title: 'Cloud Computing: Choosing the Right Platform',
      excerpt: 'A comprehensive comparison of major cloud platforms to help you make the right choice.',
      image: 'https://placehold.co/600x400/1e293b/f87171?text=Cloud+Computing',
      readTime: '9 min read'
    }
  ];

  const galleryImages = [
    'https://placehold.co/1200x800/1e293b/60a5fa?text=Team+Workshop',
    'https://placehold.co/1200x800/1e293b/a78bfa?text=Office+Space',
    'https://placehold.co/1200x800/1e293b/f472b6?text=Client+Meeting',
    'https://placehold.co/1200x800/1e293b/34d399?text=Project+Launch',
    'https://placehold.co/1200x800/1e293b/fbbf24?text=Team+Cel ebration',
    'https://placehold.co/1200x800/1e293b/f87171?text=Design+Review'
  ];

  return (
    <div className="relative">
      {/* ==============================
          HERO SECTION
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
              News & Insights
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 dark:text-gray-700 mb-10 max-w-3xl mx-auto">
              Stay updated with the latest trends, tips, and insights from our expert team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ==============================
          VIDEO SECTION
          ============================== */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gradient mb-4">Watch & Learn</h2>
            <p className="text-xl text-gray-300 dark:text-gray-700 max-w-3xl mx-auto">
              Explore our video content — from company stories to educational content.
            </p>
          </FadeInSection>

          <VideoSection />
        </div>
      </section>

      {/* ==============================
          PHOTO CAROUSEL SECTION
          ============================== */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gradient mb-4">Photo Gallery</h2>
            <p className="text-xl text-gray-300 dark:text-gray-700 max-w-3xl mx-auto">
              A visual journey through our work, team, and milestones.
            </p>
          </FadeInSection>

          <FadeInSection>
            <PhotoCarousel images={galleryImages} />
          </FadeInSection>
        </div>
      </section>

      {/* ==============================
          ARTICLES / BLOGS SECTION
          ============================== */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gradient mb-4">Latest Articles</h2>
            <p className="text-xl text-gray-300 dark:text-gray-700 max-w-3xl mx-auto">
              Deep dives into topics that matter for your digital journey.
            </p>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, i) => (
              <FadeInSection key={i}>
                <motion.article
                  whileHover={{ y: -6 }}
                  className="glass-card overflow-hidden group cursor-pointer"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-3 py-1 bg-blue-500/80 backdrop-blur-md rounded-full text-xs font-semibold">
                        {article.category}
                      </span>
                      <span className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-xs">
                        {article.readTime}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-gray-500 dark:text-gray-600 mb-3">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">{article.date}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white dark:text-gray-900 mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-400 dark:text-gray-600 text-sm line-clamp-3 mb-4">{article.excerpt}</p>
                    <span className="inline-flex items-center text-blue-400 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                      Read More <ArrowRight className="h-4 w-4 ml-1" />
                    </span>
                  </div>
                </motion.article>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <FadeInSection>
          <div className="max-w-4xl mx-auto text-center">
            <div className="glass-card p-12">
              <h2 className="text-3xl md:text-4xl font-black text-gradient mb-4">
                Want to Contribute?
              </h2>
              <p className="text-xl text-gray-300 dark:text-gray-700 mb-8">
                Have insights to share? Join our community of writers and thought leaders.
              </p>
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all">
                Get In Touch
              </button>
            </div>
          </div>
        </FadeInSection>
      </section>
    </div>
  );
};

export default News;
