"use client";
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#6366f1', '#10b981', '#f59e42', '#f43f5e', '#818cf8'];

const MOCK_ALLOC = [
  { label: 'Layer 1s', value: 1138000 },
  { label: 'DeFi', value: 811420 },
  { label: 'Stablecoins', value: 648135 },
  { label: 'Tokenized Assets', value: 486652 },
  { label: 'NFTs', value: 192277 },
];

export default MOCK_ALLOC;

type LabelProps = {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
};

function renderCustomizedLabel() {
  return null;
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: any[] }) {
  if (active && payload && payload.length > 0) {
    const { value, payload: data } = payload[0];
    return (
      <div className="rounded-lg shadow-lg bg-white px-4 py-3 border border-gray-200">
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[data.index % COLORS.length] }} />
          <span className="font-semibold text-gray-800">{data.label}</span>
        </div>
        <div className="text-gray-900 font-medium tabular-nums text-base">${value.toLocaleString()}</div>
        <div className="text-xs text-gray-500">{((value / MOCK_ALLOC.reduce((acc, cur) => acc + cur.value, 0)) * 100).toFixed(2)}% of portfolio</div>
      </div>
    );
  }
  return null;
}

export function AllocationBreakdown() {
  const total = MOCK_ALLOC.reduce((acc, cur) => acc + cur.value, 0);
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 flex flex-col gap-4 h-full justify-between">
      <h2 className="text-xl font-medium text-gray-800 tracking-tight text-left mb-2">Allocation Breakdown</h2>
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start w-full flex-1">
        <div className="flex flex-col items-center justify-center w-full md:w-32 h-32">
          <ResponsiveContainer width="100%" height={120}>
            <PieChart margin={{ top: 12, right: 6, left: 6, bottom: 12 }}>
              <Pie
                data={MOCK_ALLOC}
                dataKey="value"
                nameKey="label"
                cx="50%"
                cy="50%"
                outerRadius={44}
                innerRadius={24}
                labelLine={false}
                label={renderCustomizedLabel}
                isAnimationActive={false}
              >
                {MOCK_ALLOC.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 w-full flex flex-col justify-center">
          <ul className="space-y-2">
            {MOCK_ALLOC.map((a, idx) => (
              <li key={a.label} className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-2 text-gray-700 font-medium min-w-[110px]">
                  <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                  {a.label}
                </span>
                <span className="text-gray-900 tabular-nums text-right min-w-[92px]">${a.value.toLocaleString()}</span>
                <span className="text-gray-500 tabular-nums text-right min-w-[52px]">{((a.value / total) * 100).toFixed(1)}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
