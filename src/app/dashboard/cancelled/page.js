"use client";

import {
  XCircle,
  Clock,
  AlertCircle,
  RefreshCw,
  Calendar,
  Phone,
  MessageSquare,
  Target,
  User,
  MoreVertical,
  Search,
  Filter,
  TrendingDown,
  CheckCircle2,
} from "lucide-react";

export default function CancelledPage() {
  const cancelled = [
    {
      id: 1,
      title: "Visite T2 Bordeaux",
      contact: "Sophie Bernard",
      date: "14 mars 2026 — 10h",
      reason: "Client indisponible",
      canReschedule: true,
    },
    {
      id: 2,
      title: "Estimation Maison Nantes",
      contact: "Antoine Rousseau",
      date: "12 mars 2026 — 15h",
      reason: "Annulé sans raison",
      canReschedule: true,
    },
    {
      id: 3,
      title: "RDV Signature Lyon",
      contact: "Client anonyme",
      date: "8 mars 2026 — 14h",
      reason: "No-show",
      canReschedule: false,
    },
  ];

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">RDV ANNULÉS</h1>
          <p className="page-subtitle">
            Suivi des rendez-vous annulés et no-show
          </p>
        </div>
        <div className="page-actions">
          <button className="btn btn-secondary">
            <Filter size={16} /> Filtrer par mois
          </button>
        </div>
      </div>

      <div className="kpi-grid" style={{ marginBottom: "32px" }}>
        <div className="kpi-card cancelled-kpi-card">
          <div
            className="kpi-card-icon"
            style={{ background: "var(--danger-bg)", color: "var(--danger)" }}
          >
            <XCircle size={20} />
          </div>
          <div className="kpi-card-value">{cancelled.length}</div>
          <div className="kpi-card-label">Total annulés ce mois</div>
        </div>
        <div className="kpi-card cancelled-kpi-card">
          <div
            className="kpi-card-icon"
            style={{ background: "var(--warning-bg)", color: "var(--warning)" }}
          >
            <AlertCircle size={20} />
          </div>
          <div className="kpi-card-value">1</div>
          <div className="kpi-card-label">No-show détecté</div>
        </div>
        <div className="kpi-card cancelled-kpi-card">
          <div
            className="kpi-card-icon"
            style={{ background: "var(--info-bg)", color: "var(--info)" }}
          >
            <RefreshCw size={20} />
          </div>
          <div className="kpi-card-value">2</div>
          <div className="kpi-card-label">À reprogrammer</div>
        </div>
      </div>

      <div className="data-table">
        <div className="data-table-header">
          <div className="section-title">
            <XCircle size={18} style={{ color: "var(--danger)" }} /> LISTE DES
            ANNULATIONS
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Bien / RDV</th>
              <th>Contact</th>
              <th>Date prévue</th>
              <th>Raison de l&apos;annulation</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cancelled.map((rdv) => (
              <tr key={rdv.id}>
                <td style={{ fontWeight: 600 }}>{rdv.title}</td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <div className="mini-avatar">{rdv.contact[0]}</div>
                    {rdv.contact}
                  </div>
                </td>
                <td style={{ color: "var(--text-muted)" }}>{rdv.date}</td>
                <td>
                  <span
                    className={`status-badge-outline ${rdv.reason === "No-show" ? "danger" : "warning"}`}
                  >
                    {rdv.reason}
                  </span>
                </td>
                <td style={{ textAlign: "right" }}>
                  <div
                    className="action-group"
                    style={{ justifyContent: "flex-end" }}
                  >
                    {rdv.canReschedule && (
                      <button className="btn btn-secondary btn-sm">
                        <RefreshCw size={12} /> Reprogrammer
                      </button>
                    )}
                    <button className="btn-icon btn-sm" title="Appeler">
                      <Phone size={13} />
                    </button>
                    <button className="btn-icon btn-sm" title="SMS">
                      <MessageSquare size={13} />
                    </button>
                    <button className="btn-icon btn-sm">
                      <MoreVertical size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
