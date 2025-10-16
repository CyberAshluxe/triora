import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-900 via-green-800 to-green-950 text-white px-4">
      <div className="flex flex-col items-center gap-6">
        <div className="flex items-center gap-3">
          <span className="text-4xl font-extrabold text-green-400 animate-pulse">404</span>
          <span className="text-lg font-mono text-green-300">|</span>
          <span className="text-lg font-semibold text-green-200 tracking-wide">Page Not Found</span>
        </div>
        <div className="bg-green-800/80 rounded-lg p-6 shadow-lg border border-green-700 flex flex-col items-center">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" className="mb-4">
            <rect x="2" y="2" width="20" height="20" rx="5" fill="#22c55e" />
            <path d="M7 12h10M12 7v10" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <p className="text-green-100 mb-2 text-center">
            Oops! The page you’re looking for doesn’t exist.<br />
            Maybe it was moved, deleted, or you mistyped the address.
          </p>
          <Link
            to="/"
            className="mt-4 px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded transition-all shadow focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Go to Home
          </Link>
        </div>
        <div className="mt-8 text-xs text-green-300 font-mono">
          <span className="bg-green-900 px-2 py-1 rounded">Tri-Aura Tech System</span>
        </div>
      </div>
    </div>
  );
}