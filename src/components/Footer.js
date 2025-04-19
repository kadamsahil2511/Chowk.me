import React from 'react';
import { Mail, Instagram, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <p className="text-xl font-medium">
              vocal for local
              <ArrowUpRight className="inline-block ml-1" size={18} />
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <a 
              href="mailto:contact@chowk.me" 
              className="text-white hover:text-gray-300 transition-colors" 
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
            <a 
              href="https://instagram.com/chowk.me" 
              className="text-white hover:text-gray-300 transition-colors" 
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
          </div>
          
          <div>
            <p className="text-xl font-medium">by atrey.dev</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;