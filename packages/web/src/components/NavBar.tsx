"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Insights', href: '/insights' },
  { label: 'Portfolio', href: '/portfolio' },
];

export default function NavBar() {
  const [active, setActive] = React.useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setActive(window.location.pathname);
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm w-full">
      <nav className="w-full px-4 sm:px-6 lg:px-8 flex items-center h-16">
        <div className="flex-1 flex items-center justify-start min-w-0">
          <span className="font-extrabold text-xl text-gray-900 tracking-tight drop-shadow-sm whitespace-nowrap">HighWater Protocol</span>
        </div>
        <ul className="flex-1 flex justify-center gap-2 md:gap-4 lg:gap-6 min-w-0">
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-150 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 hover:bg-gray-100 hover:text-blue-700 ${
                  active === link.href ? 'bg-gray-900 text-white shadow font-semibold' : 'text-gray-700'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex-1 flex items-center justify-end gap-4 min-w-0">
          <span className="text-xs text-gray-500 hidden md:inline">Carter Family Portfolio</span>
          <span className="text-xs text-gray-500 hidden md:inline">Logged in as James Carter</span>
          <div className="relative" ref={dropdownRef}>
            <button
              className="ml-2 flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setDropdownOpen((open) => !open)}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
            >
              <Cog6ToothIcon className="h-6 w-6 text-gray-600" />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-2">
                <a
                  href="/settings"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
                >
                  Settings
                </a>
                <button
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
                  onClick={() => alert('Logout logic goes here')}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
