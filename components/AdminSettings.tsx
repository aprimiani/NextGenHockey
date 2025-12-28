import React from 'react';

// Admin settings have been disabled in favor of Google Sheets management.
const AdminSettings: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Admin Disabled</h2>
        <p className="text-gray-400">Please manage your league directly via the Google Sheet.</p>
      </div>
    </div>
  );
};

export default AdminSettings;