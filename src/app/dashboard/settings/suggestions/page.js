"use client";

import {
  Target,
  Phone,
  Bot,
  Calendar,
  TrendingUp,
  Zap,
  ArrowRight,
} from "lucide-react";

const suggestions = [
  {
    icon: <Target size={20} />,
    title: "Focaliser sur Bordeaux",
    desc: "Seulement 1 agent IAD travaille sur Bordeaux. Le marché est moins saturé avec un potentiel de +40% de mandats.",
    category: "Territoire",
    color: "var(--info)",
  },
  {
    icon: <Phone size={20} />,
    title: "Rappeler Jean-Marc Leblanc",
    desc: "Ce lead est chaud — dernière interaction il y a 5 min. Le taux de conversion est optimal dans l'heure qui suit.",
    category: "Lead",
    color: "var(--danger)",
  },
  {
    icon: <Bot size={20} />,
    title: "Activer les réponses IA pour WhatsApp",
    desc: "Vous avez 3 messages WhatsApp non répondus. L'IA peut gérer ces conversations avec un taux de satisfaction de 89%.",
    category: "Automatisation",
    color: "var(--purple)",
  },
  {
    icon: <TrendingUp size={20} />,
    title: "Le prix a baissé sur 2 biens favoris",
    desc: "T2 rénové Bordeaux (245 000€ → 235 000€) et Villa Aix-en-Provence (890 000€ → 860 000€). Bonne opportunité de relance.",
    category: "Marché",
    color: "var(--success)",
  },
  {
    icon: <Calendar size={20} />,
    title: "Optimiser votre agenda",
    desc: "Vous avez 2 créneaux libres demain après-midi. L'IA peut proposer des visites aux leads en attente de RDV.",
    category: "Productivité",
    color: "var(--warning)",
  },
];

export default function SuggestionsPage() {
  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">SUGGESTIONS</h1>
          <p className="page-subtitle">
            Suggestions de l&apos;IA pour améliorer votre prospection
          </p>
        </div>
        <div className="page-actions">
          <button className="btn btn-secondary">
            <Zap size={16} /> Tout appliquer
          </button>
        </div>
      </div>

      <div className="suggestions-list">
        {suggestions.map((s, i) => (
          <div key={i} className="suggestion-card">
            <div
              className="suggestion-icon"
              style={{ background: `${s.color}15`, color: s.color }}
            >
              {s.icon}
            </div>
            <div className="suggestion-content">
              <div className="suggestion-header">
                <h3 className="suggestion-title">{s.title}</h3>
                <span className="suggestion-category">{s.category}</span>
              </div>
              <p className="suggestion-desc">{s.desc}</p>
            </div>
            <div className="suggestion-actions">
              <button className="btn btn-primary btn-sm">
                Appliquer <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
