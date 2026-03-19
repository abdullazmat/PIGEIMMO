"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  User,
  ChevronRight,
  Bot,
  Zap,
  Clock,
  Target,
} from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleDemoLogin = async (type) => {
    setLoading(true);
    setError("");
    let credentials = {};
    if (type === "agent")
      credentials = { email: "agent@pigeimmo.fr", password: "demo123" };
    else if (type === "admin")
      credentials = { email: "admin@pigeimmo.fr", password: "admin123" };
    else credentials = { email: "manager@pigeimmo.fr", password: "manager123" };

    const result = await login(credentials.email, credentials.password);
    if (result.success) router.push("/dashboard");
    else setError(result.error || "Erreur lors de la connexion démo");
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await login(email, password);
    if (result.success) router.push("/dashboard");
    else setError(result.error || "Email ou mot de passe incorrect");
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-left-glow" />
        <Link
          href="/"
          className="landing-logo"
          style={{ position: "absolute", top: "40px", left: "40px" }}
        >
          <div className="landing-logo-icon">
            <Zap size={18} fill="currentColor" />
          </div>
          <span className="landing-logo-text" style={{ color: "white" }}>
            PIGE IMMO
          </span>
        </Link>

        <div className="auth-left-content">
          <h1 className="auth-left-title">
            L&apos;IA qui transforme votre{" "}
            <span className="text-gradient">pige immobilière</span>.
          </h1>
          <p className="auth-left-text">
            Rejoignez plus de 2 500 agents IAD qui utilisent notre plateforme
            pour détecter les meilleurs mandats en temps réel.
          </p>

          <div className="auth-left-features">
            <div className="auth-left-feature">
              <div className="auth-left-feature-check">
                <CheckCircle2 size={12} strokeWidth={3} />
              </div>
              <span>Radar Live &lt; 5 minutes</span>
            </div>
            <div className="auth-left-feature">
              <div className="auth-left-feature-check">
                <CheckCircle2 size={12} strokeWidth={3} />
              </div>
              <span>Bot IA pour SMS & WhatsApp</span>
            </div>
            <div className="auth-left-feature">
              <div className="auth-left-feature-check">
                <CheckCircle2 size={12} strokeWidth={3} />
              </div>
              <span>Sync Google Calendar & Dialer</span>
            </div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "40px",
            color: "#64748b",
            fontSize: "13px",
          }}
        >
          © 2026 PIGE IMMO — Système de prospection avancé
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-form-container">
          <div className="auth-form-header">
            <h2 className="auth-form-title">Bon retour !</h2>
            <p className="auth-form-subtitle">
              Vous n&apos;avez pas de compte ?{" "}
              <Link href="/signup" className="auth-link">
                Inscrivez-vous
              </Link>
            </p>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div>
              <label className="auth-label">Email professionnel</label>
              <div className="auth-input-wrapper">
                <Mail className="auth-input-icon" size={18} />
                <input
                  type="email"
                  placeholder="votre@email.com"
                  className="auth-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="auth-label">Mot de passe</label>
              <div className="auth-input-wrapper">
                <Lock className="auth-input-icon" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="auth-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="auth-input-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="auth-options">
              <label className="auth-checkbox-label">
                <input
                  type="checkbox"
                  style={{ accentColor: "var(--primary)" }}
                />
                Se souvenir de moi
              </label>
              <Link href="#" className="auth-link" style={{ fontSize: "14px" }}>
                Mot de passe oublié ?
              </Link>
            </div>

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? (
                <div className="auth-spinner" />
              ) : (
                <>
                  Se connecter <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="auth-demo-section">
            <div className="auth-demo-divider">
              OU TESTEZ AVEC UN COMPTE DÉMO
            </div>
            <div className="auth-demo-cards">
              <button
                className="auth-demo-card"
                onClick={() => handleDemoLogin("agent")}
              >
                <div
                  className="auth-demo-avatar"
                  style={{
                    background: "var(--primary-bg)",
                    color: "var(--primary)",
                  }}
                >
                  <User size={18} />
                </div>
                <div className="auth-demo-info">
                  <div className="auth-demo-name">Agent Immobilier</div>
                  <div className="auth-demo-role">
                    Accès complet à la prospection
                  </div>
                </div>
                <ChevronRight size={16} className="auth-demo-arrow" />
              </button>
              <button
                className="auth-demo-card"
                onClick={() => handleDemoLogin("admin")}
              >
                <div
                  className="auth-demo-avatar"
                  style={{
                    background: "var(--success-bg)",
                    color: "var(--success)",
                  }}
                >
                  <ShieldCheck size={18} />
                </div>
                <div className="auth-demo-info">
                  <div className="auth-demo-name">Administrateur</div>
                  <div className="auth-demo-role">
                    Gestion d&apos;équipe & Paramètres
                  </div>
                </div>
                <ChevronRight size={16} className="auth-demo-arrow" />
              </button>
              <button
                className="auth-demo-card"
                onClick={() => handleDemoLogin("manager")}
              >
                <div
                  className="auth-demo-avatar"
                  style={{ background: "var(--info-bg)", color: "var(--info)" }}
                >
                  <Sparkles size={18} />
                </div>
                <div className="auth-demo-info">
                  <div className="auth-demo-name">Manager IAD</div>
                  <div className="auth-demo-role">
                    Suivi des performances & KPIs
                  </div>
                </div>
                <ChevronRight size={16} className="auth-demo-arrow" />
              </button>
            </div>

            <div className="auth-demo-credentials">
              <div className="auth-demo-cred-title">
                <Clock
                  size={14}
                  className="spinning"
                  style={{ display: "inline", marginRight: "4px" }}
                />{" "}
                Codes d&apos;accès démo :
              </div>
              <div className="auth-demo-cred-row">
                Agent : <code>agent@pigeimmo.fr</code> / <code>demo123</code>
              </div>
              <div className="auth-demo-cred-row">
                Admin : <code>admin@pigeimmo.fr</code> / <code>admin123</code>
              </div>
              <div className="auth-demo-cred-row">
                Manager : <code>manager@pigeimmo.fr</code> /{" "}
                <code>manager123</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
