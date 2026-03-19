"use client";

import { useState } from "react";
import {
  Users,
  Mail,
  MessageSquare,
  Award,
  Copy,
  TrendingUp,
  CreditCard,
  Sparkles,
} from "lucide-react";

export default function AmbassadorPage() {
  const [referralCode] = useState("MARC2024");

  const referrals = [
    {
      name: "Claire Fontaine",
      date: "10 mars 2026",
      status: "active",
      commission: "125 €",
    },
    {
      name: "Thomas Girard",
      date: "28 fév 2026",
      status: "trial",
      commission: "0 €",
    },
    {
      name: "Nadia Belkacem",
      date: "15 fév 2026",
      status: "active",
      commission: "250 €",
    },
  ];

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">PROGRAMME AMBASSADEUR</h1>
          <p className="page-subtitle">
            Parrainez des conseillers IAD et gagnez des commissions
          </p>
        </div>
        <div className="page-actions">
          <button className="btn btn-primary">
            <Award size={16} /> Devenir Ambassadeur Pro
          </button>
        </div>
      </div>

      {/* Stats */}
      <div
        className="kpi-grid ambassador-kpis"
        style={{ marginBottom: "32px" }}
      >
        <div className="kpi-card" style={{ padding: "24px" }}>
          <div
            className="kpi-card-icon"
            style={{ background: "var(--purple-bg)", color: "var(--purple)" }}
          >
            <Award size={20} />
          </div>
          <div className="kpi-card-value">{referrals.length}</div>
          <div className="kpi-card-label">Filleuls actifs</div>
        </div>
        <div className="kpi-card" style={{ padding: "24px" }}>
          <div
            className="kpi-card-icon"
            style={{ background: "var(--success-bg)", color: "var(--success)" }}
          >
            <CreditCard size={20} />
          </div>
          <div className="kpi-card-value">375 €</div>
          <div className="kpi-card-label">Commissions totales</div>
        </div>
        <div className="kpi-card" style={{ padding: "24px" }}>
          <div
            className="kpi-card-icon"
            style={{ background: "var(--info-bg)", color: "var(--info)" }}
          >
            <Mail size={20} />
          </div>
          <div className="kpi-card-value">8</div>
          <div className="kpi-card-label">Invitations envoyées</div>
        </div>
        <div className="kpi-card" style={{ padding: "24px" }}>
          <div
            className="kpi-card-icon"
            style={{ background: "var(--primary-bg)", color: "var(--primary)" }}
          >
            <TrendingUp size={20} />
          </div>
          <div className="kpi-card-value">37.5%</div>
          <div className="kpi-card-label">Taux de conversion</div>
        </div>
      </div>

      {/* Referral Code */}
      <div className="ambassador-promo-card">
        <div className="promo-glow" />
        <div className="promo-content">
          <div className="promo-badge">
            <Sparkles size={12} /> VOTRE CODE DE PARRAINAGE
          </div>
          <h2 className="promo-code">{referralCode}</h2>
          <div className="promo-actions">
            <button className="btn btn-primary btn-lg">
              <Copy size={18} /> Copier le lien
            </button>
            <button
              className="btn btn-secondary btn-lg"
              style={{ color: "white", borderColor: "rgba(255,255,255,0.2)" }}
            >
              <Mail size={18} /> Email
            </button>
            <button
              className="btn btn-secondary btn-lg"
              style={{ color: "white", borderColor: "rgba(255,255,255,0.2)" }}
            >
              <MessageSquare size={18} /> WhatsApp
            </button>
          </div>
        </div>
      </div>

      {/* Referrals Table */}
      <div className="data-table">
        <div className="data-table-header">
          <div className="section-title">
            <Users size={18} style={{ color: "var(--purple)" }} /> MES FILLEULS
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Date d&apos;inscription</th>
              <th>Statut</th>
              <th style={{ textAlign: "right" }}>Commission</th>
            </tr>
          </thead>
          <tbody>
            {referrals.map((ref, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 600 }}>{ref.name}</td>
                <td style={{ color: "var(--text-muted)" }}>{ref.date}</td>
                <td>
                  <span className={`status-badge ${ref.status}`}>
                    {ref.status === "active" ? "ACTIF" : "ESSAI"}
                  </span>
                </td>
                <td
                  style={{
                    textAlign: "right",
                    fontWeight: 800,
                    color: "var(--success)",
                  }}
                >
                  +{ref.commission}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
