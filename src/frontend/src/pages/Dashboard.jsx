import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Navbar />
      <div className="flex-grow mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <h1 className="text-5xl font-semibold tracking-tight text-white">Dashboard</h1>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;