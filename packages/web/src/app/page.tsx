// packages/web/app/page.tsx
import React from 'react';

async function getHealth() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/health`,
    { cache: 'no-store' }    // always re‐fetch on each request
  );
  if (!res.ok) {
    throw new Error(`Health check failed: ${res.statusText}`);
  }
  return res.json() as Promise<{ status: string; timestamp: string }>;
}

export default async function Home() {
  let health: { status: string; timestamp: string };

  try {
    health = await getHealth();
  } catch (err: any) {
    health = { status: 'error', timestamp: err.message };
  }

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">HighWater Protocol</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">API Health Check</h2>
        <div className="bg-white shadow rounded p-4">
          <p>
            <strong>Status:</strong> {health.status}
          </p>
          <p>
            <strong>Timestamp:</strong> {health.timestamp}
          </p>
        </div>
      </section>

      {/* …your other UI modules… */}
    </main>
  );
}
