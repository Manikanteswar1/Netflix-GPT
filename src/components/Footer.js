import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black bg-opacity-50 text-gray-400 py-6 px-4 text-center">
      <div className="max-w-6xl mx-auto">
        <p className="text-sm mb-2">
          © 2025 Netflix-GPT. All rights reserved.
        </p>
        <p className="text-sm">
          Developed by <a 
            href="https://github.com/Manikanteswar1" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-red-500 font-semibold hover:text-red-400 transition-colors underline"
          >
            Manikanta
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;