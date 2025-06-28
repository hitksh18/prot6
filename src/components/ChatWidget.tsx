'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, ChevronDown, Send, Mic } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { sendMessage, fetchMessages, sendGuestMessage, ChatMessage } from '@/lib/chat';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  // Welcome message
  const welcomeMessage = "Hi there! How can I assist you today in finding the perfect fit?";

  useEffect(() => {
    if (user && isOpen) {
      const unsubscribe = fetchMessages(user.uid, (msgs) => {
        setMessages(msgs);
      });
      return unsubscribe;
    }
  }, [user, isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add welcome message
      setMessages([{
        id: 'welcome',
        userId: 'assistant',
        message: welcomeMessage,
        timestamp: new Date(),
        isAdmin: true
      }]);
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const simulateTyping = () => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      // Add a response message
      const responses = [
        "I'd be happy to help you find the perfect outfit!",
        "Let me assist you with your fashion needs.",
        "What style are you looking for today?",
        "I can help you with sizing, styling, or product recommendations."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        userId: 'assistant',
        message: randomResponse,
        timestamp: new Date(),
        isAdmin: true
      }]);
    }, 1500);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      userId: user?.uid || guestEmail,
      message: newMessage,
      timestamp: new Date(),
      isAdmin: false
    };

    setMessages(prev => [...prev, userMessage]);

    if (user) {
      await sendMessage(user.uid, newMessage);
    } else if (guestEmail) {
      await sendGuestMessage(guestEmail, newMessage);
    }

    setNewMessage(''); // Clear the input
    simulateTyping();
  };

  const handleGuestEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (guestEmail.trim()) {
      setShowEmailForm(false);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!user && !isOpen) {
      setShowEmailForm(true);
    }
  };

  return (
    <>
      {/* Chat Button - Enhanced toggle functionality */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-40 frosted-glass px-6 py-3 rounded-full shadow-lg flex items-center space-x-3 hover:bg-[rgba(105,117,101,0.2)] transition-all duration-300"
        style={{ backgroundColor: 'rgba(105, 117, 101, 0.1)' }}
      >
        <div className="w-8 h-8 relative rounded-full overflow-hidden bg-[rgb(236,223,204)] flex items-center justify-center">
          {isOpen ? (
            <X size={16} className="text-[rgb(24,28,20)]" />
          ) : (
            <MessageCircle size={16} className="text-[rgb(24,28,20)]" />
          )}
        </div>
        <span className="font-medium text-[rgb(236,223,204)]">
          {isOpen ? 'Close Chat' : 'Chat with us'}
        </span>
      </motion.button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-96 rounded-2xl shadow-2xl border border-[rgb(105,117,101)] overflow-hidden"
            style={{ backgroundColor: 'rgb(24, 28, 20)' }}
          >
            {/* Header - Removed background logo */}
            <div className="text-[rgb(236,223,204)] p-4 flex items-center justify-between" style={{ backgroundColor: 'rgb(60, 61, 55)' }}>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[rgb(236,223,204)] rounded-full flex items-center justify-center">
                  <MessageCircle size={16} className="text-[rgb(24,28,20)]" />
                </div>
                <span className="font-medium">Chat with a client advisor</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 hover:bg-[rgb(24,28,20)] rounded transition-colors"
                >
                  <ChevronDown 
                    size={16} 
                    className={`transform transition-transform ${isMinimized ? 'rotate-180' : ''}`}
                  />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-[rgb(24,28,20)] rounded transition-colors"
                >
                  <X size={16} />
                </motion.button>
              </div>
            </div>

            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="overflow-hidden"
                >
                  {/* Guest Email Form */}
                  {showEmailForm && !user && (
                    <div className="p-4" style={{ backgroundColor: 'rgb(60, 61, 55)' }}>
                      <h4 className="font-medium mb-2 text-[rgb(236,223,204)]">Privacy Notice</h4>
                      <form onSubmit={handleGuestEmailSubmit} className="space-y-3">
                        <input
                          type="email"
                          placeholder="Email"
                          value={guestEmail}
                          onChange={(e) => setGuestEmail(e.target.value)}
                          className="w-full px-3 py-2 border border-[rgb(105,117,101)] rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(105,117,101)] text-[rgb(236,223,204)] placeholder-[rgb(105,117,101)]"
                          style={{ backgroundColor: 'rgb(24, 28, 20)' }}
                          required
                        />
                        <p className="text-xs text-[rgb(105,117,101)]">
                          Your personal data is collected in the course of providing remote chat assistance and will be processed in full compliance with our privacy policy.
                        </p>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="accept" required className="rounded" />
                          <label htmlFor="accept" className="text-xs text-[rgb(105,117,101)]">I accept</label>
                        </div>
                        <button
                          type="submit"
                          className="w-full bg-[rgb(236,223,204)] text-[rgb(24,28,20)] py-2 rounded-md hover:bg-[rgb(220,210,190)] transition-colors"
                        >
                          Start chat
                        </button>
                      </form>
                    </div>
                  )}

                  {/* Chat Messages */}
                  {(user || (!showEmailForm && guestEmail)) && (
                    <>
                      <div className="h-64 overflow-y-auto p-4 space-y-3" style={{ backgroundColor: 'rgb(24, 28, 20)' }}>
                        {messages.map((message) => (
                          <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${message.isAdmin ? 'justify-start' : 'justify-end'}`}
                          >
                            <div
                              className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                                message.isAdmin
                                  ? 'bg-[rgb(60,61,55)] text-[rgb(236,223,204)] border border-[rgb(105,117,101)]'
                                  : 'bg-[rgb(236,223,204)] text-[rgb(24,28,20)]'
                              }`}
                            >
                              {message.message}
                            </div>
                          </motion.div>
                        ))}
                        
                        {/* Typing indicator */}
                        {isTyping && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex justify-start"
                          >
                            <div className="bg-[rgb(60,61,55)] text-[rgb(236,223,204)] px-3 py-2 rounded-lg text-sm border border-[rgb(105,117,101)]">
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-[rgb(105,117,101)] rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-[rgb(105,117,101)] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                <div className="w-2 h-2 bg-[rgb(105,117,101)] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                        
                        <div ref={messagesEndRef} />
                      </div>

                      {/* Message Input */}
                      <div className="p-4 border-t border-[rgb(105,117,101)]" style={{ backgroundColor: 'rgb(24, 28, 20)' }}>
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            placeholder="Type your message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            className="flex-1 px-3 py-2 border border-[rgb(105,117,101)] rounded-full focus:outline-none focus:ring-2 focus:ring-[rgb(105,117,101)] text-[rgb(236,223,204)] placeholder-[rgb(105,117,101)]"
                            style={{ backgroundColor: 'rgb(60, 61, 55)' }}
                          />
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleSendMessage}
                            className="px-4 py-2 bg-[rgb(236,223,204)] text-[rgb(24,28,20)] rounded-full hover:bg-[rgb(220,210,190)] transition-colors"
                          >
                            <Send size={16} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="px-4 py-2 bg-[rgb(60,61,55)] text-[rgb(236,223,204)] rounded-full hover:bg-[rgb(70,75,85)] transition-colors border border-[rgb(105,117,101)]"
                          >
                            <Mic size={16} />
                          </motion.button>
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;