import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Armchair } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle forgot password logic here
    setMessage(`Нууц үг сэргээх холбоосыг ${email} хаяг руу илгээлээ`);
  };

  return (
    <div className="min-h-full bg-orange-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Armchair className="mx-auto h-12 w-auto text-orange-600" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Нууц үг сэргээх
          </h2>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {message ? (
              <p className="text-green-600 text-center">{message}</p>
            ) : (
              <>
                <p className="text-center text-sm text-gray-600">
                  Бүртгэлтэй имэйл хаягаа оруулахад нууц үг сэргээх холбоос илгээх болно.
                </p>
                <input
                  type="email"
                  placeholder="Имэйл хаяг"
                  className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                  Илгээх
                </button>
              </>
            )}
          </form>
          <div className="text-center">
            <p className="text-sm text-gray-600">
              <Link to="/login" className="font-medium text-orange-600 hover:text-orange-500">
                Нэвтрэх хэсэг рүү буцах
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
