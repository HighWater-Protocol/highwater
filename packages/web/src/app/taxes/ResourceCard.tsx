import React from "react";

interface ResourceCardProps {
  title: string;
  description: string;
  url: string;
}

export default function ResourceCard({ title, description, url }: ResourceCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 shadow-sm bg-white p-5 hover:shadow-lg transition-shadow flex flex-col gap-2">
      <a href={url} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-indigo-700 hover:underline">
        {title}
      </a>
      <div className="text-gray-600 text-sm mb-1">{description}</div>
      <a href={url} target="_blank" rel="noopener noreferrer" className="inline-block mt-auto text-indigo-600 hover:text-indigo-800 font-medium text-sm">Read more →</a>
    </div>
  );
}
