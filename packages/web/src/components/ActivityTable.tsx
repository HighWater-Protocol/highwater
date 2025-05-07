"use client";
import React from 'react';

const EXCHANGES = ['Coinbase', 'Gemini', 'Kraken', 'Binance', 'Photon'];
const ASSETS = ['BTC', 'ETH', 'SOL', 'USDC', 'AVAX', 'ADA', 'DOGE', 'DOT', 'MATIC', 'XRP'];
const TYPES = ['Buy', 'Sell', 'Deposit', 'Withdraw', 'Transfer In', 'Transfer Out'];
const YEARS = ['2023', '2024', '2025'];

function generateMockActivity(n: number): any[] {
  const arr = [];
  for (let i = 0; i < n; ++i) {
    const year = YEARS[Math.floor(Math.random() * YEARS.length)];
    const month = (Math.floor(Math.random() * 12) + 1).toString().padStart(2, '0');
    const day = (Math.floor(Math.random() * 28) + 1).toString().padStart(2, '0');
    const date = `${year}-${month}-${day}`;
    const asset = ASSETS[Math.floor(Math.random() * ASSETS.length)];
    const type = TYPES[Math.floor(Math.random() * TYPES.length)];
    const amount = +(Math.random() * 1000).toFixed(2);
    const price = +(Math.random() * 70000 + 0.01).toFixed(2);
    const value = +(amount * price).toFixed(2);
    const status = 'Completed';
    const exchange = EXCHANGES[Math.floor(Math.random() * EXCHANGES.length)];
    arr.push({ date, asset, type, amount, price, value, status, exchange });
  }
  return arr;
}

const INITIAL_ACTIVITY = [
  { date: '2025-05-01', asset: 'BTC', type: 'Buy', amount: 0.25, price: 65000, value: 16250, status: 'Completed', exchange: 'Coinbase' },
  { date: '2025-04-29', asset: 'ETH', type: 'Sell', amount: 2, price: 3200, value: 6400, status: 'Completed', exchange: 'Gemini' },
  { date: '2025-04-28', asset: 'SOL', type: 'Transfer In', amount: 100, price: 16, value: 1600, status: 'Completed', exchange: 'Kraken' },
  { date: '2025-04-27', asset: 'USDC', type: 'Deposit', amount: 5000, price: 1, value: 5000, status: 'Completed', exchange: 'Binance' },
  { date: '2025-04-26', asset: 'AVAX', type: 'Withdraw', amount: 50, price: 35, value: 1750, status: 'Completed', exchange: 'Photon' },
  { date: '2025-04-25', asset: 'BTC', type: 'Transfer Out', amount: 0.1, price: 66000, value: 6600, status: 'Completed', exchange: 'Coinbase' },
  { date: '2024-12-12', asset: 'ADA', type: 'Buy', amount: 1000, price: 0.4, value: 400, status: 'Completed', exchange: 'Gemini' },
  { date: '2024-11-30', asset: 'DOGE', type: 'Sell', amount: 500, price: 0.08, value: 40, status: 'Completed', exchange: 'Kraken' },
  { date: '2024-10-15', asset: 'DOT', type: 'Deposit', amount: 200, price: 5, value: 1000, status: 'Completed', exchange: 'Binance' },
  { date: '2024-09-22', asset: 'MATIC', type: 'Withdraw', amount: 300, price: 1.2, value: 360, status: 'Completed', exchange: 'Photon' },
  { date: '2024-08-05', asset: 'XRP', type: 'Transfer In', amount: 800, price: 0.6, value: 480, status: 'Completed', exchange: 'Coinbase' },
  { date: '2024-07-19', asset: 'BTC', type: 'Transfer Out', amount: 0.15, price: 64000, value: 9600, status: 'Completed', exchange: 'Gemini' },
  { date: '2023-06-01', asset: 'ETH', type: 'Buy', amount: 5, price: 2900, value: 14500, status: 'Completed', exchange: 'Kraken' },
  { date: '2023-05-11', asset: 'SOL', type: 'Sell', amount: 150, price: 22, value: 3300, status: 'Completed', exchange: 'Binance' },
  { date: '2023-04-20', asset: 'USDC', type: 'Deposit', amount: 7000, price: 1, value: 7000, status: 'Completed', exchange: 'Photon' },
  { date: '2023-03-30', asset: 'AVAX', type: 'Withdraw', amount: 80, price: 28, value: 2240, status: 'Completed', exchange: 'Coinbase' },
  { date: '2023-02-14', asset: 'ADA', type: 'Transfer In', amount: 1200, price: 0.38, value: 456, status: 'Completed', exchange: 'Gemini' },
  { date: '2023-01-25', asset: 'DOGE', type: 'Transfer Out', amount: 900, price: 0.07, value: 63, status: 'Completed', exchange: 'Kraken' },
  { date: '2023-01-10', asset: 'DOT', type: 'Buy', amount: 350, price: 4.5, value: 1575, status: 'Completed', exchange: 'Binance' },
  { date: '2023-01-02', asset: 'MATIC', type: 'Sell', amount: 600, price: 1.1, value: 660, status: 'Completed', exchange: 'Photon' },
];

