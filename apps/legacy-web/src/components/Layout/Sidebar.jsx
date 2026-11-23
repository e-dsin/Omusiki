import React, { useContext, useState } from 'react';
import {
  Home,
  Search,
  Library,
  User,
  Calendar,
  Download,
  LogOut,
  ChevronRight,
  ChevronDown,
  Plus,
} from 'lucide-react';
import { AuthContext } from '../../contexts/AuthContext';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const { user, logout } = useContext(AuthContext);
  const [expanded, setExpanded] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Accueil', icon: Home },
    { id: 'search', label: 'Rechercher', icon: Search },
    { id: 'library', label: 'Bibliothèque', icon: Library },
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'subscription', label: 'Abonnement', icon: Calendar },
    { id: 'offline', label: 'Téléchargements', icon: Download },
  ];

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? <ChevronDown size={24} /> : <ChevronRight size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`
        fixed md:relative z-40 h-full transition-all duration-300 ease-in-out
        ${expanded ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white
      `}
      >
        <div className="h-full flex flex-col p-4">
          {/* Logo */}
          <div className="p-4 mb-6">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Ô musiki
            </h1>
          </div>

          {/* Menu principal */}
          <nav className="flex-1 space-y-1">
            {menuItems.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setExpanded(false);
                  }}
                  className={`
                    w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all
                    ${
                      activeTab === item.id
                        ? 'bg-gradient-to-r from-purple-500/80 to-pink-500/80 text-white shadow-lg'
                        : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Playlists utilisateur */}
          <div className="mt-4 border-t border-gray-700 pt-4">
            <div className="flex items-center justify-between px-2 mb-2">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                Vos playlists
              </h3>
              <button className="text-gray-400 hover:text-white">
                <Plus size={16} />
              </button>
            </div>
            <div className="space-y-1 max-h-40 overflow-y-auto">
              {['Favoris', 'Découvertes', 'Travail'].map(playlist => (
                <button
                  key={playlist}
                  className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white rounded hover:bg-gray-700/30 truncate"
                >
                  {playlist}
                </button>
              ))}
            </div>
          </div>

          {/* Profil utilisateur */}
          <div className="mt-auto pt-4 border-t border-gray-700">
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/30 transition-colors">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{user?.name}</p>
                <p className="text-xs text-gray-400 truncate">
                  {user?.subscription}
                </p>
              </div>
              <button
                onClick={logout}
                className="text-gray-400 hover:text-white"
                title="Déconnexion"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay pour mobile */}
      {expanded && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setExpanded(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
