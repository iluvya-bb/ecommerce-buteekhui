import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <div className="bg-white py-24">
      <div className="container mx-auto text-center">
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100, duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl font-bold mb-4 text-primary drop-shadow-lg"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100, duration: 0.8, delay: 0.1 }}
          >
            Сургалтын орчныг тань тохижуулна
          </motion.h1>
          <motion.p 
            className="text-lg mb-8 text-text-light drop-shadow-md"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100, duration: 0.8, delay: 0.2 }}
          >
            Чанартай, загварлаг тавилгыг бид санал болгож байна.
          </motion.p>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100, duration: 0.8, delay: 0.4 }}
          >
            <Link to={`/products`}>
              <button className="bg-accent text-primary-dark font-bold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl active:shadow-inner">
                Дэлгүүр хэсэх
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;