import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../../components/Header/Navbar';

export const Overview = () => (
  <main className="flex min-h-screen flex-col bg-[#0d0d0d]">
    <Navbar />
    <div className="rounded flex sm:flex-col md:flex-col xl:flex-row">
      <div className="bg-[#0d0d0d] p-10 mt-20 mb-10 w-full">
        <Outlet />
      </div>
    </div>
  </main>
);
