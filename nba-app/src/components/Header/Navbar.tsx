import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import NavLink from './NavLink';

const navLinks = [
  {
    title: 'Teams',
    path: '/',
    id: '1',
  },
  {
    title: 'Roster',
    path: '/roster',
    id: '2',
  },
  {
    title: 'Player Stats',
    path: '/player-stats',
    id: '3',
  },
  {
    title: 'Games',
    path: '/games',
    id: '4',
  },
  {
    title: 'Games stats',
    path: '/games-stats',
    id: '5',
  },
];
export const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-bgSecondary bg-opacity-100">
      <div className="flex flex-wrap items-center justify-between mx-auto px-4 py-2">
        <Link to="/" className="text-2xl md:text-5xl text-white font-semibold">
          <img src="/images/logo.png" alt="logo" height={100} width={100} />
        </Link>
        <div className="mobile-menu block md:hidden">
          {!navbarOpen ? (
            <button
              type="button"
              onClick={() => setNavbarOpen(true)}
              className="flex items-center px-3 py-2 border border-slate-200 text-slate-200 hover:text-white hover:border-white rounded"
            >
              <Bars3Icon className="h-5 w-5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setNavbarOpen(false)}
              className="flex items-center px-3 py-2 border border-slate-200 text-slate-200 hover:text-white hover:border-white rounded"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}
        </div>
        <div className="menu hidden md:block md:w-auto" id="navbar">
          <ul className="flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0">
            {navLinks.map((link) => (
              <li key={link.id}>
                <NavLink href={link.path} title={link.title} id={link.id} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      {navbarOpen ? (
        <ul className="flex flex-col py-4 items-center">
          {navLinks.map((link) => (
            <li key={link.id}>
              <NavLink href={link.path} title={link.title} id={link.id} />
            </li>
          ))}
        </ul>
      ) : null}
    </nav>
  );
};
