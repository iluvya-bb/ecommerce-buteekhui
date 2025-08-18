import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Armchair } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error: authError } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate('/profile');
    }
  };

  return (
    <div className="min-h-full bg-orange-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Armchair className="mx-auto h-12 w-auto text-orange-600" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Бүртгэлдээ нэвтрэх
          </h2>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {authError && <p className="text-red-500 text-center text-sm">{authError}</p>}
            <div>
              <label htmlFor="email" className="sr-only">Имэйл</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                placeholder="Имэйл хаяг"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Нууц үг</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                placeholder="Нууц үг"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-end">
              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-orange-600 hover:text-orange-500">
                  Нууц үгээ мартсан?
                </Link>
              </div>
            </div>

            <div>
              <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                Нэвтрэх
              </button>
            </div>
          </form>
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Бүртгэл байхгүй юу?{' '}
              <Link to="/register" className="font-medium text-orange-600 hover:text-orange-500">
                Шинээр бүртгүүлэх
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;