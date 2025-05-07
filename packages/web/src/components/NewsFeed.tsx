"use client";

import React, { useState } from 'react';
import { BookmarkIcon } from '@heroicons/react/24/outline';
import { NEWS } from '../data/mockDashboard';

export default function NewsFeed() {
  const [showAll, setShowAll] = useState(false);
  const [filter, setFilter] = useState('All');
  const VISIBLE_NEWS = 5;

  // Filter logic
  const filteredNews = filter === 'All' ? NEWS : NEWS.filter(n => n.tag === filter);

  return (
    <div className="flex-1 bg-white rounded-lg shadow-lg border border-gray-200 p-6 space-y-4 flex flex-col h-full justify-between min-w-0 max-w-full relative">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-medium text-gray-800">News & Regulatory Feed</h2>
        <div className="flex space-x-2">
          {['All', 'US', 'International', 'Portfolio'].map((f) => (
            <button
              key={f}
              className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      <ul className="space-y-4 flex-1 overflow-auto">
        {(showAll ? filteredNews : filteredNews.slice(0, 10)).map((n) => (
          <li key={n.headline} className="relative bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <BookmarkIcon className="absolute top-0 right-0 h-5 w-5 text-gray-300 hover:text-gray-500 cursor-pointer" />
            <h3 className="text-base font-medium text-gray-700">{n.headline}</h3>
            <div className="mt-1 flex items-center justify-between text-xs text-gray-500">
              <span>{n.source}</span>
              <span>{n.time}</span>
            </div>
            <span className="mt-1 inline-block text-xs font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
              {n.tag}
            </span>
          </li>
        ))}
      </ul>
      <div className="text-center pt-0">
        <button
          className="text-sm font-medium text-blue-600 hover:underline focus:outline-none"
          onClick={() => setShowAll(true)}
        >
          See more news &rarr;
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
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">All News & Regulatory Feed</h2>
            <ul className="space-y-4 overflow-y-auto pr-2 flex-1">
              {NEWS.map((n) => (
                <li key={n.headline} className="relative bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                  <BookmarkIcon className="absolute top-0 right-0 h-5 w-5 text-gray-300 hover:text-gray-500 cursor-pointer" />
                  <h3 className="text-base font-medium text-gray-700">{n.headline}</h3>
                  <div className="mt-1 flex items-center justify-between text-xs text-gray-500">
                    <span>{n.source}</span>
                    <span>{n.time}</span>
                  </div>
                  <span className="mt-1 inline-block text-xs font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                    {n.tag}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
