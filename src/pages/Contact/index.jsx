import React, { useContext, useState } from 'react';
import { SettingsContext } from '../../context/SettingsContext';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import API from '../../services/api';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const Contact = () => {
  const { settings } = useContext(SettingsContext);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await API.createContact(formData);
      setSuccess('Таны зурвасыг амжилттай илгээлээ.');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setError('Зурвас илгээхэд алдаа гарлаа. Дахин оролдоно уу.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-secondary py-16">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-primary">Холбоо барих</h1>
          <p className="text-text-light mt-2">Асуух зүйл байна уу? Бидэнтэй холбогдоорой.</p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Contact Form */}
          <motion.div 
            className="p-8 rounded-2xl neumorphic-outer bg-secondary"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-bold mb-6 text-primary">Бидэнтэй холбогдох</h2>
            <form onSubmit={handleSubmit}>
              <motion.div className="mb-4" variants={itemVariants}>
                <label htmlFor="name" className="block text-sm font-medium text-text mb-1">Нэр</label>
                <input type="text" id="name" value={formData.name} onChange={handleInputChange} required placeholder="Таны нэр" className="w-full p-3 rounded-lg bg-secondary neumorphic-inner" />
              </motion.div>
              <motion.div className="mb-4" variants={itemVariants}>
                <label htmlFor="email" className="block text-sm font-medium text-text mb-1">Имэйл</label>
                <input type="email" id="email" value={formData.email} onChange={handleInputChange} required placeholder="email@example.com" className="w-full p-3 rounded-lg bg-secondary neumorphic-inner" />
              </motion.div>
              <motion.div className="mb-4" variants={itemVariants}>
                <label htmlFor="message" className="block text-sm font-medium text-text mb-1">Зурвас</label>
                <textarea id="message" rows="5" value={formData.message} onChange={handleInputChange} required placeholder="Таны санал хүсэлт..." className="w-full p-3 rounded-lg bg-secondary neumorphic-inner"></textarea>
              </motion.div>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
              <motion.button 
                type="submit" 
                disabled={loading}
                className="w-full bg-accent text-primary-dark font-bold py-3 rounded-lg neumorphic-outer active:neumorphic-inner transition-all disabled:opacity-50"
                variants={itemVariants}
              >
                {loading ? 'Илгээж байна...' : 'Илгээх'}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Details & Map */}
          <motion.div 
            className="p-8 rounded-2xl neumorphic-outer bg-secondary"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-bold mb-6 text-primary">Манай хаяг</h2>
            <motion.div className="space-y-6 text-text" variants={containerVariants}>
              <motion.div className="flex items-start gap-4" variants={itemVariants}>
                <MapPin className="text-accent w-6 h-6 mt-1 flex-shrink-0"/>
                <div>
                  <h3 className="font-semibold">Хаяг</h3>
                  <p className="text-text-light">{settings.address}</p>
                </div>
              </motion.div>
              <motion.div className="flex items-start gap-4" variants={itemVariants}>
                <Phone className="text-accent w-6 h-6 mt-1 flex-shrink-0"/>
                <div>
                  <h3 className="font-semibold">Утас</h3>
                  <a href={`tel:${settings.contactPhoneNumber}`} className="text-text-light hover:text-accent transition-colors">{settings.contactPhoneNumber}</a>
                </div>
              </motion.div>
              <motion.div className="flex items-start gap-4" variants={itemVariants}>
                <Mail className="text-accent w-6 h-6 mt-1 flex-shrink-0"/>
                <div>
                  <h3 className="font-semibold">Имэйл</h3>
                  <a href={`mailto:${settings.contactEmail}`} className="text-text-light hover:text-accent transition-colors">{settings.contactEmail}</a>
                </div>
              </motion.div>
            </motion.div>
            <motion.div 
              className="w-full h-64 mt-8 rounded-2xl neumorphic-inner overflow-hidden"
              variants={itemVariants}
            >
              <iframe
                src={`https://www.google.com/maps/embed?pb=${settings.googleCoordinates}`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
