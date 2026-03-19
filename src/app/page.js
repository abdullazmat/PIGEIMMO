"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Zap,
  Radar,
  Bot,
  Phone,
  BarChart3,
  Workflow,
  Sparkles,
  ChevronRight,
  ArrowRight,
  Play,
  CheckCircle2,
  Menu,
  X,
  Quote,
  Clock3,
  ShieldCheck,
} from "lucide-react";

const platforms = [
  { name: "Leboncoin", icon: "LB", color: "#FF6E14" },
  { name: "SeLoger", icon: "SL", color: "#E4003A" },
  { name: "PAP", icon: "PAP", color: "#10B981" },
  { name: "Paru Vendu", icon: "PV", color: "#2563EB" },
  { name: "Bien'ici", icon: "BI", color: "#059669" },
];

const featureCards = [
  {
    icon: <Radar size={20} />,
    title: "Live Radar Local",
    text: "Détectez les nouvelles annonces en moins de 5 minutes selon vos communes et vos critères exacts.",
  },
  {
    icon: <Phone size={20} />,
    title: "Dialer Assisté IA",
    text: "Enchainez les appels avec scripts dynamiques, historique synchronisé et résumés automatiques.",
  },
  {
    icon: <Bot size={20} />,
    title: "Cockpit Conversationnel",
    text: "Réponses automatiques WhatsApp, SMS et portails avec escalade vers humain quand il faut.",
  },
  {
    icon: <Workflow size={20} />,
    title: "Pipeline Visuel",
    text: "Suivez vos leads de la détection à la signature, avec relances intelligentes et alertes actionnables.",
  },
  {
    icon: <BarChart3 size={20} />,
    title: "Score de Priorité",
    text: "Classement des propriétaires selon potentiel de mandat et probabilité de conversion terrain.",
  },
  {
    icon: <ShieldCheck size={20} />,
    title: "Conformité Intégrée",
    text: "Journal d'activité, consentement et scripts encadrés pour une prospection plus sereine.",
  },
];

const steps = [
  {
    title: "Connectez vos sources",
    text: "Choisissez vos plateformes et votre zone de prospection en moins de 10 minutes.",
  },
  {
    title: "Priorisez automatiquement",
    text: "Le moteur IA qualifie les leads et remonte ceux à appeler en premier.",
  },
  {
    title: "Transformez en mandats",
    text: "Scénarios de relance et suivi d'opportunités pour ne rien laisser passer.",
  },
];

