import React from 'react';
import { motion } from 'framer-motion';

export const Button = ({ children, isLoading, variant = 'primary', className, ...props }) => {
  const baseStyles = "w-full py-3 px-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary-600 to-primary-500 hover:to-primary-400 text-white shadow-primary-500/30",
    outline: "bg-white/40 border-2 border-primary-500 text-primary-700 hover:bg-primary-50 backdrop-blur-md",
  };

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : children}
    </motion.button>
  );
};
