import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Bell, Shield, User, MapPin, Edit } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';

const Settings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: false,
    scanReminders: true
  });
  const [personalInfo, setPersonalInfo] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
    phone: ''
  });
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'Home',
      address: '123 Main St, Mumbai, Maharashtra 400001',
      isDefault: true,
      isEditing: false
    }
  ]);
  const [editingAddress, setEditingAddress] = useState<number | null>(null);

  const handleSavePersonalInfo = () => {
    // Implement save logic
    alert('Personal information updated successfully!');
  };

  const handleChangePassword = () => {
    // Implement password change logic
    alert('Password change functionality would be implemented here');
  };

  const handleEditAddress = (addressId: number) => {
    setEditingAddress(addressId);
    setAddresses(prev => prev.map(addr => 
      addr.id === addressId ? { ...addr, isEditing: true } : addr
    ));
  };

  const handleSaveAddress = (addressId: number) => {
    setEditingAddress(null);
    setAddresses(prev => prev.map(addr => 
      addr.id === addressId ? { ...addr, isEditing: false } : addr
    ));
    alert('Address updated successfully!');
  };

  const handleAddressChange = (addressId: number, newAddress: string) => {
    setAddresses(prev => prev.map(addr => 
      addr.id === addressId ? { ...addr, address: newAddress } : addr
    ));
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'rgb(60, 61, 55)' }}>
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: 'rgb(24, 28, 20)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Back Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-[rgb(60,61,55)] rounded-full transition-colors"
            >
              <ArrowLeft size={24} className="text-[rgb(236,223,204)]" />
            </motion.button>

            {/* Settings Title */}
            <h1 className="text-xl font-semibold text-[rgb(236,223,204)]">Settings</h1>

            {/* Spacer for balance */}
            <div className="w-10"></div>
          </div>
        </div>
      </div>

      <div className="pt-20 max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Personal Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg shadow-sm p-6 border border-[rgb(105,117,101)]"
            style={{ backgroundColor: 'rgb(24, 28, 20)' }}
          >
            <h2 className="text-xl font-semibold text-[rgb(236,223,204)] mb-4 flex items-center">
              <User className="mr-2" size={20} />
              Personal Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="name" className="text-[rgb(236,223,204)]">Full Name</Label>
                <Input
                  id="name"
                  value={personalInfo.name}
                  onChange={(e) => setPersonalInfo({...personalInfo, name: e.target.value})}
                  className="mt-1 bg-[rgb(60,61,55)] border-[rgb(105,117,101)] text-[rgb(236,223,204)]"
                />
              </div>
              
              <div>
                <Label htmlFor="email" className="text-[rgb(236,223,204)]">Email</Label>
                <Input
                  id="email"
                  value={personalInfo.email}
                  disabled
                  className="mt-1 bg-[rgb(60,61,55)] border-[rgb(105,117,101)] text-[rgb(236,223,204)]"
                />
              </div>
              
              <div>
                <Label htmlFor="phone" className="text-[rgb(236,223,204)]">Phone Number</Label>
                <Input
                  id="phone"
                  value={personalInfo.phone}
                  onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                  className="mt-1 bg-[rgb(60,61,55)] border-[rgb(105,117,101)] text-[rgb(236,223,204)]"
                />
              </div>
            </div>
            
            <div className="flex space-x-4">
              <Button onClick={handleSavePersonalInfo} className="bg-[rgb(236,223,204)] text-[rgb(24,28,20)] hover:bg-[rgb(220,210,190)]">
                Save Changes
              </Button>
              <Button onClick={handleChangePassword} variant="outline" className="border-[rgb(105,117,101)] text-[rgb(236,223,204)] hover:bg-[rgb(60,61,55)]">
                Change Password
              </Button>
            </div>
          </motion.div>

          {/* Delivery Addresses */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-lg shadow-sm p-6 border border-[rgb(105,117,101)]"
            style={{ backgroundColor: 'rgb(24, 28, 20)' }}
          >
            <h2 className="text-xl font-semibold text-[rgb(236,223,204)] mb-4 flex items-center">
              <MapPin className="mr-2" size={20} />
              Delivery Addresses
            </h2>
            
            <div className="space-y-4">
              {addresses.map((address) => (
                <div key={address.id} className="border border-[rgb(105,117,101)] rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-medium text-[rgb(236,223,204)]">{address.type}</span>
                        {address.isDefault && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                            Default
                          </span>
                        )}
                      </div>
                      {address.isEditing ? (
                        <div className="space-y-2">
                          <textarea
                            value={address.address}
                            onChange={(e) => handleAddressChange(address.id, e.target.value)}
                            className="w-full px-3 py-2 border border-[rgb(105,117,101)] rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(105,117,101)] bg-[rgb(60,61,55)] text-[rgb(236,223,204)]"
                            rows={3}
                          />
                          <div className="flex space-x-2">
                            <Button 
                              onClick={() => handleSaveAddress(address.id)}
                              size="sm" 
                              className="bg-[rgb(236,223,204)] text-[rgb(24,28,20)] hover:bg-[rgb(220,210,190)]"
                            >
                              Save
                            </Button>
                            <Button 
                              onClick={() => {
                                setEditingAddress(null);
                                setAddresses(prev => prev.map(addr => 
                                  addr.id === address.id ? { ...addr, isEditing: false } : addr
                                ));
                              }}
                              variant="outline" 
                              size="sm" 
                              className="border-[rgb(105,117,101)] text-[rgb(236,223,204)] hover:bg-[rgb(60,61,55)]"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-[rgb(105,117,101)] text-sm">{address.address}</p>
                      )}
                    </div>
                    {!address.isEditing && (
                      <Button 
                        onClick={() => handleEditAddress(address.id)}
                        variant="outline" 
                        size="sm" 
                        className="border-[rgb(105,117,101)] text-[rgb(236,223,204)] hover:bg-[rgb(60,61,55)] flex items-center space-x-1"
                      >
                        <Edit size={14} />
                        <span>Edit</span>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              
              <Button variant="outline" className="w-full border-[rgb(105,117,101)] text-[rgb(236,223,204)] hover:bg-[rgb(60,61,55)]">
                Add New Address
              </Button>
            </div>
          </motion.div>

          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-lg shadow-sm p-6 border border-[rgb(105,117,101)]"
            style={{ backgroundColor: 'rgb(24, 28, 20)' }}
          >
            <h2 className="text-xl font-semibold text-[rgb(236,223,204)] mb-4 flex items-center">
              <Bell className="mr-2" size={20} />
              Notification Preferences
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-[rgb(236,223,204)]">Order Updates</Label>
                  <p className="text-sm text-[rgb(105,117,101)]">Get notified about order status changes</p>
                </div>
                <Switch
                  checked={notifications.orderUpdates}
                  onCheckedChange={(checked) => setNotifications({...notifications, orderUpdates: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-[rgb(236,223,204)]">Promotions</Label>
                  <p className="text-sm text-[rgb(105,117,101)]">Receive promotional offers and discounts</p>
                </div>
                <Switch
                  checked={notifications.promotions}
                  onCheckedChange={(checked) => setNotifications({...notifications, promotions: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-[rgb(236,223,204)]">Scan Reminders</Label>
                  <p className="text-sm text-[rgb(105,117,101)]">Reminders to update your body scan</p>
                </div>
                <Switch
                  checked={notifications.scanReminders}
                  onCheckedChange={(checked) => setNotifications({...notifications, scanReminders: checked})}
                />
              </div>
            </div>
          </motion.div>

          {/* Privacy & Security */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-lg shadow-sm p-6 border border-[rgb(105,117,101)]"
            style={{ backgroundColor: 'rgb(24, 28, 20)' }}
          >
            <h2 className="text-xl font-semibold text-[rgb(236,223,204)] mb-4 flex items-center">
              <Shield className="mr-2" size={20} />
              Privacy & Security
            </h2>
            
            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start border-[rgb(105,117,101)] text-[rgb(236,223,204)] hover:bg-[rgb(60,61,55)]">
                Download My Data
              </Button>
              <Button variant="outline" className="w-full justify-start border-[rgb(105,117,101)] text-[rgb(236,223,204)] hover:bg-[rgb(60,61,55)]">
                Privacy Policy
              </Button>
              <Button variant="outline" className="w-full justify-start border-[rgb(105,117,101)] text-[rgb(236,223,204)] hover:bg-[rgb(60,61,55)]">
                Terms of Service
              </Button>
              <Button variant="destructive" className="w-full justify-start">
                Delete Account
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Settings;