const testimonials = [
  {
    name: "Mélanie R.",
    city: "IAD - Lyon 7",
    quote:
      "En 6 semaines, j'ai doublé mon volume de rendez-vous vendeur sans rallonger mes journées.",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120",
  },
  {
    name: "Yassine K.",
    city: "IAD - Toulouse",
    quote:
      "Le Radar me permet d'être le premier à appeler. Le gain de vitesse est impressionnant sur le terrain.",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=120",
  },
  {
    name: "Claire D.",
    city: "IAD - Nantes",
    quote:
      "On sent que l'outil a été pensé pour des agents, pas juste pour faire joli en démo.",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=120",
  },
];

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const closeOnDesktop = () => {
      if (window.innerWidth > 1024) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", closeOnDesktop);
    return () => window.removeEventListener("resize", closeOnDesktop);
  }, []);

  return (
    <div className="home-page">
      <nav className={`home-nav ${scrolled ? "scrolled" : ""}`}>
        <div className="home-nav-inner">
          <Link href="/" className="home-logo">
            <div className="home-logo-icon">
              <Zap size={18} fill="currentColor" />
            </div>
            <span className="home-logo-text">PIGE IMMO</span>
          </Link>

          <div className="home-nav-links">
            <a href="#features">Fonctionnalités</a>
            <a href="#how">Méthode</a>
            <a href="#platforms">Plateformes</a>
            <a href="#avis">Avis clients</a>
          </div>

          <div className="home-nav-actions">
            <Link href="/login" className="home-btn-ghost">
              Connexion
            </Link>
            <Link href="/signup" className="home-btn-primary">
              Essai gratuit
              <ChevronRight size={14} />
            </Link>
            <button
              type="button"
              className="home-mobile-toggle"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Ouvrir le menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        <div className={`home-mobile-menu ${mobileOpen ? "open" : ""}`}>
          <a href="#features" onClick={() => setMobileOpen(false)}>
            Fonctionnalités
          </a>
          <a href="#how" onClick={() => setMobileOpen(false)}>
            Méthode
          </a>
          <a href="#platforms" onClick={() => setMobileOpen(false)}>
            Plateformes
          </a>
          <a href="#avis" onClick={() => setMobileOpen(false)}>
            Avis clients
          </a>
          <Link href="/login" onClick={() => setMobileOpen(false)}>
            Connexion
          </Link>
        </div>
      </nav>

      <section className="home-hero">
        <div className="home-hero-backdrop">
          <div className="home-orb home-orb-a" />
          <div className="home-orb home-orb-b" />
          <div className="home-noise" />
        </div>

        <div className="home-shell home-hero-grid">
          <div>
            <div className="home-hero-badge">
              <Sparkles size={14} />
              Prospecter mieux, sans sacrifier vos soirées
            </div>

            <h1 className="home-hero-title">
              Le CRM immo qui vous aide a passer de <span>lead froid</span> a
              mandat signe.
            </h1>

            <p className="home-hero-subtitle">
              Un seul cockpit pour capter les annonces, appeler au bon moment et
              piloter votre pipeline avec clarté.
            </p>

            <div className="home-hero-actions">
              <Link href="/signup" className="home-btn-hero">
                Commencer maintenant
                <ArrowRight size={18} />
              </Link>
              <a href="#how" className="home-btn-hero-outline">
                <Play size={16} fill="currentColor" />
                Voir la méthode
              </a>
            </div>

            <div className="home-metrics-row">
              <div className="home-metric">
                <div className="home-metric-value">250K+</div>
                <div className="home-metric-label">Leads detectes</div>
              </div>
              <div className="home-metric">
                <div className="home-metric-value">12.4s</div>
                <div className="home-metric-label">
                  Temps moyen avant action
                </div>
              </div>
              <div className="home-metric">
                <div className="home-metric-value">98%</div>
                <div className="home-metric-label">Agents satisfaits</div>
              </div>
            </div>
          </div>

          <div className="home-hero-visual-wrap">
            <div className="home-hero-card">
              <div className="home-hero-card-head">
                <span>Live board - Secteur Lyon Est</span>
                <span className="home-live-dot">Actif</span>
              </div>
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000"
                alt="Dashboard immobilier moderne"
                className="home-hero-image"
              />
              <div className="home-hero-card-kpis">
                <div>
                  <strong>12</strong>
                  <span>Leads chauds</span>
                </div>
                <div>
                  <strong>5</strong>
                  <span>RDV poses</span>
                </div>
                <div>
                  <strong>2</strong>
                  <span>Mandats du jour</span>
                </div>
              </div>
            </div>

            <div className="home-floating-note">
              <Clock3 size={14} />
              Nouveau bien detecte a Meyzieu il y a 3 min
            </div>
          </div>
        </div>
      </section>

      <section id="platforms" className="home-platforms">
        <div className="home-shell">
          <p className="home-section-eyebrow">Sources connectees</p>
          <div className="home-platform-grid">
            {platforms.map((platform) => (
              <div key={platform.name} className="home-platform-card">
                <div
                  className="home-platform-chip"
                  style={{
                    color: platform.color,
                    borderColor: `${platform.color}40`,
                  }}
                >
                  {platform.icon}
                </div>
                <h3>{platform.name}</h3>
                <p>Flux annonces synchronise en continu</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="home-features">
        <div className="home-shell">
          <p className="home-section-eyebrow">Fonctionnalites</p>
          <h2 className="home-section-title">
            Des outils pensés pour des journées de terrain, pas pour des slides.
          </h2>

          <div className="home-feature-grid">
            {featureCards.map((card) => (
              <article key={card.title} className="home-feature-card">
                <div className="home-feature-icon">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="how" className="home-how">
        <div className="home-shell home-how-grid">
          <div>
            <p className="home-section-eyebrow">Methode claire</p>
            <h2 className="home-section-title">
              Un process simple, applique chaque jour.
            </h2>
            <div className="home-step-list">
              {steps.map((step, index) => (
                <article key={step.title} className="home-step-item">
                  <span>{`0${index + 1}`}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="home-how-image-card">
            <img
              src="https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=1200"
              alt="Agent immobilier en rendez-vous"
            />
            <div className="home-how-image-overlay">
              <div>
                <strong>+31%</strong>
                <span>de mandats en moyenne apres 60 jours</span>
              </div>
              <CheckCircle2 size={20} />
            </div>
          </div>
        </div>
      </section>

      <section id="avis" className="home-testimonials">
        <div className="home-shell">
          <p className="home-section-eyebrow">Avis agents</p>
          <div className="home-testimonial-grid">
            {testimonials.map((item) => (
              <article key={item.name} className="home-testimonial-card">
                <Quote size={18} />
                <p>{item.quote}</p>
                <div className="home-testimonial-person">
                  <img src={item.avatar} alt={item.name} />
                  <div>
                    <strong>{item.name}</strong>
                    <span>{item.city}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-cta">
        <div className="home-shell">
          <div className="home-cta-panel">
            <div>
              <p className="home-section-eyebrow">Pret a passer un cap ?</p>
              <h2>
                Essayez PIGE IMMO avec votre secteur reel pendant 14 jours.
              </h2>
            </div>
            <div className="home-cta-actions">
              <Link href="/signup" className="home-btn-hero">
                Lancer mon essai
                <ArrowRight size={18} />
              </Link>
              <Link href="/login" className="home-btn-hero-outline">
                Se connecter
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="home-footer">
        <div className="home-shell home-footer-row">
          <div className="home-logo">
            <div className="home-logo-icon">
              <Zap size={18} fill="currentColor" />
            </div>
            <span className="home-logo-text">PIGE IMMO</span>
          </div>
          <div className="home-footer-links">
            <a href="#">Conditions</a>
            <a href="#">Confidentialite</a>
            <a href="#">Support</a>
            <a href="#">Blog</a>
          </div>
          <p>© 2026 PIGE IMMO - Fait pour les agents qui veulent avancer.</p>
        </div>
      </footer>
    </div>
  );
}
