import React, { useState } from 'react';

const apps = [
  { name: 'Dotation Matériel', icon: '📦', color: 'bg-pink-500/20' }, // Equipment allocation
  { name: 'Fiche Intervention', icon: '🛠️', color: 'bg-purple-500/20' }, // Intervention sheet
  { name: 'Fiche Remplacement', icon: '🔄', color: 'bg-yellow-500/20' }, // Replacement form
  { name: 'Bon de sortie', icon: '📝', color: 'bg-gray-500/20' }, // Exit slip
  { name: 'Tickets', icon: '🎟️', color: 'bg-teal-500/20' }, // Support or issue tickets
  { name: 'Badges', icon: '📋', color: 'bg-orange-500/20' }, // Access badges
  { name: 'Cartes SIM', icon: '📱', color: 'bg-pink-400/20' }, // SIM cards
  { name: 'Récharges Crédit', icon: '💳', color: 'bg-yellow-600/20' }, // Credit recharge
  { name: 'Annuaire Téléphonique', icon: '📖', color: 'bg-indigo-500/20' }, // Phone directory
  { name: 'Rapport de pointage', icon: '📊', color: 'bg-red-600/20' }, // Attendance report
  { name: 'Astreinte IT', icon: '💻', color: 'bg-pink-600/20' }, // IT on-call
  { name: 'Matériel Informatique', icon: '🖥️', color: 'bg-blue-700/20' }, // IT equipment
  { name: 'Utilisateurs', icon: '👤', color: 'bg-gray-400/20' }, // Users
  { name: 'Employees', icon: '👥', color: 'bg-teal-400/20' }, // Employees
  { name: 'NVR Tools', icon: '📹', color: 'bg-cyan-400/20' }, // Security camera tools
  { name: 'OAuth 2.0', icon: '🔐', color: 'bg-red-500/20' }, // Authentication
  { name: 'Paramères', icon: '⚙️', color: 'bg-yellow-500/20' }, // Settings
];

/*  
  { name: 'Planning', icon: '📋', color: 'bg-teal-600/20' },
  { name: 'Support', icon: '🛟', color: 'bg-pink-500/20' },
  { name: 'Website', icon: '🌐', color: 'bg-orange-400/20' },
  { name: 'Email Marketing', icon: '✉️', color: 'bg-gray-500/20' },
  { name: 'Surveys', icon: '📝', color: 'bg-orange-600/20' },
  { name: 'Purchases', icon: '💳', color: 'bg-blue-400/20' },
  { name: 'Inventory', icon: '📦', color: 'bg-red-700/20' },
  { name: 'Quality', icon: '🛠️', color: 'bg-cyan-500/20' },
  { name: 'Repairs', icon: '🔧', color: 'bg-green-600/20' },
  { name: 'Signature', icon: '✍️', color: 'bg-purple-600/20' },
  { name: 'Fleet', icon: '🚗', color: 'bg-blue-800/20' },*/

export default function HomePage() {
  return (
    <div>
      <div className="min-h-screen transition-colors duration-500 bg-[#fbf5f5] dark:bg-gradient-to-r dark:from-[#212843] dark:to-[#2c2d31] ">
        {/* Apps Grid */}
        <main className="flex justify-center px-16 py-8">
          <div className="grid grid-cols-2 gap-4 p-4 md:gap-8 lg:gap-12 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {apps.map((app, index) => (
              <div
                key={index}
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