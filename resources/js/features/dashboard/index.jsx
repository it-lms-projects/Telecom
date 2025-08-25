import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { patch } from '@mui/material';
import apps from "./apps";

export default function DashboardPage() {
  const navigate = useNavigate();

  const onAppLinkClicked = (app) => {
    if(app) {
      navigate(app.href);
    }
  };

  return (
    <div>
      <div className="min-h-screen transition-colors duration-500 bg-[#fbf5f5]">
        {/* Apps Grid */}
        <main className="flex justify-center px-16 py-8">
          <div className="grid grid-cols-2 gap-4 p-4 md:gap-8 lg:gap-12 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {apps.map((app, index) => (
              <div
                key={`app-key-${index}`}
                onClick={() => onAppLinkClicked(app)}
                className={`rounded-xl w-32 h-32 p-6 flex flex-col items-center justify-center shadow-md cursor-pointer hover:border-yellow-500/80 dark:border-slate-500 border-[1px] border-transparent transform hover:scale-[1.02] transition-all duration-300 bg-white dark:bg-gray-800 hover:backdrop-blur-md ${app.color}`}
              >
                <span className="mb-3 text-4xl">{app.icon}</span>
                <span className="text-sm font-semibold text-center text-gray-800 dark:text-gray-200">
                  {app.name}
                </span>
              </div>
            ))}
          </div>
        </main>
        {/* Apps Grid */}
      </div>
    </div>
  );
}