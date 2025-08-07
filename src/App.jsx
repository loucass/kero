import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/common/Header';
import Login from './pages/Login';
import SignupPage from './pages/SignupPage';
import LandingPage from './pages/Landing';
import NormalUserDashboard from './pages/NormalUserDashboard';
import MarketingUserDashboard from './pages/MarketingUserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import {useAuth} from './hooks/useAuth';
import {useLocalStorage} from './hooks/useLocalStorage';

function App() {
  const [user, setUser] = useState(null);
  const [storedUser] = useLocalStorage('user', null);
  
  useEffect(() => {
    if (storedUser) {
      setUser(storedUser);
    }
  }, [storedUser]);

  const { login, _ } = useAuth();

  const handleLogin = (userData) => {
    login(userData);
    setUser(userData);
  };


  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route 
                path="/normal" 
                element={user?.role === 'normal' ? <NormalUserDashboard /> : <Navigate to="/" />} 
              />
              <Route 
                path="/marketing" 
                element={user?.role === 'marketing' ? <MarketingUserDashboard /> : <Navigate to="/" />} 
              />
              <Route 
                path="/admin" 
                element={user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/" />} 
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;