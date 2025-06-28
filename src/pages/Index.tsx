'use client';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, ShoppingBag, Sparkles, Star, TrendingUp, Mail, Phone, MapPin } from 'lucide-react';
import Navbar from '@/components/Navbar';
import SearchOverlay from '@/components/SearchOverlay';
import ChatWidget from '@/components/ChatWidget';

const Index = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

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

      {/* Hero Section - FIXED overlap issues */}
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

        {/* Logo - Made Bigger, FIXED spacing */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="mb-8">
            <img
              src="/IMG-20250305-WA0003-removebg-preview.png"
              alt="RARITONE"
              width={600}
              height={200}
              className="mx-auto"
            />
          </div>

          <p className="text-xl font-light mb-16 text-[rgb(236,223,204)]">
            Fashion Meets Technology
          </p>

          {/* FIXED button spacing and alignment */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-16">
            <button
              className="bg-transparent text-[rgb(236,223,204)] border border-[rgb(105,117,101)] px-8 py-4 font-medium hover:bg-[rgba(105,117,101,0.3)] flex items-center space-x-3 rounded-full min-w-[220px] justify-center"
              onClick={() => navigate('/scan')}
            >
              <Camera size={20} />
              <span>Start Body Scan</span>
            </button>
            
            <button
              className="bg-transparent text-[rgb(236,223,204)] border border-[rgb(105,117,101)] px-8 py-4 font-medium hover:bg-[rgba(105,117,101,0.3)] flex items-center space-x-3 rounded-full min-w-[220px] justify-center"
              onClick={() => navigate('/catalog')}
            >
              <ShoppingBag size={20} />
              <span>Browse Collection</span>
            </button>
          </div>

          {/* HOMEPAGE NOTICE TEXT - Fixed color and positioning */}
          <p 
            className="text-sm max-w-md mx-auto leading-relaxed"
            style={{ color: '#ECDFCC', fontSize: '14px' }}
          >
            This site uses webcam access to enable AI-powered try-ons. Your camera data is never stored or shared.
          </p>
        </div>
      </div>

      {/* New Arrivals Section - NO ANIMATIONS */}
      <section
        className="py-20 px-4"
        style={{ backgroundColor: 'rgb(60, 61, 55)' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-4 text-[rgb(236,223,204)] flex items-center justify-center">
              <Sparkles className="mr-3" size={32} />
              New Arrivals
            </h2>
            <p className="text-[rgb(105,117,101)] max-w-2xl mx-auto">
              Discover our latest collections, meticulously crafted and designed for the modern luxury connoisseur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {newArrivals.map((item) => (
              <div
                key={item.id}
                className="group cursor-pointer"
                style={{ backgroundColor: 'rgb(24, 28, 20)' }}
                onClick={() => navigate('/catalog')}
              >
                <div className="rounded-lg shadow-md border border-[rgb(105,117,101)] overflow-hidden">
                  <div className="aspect-[3/4] relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105"
                      style={{ transition: 'transform 0.3s ease' }}
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section
        className="py-20 px-4"
        style={{ backgroundColor: 'rgb(24, 28, 20)' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-4 text-[rgb(236,223,204)] flex items-center justify-center">
              <TrendingUp className="mr-3" size={32} />
              Shop by Category
            </h2>
            <p className="text-[rgb(105,117,101)] max-w-2xl mx-auto">
              Explore our diverse range of fashion categories, each carefully curated for your unique style.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <div
                key={category.name}
                className="group cursor-pointer"
                onClick={() => navigate('/catalog')}
              >
                <div className="rounded-lg shadow-md border border-[rgb(105,117,101)] overflow-hidden" style={{ backgroundColor: 'rgb(60, 61, 55)' }}>
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105"
                      style={{ transition: 'transform 0.3s ease' }}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10" style={{ transition: 'background-color 0.3s ease' }} />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-medium mb-1 text-[rgb(236,223,204)]">{category.name}</h3>
                    <p className="text-[rgb(105,117,101)] text-sm">{category.count}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Picks Section */}
      <section
        className="py-20 px-4"
        style={{ backgroundColor: 'rgb(60, 61, 55)' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-4 text-[rgb(236,223,204)] flex items-center justify-center">
              <Star className="mr-3" size={32} />
              Best Picks
            </h2>
            <p className="text-[rgb(105,117,101)] max-w-2xl mx-auto">
              Our most popular items, loved by customers worldwide for their exceptional quality and style.
            </p>
          </div>

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
            ].map((item) => (
              <div
                key={item.id}
                className="group cursor-pointer"
                onClick={() => navigate('/catalog')}
              >
                <div className="rounded-lg shadow-md border border-[rgb(105,117,101)] overflow-hidden" style={{ backgroundColor: 'rgb(24, 28, 20)' }}>
                  <div className="aspect-[3/4] relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105"
                      style={{ transition: 'transform 0.3s ease' }}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10" style={{ transition: 'background-color 0.3s ease' }} />
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section - Enhanced with larger logo */}
      <footer
        className="py-16 px-4 border-t border-[rgb(105,117,101)]"
        style={{ backgroundColor: 'rgb(24, 28, 20)' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section - Larger logo */}
            <div className="md:col-span-2">
              <div>
                <img
                  src="/IMG-20250305-WA0003-removebg-preview.png"
                  alt="RARITONE"
                  className="h-24 w-auto mb-4"
                />
                <p className="text-[rgb(105,117,101)] max-w-md leading-relaxed">
                  Revolutionizing fashion with AI-powered body scanning technology. 
                  Experience perfect fit and personalized style recommendations across India.
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <div>
                <h3 className="text-lg font-semibold text-[rgb(236,223,204)] mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><a href="/quick-links" className="text-[rgb(105,117,101)] hover:text-[rgb(236,223,204)]">About Us</a></li>
                  <li><a href="/quick-links" className="text-[rgb(105,117,101)] hover:text-[rgb(236,223,204)]">Privacy Policy</a></li>
                  <li><a href="/quick-links" className="text-[rgb(105,117,101)] hover:text-[rgb(236,223,204)]">Returns</a></li>
                  <li><a href="/quick-links" className="text-[rgb(105,117,101)] hover:text-[rgb(236,223,204)]">Contact</a></li>
                </ul>
              </div>
            </div>

            {/* Contact Info - India specific */}
            <div>
              <div>
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
              </div>
            </div>
          </div>

          <div className="border-t border-[rgb(105,117,101)] mt-12 pt-8 text-center">
            <p className="text-[rgb(105,117,101)]">
              © 2025 RARITONE. All rights reserved. | Powered by AI Fashion Technology | Made in India
            </p>
          </div>
        </div>
      </footer>

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