'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, Radar, GitBranch, MessageSquare, Phone, 
  Calendar, FileText, CheckCircle, Search, Settings, 
  Users, Gift, HelpCircle, LogOut, Zap, Clock, 
  BarChart3, ChevronRight, Menu, X, Bot, MapPinned, 
  Target, History, Heart, Share2
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const navigation = [
  {
    title: 'PROSPECTION',
    items: [
      { name: 'Tableau de bord', href: '/dashboard', icon: Home },
      { name: 'Radar Live', href: '/dashboard/radar', icon: Radar, badge: 'LIVE' },
      { name: 'Mes Leads', href: '/dashboard/leads', icon: Users, badge: '7' },
      { name: 'Pipeline', href: '/dashboard/pipeline', icon: GitBranch },
    ]
  },
  {
    title: 'EXÉCUTION',
    items: [
      { name: 'Cockpit IA', href: '/dashboard/cockpit', icon: Bot, badge: 'IA' },
      { name: 'Dialer', href: '/dashboard/dialer', icon: Phone },
      { name: 'Calendrier', href: '/dashboard/calendar', icon: Calendar },
    ]
  },
  {
    title: 'INTELLIGENCE',
    items: [
      { name: 'Historique', href: '/dashboard/leads-history', icon: History },
      { name: 'Mes Tâches', href: '/dashboard/tasks', icon: FileText },
      { name: 'Annulés', href: '/dashboard/cancelled', icon: X },
    ]
  },
  {
    title: 'RÉGLAGES',
    items: [
      { name: 'Automatisations', href: '/dashboard/settings/automation', icon: Zap },
      { name: 'Mon Équipe', href: '/dashboard/settings/team', icon: Users },
      { name: 'Ambassadeur', href: '/dashboard/settings/ambassador', icon: Gift },
      { name: 'Suggestions', href: '/dashboard/settings/suggestions', icon: MessageSquare },
    ]
  },
  {
    title: 'ACTIONS',
    items: [
      { name: 'Transférer mes leads', href: '/dashboard/transfer', icon: Share2 },
      { name: 'Parrainer un ami', href: '/dashboard/referral', icon: Gift },
    ]
  }
];

export default function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <aside className="sidebar" id="main-sidebar">
      <div className="sidebar-logo">
        <Link href="/dashboard" className="landing-logo">
          <div className="landing-logo-icon">
            <Zap size={18} fill="currentColor" />
          </div>
          <span className="landing-logo-text" style={{ color: 'white', fontSize: '18px' }}>PIGE IMMO</span>
        </Link>
      </div>

      <nav className="sidebar-nav">
        {navigation.map((section) => (
          <div key={section.title} className="sidebar-section">
            <h3 className="sidebar-section-title">{section.title}</h3>
            <ul className="sidebar-list">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`sidebar-link ${isActive ? 'active' : ''}`}
                    >
                      <Icon size={18} className="sidebar-link-icon" />
                      <span className="sidebar-link-text">{item.name}</span>
                      {item.badge && (
                        <span className={`sidebar-badge ${item.badge === 'LIVE' || item.badge === 'IA' ? 'radar' : ''}`}>
                          {item.badge}
                        </span>
                      )}
                      {isActive && <ChevronRight size={14} className="active-chevron" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="sidebar-logout" onClick={logout}>
          <LogOut size={18} />
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  );
}
