"use client";
import React, { useState } from 'react';
import { ALERTS } from '../data/mockDashboard';

export default function Alerts() {
  const [showAll, setShowAll] = useState(false);
  const VISIBLE_ALERTS = 8;

  return (
    <div className="flex-1 bg-white rounded-lg shadow-lg border border-gray-200 p-6 space-y-4 flex flex-col h-full justify-between min-w-0 max-w-full relative">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-medium text-gray-800">Portfolio-Specific Alerts</h2>
        <span className="text-sm font-medium text-gray-500">{ALERTS.length} High Priority</span>
      </div>
      <ul className="space-y-4 flex-1 overflow-auto">
        {(showAll ? ALERTS : ALERTS.slice(0, VISIBLE_ALERTS)).map((a, i) => (
          <li key={i} className="pl-4 border-l-4 border-yellow-400 transition rounded-md shadow-sm">
            <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>{a.title}
            </h3>
            <p className="mt-1 text-sm text-gray-700">{a.desc}</p>
            <div className="mt-2 flex justify-between text-xs text-gray-500">
              <span>{a.time}</span>
              <span className="font-semibold text-amber-700">{a.action}</span>
            </div>
          </li>
        ))}
      </ul>
      <div className="text-center">
        <button
          className="text-sm font-medium text-blue-600 hover:underline focus:outline-none"
          onClick={() => setShowAll(true)}
        >
          View all alerts &rarr;
        </button>
      </div>
      {showAll && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-2xl p-10 relative animate-fade-in flex flex-col max-h-[90vh]">
            <button
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 text-3xl font-bold"
              onClick={() => setShowAll(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">All Portfolio Alerts</h2>
            <ul className="space-y-4 overflow-y-auto pr-2 flex-1">
              {ALERTS.map((a, i) => (
                <li key={i} className="pl-4 border-l-4 border-yellow-400 transition rounded-md shadow-sm">
                  <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>{a.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-700">{a.desc}</p>
                  <div className="mt-2 flex justify-between text-xs text-gray-500">
                    <span>{a.time}</span>
                    <span className="font-semibold text-amber-700">{a.action}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
