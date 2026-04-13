import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './ThemeContext';
import Navbar from './Navbar';
import Footer from './Footer';
import Home from './Home';
import About from './About';
import Products from './Products';
import News from './News';
import Contact from './Contact';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen transition-colors duration-500">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/news" element={<News />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        <Toaster position="top-right" />
      </div>
    </ThemeProvider>
  );
}

export default App;
