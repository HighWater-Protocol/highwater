"use client";
import React from 'react';
import Link from 'next/link';
import { useUser } from '../contexts/AuthContext';

export default function AuthNav() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <span className="text-gray-500">Loading...</span>;
  }

  if (!user) {
    return (
      <Link href="/api/auth/login" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 font-semibold">Log In</Link>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <span className="text-gray-700 font-medium">{user.name || user.email}</span>
      <Link href="/api/auth/logout" className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 font-semibold">Log Out</Link>
      <Link href="/settings" className="px-3 py-2 text-sm rounded bg-gray-100 hover:bg-gray-200 font-medium">Settings</Link>
    </div>
  );
}
