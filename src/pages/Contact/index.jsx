import React from 'react';

const Contact = () => {
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
          <p className="mb-4">Улаанбаатар хот, Сүхбаатар дүүрэг, 8-р хороо, Оюутны гудамж, 1-101</p>
          <p className="mb-4">Утас: 7712-3456</p>
          <p className="mb-4">Имэйл: contact@buteekhui.com</p>
          <div className="w-full h-64 bg-gray-300 rounded-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2672.893337399158!2d106.9172342156425!3d47.91874567920654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d96924f5e7c6f3b%3A0x3f1f5b3d3e3e3e3e!2sSukhbaatar%20Square!5e0!3m2!1sen!2smn!4v1628509359292!5m2!1sen!2smn"
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
