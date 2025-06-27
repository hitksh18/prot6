import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  imageURL: string;
  category: string;
}

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const navigate = useNavigate();

  // Mock wishlist data
  const mockWishlistItems: WishlistItem[] = [
    {
      id: '1',
      name: 'Premium Cotton T-Shirt',
      price: 1999,
      imageURL: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
      category: 'Tops'
    },
    {
      id: '3',
      name: 'Luxury Hoodie',
      price: 2999,
      imageURL: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7',
      category: 'Outerwear'
    }
  ];

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = () => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      const wishlistIds = JSON.parse(savedWishlist);
      // Filter mock items based on saved IDs
      const items = mockWishlistItems.filter(item => wishlistIds.includes(item.id));
      setWishlistItems(items);
    }
  };

  const removeFromWishlist = (itemId: string) => {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const updatedWishlist = savedWishlist.filter((id: string) => id !== itemId);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    
    setWishlistItems(prev => prev.filter(item => item.id !== itemId));
  };

  const addToCart = (item: WishlistItem) => {
    // Add to cart logic here
    alert(`${item.name} added to cart!`);
  };

  return (
    <div className="min-h-screen pt-20" style={{ backgroundColor: 'rgb(57, 62, 70)' }}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(-1)}
            className="mr-4 p-2 hover:bg-[rgb(34,40,49)] rounded-full transition-colors"
          >
            <ArrowLeft size={24} className="text-[rgb(223,208,184)]" />
          </motion.button>
          <div>
            <h1 className="text-3xl font-semibold text-[rgb(223,208,184)]">Wishlist</h1>
            <p className="text-[rgb(176,176,176)]">Your saved items</p>
          </div>
        </div>

        {/* Wishlist Items */}
        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-lg overflow-hidden shadow-sm border border-[rgb(136,136,136)]"
                style={{ backgroundColor: 'rgb(34, 40, 49)' }}
              >
                <div className="aspect-[3/4] overflow-hidden relative">
                  <img
                    src={item.imageURL}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-4 right-4 p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
                  >
                    <Trash2 size={16} />
                  </motion.button>
                </div>
                
                <div className="p-4">
                  <h3 className="font-medium text-[rgb(223,208,184)] mb-1">{item.name}</h3>
                  <p className="text-sm text-[rgb(176,176,176)] mb-2">{item.category}</p>
                  <p className="text-lg font-semibold text-[rgb(223,208,184)] mb-4">₹{item.price}</p>
                  
                  <Button
                    onClick={() => addToCart(item)}
                    className="w-full bg-[rgb(223,208,184)] text-[rgb(34,40,49)] hover:bg-[rgb(200,190,170)] flex items-center justify-center space-x-2 rounded-xl"
                  >
                    <ShoppingBag size={16} />
                    <span>Add to Cart</span>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Heart size={48} className="mx-auto text-[rgb(136,136,136)] mb-4" />
            <h3 className="text-lg font-medium text-[rgb(223,208,184)] mb-2">Your wishlist is empty</h3>
            <p className="text-[rgb(176,176,176)] mb-6">Save items you love to see them here</p>
            <Button 
              onClick={() => navigate('/catalog')} 
              className="bg-[rgb(223,208,184)] text-[rgb(34,40,49)] hover:bg-[rgb(200,190,170)] rounded-xl px-8 py-3"
            >
              Browse Collection
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;