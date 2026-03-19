"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  demoKPIs,
  demoPlatforms,
  demoProperties,
  demoRadarLeads,
} from "@/lib/demoData";
import {
  Home as HomeIcon,
  Users,
  Phone,
  Calendar,
  FileText,
  Volume2,
  TrendingUp,
  BarChart3,
  ArrowUpRight,
  Eye,
  MessageSquare,
  PhoneCall,
  Radar,
  RefreshCw,
  X,
  Zap,
  Star,
  Target,
  Bot,
  Tag,
  Key,
  MapPin,
  CheckCircle2,
  AlarmClock,
  BriefcaseBusiness,
} from "lucide-react";

const kpiConfig = [
  {
    icon: <Users size={20} />,
    color: "#FF5722",
    bg: "#FFF3EE",
    label: "Propriétaires prospectés",
  },
  {
    icon: <Phone size={20} />,
    color: "#10B981",
    bg: "#ECFDF5",
    label: "Appels à passer",
  },
  {
    icon: <Calendar size={20} />,
    color: "#3B82F6",
    bg: "#EFF6FF",
    label: "RDV prévus",
  },
  {
    icon: <FileText size={20} />,
    color: "#8B5CF6",
    bg: "#F5F3FF",
    label: "Mandats signés",
  },
  {
    icon: <Volume2 size={20} />,
    color: "#F59E0B",
    bg: "#FFFBEB",
    label: "Vocaux déposés",
  },
];

