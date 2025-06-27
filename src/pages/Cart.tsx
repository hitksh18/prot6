import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Trash2, Plus, Minus, CreditCard } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { removeFromCart } from '@/lib/user';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { user, cart, refreshCart } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [billingAddress, setBillingAddress] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India'
  });
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvc: ''
  });

  const updateQuantity = async (itemId: string, newQuantity: number, size?: string) => {
    if (newQuantity <= 0) {
      await removeFromCart(user!.uid, itemId, size);
      await refreshCart();
    }
    // Add update quantity logic here
  };

  const removeItem = async (itemId: string, size?: string) => {
    if (user) {
      await removeFromCart(user.uid, itemId, size);
      await refreshCart();
    }
  };

  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 2000 ? 0 : 200;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;

  const handleCheckout = async () => {
    setLoading(true);
    // Simulate processing
    setTimeout(() => {
      setLoading(false);
      alert('Order placed successfully!');
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center" style={{ backgroundColor: 'rgb(57, 62, 70)' }}>
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-[rgb(223,208,184)] mb-4">Your cart is empty</h2>
          <p className="text-[rgb(176,176,176)] mb-8">Add some items to get started</p>
          <Button 
            onClick={() => navigate('/catalog')} 
            className="bg-[rgb(223,208,184)] text-[rgb(34,40,49)] hover:bg-[rgb(200,190,170)] rounded-xl"
          >
            Browse Collection
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20" style={{ backgroundColor: 'rgb(57, 62, 70)' }}>
      <div className="max-w-6xl mx-auto px-4 py-8">
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
            <h1 className="text-3xl font-semibold text-[rgb(223,208,184)]">Shopping Cart</h1>
            <p className="text-[rgb(176,176,176)]">Review your items and complete your purchase</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-lg shadow-sm p-6 border border-[rgb(136,136,136)]" style={{ backgroundColor: 'rgb(34, 40, 49)' }}>
              <h2 className="text-xl font-semibold text-[rgb(223,208,184)] mb-6">Cart Items</h2>
              
              <div className="space-y-4">
                {cart.map((item) => (
                  <motion.div
                    key={`${item.id}-${item.size}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center space-x-4 p-4 border border-[rgb(136,136,136)] rounded-xl"
                    style={{ backgroundColor: 'rgb(57, 62, 70)' }}
                  >
                    <img
                      src={item.imageURL}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    
                    <div className="flex-1">
                      <h3 className="font-medium text-[rgb(223,208,184)]">{item.name}</h3>
                      {item.size && <p className="text-sm text-[rgb(176,176,176)]">Size: {item.size}</p>}
                      <p className="text-lg font-medium text-[rgb(223,208,184)]">₹{item.price}</p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1, item.size)}
                        className="p-1 hover:bg-[rgb(34,40,49)] rounded"
                      >
                        <Minus size={16} className="text-[rgb(176,176,176)]" />
                      </button>
                      <span className="w-8 text-center text-[rgb(223,208,184)]">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1, item.size)}
                        className="p-1 hover:bg-[rgb(34,40,49)] rounded"
                      >
                        <Plus size={16} className="text-[rgb(176,176,176)]" />
                      </button>
                    </div>
                    
                    <button
                      onClick={() => removeItem(item.id, item.size)}
                      className="p-2 text-red-500 hover:bg-red-900/20 rounded"
                    >
                      <Trash2 size={16} />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Billing Address */}
            <div className="rounded-lg shadow-sm p-6 border border-[rgb(136,136,136)]" style={{ backgroundColor: 'rgb(34, 40, 49)' }}>
              <h2 className="text-xl font-semibold text-[rgb(223,208,184)] mb-6">Billing Address</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-[rgb(223,208,184)]">First Name</Label>
                  <Input
                    id="firstName"
                    value={billingAddress.firstName}
                    onChange={(e) => setBillingAddress({...billingAddress, firstName: e.target.value})}
                    className="mt-1 bg-[rgb(57,62,70)] border-[rgb(136,136,136)] text-[rgb(223,208,184)] rounded-xl"
                  />
                </div>
                
                <div>
                  <Label htmlFor="lastName" className="text-[rgb(223,208,184)]">Last Name</Label>
                  <Input
                    id="lastName"
                    value={billingAddress.lastName}
                    onChange={(e) => setBillingAddress({...billingAddress, lastName: e.target.value})}
                    className="mt-1 bg-[rgb(57,62,70)] border-[rgb(136,136,136)] text-[rgb(223,208,184)] rounded-xl"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <Label htmlFor="address" className="text-[rgb(223,208,184)]">Address</Label>
                  <textarea
                    id="address"
                    value={billingAddress.address}
                    onChange={(e) => setBillingAddress({...billingAddress, address: e.target.value})}
                    className="mt-1 w-full px-3 py-2 border border-[rgb(136,136,136)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[rgb(136,136,136)] bg-[rgb(57,62,70)] text-[rgb(223,208,184)]"
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor="city" className="text-[rgb(223,208,184)]">City</Label>
                  <Input
                    id="city"
                    value={billingAddress.city}
                    onChange={(e) => setBillingAddress({...billingAddress, city: e.target.value})}
                    className="mt-1 bg-[rgb(57,62,70)] border-[rgb(136,136,136)] text-[rgb(223,208,184)] rounded-xl"
                  />
                </div>
                
                <div>
                  <Label htmlFor="state" className="text-[rgb(223,208,184)]">State/Province</Label>
                  <Input
                    id="state"
                    value={billingAddress.state}
                    onChange={(e) => setBillingAddress({...billingAddress, state: e.target.value})}
                    className="mt-1 bg-[rgb(57,62,70)] border-[rgb(136,136,136)] text-[rgb(223,208,184)] rounded-xl"
                  />
                </div>
                
                <div>
                  <Label htmlFor="zipCode" className="text-[rgb(223,208,184)]">Zip Code</Label>
                  <Input
                    id="zipCode"
                    value={billingAddress.zipCode}
                    onChange={(e) => setBillingAddress({...billingAddress, zipCode: e.target.value})}
                    className="mt-1 bg-[rgb(57,62,70)] border-[rgb(136,136,136)] text-[rgb(223,208,184)] rounded-xl"
                  />
                </div>
                
                <div>
                  <Label htmlFor="country" className="text-[rgb(223,208,184)]">Country</Label>
                  <select
                    id="country"
                    value={billingAddress.country}
                    onChange={(e) => setBillingAddress({...billingAddress, country: e.target.value})}
                    className="mt-1 w-full px-3 py-2 border border-[rgb(136,136,136)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[rgb(136,136,136)] bg-[rgb(57,62,70)] text-[rgb(223,208,184)]"
                  >
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                    <option value="Canada">Canada</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="rounded-lg shadow-sm p-6 border border-[rgb(136,136,136)]" style={{ backgroundColor: 'rgb(34, 40, 49)' }}>
              <h2 className="text-xl font-semibold text-[rgb(223,208,184)] mb-6 flex items-center">
                <CreditCard className="mr-2" size={20} />
                Payment Method
              </h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber" className="text-[rgb(223,208,184)]">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={paymentDetails.cardNumber}
                    onChange={(e) => setPaymentDetails({...paymentDetails, cardNumber: e.target.value})}
                    className="mt-1 bg-[rgb(57,62,70)] border-[rgb(136,136,136)] text-[rgb(223,208,184)] rounded-xl"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate" className="text-[rgb(223,208,184)]">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      placeholder="MM/YY"
                      value={paymentDetails.expiryDate}
                      onChange={(e) => setPaymentDetails({...paymentDetails, expiryDate: e.target.value})}
                      className="mt-1 bg-[rgb(57,62,70)] border-[rgb(136,136,136)] text-[rgb(223,208,184)] rounded-xl"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="cvc" className="text-[rgb(223,208,184)]">CVC</Label>
                    <Input
                      id="cvc"
                      placeholder="123"
                      value={paymentDetails.cvc}
                      onChange={(e) => setPaymentDetails({...paymentDetails, cvc: e.target.value})}
                      className="mt-1 bg-[rgb(57,62,70)] border-[rgb(136,136,136)] text-[rgb(223,208,184)] rounded-xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="rounded-lg shadow-sm p-6 sticky top-24 border border-[rgb(136,136,136)]" style={{ backgroundColor: 'rgb(34, 40, 49)' }}>
              <h2 className="text-xl font-semibold text-[rgb(223,208,184)] mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-[rgb(176,176,176)]">Subtotal</span>
                  <span className="font-medium text-[rgb(223,208,184)]">₹{subtotal}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-[rgb(176,176,176)]">Shipping</span>
                  <span className="font-medium text-[rgb(223,208,184)]">
                    {shipping === 0 ? 'Free' : `₹${shipping}`}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-[rgb(176,176,176)]">Tax (18%)</span>
                  <span className="font-medium text-[rgb(223,208,184)]">₹{tax}</span>
                </div>
                
                <div className="border-t border-[rgb(136,136,136)] pt-4">
                  <div className="flex justify-between">
                    <span className="text-xl font-semibold text-[rgb(223,208,184)]">Total</span>
                    <span className="text-xl font-semibold text-[rgb(223,208,184)]">₹{total}</span>
                  </div>
                </div>
              </div>

              <motion.div
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
              >
                <Button 
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full bg-[rgb(223,208,184)] text-[rgb(34,40,49)] hover:bg-[rgb(200,190,170)] py-3 mt-6 rounded-xl"
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[rgb(34,40,49)]"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    'Complete Purchase'
                  )}
                </Button>
              </motion.div>
              
              {shipping > 0 && (
                <p className="text-sm text-[rgb(176,176,176)] mt-4 text-center">
                  Add ₹{2000 - subtotal} more for free shipping
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;