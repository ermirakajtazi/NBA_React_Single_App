import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../../components/Header/Navbar';

export const Overview = () => (
  <main className="flex min-h-screen flex-col bg-bgOverview">
    <Navbar />
    <div className="rounded flex sm:flex-col md:flex-col xl:flex-row">
      <div className="bg-bgOverview p-10 mt-20 mb-10 w-full">
        <Outlet />
      </div>
    </div>
  </main>
);