function KPICard({ config, value, change, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`kpi-card ${hovered ? "hovered" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <div className="kpi-card-header">
        <div
          className="kpi-card-icon"
          style={{ background: config.bg, color: config.color }}
        >
          {config.icon}
        </div>
        <TrendingUp
          size={16}
          style={{
            color: "var(--success)",
            opacity: hovered ? 1 : 0.4,
            transition: "opacity 0.2s",
          }}
        />
      </div>
      <div className="kpi-card-value">
        {typeof value === "number" ? value.toLocaleString("fr-FR") : value}
      </div>
      <div className="kpi-card-label">{config.label}</div>
      {change && (
        <span
          className={`kpi-card-change ${change.startsWith("+") ? "positive" : "negative"}`}
        >
          {change}
        </span>
      )}
    </div>
  );
}

function PlatformCard({ platform, onClick }) {
  const icons = {
    Leboncoin: <Tag size={18} />,
    PAP: <Key size={18} />,
    SeLoger: <HomeIcon size={18} />,
    "Paru Vendu": <FileText size={18} />,
    "Bien'ici": <MapPin size={18} />,
  };
  const colors = {
    Leboncoin: "#FF6E14",
    PAP: "#10B981",
    SeLoger: "#E4003A",
    "Paru Vendu": "#2563EB",
    "Bien'ici": "#7C3AED",
  };

  return (
    <div
      className="platform-card"
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <div className="platform-logo">
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "10px",
            background: `${colors[platform.name]}14`,
            color: colors[platform.name],
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icons[platform.name]}
        </div>
        <span
          style={{ fontWeight: 700, fontSize: "14px", whiteSpace: "nowrap" }}
        >
          {platform.name}
        </span>
      </div>
      <div className="platform-stats">
        <div className="stat-item">
          <div className="platform-stat-value">
            {platform.total.toLocaleString("fr-FR")}
          </div>
          <div className="platform-stat-label">Total</div>
        </div>
        <div className="stat-item">
          <div className="platform-stat-change">+{platform.todayNew}</div>
          <div className="platform-stat-label">Aujourd&apos;hui</div>
        </div>
      </div>
      <span className={`badge-active ${!platform.active ? "inactive" : ""}`}>
        {platform.active ? "ACTIF" : "OFF"}
      </span>
    </div>
  );
}

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

function RadarPreview({ properties, onOpenRadar, onPropertyClick }) {
  return (
    <div className="data-table">
      <div className="data-table-header">
        <div className="section-title">
          <Radar size={18} style={{ color: "var(--primary)" }} />
          RADAR LIVE — DERNIERS BIENS PUBLIÉS
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              fontSize: "12px",
              color: "var(--success)",
              fontWeight: 600,
            }}
          >
            {properties.length} biens
          </span>
          <button className="btn-icon" onClick={onOpenRadar} title="Rafraîchir">
            <RefreshCw size={16} />
          </button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Photo</th>
            <th>Bien</th>
            <th>Ville</th>
            <th>Prix</th>
            <th>Temps</th>
            <th>Source</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((prop) => (
            <tr
              key={prop._id}
              onClick={() => onPropertyClick(prop)}
              style={{ cursor: "pointer" }}
            >
              <td>
                <div className="property-thumb">
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
                    <HomeIcon size={18} style={{ color: "white" }} />
                  )}
                </div>
              </td>
              <td>
                <div style={{ fontWeight: 600, marginBottom: "2px" }}>
                  {prop.title}
                </div>
                <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                  {prop.type} · {prop.surface}m²
                </div>
              </td>
              <td>{prop.location.city}</td>
              <td style={{ fontWeight: 700 }}>
                {prop.price.toLocaleString("fr-FR")} €
              </td>
              <td>
                <span
                  className={`time-badge ${prop.isNew ? "urgent" : "normal"}`}
                >
                  {prop.timeAgo}
                </span>
              </td>
              <td>
                <span className={`source-badge ${sourceColorMap[prop.source]}`}>
                  {sourceMap[prop.source]}
                </span>
              </td>
              <td>
                <div
                  className="action-group"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button className="btn btn-primary btn-sm">
                    <Target size={14} style={{ marginRight: "4px" }} />
                    ATTAQUER
                  </button>
                  <button className="btn-icon" title="SMS">
                    <MessageSquare size={14} />
                  </button>
                  <button className="btn-icon" title="Appeler">
                    <PhoneCall size={14} />
                  </button>
                  <button className="btn-icon" title="Transférer">
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RadarPanel({ isOpen, onClose, leads }) {
  return (
    <>
      {isOpen && <div className="overlay" onClick={onClose} />}
      <div className={`radar-panel ${isOpen ? "open" : ""}`}>
        <div className="radar-panel-header">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div className="radar-panel-title">
              <Zap size={18} /> RADAR PÉPITES{" "}
              <span className="radar-live-badge">LIVE</span>
            </div>
            <button
              className="btn-icon"
              onClick={onClose}
              style={{ color: "white" }}
            >
              <X size={18} />
            </button>
          </div>
          <div className="radar-panel-subtitle">
            Biens parfaits publiés il y a moins de 3 minutes
          </div>
        </div>
        <div className="radar-panel-body">
          {leads.map((lead) => (
            <div
              key={lead._id}
              className={`radar-lead-card ${lead.isNew ? "new" : ""}`}
            >
              {lead.isNew && <span className="radar-new-badge">NEW</span>}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "8px",
                  marginBottom: "4px",
                }}
              >
                <div className="radar-lead-image">
                  <img
                    src={
                      lead.isNew
                        ? "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=120"
                        : "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=120"
                    }
                    alt="Property"
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <div className="radar-lead-title">{lead.title}</div>
                  <div className="radar-lead-location">{lead.location}</div>
                </div>
              </div>
              <div className="radar-lead-price">
                {lead.price.toLocaleString("fr-FR")} €
              </div>
              <div className="radar-lead-meta">
                <span className="radar-lead-time">
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "var(--danger)",
                      display: "inline-block",
                      marginRight: "4px",
                    }}
                  />
                  Il y a {lead.timeAgo}
                </span>
                <span className="radar-lead-score">
                  <Star size={12} /> Score {lead.score}%
                </span>
              </div>
              <div className="radar-lead-actions">
                <button className="btn btn-primary">
                  <Target size={14} style={{ marginRight: "4px" }} />
                  ATTAQUER
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default function DashboardPage() {
  const [radarOpen, setRadarOpen] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const summaryCards = [
    {
      icon: <AlarmClock size={16} />,
      title: "Priorité du jour",
      value: `${demoKPIs.callsToDo} appels à traiter avant 17h`,
      tone: "warning",
    },
    {
      icon: <BriefcaseBusiness size={16} />,
      title: "Objectif hebdo",
      value: "3 mandats signés cette semaine",
      tone: "info",
    },
    {
      icon: <CheckCircle2 size={16} />,
      title: "Etat de la machine",
      value: "Scraping actif sur 4 sources",
      tone: "success",
    },
  ];

  const kpiValues = [
    { value: demoKPIs.prospectsCount, change: demoKPIs.prospectsChange },
    { value: demoKPIs.callsToDo, change: demoKPIs.callsUrgent },
    { value: demoKPIs.appointmentsPlanned, change: demoKPIs.appointmentsNote },
    { value: demoKPIs.mandatesSigned, change: demoKPIs.mandatesNote },
    { value: demoKPIs.voicemailsLeft, change: demoKPIs.voicemailsNote },
  ];

  const kpiRoutes = [
    "/dashboard/leads",
    "/dashboard/dialer",
    "/dashboard/calendar",
    "/dashboard/leads",
    "/dashboard/dialer",
  ];

  return (
    <>
      <section className="dashboard-overview-surface">
        <div className="page-header">
          <div>
            <h1 className="page-title">TABLEAU DE BORD</h1>
            <p className="page-subtitle">
              Bonjour <strong>{user?.name}</strong>, voici un résumé de votre
              activité
            </p>
          </div>
          <div className="page-actions">
            <button
              className="btn btn-primary"
              onClick={() => router.push("/dashboard/pipeline")}
            >
              <Radar size={16} />
              Lancer le scraping
            </button>
          </div>
        </div>

        <div className="dashboard-summary-grid">
          {summaryCards.map((card) => (
            <div
              key={card.title}
              className={`dashboard-summary-card ${card.tone}`}
            >
              <div className="dashboard-summary-icon">{card.icon}</div>
              <div>
                <p className="dashboard-summary-title">{card.title}</p>
                <p className="dashboard-summary-value">{card.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* KPI Cards */}
        <div className="kpi-grid">
          {kpiConfig.map((config, i) => (
            <KPICard
              key={i}
              config={config}
              value={kpiValues[i].value}
              change={kpiValues[i].change}
              onClick={() => router.push(kpiRoutes[i])}
            />
          ))}
        </div>

        {/* Platform Status */}
        <div className="dashboard-platform-wrap">
          <div className="platform-grid">
            {demoPlatforms.map((p) => (
              <PlatformCard
                key={p.name}
                platform={p}
                onClick={() => router.push("/dashboard/pipeline")}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Radar Preview Table */}
      <RadarPreview
        properties={demoProperties.slice(0, 5)}
        onOpenRadar={() => setRadarOpen(true)}
        onPropertyClick={() => router.push("/dashboard/pipeline")}
      />

      {/* Radar Panel */}
      <RadarPanel
        isOpen={radarOpen}
        onClose={() => setRadarOpen(false)}
        leads={demoRadarLeads}
      />

      {/* Floating Action Button */}
      <button
        className="fab"
        id="fab-chat"
        title="Cockpit AI"
        onClick={() => router.push("/dashboard/cockpit")}
      >
        <Bot size={22} />
      </button>
    </>
  );
}
