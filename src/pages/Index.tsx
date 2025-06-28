'use client';

import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Camera, ShoppingBag, Sparkles, Star, TrendingUp, Mail, Phone, MapPin } from 'lucide-react';
import Navbar from '@/components/Navbar';
import SearchOverlay from '@/components/SearchOverlay';
import ChatWidget from '@/components/ChatWidget';

const Index = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  
  const logoY = useTransform(scrollY, [0, 300], [0, -100]);
  const logoOpacity = useTransform(scrollY, [0, 200], [1, 0]);
  const logoScale = useTransform(scrollY, [0, 300], [1, 0.6]);

  const newArrivals = [
    {
      id: 1,
      name: "Premium Cotton T-Shirt",
      price: "₹1,999",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
      tag: "New"
    },
    {
      id: 2,
      name: "Designer Jeans",
      price: "₹3,999",
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d",
      tag: "Trending"
    },
    {
      id: 3,
      name: "Luxury Hoodie",
      price: "₹2,999",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7",
      tag: "Popular"
    },
    {
      id: 4,
      name: "Silk Dress",
      price: "₹5,999",
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446",
      tag: "Exclusive"
    }
  ];

  const categories = [
    { name: "T-Shirts", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab", count: "50+ Items" },
    { name: "Hoodies", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7", count: "30+ Items" },
    { name: "Jeans", image: "https://images.unsplash.com/photo-1542272604-787c3835535d", count: "40+ Items" },
    { name: "Dresses", image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446", count: "25+ Items" }
  ];

  return (
    <div className="min-h-screen text-[rgb(236,223,204)]" style={{ backgroundColor: 'rgb(60, 61, 55)' }}>
      {/* Navigation */}
      <Navbar 
        onSearchOpen={() => setIsSearchOpen(true)}
        onCartOpen={() => setIsCartOpen(true)}
      />

      {/* Hero Section - Fixed overlap issues */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8"
            alt="Fashion Model in RARITONE Collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(24, 28, 20, 0.5)' }} />
        </div>

        {/* Logo - Made Bigger */}
        <motion.div
          style={{ y: logoY, opacity: logoOpacity, scale: logoScale }}
          className="relative z-10 text-center px-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="logo-float"
          >
            <img
              src="/IMG-20250305-WA0003-removebg-preview.png"
              alt="RARITONE"
              width={600}
              height={200}
              className="mx-auto mb-8"
            />
          </motion.div>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl font-light mb-12 text-[rgb(236,223,204)]"
          >
            Fashion Meets Technology
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-8 mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(105, 117, 101, 0.2)' }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent text-[rgb(236,223,204)] border border-[rgb(105,117,101)] px-8 py-4 font-medium hover:bg-[rgba(105,117,101,0.3)] transition-all duration-300 flex items-center space-x-3 rounded-full min-w-[200px] justify-center"
              onClick={() => navigate('/scan')}
            >
              <Camera size={20} />
              <span>Start Body Scan</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(105, 117, 101, 0.2)' }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent text-[rgb(236,223,204)] border border-[rgb(105,117,101)] px-8 py-4 font-medium hover:bg-[rgba(105,117,101,0.3)] transition-all duration-300 flex items-center space-x-3 rounded-full min-w-[200px] justify-center"
              onClick={() => navigate('/catalog')}
            >
              <ShoppingBag size={20} />
              <span>Browse Collection</span>
            </motion.button>
          </motion.div>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="text-sm text-[rgb(105,117,101)] max-w-md mx-auto"
          >
            This site uses webcam access to enable AI-powered try-ons. Your camera data is never stored or shared.
          </motion.p>
        </motion.div>
      </div>

      {/* New Arrivals Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-20 px-4"
        style={{ backgroundColor: 'rgb(60, 61, 55)' }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light mb-4 text-[rgb(236,223,204)] flex items-center justify-center">
              <Sparkles className="mr-3" size={32} />
              New Arrivals
            </h2>
            <p className="text-[rgb(105,117,101)] max-w-2xl mx-auto">
              Discover our latest collections, meticulously crafted and designed for the modern luxury connoisseur.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {newArrivals.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                style={{ backgroundColor: 'rgb(24, 28, 20)' }}
                onClick={() => navigate('/catalog')}
              >
                <div className="rounded-lg shadow-md border border-[rgb(105,117,101)] overflow-hidden">
                  <div className="aspect-[3/4] relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-[rgb(236,223,204)] text-[rgb(24,28,20)] px-2 py-1 text-xs font-medium rounded">
                        {item.tag}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-medium mb-2 text-[rgb(236,223,204)]">{item.name}</h3>
                    <p className="text-[rgb(105,117,101)] text-sm">From {item.price}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Categories Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-20 px-4"
        style={{ backgroundColor: 'rgb(24, 28, 20)' }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light mb-4 text-[rgb(236,223,204)] flex items-center justify-center">
              <TrendingUp className="mr-3" size={32} />
              Shop by Category
            </h2>
            <p className="text-[rgb(105,117,101)] max-w-2xl mx-auto">
              Explore our diverse range of fashion categories, each carefully curated for your unique style.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                onClick={() => navigate('/catalog')}
              >
                <div className="rounded-lg shadow-md border border-[rgb(105,117,101)] overflow-hidden" style={{ backgroundColor: 'rgb(60, 61, 55)' }}>
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-medium mb-1 text-[rgb(236,223,204)]">{category.name}</h3>
                    <p className="text-[rgb(105,117,101)] text-sm">{category.count}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Best Picks Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-20 px-4"
        style={{ backgroundColor: 'rgb(60, 61, 55)' }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light mb-4 text-[rgb(236,223,204)] flex items-center justify-center">
              <Star className="mr-3" size={32} />
              Best Picks
            </h2>
            <p className="text-[rgb(105,117,101)] max-w-2xl mx-auto">
              Our most popular items, loved by customers worldwide for their exceptional quality and style.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                id: 1,
                image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446",
                title: "Luxury Essentials",
                price: "₹2,999",
                rating: 4.8
              },
              {
                id: 2,
                image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b",
                title: "Street Couture",
                price: "₹3,499",
                rating: 4.9
              },
              {
                id: 3,
                image: "https://images.unsplash.com/photo-1483985988355-763728e1935b",
                title: "Evening Collection",
                price: "₹4,999",
                rating: 4.7
              }
            ].map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                onClick={() => navigate('/catalog')}
              >
                <div className="rounded-lg shadow-md border border-[rgb(105,117,101)] overflow-hidden" style={{ backgroundColor: 'rgb(24, 28, 20)' }}>
                  <div className="aspect-[3/4] relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-medium text-[rgb(236,223,204)]">{item.title}</h3>
                      <div className="flex items-center space-x-1">
                        <Star size={16} className="text-yellow-400 fill-current" />
                        <span className="text-[rgb(105,117,101)] text-sm">{item.rating}</span>
                      </div>
                    </div>
                    <p className="text-[rgb(105,117,101)] text-sm">From {item.price}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Footer Section - Enhanced with larger logo */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-16 px-4 border-t border-[rgb(105,117,101)]"
        style={{ backgroundColor: 'rgb(24, 28, 20)' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section - Larger logo */}
            <div className="md:col-span-2">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <img
                  src="/IMG-20250305-WA0003-removebg-preview.png"
                  alt="RARITONE"
                  className="h-24 w-auto mb-4"
                />
                <p className="text-[rgb(105,117,101)] max-w-md leading-relaxed">
                  Revolutionizing fashion with AI-powered body scanning technology. 
                  Experience perfect fit and personalized style recommendations across India.
                </p>
              </motion.div>
            </div>

            {/* Quick Links */}
            <div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold text-[rgb(236,223,204)] mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><a href="/quick-links" className="text-[rgb(105,117,101)] hover:text-[rgb(236,223,204)] transition-colors">About Us</a></li>
                  <li><a href="/quick-links" className="text-[rgb(105,117,101)] hover:text-[rgb(236,223,204)] transition-colors">Privacy Policy</a></li>
                  <li><a href="/quick-links" className="text-[rgb(105,117,101)] hover:text-[rgb(236,223,204)] transition-colors">Returns</a></li>
                  <li><a href="/quick-links" className="text-[rgb(105,117,101)] hover:text-[rgb(236,223,204)] transition-colors">Contact</a></li>
                </ul>
              </motion.div>
            </div>

            {/* Contact Info - India specific */}
            <div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold text-[rgb(236,223,204)] mb-4">Contact</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail size={16} className="text-[rgb(105,117,101)]" />
                    <span className="text-[rgb(105,117,101)]">hello@raritone.in</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone size={16} className="text-[rgb(105,117,101)]" />
                    <span className="text-[rgb(105,117,101)]">+91 98765 43210</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin size={16} className="text-[rgb(105,117,101)]" />
                    <span className="text-[rgb(105,117,101)]">Mumbai, India</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="border-t border-[rgb(105,117,101)] mt-12 pt-8 text-center"
          >
            <p className="text-[rgb(105,117,101)]">
              © 2025 RARITONE. All rights reserved. | Powered by AI Fashion Technology | Made in India
            </p>
          </motion.div>
        </div>
      </motion.footer>

      {/* Search Overlay */}
      <SearchOverlay 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  );
};

export default Index;