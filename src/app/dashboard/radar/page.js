"use client";

import { useState, useEffect } from "react";
import { demoRadarLeads } from "@/lib/demoData";
import {
  Radar,
  Zap,
  Clock,
  Lock,
  ArrowRight,
  Home,
  CreditCard,
  Target,
  MessageSquare,
  PhoneCall,
  Info,
  CheckCircle2,
  Play,
  Pause,
  Building2,
} from "lucide-react";

export default function RadarPage() {
  const [leads, setLeads] = useState(demoRadarLeads);
  const [isLive, setIsLive] = useState(true);
  const [credits, setCredits] = useState(47);

  const leadImageBySource = {
    leboncoin:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=1000",
    pap: "https://images.unsplash.com/photo-1600047509782-20d39509f26d?auto=format&fit=crop&q=80&w=1000",
    seloger:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1000",
    paruvendu:
      "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&q=80&w=1000",
    bienici:
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&q=80&w=1000",
  };

  const sourceBadge = {
    leboncoin: "LBC",
    pap: "PAP",
    seloger: "SLG",
    paruvendu: "PV",
    bienici: "BI",
  };

  const sourceClass = {
    leboncoin: "lbc",
    pap: "pap",
    seloger: "seloger",
    paruvendu: "paruvendu",
    bienici: "bienici",
  };

  // Simulate new leads appearing
  useEffect(() => {
    if (!isLive) return;
    const interval = setInterval(() => {
      const newLead = {
        _id: `new-${Date.now()}`,
        title: "Loft 110m² rénové parking",
        location: "Bordeaux Centre",
        price: 410000 + Math.floor(Math.random() * 50000),
        timeAgo: "à l'instant",
        score: 92,
        isNew: true,
        source: "seloger",
      };
      setLeads((prev) => [newLead, ...prev.slice(0, 5)]);
    }, 15000);
    return () => clearInterval(interval);
  }, [isLive]);

  return (
    <>
      <div className="page-header">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <h1 className="page-title">📡 RADAR LIVE</h1>
            <span className="radar-live-badge">EN DIRECT</span>
          </div>
          <p className="page-subtitle">
            Leads détectés il y a moins de 5 minutes — 1€ par lead — Exclusivité
            4 semaines
          </p>
        </div>
        <div className="page-actions">
          <button
            className={`btn ${isLive ? "btn-primary" : "btn-secondary"}`}
            onClick={() => setIsLive(!isLive)}
          >
            {isLive ? <Pause size={16} /> : <Play size={16} />}
            {isLive ? "PAUSE" : "REPRENDRE"}
          </button>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              background: "var(--bg-card)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border)",
              fontSize: "13px",
              fontWeight: 600,
            }}
          >
            <CreditCard size={16} style={{ color: "var(--info)" }} />
            <span>Crédits : {credits} leads</span>
          </div>
        </div>
      </div>

      <div className="kpi-grid" style={{ marginBottom: "32px" }}>
        <div className="kpi-card" style={{ padding: "24px" }}>
          <div
            className="kpi-card-icon"
            style={{ background: "var(--primary-bg)", color: "var(--primary)" }}
          >
            <Radar size={20} />
          </div>
          <div className="kpi-card-value">{leads.length}</div>
          <div className="kpi-card-label">Leads disponibles</div>
        </div>
        <div className="kpi-card" style={{ padding: "24px" }}>
          <div
            className="kpi-card-icon"
            style={{ background: "var(--success-bg)", color: "var(--success)" }}
          >
            <CheckCircle2 size={20} />
          </div>
          <div className="kpi-card-value">0</div>
          <div className="kpi-card-label">Leads achetés</div>
        </div>
        <div className="kpi-card" style={{ padding: "24px" }}>
          <div
            className="kpi-card-icon"
            style={{ background: "var(--info-bg)", color: "var(--info)" }}
          >
            <Clock size={20} />
          </div>
          <div className="kpi-card-value">&lt; 5 min</div>
          <div className="kpi-card-label">Fraîcheur</div>
        </div>
        <div className="kpi-card" style={{ padding: "24px" }}>
          <div
            className="kpi-card-icon"
            style={{ background: "var(--purple-bg)", color: "var(--purple)" }}
          >
            <Lock size={20} />
          </div>
          <div className="kpi-card-value">4 sem.</div>
          <div className="kpi-card-label">Exclusivité</div>
        </div>
      </div>

      <div
        style={{
          background: "#fff8f6",
          padding: "16px 20px",
          borderRadius: "var(--radius-md)",
          border: "1px solid #ffe8e0",
          color: "#ff5722",
          fontSize: "13px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "32px",
        }}
      >
        <Info size={18} />
        <div>
          <strong>Comment ça marche :</strong> Les leads Live Radar sont
          exclusifs à votre portefeuille pendant <strong>4 semaines</strong>.
          Ils n&apos;apparaîtront dans le scraping général qu&apos;après ce
          délai. Chaque lead coûte <strong>1,00€</strong>.
        </div>
      </div>

      <div className="property-grid">
        {leads.map((lead) => (
          <div
            key={lead._id}
            className={`property-card ${lead.isNew ? "new-pulse" : ""}`}
            style={{
              border: lead.isNew
                ? "2px solid var(--primary)"
                : "1px solid var(--border-light)",
            }}
          >
            {lead.isNew && (
              <div
                style={{
                  position: "absolute",
                  top: "12px",
                  right: "12px",
                  zIndex: 10,
                }}
              >
                <span className="radar-live-badge" style={{ fontSize: "10px" }}>
                  NOUVEAU
                </span>
              </div>
            )}
            <div
              className="property-card-image"
              style={{
                height: "140px",
                background: "var(--bg-body)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={
                  leadImageBySource[lead.source] || leadImageBySource.seloger
                }
                alt={lead.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "12px",
                  left: "12px",
                  display: "flex",
                  gap: "8px",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    background: "white",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Building2 size={20} style={{ color: "var(--primary)" }} />
                </div>
              </div>
            </div>
            <div style={{ padding: "20px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "12px",
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: "15px",
                      fontWeight: 700,
                      marginBottom: "2px",
                    }}
                  >
                    {lead.title}
                  </h3>
                  <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                    {lead.location}
                  </div>
                </div>
              </div>
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: 800,
                  color: "var(--text-primary)",
                  marginBottom: "16px",
                }}
              >
                {lead.price.toLocaleString("fr-FR")} €
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "20px",
                  fontSize: "12px",
                  color: "var(--text-muted)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    color: "var(--danger)",
                    fontWeight: 600,
                  }}
                >
                  <Clock size={14} /> Il y a {lead.timeAgo}
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "4px" }}
                >
                  Score {lead.score}%
                </div>
                <div
                  className={`source-badge ${sourceClass[lead.source] || "seloger"}`}
                >
                  {sourceBadge[lead.source] || "N/A"}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: "16px",
                  borderTop: "1px solid var(--border-light)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "var(--warning)",
                  }}
                >
                  <CreditCard size={14} /> 1,00 €{" "}
                  <span
                    style={{
                      fontSize: "10px",
                      color: "var(--text-muted)",
                      fontWeight: 400,
                    }}
                  >
                    par lead
                  </span>
                </div>
                <button
                  className="btn btn-primary btn-sm"
                  style={{ padding: "8px 20px" }}
                >
                  <Target size={14} style={{ marginRight: "6px" }} />
                  ATTAQUER
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
