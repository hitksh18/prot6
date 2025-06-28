'use client';

import React, { useState, useEffect } from 'react';
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
  const navigate = useNavigate();
  const { user, cart, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      // INSTANT navbar appearance - no delay
      setIsVisible(window.scrollY > 50);
    };

    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlistCount(JSON.parse(savedWishlist).length);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleProfileClick = () => {
    if (isMenuOpen) setIsMenuOpen(false); // Auto-close menu
    if (user) {
      setIsProfileOpen(true);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleMenuClick = () => {
    if (isProfileOpen) setIsProfileOpen(false); // Auto-close profile
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { label: 'Shop', path: '/catalog', icon: ShoppingBag },
    { label: 'Body Scan', path: '/scan', icon: Search },
    { label: 'Profile', action: handleProfileClick, icon: User },
    { label: 'Settings', path: '/settings', icon: Menu }
  ];

  return (
    <>
      {/* NAVBAR - Fixed colors and instant appearance */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 ${isVisible ? 'block' : 'hidden'}`}
        style={{ 
          backgroundColor: 'rgb(105, 117, 101)', // #697565 - Navbar Background
          borderBottom: '1px solid rgb(236, 223, 204)' // #ECDFCC - Bottom Border
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left - Menu with 16px spacing */}
            <div className="flex items-center" style={{ marginRight: '16px' }}>
              <button
                onClick={handleMenuClick}
                className="flex items-center space-x-2 text-[rgb(236,223,204)] hover:text-[rgb(60,61,55)]"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                <span className="text-sm font-medium">
                  {isMenuOpen ? 'Close' : 'Menu'}
                </span>
              </button>
            </div>

            {/* Center - Logo (20px height) */}
            <div className="flex-1 flex justify-center">
              <img
                src="/IMG-20250305-WA0003-removebg-preview.png"
                alt="RARITONE"
                className="h-5 w-auto cursor-pointer" // 20px height
                onClick={() => navigate('/')}
              />
            </div>

            {/* Right - Actions with 16px spacing */}
            <div className="flex items-center space-x-4">
              <button
                onClick={onSearchOpen}
                className="text-[rgb(236,223,204)] hover:text-[rgb(60,61,55)]"
              >
                <Search size={20} />
              </button>
              
              <button 
                onClick={() => navigate('/wishlist')}
                className="relative text-[rgb(236,223,204)] hover:text-[rgb(60,61,55)]"
              >
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => navigate('/cart')}
                className="relative text-[rgb(236,223,204)] hover:text-[rgb(60,61,55)]"
              >
                <ShoppingBag size={20} />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[rgb(236,223,204)] text-[rgb(24,28,20)] text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </button>
              
              <button 
                onClick={handleProfileClick}
                className="text-[rgb(236,223,204)] hover:text-[rgb(60,61,55)]"
              >
                <User size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Left Menu Sidebar - NO ANIMATIONS */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => setIsMenuOpen(false)}
          />
          <div
            style={{ backgroundColor: 'rgb(24, 28, 20)' }} // #181C14 - Sidebar BG
            className="fixed left-0 top-0 h-full w-80 z-50 shadow-2xl"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-semibold text-[rgb(236,223,204)]">Menu</h2>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-[rgb(236,223,204)] hover:text-[rgb(105,117,101)]"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                {menuItems.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl hover:bg-[rgb(60,61,55)]"
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
                      className="w-full text-left px-6 py-4 text-[rgb(236,223,204)] hover:text-[rgb(105,117,101)] flex items-center space-x-3 rounded-xl"
                    >
                      <item.icon size={20} />
                      <span className="text-lg font-medium">{item.label}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Right Profile Sidebar - NO ANIMATIONS */}
      {isProfileOpen && user && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => setIsProfileOpen(false)}
          />
          <div
            style={{ backgroundColor: 'rgb(24, 28, 20)' }} // #181C14 - Sidebar BG
            className="fixed right-0 top-0 h-full w-80 z-50 shadow-2xl overflow-y-auto"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-semibold text-[rgb(236,223,204)]">Profile</h2>
                <button
                  onClick={() => setIsProfileOpen(false)}
                  className="text-[rgb(236,223,204)] hover:text-[rgb(105,117,101)]"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Profile Info */}
              <div className="mb-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-[rgb(60,61,55)] rounded-full flex items-center justify-center border border-[rgb(105,117,101)]">
                    {user?.photoURL ? (
                      <img src={user.photoURL} alt="Profile" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <User size={24} className="text-[rgb(236,223,204)]" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[rgb(236,223,204)]">{user.displayName || 'User'}</h3>
                    <p className="text-[rgb(105,117,101)]">{user.email}</p>
                  </div>
                </div>
              </div>

              {/* Profile Actions */}
              <div className="space-y-4">
                <button
                  onClick={() => {
                    navigate('/profile');
                    setIsProfileOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-[rgb(236,223,204)] hover:bg-[rgb(60,61,55)] border border-[rgb(105,117,101)] rounded-xl"
                >
                  Profile Info
                </button>
                
                <button
                  onClick={() => {
                    navigate('/orders');
                    setIsProfileOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-[rgb(236,223,204)] hover:bg-[rgb(60,61,55)] border border-[rgb(105,117,101)] rounded-xl"
                >
                  Order History
                </button>
                
                <button
                  onClick={() => {
                    navigate('/wishlist');
                    setIsProfileOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-[rgb(236,223,204)] hover:bg-[rgb(60,61,55)] border border-[rgb(105,117,101)] rounded-xl"
                >
                  Saved Items
                </button>
                
                <button
                  onClick={() => {
                    logout();
                    setIsProfileOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-red-400 hover:bg-red-900/20 border border-red-500 rounded-xl"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
};

export default Navbar;