export default function ActivityTable() {
  const [sortBy, setSortBy] = React.useState<'year'|'type'|'asset'|'exchange'>('year');
  const [sortDir, setSortDir] = React.useState<'asc'|'desc'>('desc');
  const [activity, setActivity] = React.useState<any[]>(INITIAL_ACTIVITY);

  const sorted = React.useMemo(() => {
    let arr = [...activity];
    if (sortBy === 'year') {
      arr.sort((a, b) => (sortDir === 'asc' ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date)));
    } else if (sortBy === 'type') {
      arr.sort((a, b) => (sortDir === 'asc' ? a.type.localeCompare(b.type) : b.type.localeCompare(a.type)));
    } else if (sortBy === 'asset') {
      arr.sort((a, b) => (sortDir === 'asc' ? a.asset.localeCompare(b.asset) : b.asset.localeCompare(a.asset)));
    } else if (sortBy === 'exchange') {
      arr.sort((a, b) => (sortDir === 'asc' ? a.exchange.localeCompare(b.exchange) : b.exchange.localeCompare(a.exchange)));
    }
    return arr;
  }, [activity, sortBy, sortDir]);

  function handleSeeMore() {
    setActivity(prev => [...prev, ...generateMockActivity(20)]);
  }

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 flex flex-col h-full justify-between">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
        <h2 className="text-xl font-medium text-gray-800">Activity</h2>
        <div className="flex gap-2 items-center">
          <span className="text-sm text-black font-medium">Sort by:</span>
          <select
            className="border rounded px-2 py-1 text-sm text-black"
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
          >
            <option value="year">Year</option>
            <option value="type">Type</option>
            <option value="asset">Asset</option>
            <option value="exchange">Exchange</option>
          </select>
          <button
            className="text-gray-500 hover:text-gray-800 px-1"
            onClick={() => setSortDir(d => d === 'asc' ? 'desc' : 'asc')}
            title={sortDir === 'asc' ? 'Ascending' : 'Descending'}
          >
            {sortDir === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] text-sm text-left">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="py-2 font-semibold">Date</th>
              <th className="py-2 font-semibold">Asset</th>
              <th className="py-2 font-semibold">Type</th>
              <th className="py-2 font-semibold">Amount</th>
              <th className="py-2 font-semibold">Price</th>
              <th className="py-2 font-semibold">Value</th>
              <th className="py-2 font-semibold">Exchange</th>
              <th className="py-2 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((t, idx) => (
              <tr key={idx} className="border-b last:border-none">
                <td className="py-2 font-medium text-gray-700 align-middle whitespace-nowrap">{t.date}</td>
                <td className="py-2 text-gray-700 align-middle whitespace-nowrap">{t.asset}</td>
                <td className="py-2 text-gray-700 align-middle whitespace-nowrap">{t.type}</td>
                <td className="py-2 text-gray-900 align-middle whitespace-nowrap">{t.amount}</td>
                <td className="py-2 text-gray-900 align-middle whitespace-nowrap">${t.price.toLocaleString()}</td>
                <td className="py-2 text-gray-900 align-middle whitespace-nowrap">${t.value.toLocaleString()}</td>
                <td className="py-2 text-gray-900 align-middle whitespace-nowrap">{t.exchange}</td>
                <td className={`py-2 align-middle whitespace-nowrap font-semibold ${t.status === 'Completed' ? 'text-green-600' : 'text-gray-600'}`}>{t.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-full pt-4 flex justify-center">
        <span className="text-gray-500 text-sm font-medium cursor-pointer hover:underline" onClick={handleSeeMore}>See more</span>
      </div>
    </div>
  );
}
