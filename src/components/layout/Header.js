'use client';

import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import {
  Search, RefreshCw, Bell, CreditCard, ChevronDown,
  LogOut, User, Settings, HelpCircle, X
} from 'lucide-react';

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifCount, setNotifCount] = useState(3);
  const profileRef = useRef(null);
  const notifRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const notifications = [
    { id: 1, text: 'Nouvelle propriété détectée à Lyon 3ème', time: 'Il y a 2 min', read: false },
    { id: 2, text: 'Jean-Marc Leblanc a répondu à votre SMS', time: 'Il y a 15 min', read: false },
    { id: 3, text: 'RDV confirmé pour demain 14h', time: 'Il y a 1h', read: false },
    { id: 4, text: 'Nouveau lead Live Radar disponible', time: 'Il y a 2h', read: true },
  ];

  const handleLogout = () => {
    setProfileOpen(false);
    logout();
  };

  const markAllRead = () => {
    setNotifCount(0);
  };

  return (
    <header className="header" id="main-header">
      <div className={`header-search ${searchFocused ? 'focused' : ''}`} id="global-search">
        <Search size={16} className="header-search-icon" />
        <input
          type="text"
          placeholder="Rechercher un bien, vendeur, ville..."
          id="global-search-input"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
        {searchValue ? (
          <button className="header-search-clear" onClick={() => setSearchValue('')}>
            <X size={14} />
          </button>
        ) : (
          <kbd className="header-search-kbd">⌘K</kbd>
        )}
      </div>

      <div className="header-actions">
        <button
          className="header-btn"
          id="btn-refresh"
          title="Rafraîchir"
          onClick={() => window.location.reload()}
        >
          <RefreshCw size={18} />
        </button>

        <button
          className="header-subscription"
          id="btn-subscription"
          onClick={() => router.push('/dashboard/settings/automation')}
        >
          <CreditCard size={16} />
          <span>ABONNEMENT</span>
        </button>

        {/* Notifications */}
        <div className="header-notif-wrapper" ref={notifRef}>
          <button
            className="header-btn"
            id="btn-notifications"
            title="Notifications"
            onClick={() => { setNotifOpen(!notifOpen); }}
          >
            <Bell size={18} />
            {notifCount > 0 && <span className="header-notif-dot">{notifCount}</span>}
          </button>
          {notifOpen && (
            <div className="header-dropdown notif-dropdown">
              <div className="header-dropdown-title">
                <span>Notifications</span>
                <button className="header-dropdown-action" onClick={markAllRead}>
                  Tout marquer lu
                </button>
              </div>
              <div className="header-dropdown-list">
                {notifications.map((n) => (
                  <div key={n.id} className={`header-dropdown-item ${!n.read ? 'unread' : ''}`}>
                    <div className="header-dropdown-item-text">{n.text}</div>
                    <div className="header-dropdown-item-time">{n.time}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="header-profile-wrapper" ref={profileRef}>
          <button
            className="header-profile"
            id="user-profile"
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <div className="header-avatar">
              {user?.avatar || 'MD'}
            </div>
            <div className="header-profile-info">
              <div className="header-profile-name">{user?.name || 'Utilisateur'}</div>
              <div className="header-profile-role">{user?.role || 'Agent'}</div>
            </div>
            <ChevronDown size={14} className={`header-chevron ${profileOpen ? 'open' : ''}`} />
          </button>
          {profileOpen && (
            <div className="header-dropdown profile-dropdown">
              <div className="header-dropdown-user">
                <div className="header-avatar" style={{ width: '40px', height: '40px', fontSize: '14px' }}>
                  {user?.avatar || 'MD'}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '14px' }}>{user?.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{user?.email}</div>
                </div>
              </div>
              <div className="header-dropdown-divider" />
              <button className="header-dropdown-menu-item" onClick={() => { setProfileOpen(false); }}>
                <User size={16} />
                <span>Mon profil</span>
              </button>
              <button className="header-dropdown-menu-item" onClick={() => { setProfileOpen(false); router.push('/dashboard/settings/automation'); }}>
                <Settings size={16} />
                <span>Réglages</span>
              </button>
              <button className="header-dropdown-menu-item" onClick={() => setProfileOpen(false)}>
                <HelpCircle size={16} />
                <span>Aide & Support</span>
              </button>
              <div className="header-dropdown-divider" />
              <button className="header-dropdown-menu-item logout" onClick={handleLogout}>
                <LogOut size={16} />
                <span>Déconnexion</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
