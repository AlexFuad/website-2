import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Footer = () => {
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'News', path: '/news' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900/50 to-black dark:from-gray-900/50 dark:to-black from-slate-100 to-slate-200 border-t border-white/10 dark:border-white/10 border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Motto */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-black text-lg">C</span>
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                CANIEL
              </span>
            </div>
            <p className="text-gray-400 dark:text-gray-400 text-gray-600 mb-4">
              "Transforming Ideas into Digital Excellence — Your Success, Our Mission."
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-gray-600 text-sm">
              Empowering businesses with innovative digital solutions since 2020.
            </p>
          </div>

          {/* Menu Links */}
          <div>
            <h3 className="text-lg font-bold text-white dark:text-gray-900 text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {navLinks.map(link => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 dark:text-gray-400 text-gray-600 hover:text-blue-400 dark:hover:text-blue-600 transition-colors flex items-center group"
                  >
                    <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Other Info */}
          <div>
            <h3 className="text-lg font-bold text-white dark:text-gray-900 text-gray-900 mb-4">Contact Info</h3>
            <div className="space-y-3 text-gray-400 dark:text-gray-400 text-gray-600 text-sm">
              <p>Email: hello@canielagency.com</p>
              <p>Phone: +1 (555) 123-4567</p>
              <p>Address: 123 Digital Street, Tech City, TC 12345</p>
            </div>
            <div className="mt-6">
              <h4 className="text-white font-semibold mb-2">Newsletter</h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; 2026 Caniel Agency. All rights reserved. Built with passion and innovation.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
