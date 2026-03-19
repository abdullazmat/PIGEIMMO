"use client";

import {
  History,
  Calendar,
  Filter,
  Search,
  Phone,
  MessageSquare,
  Target,
  User,
  Building2,
  MapPin,
  ChevronDown,
  Download,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";

const historyData = [
  {
    id: 1,
    type: "Appel",
    date: "Aujourd'hui, 14:30",
    contact: "Jean-Marc Leblanc",
    status: "Raccroché",
    color: "var(--danger)",
  },
  {
    id: 2,
    type: "SMS",
    date: "Aujourd'hui, 11:15",
    contact: "Marie Dubois",
    status: "Répondu",
    color: "var(--success)",
  },
  {
    id: 3,
    type: "RDV",
    date: "Hier, 16:00",
    contact: "Pierre Martin",
    status: "Confirmé",
    color: "var(--info)",
  },
  {
    id: 4,
    type: "Scraping",
    date: "Hier, 09:45",
    contact: "Leboncoin",
    status: "12 nouveaux biens",
    color: "var(--primary)",
  },
];

export default function LeadsHistoryPage() {
  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">HISTORIQUE</h1>
          <p className="page-subtitle">
            Toutes vos actions passées sur les leads
          </p>
        </div>
        <div className="page-actions">
          <button className="btn btn-secondary">
            <Download size={16} /> Exporter PDF
          </button>
        </div>
      </div>

      <div className="pipeline-controls">
        <div className="controls-left">
          <div className="header-search control-search">
            <Search size={16} />
            <input type="text" placeholder="Rechercher..." />
          </div>
          <button className="filter-tag active">Tous</button>
          <button className="filter-tag">Appels</button>
          <button className="filter-tag">SMS</button>
          <button className="filter-tag">RDVs</button>
        </div>
        <button className="btn btn-secondary">
          <Calendar size={16} /> Trier par date
        </button>
      </div>

      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Date & Heure</th>
              <th>Contact / Source</th>
              <th>Statut</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {historyData.map((item) => (
              <tr key={item.id}>
                <td>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontWeight: 600,
                    }}
                  >
                    {item.type === "Appel" && <Phone size={14} />}
                    {item.type === "SMS" && <MessageSquare size={14} />}
                    {item.type === "RDV" && <Calendar size={14} />}
                    {item.type === "Scraping" && <RefreshCw size={14} />}
                    {item.type}
                  </div>
                </td>
                <td style={{ color: "var(--text-muted)" }}>{item.date}</td>
                <td>
                  <div style={{ fontWeight: 600 }}>{item.contact}</div>
                </td>
                <td>
                  <span
                    style={{
                      color: item.color,
                      fontWeight: 700,
                      fontSize: "11px",
                      textTransform: "uppercase",
                    }}
                  >
                    {item.status}
                  </span>
                </td>
                <td style={{ textAlign: "right" }}>
                  <button className="btn-icon btn-sm">
                    <ChevronDown size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

// Support RefreshCw
const RefreshCw = ({ size }) => <History size={size} />;
