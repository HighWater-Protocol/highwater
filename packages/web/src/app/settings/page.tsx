"use client";
import React from 'react';
import NavBar from '../../components/NavBar';

export default function SettingsPage() {
  return (
    <>
      <NavBar />
      <main className="min-h-[calc(100vh-64px)] bg-gray-50 py-10 px-4 flex flex-col items-center">
        <div className="w-full max-w-3xl">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 space-y-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Settings</h1>
            <section>
              <h2 className="text-xl font-medium text-gray-800 mb-2">Profile</h2>
              <div className="flex flex-col gap-4">
                <label className="block">
                  <span className="text-gray-700">Name</span>
                  <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" placeholder="Your Name" />
                </label>
                <label className="block">
                  <span className="text-gray-700">Email</span>
                  <input type="email" className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" placeholder="you@example.com" />
                </label>
              </div>
            </section>
            <section>
              <h2 className="text-xl font-medium text-gray-800 mb-2">Preferences</h2>
              <div className="flex flex-col gap-4">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="form-checkbox rounded text-indigo-600" />
                  <span className="text-gray-700">Enable dark mode</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="form-checkbox rounded text-indigo-600" />
                  <span className="text-gray-700">Receive email notifications</span>
                </label>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
