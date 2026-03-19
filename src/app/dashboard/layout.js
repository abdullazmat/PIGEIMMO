'use client';

import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { useAuth } from '@/context/AuthContext';

export default function DashboardLayout({ children }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'var(--bg-body)' }}>
        <div className="auth-spinner" style={{ width: '32px', height: '32px' }} />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-main">
        <Header />
        <main className="app-content">
          {children}
        </main>
      </div>
    </div>
  );
}
