"use client";

import { useEffect, useState } from "react";
import { demoLeads } from "@/lib/demoData";
import {
  Phone,
  PhoneOff,
  Bot,
  Clock,
  CheckCircle2,
  RefreshCw,
  X,
  MapPin,
  Building2,
  Calendar,
  History,
  Users,
  MoreVertical,
  Shield,
  Mic,
  Volume2,
  ChevronDown,
} from "lucide-react";

export default function DialerPage() {
  const [activeCall, setActiveCall] = useState(demoLeads[0]);
  const [isCalling, setIsCalling] = useState(false);
  const [showScript, setShowScript] = useState(true);
  const [callSeconds, setCallSeconds] = useState(0);

  const activeProperty = activeCall?.property;
  const activeContactName = activeProperty?.owner?.name || "Contact inconnu";
  const activeContactShort = activeContactName
    .split(" ")
    .map((n) => n[0])
    .join("");
  const activeLastName = activeContactName.split(" ")[1] || activeContactName;
  const activeLocation =
    activeProperty?.location?.city || "Localisation inconnue";
  const activeTitle = activeProperty?.title || "Bien non défini";
  const activePrice = activeProperty?.price || 0;

  useEffect(() => {
    if (!isCalling) return;

    const timer = setInterval(() => {
      setCallSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isCalling]);

  const callTimer = new Date(callSeconds * 1000).toISOString().slice(14, 19);

  return (
    <div className="dialer-container">
      {/* Left - Active Call */}
      <div className="dialer-active-panel">
        <div className="active-call-card">
          <div className="dialer-top-strip">
            <div className="dialer-strip-item">
              <span className="dialer-strip-label">File active</span>
              <strong>{demoLeads.length} contacts</strong>
            </div>
            <div className="dialer-strip-item">
              <span className="dialer-strip-label">Objectif</span>
              <strong>12 appels aujourd&apos;hui</strong>
            </div>
            <div className="dialer-strip-item">
              <span className="dialer-strip-label">Rythme</span>
              <strong>{isCalling ? "En communication" : "Prêt"}</strong>
            </div>
          </div>

          <div className="active-call-header">
            <div className="active-call-avatar">{activeContactShort}</div>
            <div className="active-call-info">
              <h2 className="active-call-name">{activeContactName}</h2>
              <div className="active-call-location">
                <MapPin size={12} /> {activeLocation}
              </div>
              <div className="active-call-status">
                {isCalling ? (
                  <span className="calling-pulse">
                    Appel en cours... {callTimer}
                  </span>
                ) : (
                  <span className="ready-status">Prêt à appeler</span>
                )}
              </div>
            </div>
            <div className="active-call-actions">
              <button className="btn-icon circle">
                <Shield size={18} />
              </button>
              <button className="btn-icon circle">
                <MoreVertical size={18} />
              </button>
            </div>
          </div>

          <div className="active-call-property">
            <div className="property-mini-card">
              <div className="property-mini-thumb">
                <Building2
                  size={24}
                  style={{ opacity: 0.1, color: "var(--primary)" }}
                />
              </div>
              <div className="property-mini-info">
                <div className="property-mini-title">{activeTitle}</div>
                <div className="property-mini-price">
                  {activePrice.toLocaleString("fr-FR")} €
                </div>
              </div>
            </div>
          </div>

          <div className="dialer-controls">
            {!isCalling ? (
              <button
                className="btn-call-large"
                onClick={() => {
                  setCallSeconds(0);
                  setIsCalling(true);
                }}
              >
                <Phone size={24} fill="currentColor" />
              </button>
            ) : (
              <div className="calling-controls">
                <button className="btn-control mute">
                  <Mic size={20} />
                </button>
                <button className="btn-control speaker">
                  <Volume2 size={20} />
                </button>
                <button
                  className="btn-end-large"
                  onClick={() => {
                    setIsCalling(false);
                    setCallSeconds(0);
                  }}
                >
                  <PhoneOff size={24} fill="currentColor" />
                </button>
              </div>
            )}
          </div>

          <div className="call-outcomes-grid">
            <button className="outcome-btn no-answer">
              <Clock size={16} /> Pas de réponse
            </button>
            <button className="outcome-btn wrong-number">
              <X size={16} /> Faux numéro
            </button>
            <button className="outcome-btn preoccupied">
              <Clock size={16} /> Occupé
            </button>
            <button className="outcome-btn voicemail">
              <Volume2 size={16} /> Dépôt vocal IA
            </button>
            <button className="outcome-btn interested">
              <CheckCircle2 size={16} /> Intéressé
            </button>
            <button className="outcome-btn rdv">
              <Calendar size={16} /> RDV pris
            </button>
          </div>

          <div className="dialer-notes">
            <div className="notes-header">
              <FileText size={16} /> NOTES D&apos;APPEL
            </div>
            <textarea
              placeholder="Prendre des notes pendant l'appel..."
              className="notes-input"
            />
          </div>
        </div>
      </div>

      {/* Right - AI Script & Queue */}
      <div className="dialer-side-panel">
        <div className="script-container">
          <div className="panel-header">
            <div className="section-title">
              <Bot size={18} /> SCRIPT GÉNÉRÉ PAR IA
            </div>
            <button
              className="btn-icon btn-sm"
              onClick={() => setShowScript(!showScript)}
            >
              {showScript ? (
                <ChevronDown size={14} />
              ) : (
                <ChevronDown
                  size={14}
                  style={{ transform: "rotate(-90deg)" }}
                />
              )}
            </button>
          </div>
          {showScript && (
            <div className="script-body">
              <div className="script-step">
                <div className="step-num">1</div>
                <div className="step-content">
                  <strong>Bonjour Monsieur {activeLastName},</strong>
                  <p>
                    Je vous contacte suite à votre annonce pour {activeTitle}.
                    Vous êtes bien le propriétaire ?
                  </p>
                </div>
              </div>
              <div className="script-step">
                <div className="step-num">2</div>
                <div className="step-content">
                  <strong>Objectif : Confirmation</strong>
                  <p>
                    Est-ce que le bien est toujours disponible ? J&apos;ai
                    plusieurs clients en recherche sur ce secteur qui pourraient
                    être intéressés.
                  </p>
                </div>
              </div>
              <div className="script-step">
                <div className="step-num">3</div>
                <div className="step-content">
                  <strong>Objectif : RDV Visite</strong>
                  <p>
                    Quelles seraient vos disponibilités cette semaine pour une
                    estimation gratuite et sans engagement ?
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="queue-container">
          <div className="panel-header">
            <div className="section-title">
              <Users size={18} /> FILE D&apos;ATTENTE (4)
            </div>
            <button className="btn-icon btn-sm">
              <RefreshCw size={14} />
            </button>
          </div>
          <div className="queue-list">
            {demoLeads.slice(1, 5).map((lead) => (
              <div
                key={lead._id}
                className={`queue-item ${activeCall?._id === lead._id ? "active" : ""}`}
                onClick={() => setActiveCall(lead)}
              >
                <div className="queue-item-info">
                  <div className="queue-item-name">
                    {lead.property?.owner?.name || "Contact inconnu"}
                  </div>
                  <div className="queue-item-loc">
                    {lead.property?.location?.city || "Ville inconnue"}
                  </div>
                </div>
                <div className="queue-item-action">
                  <button className="btn-icon circle btn-sm">
                    <Phone size={12} fill="currentColor" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper to avoid FileText error
const FileText = ({ size }) => <History size={size} />;
