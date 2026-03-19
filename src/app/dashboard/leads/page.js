"use client";

import { useState } from "react";
import { demoLeads, kanbanColumns } from "@/lib/demoData";
import {
  Filter,
  Search,
  Phone,
  MessageSquare,
  Info,
  MapPin,
  Building2,
  Target,
  Clock,
  MoreVertical,
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

export default function LeadsPage() {
  const [activeFilter, setActiveFilter] = useState("Tous");

  const filters = [
    "Tous",
    "Sans tél (6)",
    "Chauds (3)",
    "Tièdes (0)",
    "Froids (3)",
    "Leboncoin (3)",
  ];
  const visibleColumns = kanbanColumns.filter((col) => {
    const count = demoLeads.filter((l) => l.status === col.id).length;
    return (
      count > 0 ||
      [
        "a_prospecter",
        "message_auto_envoye",
        "rappel_prevu",
        "rdv_prevu",
      ].includes(col.id)
    );
  });

  const totalVisibleLeads = visibleColumns.reduce((acc, col) => {
    return acc + demoLeads.filter((lead) => lead.status === col.id).length;
  }, 0);

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">MES LEADS</h1>
          <p className="page-subtitle">7 leads qui me sont assignés</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-primary">
            <Target size={16} /> Ajouter un lead
          </button>
        </div>
      </div>

      <div className="pipeline-controls">
        <div className="controls-left">
          <div className="header-search control-search">
            <Search size={16} style={{ color: "var(--text-muted)" }} />
            <input
              type="text"
              placeholder="Rechercher..."
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
          <Filter size={16} /> Plus de filtres
        </button>
      </div>

      <div className="leads-board-shell">
        <div className="leads-board-status">
          <span className="leads-board-status-title">Vue Kanban active</span>
          <span className="leads-board-status-value">
            {totalVisibleLeads} leads affichés
          </span>
        </div>

        <div className="kanban-container">
          {visibleColumns.map((col) => {
            const columnLeads = demoLeads.filter((l) => l.status === col.id);
            return (
              <div key={col.id} className="kanban-column">
                <div className="kanban-column-header">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: col.color,
                      }}
                    ></div>
                    <h3 className="kanban-column-title">{col.title}</h3>
                    <span className="kanban-column-count">
                      {columnLeads.length}
                    </span>
                  </div>
                  <button className="btn-icon btn-sm">
                    <MoreVertical size={14} />
                  </button>
                </div>

                <div className="kanban-column-cards">
                  {columnLeads.length > 0 ? (
                    columnLeads.map((lead) => (
                      <div key={lead._id} className="kanban-card">
                        {(() => {
                          const property = lead.property || {};
                          const source = property.source;
                          const sourceClass = sourceColorMap[source] || "lbc";
                          const sourceLabel = sourceMap[source] || "N/A";
                          const price = property.price || 0;
                          const location =
                            property.location?.city || "Ville inconnue";
                          const nextAction =
                            lead.callbackAt || lead.appointmentAt;

                          return (
                            <>
                              <div className="kanban-card-source">
                                {lead.source === "live_radar" && (
                                  <span className="radar-live-badge-sm">
                                    LIVE
                                  </span>
                                )}
                                <span className={`source-badge ${sourceClass}`}>
                                  {sourceLabel}
                                </span>
                              </div>
                              <div className="kanban-card-image">
                                <Building2
                                  size={24}
                                  style={{
                                    opacity: 0.1,
                                    color: "var(--primary)",
                                  }}
                                />
                              </div>
                              <div className="kanban-card-body">
                                <h4 className="kanban-card-title">
                                  {property.title || "Bien sans titre"}
                                </h4>
                                <div className="kanban-card-location">
                                  <MapPin size={10} /> {location}
                                </div>
                                <div className="kanban-card-price">
                                  {price.toLocaleString("fr-FR")} €
                                </div>

                                {nextAction && (
                                  <div className="kanban-card-action">
                                    <Clock size={10} /> {String(nextAction)}
                                  </div>
                                )}
                              </div>
                              <div className="kanban-card-footer">
                                <button className="btn-icon btn-sm">
                                  <MessageSquare size={13} />
                                </button>
                                <button
                                  className="btn-icon btn-sm"
                                  style={{
                                    background: "var(--primary-bg)",
                                    color: "var(--primary)",
                                  }}
                                >
                                  <Phone size={13} />
                                </button>
                              </div>
                            </>
                          );
                        })()}
                      </div>
                    ))
                  ) : (
                    <div className="kanban-empty">
                      <Info
                        size={24}
                        style={{ opacity: 0.1, marginBottom: "8px" }}
                      />
                      <p>Aucun lead</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
