import React, { createContext, useState, useEffect, useCallback } from 'react';
import API from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await API.getMe();
        setUser(response.data.data);
      } catch (err) {
        // Token is invalid or expired
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = async (email, password) => {
    try {
      setError(null);
      const response = await API.login(email, password);
      localStorage.setItem('token', response.data.token);
      await fetchUser(); // Fetch user data after login
      return true;
    } catch (err) {
      setError("Нэвтрэхэд алдаа гарлаа. Таны нэр, нууц үг буруу байна.");
      return false;
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      const response = await API.register(userData);
      localStorage.setItem('token', response.data.token);
      await fetchUser(); // Fetch user data after registration
      return true;
    } catch (err) {
      setError("Бүртгүүлэхэд алдаа гарлаа. Дахин оролдоно уу.");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};