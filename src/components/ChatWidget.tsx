'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronDown, Send, Mic } from 'lucide-react';
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

    setNewMessage('');
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
      {/* Chat Button - Enhanced with R.png image and consistent text */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-40 px-6 py-3 rounded-full shadow-lg flex items-center space-x-3 hover:bg-[rgba(105,117,101,0.2)] transition-colors"
        style={{ backgroundColor: 'rgba(105, 117, 101, 0.1)' }}
      >
        <div className="w-8 h-8 relative rounded-full overflow-hidden bg-[rgb(236,223,204)] flex items-center justify-center">
          {/* Use R.png image - same size always */}
          <img
            src="/R.png"
            alt="RARITONE Chat"
            className="w-6 h-6 object-contain"
          />
        </div>
        {/* Keep same text and size whether open or closed */}
        <span className="font-medium text-[rgb(236,223,204)]">
          Chat with us
        </span>
      </button>

      {/* Chat Modal - Fixed contrast issues */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-50 w-96 rounded-2xl shadow-2xl border border-[rgb(105,117,101)] overflow-hidden"
          style={{ backgroundColor: 'rgb(60, 61, 55)' }} // #3C3D37 bg
        >
          {/* Header - Clean background, no logo interference */}
          <div className="text-[rgb(236,223,204)] p-4 flex items-center justify-between" style={{ backgroundColor: 'rgb(24, 28, 20)' }}>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[rgb(236,223,204)] rounded-full flex items-center justify-center">
                <img
                  src="/R.png"
                  alt="RARITONE"
                  className="w-6 h-6 object-contain"
                />
              </div>
              <span className="font-medium">Chat with a client advisor</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 hover:bg-[rgb(60,61,55)] rounded transition-colors"
              >
                <ChevronDown 
                  size={16} 
                  className={`transform transition-transform ${isMinimized ? 'rotate-180' : ''}`}
                />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-[rgb(60,61,55)] rounded transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <div>
              {/* Guest Email Form */}
              {showEmailForm && !user && (
                <div className="p-4" style={{ backgroundColor: 'rgb(24, 28, 20)' }}>
                  <h4 className="font-medium mb-2 text-[rgb(236,223,204)]">Privacy Notice</h4>
                  <form onSubmit={handleGuestEmailSubmit} className="space-y-3">
                    <input
                      type="email"
                      placeholder="Email"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-[rgb(105,117,101)] rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(105,117,101)] text-[rgb(236,223,204)] placeholder-[rgb(105,117,101)]"
                      style={{ backgroundColor: 'rgb(60, 61, 55)' }}
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
                  <div className="h-64 overflow-y-auto p-4 space-y-3" style={{ backgroundColor: 'rgb(60, 61, 55)' }}>
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isAdmin ? 'justify-start' : 'justify-end'}`}
                      >
                        <div
                          className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                            message.isAdmin
                              ? 'bg-[rgb(24,28,20)] text-[rgb(236,223,204)] border border-[rgb(105,117,101)]'
                              : 'bg-[rgb(236,223,204)] text-[rgb(24,28,20)]'
                          }`}
                        >
                          {message.message}
                        </div>
                      </div>
                    ))}
                    
                    {/* Typing indicator */}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-[rgb(24,28,20)] text-[rgb(236,223,204)] px-3 py-2 rounded-lg text-sm border border-[rgb(105,117,101)]">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-[rgb(105,117,101)] rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-[rgb(105,117,101)] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-[rgb(105,117,101)] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-[rgb(105,117,101)]" style={{ backgroundColor: 'rgb(60, 61, 55)' }}>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1 px-3 py-2 border border-[rgb(105,117,101)] rounded-full focus:outline-none focus:ring-2 focus:ring-[rgb(105,117,101)] text-[rgb(236,223,204)] placeholder-[rgb(105,117,101)]"
                        style={{ backgroundColor: 'rgb(24, 28, 20)' }}
                      />
                      <button
                        onClick={handleSendMessage}
                        className="px-4 py-2 bg-[rgb(236,223,204)] text-[rgb(24,28,20)] rounded-full hover:bg-[rgb(220,210,190)] transition-colors"
                      >
                        <Send size={16} />
                      </button>
                      <button
                        className="px-4 py-2 bg-[rgb(24,28,20)] text-[rgb(236,223,204)] rounded-full hover:bg-[rgb(70,75,85)] border border-[rgb(105,117,101)] transition-colors"
                      >
                        <Mic size={16} />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ChatWidget;