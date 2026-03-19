"use client";

import {
  ArrowUpRight,
  Building2,
  Search,
  User,
  MapPin,
  ChevronRight,
  CheckCircle2,
  Info,
  RefreshCw,
  X,
} from "lucide-react";

export default function TransferPage() {
  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">TRANSFÉRER UN BIEN</h1>
          <p className="page-subtitle">
            Transférez un bien à un autre conseiller IAD de votre réseau
          </p>
        </div>
      </div>

      <div className="transfer-layout">
        {/* Select Property */}
        <div className="transfer-card">
          <div className="section-title" style={{ marginBottom: "20px" }}>
            <Building2 size={18} style={{ color: "var(--primary)" }} />{" "}
            SÉLECTIONNER LE BIEN
          </div>
          <div
            className="header-search"
            style={{
              border: "1px solid var(--border)",
              width: "100%",
              marginBottom: "20px",
            }}
          >
            <Search size={16} style={{ color: "var(--text-muted)" }} />
            <input
              type="text"
              placeholder="Rechercher un bien dans votre pipeline..."
            />
          </div>
          <div className="transfer-list">
            {[
              { title: "Maison 120m² Lyon", price: "450 000 €", loc: "Lyon 3" },
              { title: "T3 65m² Paris", price: "520 000 €", loc: "Paris 11" },
              {
                title: "Villa 200m² Aix",
                price: "890 000 €",
                loc: "Aix-en-Provence",
              },
            ].map((prop, i) => (
              <div
                key={i}
                className={`transfer-item ${i === 0 ? "active" : ""}`}
              >
                <div className="transfer-item-icon">
                  <Building2 size={18} />
                </div>
                <div className="transfer-item-info">
                  <div className="transfer-item-title">{prop.title}</div>
                  <div className="transfer-item-meta">
                    {prop.price} · {prop.loc}
                  </div>
                </div>
                {i === 0 && (
                  <CheckCircle2
                    size={14}
                    style={{ color: "var(--primary)", marginLeft: "auto" }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Select Recipient */}
        <div className="transfer-card">
          <div className="section-title" style={{ marginBottom: "20px" }}>
            <User size={18} style={{ color: "var(--info)" }} /> SÉLECTIONNER LE
            DESTINATAIRE
          </div>
          <div
            className="header-search"
            style={{
              border: "1px solid var(--border)",
              width: "100%",
              marginBottom: "20px",
            }}
          >
            <Search size={16} style={{ color: "var(--text-muted)" }} />
            <input type="text" placeholder="Rechercher un conseiller IAD..." />
          </div>
          <div className="transfer-list">
            {[
              { name: "Claire Fontaine", city: "Lyon", role: "Agent Senior" },
              { name: "Thomas Girard", city: "Paris", role: "Agent Junior" },
              { name: "Nadia Belkacem", city: "Marseille", role: "Agent" },
            ].map((a, i) => (
              <div key={i} className="transfer-item">
                <div className="transfer-avatar">
                  {a.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="transfer-item-info">
                  <div className="transfer-item-title">{a.name}</div>
                  <div className="transfer-item-meta">
                    <MapPin size={10} /> {a.city} · {a.role}
                  </div>
                </div>
                <ChevronRight
                  size={14}
                  style={{
                    color: "var(--text-muted)",
                    marginLeft: "auto",
                    opacity: 0.5,
                  }}
                />
              </div>
            ))}
          </div>

          <div className="transfer-action">
            <div className="alert-inline info" style={{ marginBottom: "20px" }}>
              <Info size={14} />
              <span>
                Le transfert inclut tout l&apos;historique de pige et les notes.
              </span>
            </div>
            <button className="btn btn-primary btn-lg transfer-submit">
              <ArrowUpRight size={18} /> CONFIRMER LE TRANSFERT
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
