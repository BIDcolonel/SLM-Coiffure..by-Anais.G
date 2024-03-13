import React, { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UserProfilePage from './pages/UserProfilePage';
import ReviewListPage from './pages/ReviewListPage';
import ReviewFormPage from './pages/ReviewFormPage';
import PrestationsPage from './pages/PrestationsPage';
import GalleryPage from './pages/GalleryPage';
import Reservation from './pages/Reservation';
import ContactInfo from './pages/ContactinfoPage';
import AdminPage from './pages/AdminPage';
import ContactInfoManagement from './pages/ContactInfoManagement';
import ServiceManagement from './pages/ServiceManagement';
import ReviewManagement from './pages/ReviewManagement';
import ClientManagement from './pages/ClientManagement';
import GalleryManagement from './pages/GalleryManagement';
import { AuthProvider } from './utils/AuthContext';

const apiUrl = process.env.REACT_APP_API_URL;

const App = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get(`${apiUrl}/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        setUser(response.data.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération du profil utilisateur :', error);
        handleLogout();
      })
      .finally(() => {
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData.user);
    localStorage.setItem('token', userData.token);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  if (isLoading) {
    return <div>Chargement en cours...</div>;
  }

  return (
    <Router>
      <div className="App">
        <Header user={user} onLogout={handleLogout} />
        <main>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/profile" element={<UserProfilePage user={user} />} />
            <Route path="/reviews" element={<ReviewListPage />} />
            <Route path="/reviews/new" element={<ReviewFormPage user={user}/>} />
            <Route path="/prestations" element={<PrestationsPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactInfo />} />
            <Route path="/reservation" element={<Reservation/>} />
            <Route path="/admin" element={<AdminPage/>} />
            <Route path="/admin/contactinfo" element={<ContactInfoManagement />} />
            <Route path="/admin/services" element={<ServiceManagement />} />
            <Route path="/admin/reviews" element={<ReviewManagement />} />
            <Route path="/admin/clients" element={<ClientManagement />} />
            <Route path="/admin/gallery" element={<GalleryManagement />} />
          </Routes>
        </AuthProvider>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
