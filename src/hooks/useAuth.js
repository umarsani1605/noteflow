import { useState, useEffect } from 'react';
import { addUser, getUserByEmail } from '../utils/user-data';

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('user') !== null;
  });

  const register = async ({ name, email, password }) => {
    try {
      const newUser = addUser({ name, email, password });
      
      const userData = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      };
      
      localStorage.setItem('user', JSON.stringify(userData));

      setIsLoggedIn(true);
      setError(null);
      
      return { success: true, user: userData };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };
  
  const login = ({ email, password }) => {
    try {
      const user = getUserByEmail(email);
      
      if (!user) {
        throw new Error('User not found');
      }

      if (user.password !== password) {
        throw new Error('Invalid password');
      }

      // Store user data without password
      const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      setIsLoggedIn(true);
      setError(null);
      return { success: true, user: userData };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  const getCurrentUser = () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  };
  
  return {
    isLoggedIn,
    register,
    login,
    logout,
    user: getCurrentUser()
  };
}