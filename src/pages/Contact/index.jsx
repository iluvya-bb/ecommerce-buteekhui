import React, { useContext } from 'react';
import { SettingsContext } from '../../context/SettingsContext';

const Contact = () => {
  const { settings } = useContext(SettingsContext);

  return (
    <div className="container mx-auto py-12 flex-grow">
      <h1 className="text-4xl font-bold text-center mb-8">Холбоо барих</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Бидэнтэй холбогдох</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-lg font-medium mb-2">Нэр</label>
              <input type="text" id="name" className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-lg font-medium mb-2">Имэйл</label>
              <input type="email" id="email" className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-lg font-medium mb-2">Зурвас</label>
              <textarea id="message" rows="5" className="w-full p-2 border rounded"></textarea>
            </div>
            <button type="submit" className="bg-blue-500 text-white px-6 py-3 rounded-lg">Илгээх</button>
          </form>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Манай хаяг</h2>
          <p className="mb-4">{settings.address}</p>
          <p className="mb-4">Утас: {settings.contactPhoneNumber}</p>
          <p className="mb-4">Имэйл: {settings.contactEmail}</p>
          <div className="w-full h-64 bg-gray-300 rounded-lg">
            <iframe
              src={`https://www.google.com/maps/embed?pb=${settings.googleCoordinates}`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
