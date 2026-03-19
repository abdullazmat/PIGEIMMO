"use client";

import { useState } from "react";
import {
  Users,
  Gift,
  Mail,
  MessageSquare,
  Copy,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export default function ReferralPage() {
  const [email, setEmail] = useState("");

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">PARRAINER UN CONSEILLER</h1>
          <p className="page-subtitle">
            Invitez un nouveau conseiller IAD à rejoindre PIGE IMMO
          </p>
        </div>
      </div>

      <div className="referral-shell">
        <div className="referral-banner">
          <div className="banner-glow" />
          <div className="banner-content">
            <div className="banner-icon">
              <Gift size={48} />
            </div>
            <h2 className="banner-title">Gagnez 50 € par filleul</h2>
            <p className="banner-subtitle">
              Pour chaque conseiller qui s&apos;abonne, vous recevez une
              commission immédiate de 50 €
            </p>

            <div className="banner-code-box">
              <div className="code-label">VOTRE CODE DE PARRAINAGE</div>
              <div className="code-value">MARC2024</div>
              <button className="code-copy-btn">
                <Copy size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="referral-form-card">
          <h3 className="section-title" style={{ marginBottom: "24px" }}>
            <Mail size={18} style={{ color: "var(--primary)" }} /> ENVOYER UNE
            INVITATION
          </h3>

          <div className="referral-input-group">
            <div
              className="header-search"
              style={{
                border: "1px solid var(--border)",
                width: "100%",
                flex: 1,
              }}
            >
              <Mail size={16} style={{ color: "var(--text-muted)" }} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@conseiller-iad.fr"
              />
            </div>
            <button className="btn btn-primary">
              ENVOYER L&apos;INVITATION <ArrowRight size={16} />
            </button>
          </div>

          <div className="referral-social-grid">
            <button className="btn btn-secondary referral-social-btn">
              <MessageSquare size={18} style={{ color: "#25D366" }} /> WhatsApp
            </button>
            <button className="btn btn-secondary referral-social-btn">
              <Copy size={18} style={{ color: "var(--primary)" }} /> Copier le
              lien
            </button>
          </div>

          <div className="referral-info-alert">
            <TrendingUp size={16} />
            <span>
              Plus de 500 agents IAD utilisent déjà le parrainage pour financer
              leur abonnement.
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
