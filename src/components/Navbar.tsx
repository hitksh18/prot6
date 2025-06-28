'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Search, ShoppingBag, User, Menu, X, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import LoginModal from '@/components/LoginModal';

interface NavbarProps {
  onSearchOpen: () => void;
  onCartOpen: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearchOpen, onCartOpen }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();
  const { user, cart, logout } = useAuth();

  // Enhanced scroll tracking for smooth animations
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      // Smooth navbar appearance with enhanced threshold
      setIsVisible(currentScrollY > 120);
    };

    // Throttled scroll listener for 120fps performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlistCount(JSON.parse(savedWishlist).length);
    }

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleProfileClick = () => {
    if (isMenuOpen) setIsMenuOpen(false);
    if (user) {
      setIsProfileOpen(true);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleMenuClick = () => {
    if (isProfileOpen) setIsProfileOpen(false);
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { label: 'Shop', path: '/catalog', icon: ShoppingBag },
    { label: 'Body Scan', path: '/scan', icon: Search },
    { label: 'Profile', action: handleProfileClick, icon: User },
    { label: 'Settings', path: '/settings', icon: Menu }
  ];

  // Enhanced navbar animation variants for smooth 120fps performance
  const navbarVariants = {
    hidden: { 
      y: -100, 
      opacity: 0,
      transition: { 
        duration: 0.4, 
        ease: [0.25, 0.46, 0.45, 0.94] // Custom easing for smooth motion
      }
    },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.4, 
        ease: [0.25, 0.46, 0.45, 0.94] // Smooth easing curve
      }
    }
  };

  // Smooth backdrop blur effect based on scroll
  const backdropBlur = Math.min(scrollY / 10, 20);
  const navbarOpacity = Math.min(scrollY / 200, 0.95);

  return (
    <>
      {/* ENHANCED SMOOTH SCROLLING NAVBAR */}
      <motion.nav
        variants={navbarVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className={`fixed top-0 left-0 right-0 ${isMenuOpen ? 'z-30' : 'z-50'} transition-all duration-300`}
        style={{ 
          backgroundColor: `rgba(105, 117, 101, ${navbarOpacity})`, // Dynamic opacity
          borderBottom: '1px solid rgb(236, 223, 204)',
          backdropFilter: `blur(${backdropBlur}px)`,
          WebkitBackdropFilter: `blur(${backdropBlur}px)`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left - Enhanced Menu Button */}
            <div className="flex items-center relative z-60" style={{ marginRight: '16px' }}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleMenuClick}
                className="flex items-center space-x-3 text-[rgb(236,223,204)] hover:text-[rgb(60,61,55)] transition-all duration-300 relative z-60 p-2 rounded-lg"
              >
                {/* Enhanced Hamburger Animation - Smoother transitions */}
                <div className="relative w-7 h-7 flex flex-col justify-center items-center z-60">
                  <motion.span
                    animate={{
                      rotate: isMenuOpen ? 45 : 0,
                      y: isMenuOpen ? 0 : -5,
                      scaleX: isMenuOpen ? 1.1 : 1,
                    }}
                    transition={{ 
                      duration: 0.4, 
                      ease: [0.25, 0.46, 0.45, 0.94],
                      type: "spring",
                      stiffness: 200,
                      damping: 20
                    }}
                    className="absolute w-7 h-0.5 bg-current rounded-full"
                    style={{ transformOrigin: 'center' }}
                  />
                  <motion.span
                    animate={{
                      opacity: isMenuOpen ? 0 : 1,
                      scale: isMenuOpen ? 0.8 : 1,
                      rotate: isMenuOpen ? 180 : 0,
                    }}
                    transition={{ 
                      duration: 0.3, 
                      ease: [0.25, 0.46, 0.45, 0.94] 
                    }}
                    className="absolute w-7 h-0.5 bg-current rounded-full"
                  />
                  <motion.span
                    animate={{
                      rotate: isMenuOpen ? -45 : 0,
                      y: isMenuOpen ? 0 : 5,
                      scaleX: isMenuOpen ? 1.1 : 1,
                    }}
                    transition={{ 
                      duration: 0.4, 
                      ease: [0.25, 0.46, 0.45, 0.94],
                      type: "spring",
                      stiffness: 200,
                      damping: 20
                    }}
                    className="absolute w-7 h-0.5 bg-current rounded-full"
                    style={{ transformOrigin: 'center' }}
                  />
                </div>
                
                {/* Enhanced Text Animation */}
                <motion.span 
                  className="text-sm font-medium relative z-60 hidden sm:block"
                  animate={{ 
                    opacity: 1,
                    x: 0,
                    color: isMenuOpen ? 'rgb(236,223,204)' : 'rgb(236,223,204)'
                  }}
                  transition={{ 
                    duration: 0.3,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                >
                  {isMenuOpen ? 'Close' : 'Menu'}
                </motion.span>
              </motion.button>
            </div>

            {/* Center - Enhanced Logo with Smooth Scaling */}
            <div className="flex-1 flex justify-center">
              <motion.img
                whileHover={{ 
                  scale: 1.08,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.95 }}
                src="/IMG-20250305-WA0003-removebg-preview.png"
                alt="RARITONE"
                className="h-5 w-auto cursor-pointer transition-all duration-300"
                onClick={() => navigate('/')}
                style={{
                  filter: `brightness(${1 + scrollY / 2000})`, // Subtle brightness change on scroll
                }}
              />
            </div>

            {/* Right - Enhanced Action Buttons with Responsive Spacing */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              <motion.button
                whileHover={{ 
                  scale: 1.15,
                  rotate: 5,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.9 }}
                onClick={onSearchOpen}
                className="text-[rgb(236,223,204)] hover:text-[rgb(60,61,55)] transition-all duration-300 p-2 rounded-lg"
              >
                <Search size={20} />
              </motion.button>
              
              <motion.button 
                whileHover={{ 
                  scale: 1.15,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate('/wishlist')}
                className="relative text-[rgb(236,223,204)] hover:text-[rgb(60,61,55)] transition-all duration-300 p-2 rounded-lg"
              >
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                  >
                    {wishlistCount}
                  </motion.span>
                )}
              </motion.button>

              <motion.button
                whileHover={{ 
                  scale: 1.15,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate('/cart')}
                className="relative text-[rgb(236,223,204)] hover:text-[rgb(60,61,55)] transition-all duration-300 p-2 rounded-lg"
              >
                <ShoppingBag size={20} />
                {cartItemsCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-[rgb(236,223,204)] text-[rgb(24,28,20)] text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
                  >
                    {cartItemsCount}
                  </motion.span>
                )}
              </motion.button>
              
              <motion.button 
                whileHover={{ 
                  scale: 1.15,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.9 }}
                onClick={handleProfileClick}
                className="text-[rgb(236,223,204)] hover:text-[rgb(60,61,55)] transition-all duration-300 p-2 rounded-lg"
              >
                <User size={20} />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Enhanced Left Menu Sidebar with Smooth Animations */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              transition={{ 
                type: 'spring', 
                damping: 30, 
                stiffness: 300,
                duration: 0.4
              }}
              style={{ backgroundColor: 'rgb(24, 28, 20)' }}
              className="fixed left-0 top-0 h-full w-80 sm:w-96 z-50 shadow-2xl"
            >
              <div className="p-6 sm:p-8">
                <div className="flex justify-between items-center mb-8">
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl font-semibold text-[rgb(236,223,204)]"
                  >
                    Menu
                  </motion.h2>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-[rgb(236,223,204)] hover:text-[rgb(105,117,101)] transition-all duration-300 p-2 rounded-lg"
                  >
                    <X size={24} />
                  </motion.button>
                </div>

                <div className="space-y-3">
                  {menuItems.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        delay: index * 0.1 + 0.3,
                        duration: 0.4,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }}
                      whileHover={{ 
                        x: 8,
                        transition: { duration: 0.2, ease: "easeOut" }
                      }}
                      className="rounded-xl hover:bg-[rgb(60,61,55)] transition-all duration-300"
                    >
                      <button
                        onClick={() => {
                          if (item.action) {
                            item.action();
                          } else if (item.path) {
                            navigate(item.path);
                          }
                          setIsMenuOpen(false);
                        }}
                        className="w-full text-left px-6 py-4 text-[rgb(236,223,204)] hover:text-[rgb(105,117,101)] transition-all duration-300 flex items-center space-x-4 rounded-xl"
                      >
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <item.icon size={22} />
                        </motion.div>
                        <span className="text-lg font-medium">{item.label}</span>
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Enhanced Right Profile Sidebar */}
      <AnimatePresence>
        {isProfileOpen && user && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsProfileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ 
                type: 'spring', 
                damping: 30, 
                stiffness: 300,
                duration: 0.4
              }}
              style={{ backgroundColor: 'rgb(24, 28, 20)' }}
              className="fixed right-0 top-0 h-full w-80 sm:w-96 z-50 shadow-2xl overflow-y-auto"
            >
              <div className="p-6 sm:p-8">
                <div className="flex justify-between items-center mb-8">
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl font-semibold text-[rgb(236,223,204)]"
                  >
                    Profile
                  </motion.h2>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsProfileOpen(false)}
                    className="text-[rgb(236,223,204)] hover:text-[rgb(105,117,101)] transition-all duration-300 p-2 rounded-lg"
                  >
                    <X size={24} />
                  </motion.button>
                </div>

                {/* Enhanced Profile Info */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-8"
                >
                  <div className="flex items-center space-x-4 mb-6">
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="w-16 h-16 bg-[rgb(60,61,55)] rounded-full flex items-center justify-center border border-[rgb(105,117,101)]"
                    >
                      {user?.photoURL ? (
                        <img src={user.photoURL} alt="Profile" className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <User size={24} className="text-[rgb(236,223,204)]" />
                      )}
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-semibold text-[rgb(236,223,204)]">{user.displayName || 'User'}</h3>
                      <p className="text-[rgb(105,117,101)]">{user.email}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Enhanced Profile Actions */}
                <div className="space-y-3">
                  {[
                    { label: 'Profile Info', path: '/profile' },
                    { label: 'Order History', path: '/orders' },
                    { label: 'Saved Items', path: '/wishlist' },
                  ].map((action, index) => (
                    <motion.button
                      key={action.label}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        delay: index * 0.1 + 0.4,
                        duration: 0.4,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }}
                      whileHover={{ 
                        x: -8,
                        transition: { duration: 0.2, ease: "easeOut" }
                      }}
                      onClick={() => {
                        navigate(action.path);
                        setIsProfileOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 text-[rgb(236,223,204)] hover:bg-[rgb(60,61,55)] border border-[rgb(105,117,101)] rounded-xl transition-all duration-300"
                    >
                      {action.label}
                    </motion.button>
                  ))}
                  
                  <motion.button
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: 0.7,
                      duration: 0.4,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    whileHover={{ 
                      x: -8,
                      transition: { duration: 0.2, ease: "easeOut" }
                    }}
                    onClick={() => {
                      logout();
                      setIsProfileOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 text-red-400 hover:bg-red-900/20 border border-red-500 rounded-xl transition-all duration-300"
                  >
                    Logout
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
};

export default Navbar;