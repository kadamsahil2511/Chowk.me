import React from 'react';
import { Mail, Instagram, Linkedin, GithubIcon, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex items-center mb-5">
            <span className="text-lg font-medium mr-1">vocal for local</span>
            <ArrowUpRight size={18} />
          </div>
          
          <div className="flex gap-6 mb-5">
            <a 
              href="#" 
              className="p-2 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors" 
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
            <a 
              href="#" 
              className="p-2 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors" 
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a 
              href="#" 
              className="p-2 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors" 
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="#" 
              className="p-2 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors" 
              aria-label="GitHub"
            >
              <GithubIcon size={20} />
            </a>
          </div>
          
          <div className="text-sm text-gray-400">
            made with ❤️ by <a href="#" className="text-gray-600 hover:text-black">atrey.dev</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;