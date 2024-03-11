import React from 'react';
import ClientManagement from './ClientManagement';
import ReviewManagement from './ReviewManagement';
import GalleryManagement from './GalleryManagement';
import ServiceManagement from './ServiceManagement';
import ContactInfoManagement from './ContactInfoManagement';
import '../components/css/Admin.css';

const AdminPages = () => {
  return (
    <div className="admin-page-container">
      <div className="admin-page-header">
        <h1>Page d'administration</h1>
      </div>
      <div className="admin-content">
        {/* Sous-composants pour gérer chaque type de données */}
        <ClientManagement />
        <ReviewManagement />
        <GalleryManagement />
        <ServiceManagement />
        <ContactInfoManagement />
      </div>
    </div>
  );
};

export default AdminPages;
