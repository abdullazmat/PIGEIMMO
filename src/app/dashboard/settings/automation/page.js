"use client";

import { useState } from "react";
import {
  Bot,
  RefreshCw,
  Bell,
  Target,
  MapPin,
  ChevronRight,
  Save,
  Info,
} from "lucide-react";

export default function AutomationPage() {
  const [autoMessage, setAutoMessage] = useState(true);
  const [autoSort, setAutoSort] = useState(true);
  const [autoVoicemail, setAutoVoicemail] = useState(false);

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">AUTOMATISATION</h1>
          <p className="page-subtitle">
            Configurez les comportements automatiques de votre CRM
          </p>
        </div>
        <div className="page-actions">
          <button className="btn btn-primary">
            <Save size={16} /> Enregistrer
          </button>
        </div>
      </div>

      <div className="settings-grid">
        {/* AI Configuration */}
        <div className="automation-card">
          <h3 className="section-title" style={{ marginBottom: "20px" }}>
            <Bot size={18} style={{ color: "var(--purple)" }} /> Assistant IA
          </h3>

          <div className="automation-list">
            <div className="automation-item">
              <div className="automation-info">
                <div className="automation-label">Messages automatiques</div>
                <div className="automation-desc">
                  L&apos;IA envoie automatiquement un premier message aux leads
                </div>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={autoMessage}
                  onChange={() => setAutoMessage(!autoMessage)}
                />
                <span className="toggle-slider" />
              </label>
            </div>

            <div className="automation-item">
              <div className="automation-info">
                <div className="automation-label">
                  Tri automatique des leads
                </div>
                <div className="automation-desc">
                  L&apos;IA classe les leads par température (Hot/Warm/Cold)
                </div>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={autoSort}
                  onChange={() => setAutoSort(!autoSort)}
                />
                <span className="toggle-slider" />
              </label>
            </div>

            <div className="automation-item">
              <div className="automation-info">
                <div className="automation-label">Dépôt vocal automatique</div>
                <div className="automation-desc">
                  Dépose un vocal quand le contact ne répond pas
                </div>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={autoVoicemail}
                  onChange={() => setAutoVoicemail(!autoVoicemail)}
                />
                <span className="toggle-slider" />
              </label>
            </div>
          </div>
        </div>

        {/* Scraping Configuration */}
        <div className="automation-card">
          <h3 className="section-title" style={{ marginBottom: "20px" }}>
            <RefreshCw size={18} style={{ color: "var(--primary)" }} />{" "}
            Configuration Scraping
          </h3>

          <div className="automation-list">
            <div className="automation-input-group">
              <label className="automation-label">Fréquence de scraping</label>
              <select
                className="filter-select"
                style={{ width: "100%", padding: "10px" }}
              >
                <option>Toutes les 2 minutes</option>
                <option>Toutes les 5 minutes</option>
                <option>Toutes les 10 minutes</option>
                <option>Toutes les 30 minutes</option>
              </select>
            </div>

            <div className="automation-input-group">
              <label className="automation-label">Plateformes actives</label>
              <div className="platforms-checklist">
                {["Leboncoin", "PAP", "SeLoger", "Paru Vendu", "Bien'ici"].map(
                  (p) => (
                    <label key={p} className="check-item">
                      <input type="checkbox" defaultChecked={true} />
                      <span>{p}</span>
                    </label>
                  ),
                )}
              </div>
            </div>

            <div className="automation-input-group">
              <label className="automation-label">Zone géographique</label>
              <div className="search-input-wrapper">
                <MapPin
                  size={16}
                  style={{
                    position: "absolute",
                    left: "12px",
                    color: "var(--text-muted)",
                  }}
                />
                <input
                  type="text"
                  className="filter-search"
                  style={{ width: "100%", paddingLeft: "40px" }}
                  placeholder="Ex: Lyon, Paris 11ème, Bordeaux..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="automation-card">
          <h3 className="section-title" style={{ marginBottom: "20px" }}>
            <Bell size={18} style={{ color: "var(--warning)" }} /> Notifications
          </h3>
          <div className="automation-list">
            {[
              "Nouveau lead Live Radar",
              "Message reçu d'un prospect",
              "RDV à venir (rappel)",
              "Lead attribué par un autre agent",
              "Résumé quotidien",
            ].map((n) => (
              <label key={n} className="check-card">
                <input type="checkbox" defaultChecked={true} />
                <div className="check-card-info">
                  <span>{n}</span>
                </div>
                <ChevronRight
                  size={14}
                  style={{ marginLeft: "auto", opacity: 0.3 }}
                />
              </label>
            ))}
          </div>
        </div>

        {/* Pipeline Configuration */}
        <div className="automation-card">
          <h3 className="section-title" style={{ marginBottom: "20px" }}>
            <Target size={18} style={{ color: "var(--info)" }} /> Configuration
            Pipeline
          </h3>
          <div className="automation-list">
            <div className="automation-input-group">
              <label className="automation-label">
                Ville principale de travail
              </label>
              <select
                className="filter-select"
                style={{ width: "100%", padding: "10px" }}
              >
                <option>Lyon</option>
                <option>Paris</option>
                <option>Marseille</option>
                <option>Bordeaux</option>
                <option>Toulouse</option>
                <option>Nantes</option>
                <option>Strasbourg</option>
                <option>Nice</option>
              </select>
              <div
                className="alert-inline warning"
                style={{ marginTop: "12px" }}
              >
                <Info size={14} />
                <span>3 autres agents IAD travaillent sur Lyon</span>
              </div>
            </div>

            <div className="automation-input-group">
              <label className="automation-label">Rayon de recherche</label>
              <div className="radius-selector">
                {["5", "10", "20", "50"].map((r) => (
                  <button
                    key={r}
                    className={`radius-btn ${r === "10" ? "active" : ""}`}
                  >
                    {r} km
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
