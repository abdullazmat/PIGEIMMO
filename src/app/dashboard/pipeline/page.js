"use client";

import { useState } from "react";
import { demoProperties } from "@/lib/demoData";
import {
  GitBranch,
  LayoutGrid,
  List,
  Search,
  Filter,
  Phone,
  MessageSquare,
  Target,
  ArrowUpRight,
  ChevronDown,
  CheckCircle2,
  Info,
  RefreshCw,
  X,
  MapPin,
  Building2,
  Calendar,
  BarChart3,
  History,
  Users,
  Heart,
  User,
} from "lucide-react";

const sourceMap = {
  leboncoin: "LBC",
  pap: "PAP",
  seloger: "SLG",
  paruvendu: "PV",
  bienici: "BI",
};
const sourceColorMap = {
  leboncoin: "lbc",
  pap: "pap",
  seloger: "seloger",
  paruvendu: "paruvendu",
  bienici: "bienici",
};

export default function PipelinePage() {
  const [view, setView] = useState("grid");
  const [selectedProp, setSelectedProp] = useState(null);
  const [activeFilter, setActiveFilter] = useState("Tous");

  const filters = [
    "Tous",
    "À prospecter",
    "Message envoyé",
    "Rappel prévu",
    "RDV prévu",
    "Mandat signé",
  ];

  return (
    <>
      <div className="page-header">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <h1 className="page-title">PIPELINE</h1>
            <span className="scraping-active-badge">
              <RefreshCw size={12} className="spinning" /> SCRAPING ACTIF
            </span>
          </div>
          <p className="page-subtitle">
            12 annonces scrapées — 3 nouvelles — 0 ajoutées à Mes Leads
          </p>
        </div>
        <div className="page-actions">
          <div className="view-toggle">
            <button
              className={`view-btn ${view === "grid" ? "active" : ""}`}
              onClick={() => setView("grid")}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              className={`view-btn ${view === "list" ? "active" : ""}`}
              onClick={() => setView("list")}
            >
              <List size={16} />
            </button>
          </div>
          <button className="btn btn-primary">
            <RefreshCw size={16} /> Relancer le scraping
          </button>
        </div>
      </div>

      <div
        style={{
          background: "var(--success-bg)",
          padding: "12px 20px",
          borderRadius: "var(--radius-md)",
          border: "1px solid var(--success-bg)",
          color: "var(--success)",
          fontSize: "13px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "24px",
        }}
      >
        <CheckCircle2 size={16} />
        <span>SCRAPING ACTIF — Leboncoin scanné toutes les 2 minutes</span>
      </div>

      <div className="pipeline-controls">
        <div className="controls-left">
          <div className="header-search control-search">
            <Search size={16} style={{ color: "var(--text-muted)" }} />
            <input
              type="text"
              placeholder="Rechercher un bien..."
              style={{ background: "transparent" }}
            />
          </div>
          <div className="filter-scroll">
            {filters.map((f) => (
              <button
                key={f}
                className={`filter-tag ${activeFilter === f ? "active" : ""}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <button className="btn btn-secondary">
          <Filter size={16} /> Filtrer par ville
        </button>
      </div>

      {view === "grid" ? (
        <div className="property-grid">
          {demoProperties.map((prop) => (
            <div
              key={prop._id}
              className="property-card"
              onClick={() => setSelectedProp(prop)}
            >
              <div className="property-card-image">
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    left: "12px",
                    zIndex: 10,
                    display: "flex",
                    gap: "6px",
                  }}
                >
                  {prop.isNew && (
                    <span
                      className="radar-live-badge"
                      style={{
                        background: "var(--primary)",
                        color: "white",
                        border: "none",
                      }}
                    >
                      LIVE
                    </span>
                  )}
                  <span
                    className={`source-badge ${sourceColorMap[prop.source]}`}
                  >
                    {sourceMap[prop.source]}
                  </span>
                </div>
                <button
                  className="btn-favorite"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Heart size={16} />
                </button>
                <div className="property-card-image-content">
                  {prop.images && prop.images[0] ? (
                    <img
                      src={prop.images[0]}
                      alt={prop.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <Building2
                      size={48}
                      style={{ opacity: 0.1, color: "var(--primary)" }}
                    />
                  )}
                </div>
              </div>
              <div style={{ padding: "16px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "8px",
                  }}
                >
                  <h3 style={{ fontSize: "14px", fontWeight: 700 }}>
                    {prop.title}
                  </h3>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "12px",
                    color: "var(--text-muted)",
                    marginBottom: "8px",
                  }}
                >
                  <MapPin size={12} /> {prop.location.city}
                </div>
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: 800,
                    color: "var(--text-primary)",
                    marginBottom: "12px",
                  }}
                >
                  {prop.price.toLocaleString("fr-FR")} €
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "16px",
                    fontSize: "11px",
                    color: "var(--text-muted)",
                  }}
                >
                  <span>
                    {prop.surface}m² · {prop.rooms}p
                  </span>
                  <span style={{ color: "var(--primary)", fontWeight: 600 }}>
                    Il y a {prop.timeAgo}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    borderTop: "1px solid var(--border-light)",
                    paddingTop: "12px",
                  }}
                >
                  <button className="btn-icon btn-sm" title="SMS">
                    <MessageSquare size={14} />
                  </button>
                  <button className="btn-icon btn-sm" title="Appeler">
                    <Phone size={14} />
                  </button>
                  <button className="btn-icon btn-sm" title="Transférer">
                    <ArrowUpRight size={14} />
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    style={{ marginLeft: "auto" }}
                  >
                    <Target size={12} style={{ marginRight: "4px" }} />
                    ATTAQUER
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th>Bien</th>
                <th>Ville</th>
                <th>Prix</th>
                <th>Temps</th>
                <th>Source</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {demoProperties.map((prop) => (
                <tr
                  key={prop._id}
                  onClick={() => setSelectedProp(prop)}
                  style={{ cursor: "pointer" }}
                >
                  <td>
                    <div style={{ fontWeight: 600 }}>{prop.title}</div>
                    <div
                      style={{ fontSize: "11px", color: "var(--text-muted)" }}
                    >
                      {prop.type} · {prop.surface}m²
                    </div>
                  </td>
                  <td>{prop.location.city}</td>
                  <td style={{ fontWeight: 700 }}>
                    {prop.price.toLocaleString("fr-FR")} €
                  </td>
                  <td>
                    <span
                      style={{
                        color: prop.isNew ? "var(--primary)" : "inherit",
                      }}
                    >
                      {prop.timeAgo}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`source-badge ${sourceColorMap[prop.source]}`}
                    >
                      {sourceMap[prop.source]}
                    </span>
                  </td>
                  <td>
                    <div className="action-group">
                      <button className="btn btn-primary btn-sm">
                        ATTAQUER
                      </button>
                      <button className="btn-icon btn-sm">
                        <Phone size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedProp && (
        <>
          <div
            className="overlay"
            style={{ zIndex: 2000 }}
            onClick={() => setSelectedProp(null)}
          />
          <div className="side-modal open">
            <div className="side-modal-header">
              <div>
                <h2 className="section-title">{selectedProp.title}</h2>
                <div
                  style={{
                    fontSize: "13px",
                    color: "var(--text-muted)",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <MapPin size={14} /> {selectedProp.location.city} ·{" "}
                  {selectedProp.price.toLocaleString("fr-FR")} €
                </div>
              </div>
              <button
                className="btn-icon"
                onClick={() => setSelectedProp(null)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="side-modal-body">
              <div className="prop-detail-image">
                {selectedProp.images && selectedProp.images[0] ? (
                  <img
                    src={selectedProp.images[0]}
                    alt={selectedProp.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <Building2 size={64} style={{ opacity: 0.1 }} />
                )}
              </div>
              <div className="detail-section">
                <h4 className="detail-title">
                  <Info size={14} /> INFORMATIONS
                </h4>
                <div className="detail-grid-two" style={{ fontSize: "13px" }}>
                  <div className="detail-item">
                    <span className="label">Surface</span>
                    <span className="value">{selectedProp.surface} m²</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Pièces</span>
                    <span className="value">{selectedProp.rooms} pièces</span>
                  </div>
                </div>
              </div>
              <div className="detail-section">
                <h4 className="detail-title">
                  <User size={14} /> CONTACT PROPRIÉTAIRE
                </h4>
                <div className="contact-card">
                  <div className="contact-info">
                    <div style={{ fontWeight: 700 }}>Jean-Marc Leblanc</div>
                    <div
                      style={{ fontSize: "12px", color: "var(--text-muted)" }}
                    >
                      06 12 34 56 78
                    </div>
                  </div>
                  <button
                    className="btn-icon"
                    style={{
                      background: "var(--success-bg)",
                      color: "var(--success)",
                    }}
                  >
                    <Phone size={16} />
                  </button>
                </div>
              </div>
              <div className="detail-section">
                <h4 className="detail-title">
                  <History size={14} /> HISTORIQUE DES PRIX
                </h4>
                <div className="price-history">
                  <div className="history-row">
                    <span className="h-date">Auj.</span>
                    <span className="h-val">450 000 €</span>
                  </div>
                  <div className="history-row">
                    <span className="h-date">Il y a 10j</span>
                    <span
                      className="h-val"
                      style={{
                        textDecoration: "line-through",
                        color: "var(--text-muted)",
                      }}
                    >
                      475 000 €
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="side-modal-footer">
              <button className="btn btn-primary" style={{ flex: 1 }}>
                <Target size={16} /> ATTAQUER LE LEAD
              </button>
              <button className="btn btn-secondary">
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
