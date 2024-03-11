import React from 'react';
import ClientManagement from './ClientManagement';
import ReviewManagement from './ReviewManagement';
import GalleryManagement from './GalleryManagement';
import ServiceManagement from './ServiceManagement';
import ContactInfoManagement from './ContactInfoManagement';

const AdminPages = () => {
  return (
    <div>
      <h1>Page d'administration</h1>
      {/* Sous-composants pour gérer chaque type de données */}
      <ClientManagement />
      <ReviewManagement />
      <GalleryManagement />
      <ServiceManagement />
      <ContactInfoManagement />
    </div>
  );
};

export default AdminPages;
