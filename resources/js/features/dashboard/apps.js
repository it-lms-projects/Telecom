import Paths from "@router/paths";

const apps = [    
    {
        name : 'Dotation Matériel',   // Equipment allocation
        icon : '📦',
        color: 'bg-pink-500/20',
        href : Paths.equipments,
    },    
    {
        name : 'Fiche Intervention',   // Intervention sheet
        icon : '🛠️',
        color: 'bg-purple-500/20',
        href : Paths.interventions,
    },    
    {
        name : 'Fiche Remplacement',   // Replacement form
        icon : '🔄',
        color: 'bg-yellow-500/20',
        href : Paths.replacements,
    },    
    {
        name : 'Bon de sortie',    // Exit slip/pass
        icon : '📝',
        color: 'bg-gray-500/20',
        href : Paths.exitPasses,
    },    
    {
        name : 'Tickets',          // Support or issue tickets
        icon : '🎟️',
        color: 'bg-teal-500/20',
        href : Paths.tickets,
    },    
    {
        name : 'Badges',             // Access badges
        icon : '📋',
        color: 'bg-orange-500/20',
        href : Paths.badges,
    },
    {
        name : 'Cartes SIM',       // SIM cards 
        icon : '📱',
        color: 'bg-pink-400/20',
        href : Paths.simcards,
    },
    {
        name : 'Récharges Crédit',   // Credit recharge
        icon : '💳',
        color: 'bg-yellow-600/20',
        href : Paths.credits,
    },
    {
        name : 'Annuaire Téléphonique',   // Phone directory
        icon : '📖',
        color: 'bg-indigo-500/20',
        href : Paths.phoneBooks,
    },
    {
        name : 'Rapport de pointage',   // Attendance report
        icon : '📊',
        color: 'bg-red-600/20',
        href : Paths.attendances,
    },
    {
        name : 'Astreinte IT',     // IT on-call
        icon : '💻',
        color: 'bg-pink-600/20',
        href : Paths.onCalls,
    },
    {
        name : 'Matériel Informatique',   // IT equipment/assets
        icon : '🖥️',
        color: 'bg-blue-700/20',
        href : Paths.assets,
    },
    {
        name : 'Utilisateurs',     // Users
        icon : '👤',
        color: 'bg-gray-400/20',
        href : Paths.users,
    },
    {
        name : 'Employees',        // Employees
        icon : '👥',
        color: 'bg-teal-400/20',
        href : Paths.employees,
    },
    {
        name : 'NVR Tools',        // Security camera tools
        icon : '📹',
        color: 'bg-cyan-400/20',
        href : Paths.downtimes,
    },
    {
        name : 'OAuth 2.0',       // Authentication
        icon : '🔐',
        color: 'bg-red-500/20',
        href : Paths.oauthApps,
    },
    {
        name : 'Paramères',          // Settings
        icon : '⚙️',
        color: 'bg-yellow-500/20',
        href : Paths.settings,
    },
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
  { name: 'Fleet', icon: '🚗', color: 'bg-blue-800/20' },
*/

export default apps;