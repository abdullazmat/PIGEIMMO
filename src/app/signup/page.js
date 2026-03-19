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
  Building2,
  MapPinned,
  MessageSquarePlus,
  UserPlus,
} from "lucide-react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Le mot de passe doit faire au moins 6 caractères");
      setLoading(false);
      return;
    }

    const result = await signup(name, email, password);
    if (result.success) router.push("/dashboard");
    else setError(result.error || "Erreur lors de l&apos;inscription");
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
            Rejoignez le futur de la{" "}
            <span className="text-gradient">pige immobilière</span>.
          </h1>
          <p className="auth-left-text">
            Créez votre compte en moins de 60 secondes et commencez à recevoir
            des leads exclusifs dès maintenant.
          </p>

          <div className="auth-left-features">
            <div className="auth-left-feature">
              <div className="auth-left-feature-check">
                <CheckCircle2 size={12} strokeWidth={3} />
              </div>
              <span>Compte gratuit — aucun frais caché</span>
            </div>
            <div className="auth-left-feature">
              <div className="auth-left-feature-check">
                <CheckCircle2 size={12} strokeWidth={3} />
              </div>
              <span>+10 leads Live Radar offerts à l&apos;activation</span>
            </div>
            <div className="auth-left-feature">
              <div className="auth-left-feature-check">
                <CheckCircle2 size={12} strokeWidth={3} />
              </div>
              <span>Accès à l&apos;AI Cockpit pendant 14 jours</span>
            </div>
          </div>

          <div className="user-proof-card">
            <div style={{ display: "flex", gap: "4px", marginBottom: "8px" }}>
              {[1, 2, 3, 4, 5].map((i) => (
                <Sparkles
                  key={i}
                  size={14}
                  fill="var(--warning)"
                  style={{ color: "var(--warning)" }}
                />
              ))}
            </div>
            <p style={{ fontSize: "14px", fontStyle: "italic", opacity: 0.8 }}>
              &quot;Meilleure outil de pige du marché ! Gain de temps
              incroyable.&quot;
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginTop: "12px",
              }}
            >
              <div
                className="auth-demo-avatar"
                style={{
                  width: "28px",
                  height: "28px",
                  background: "white",
                  color: "var(--primary)",
                  fontSize: "10px",
                }}
              >
                JD
              </div>
              <div style={{ fontSize: "12px", fontWeight: 700 }}>
                Jean Dupont, Agent IAD
              </div>
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
          © 2026 PIGE IMMO — Fait pour les agents IAD
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-form-container">
          <div className="auth-form-header">
            <h2 className="auth-form-title">Créer un compte</h2>
            <p className="auth-form-subtitle">
              Vous avez déjà un compte ?{" "}
              <Link href="/login" className="auth-link">
                Connectez-vous
              </Link>
            </p>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div>
              <label className="auth-label">Nom complet</label>
              <div className="auth-input-wrapper">
                <User className="auth-input-icon" size={18} />
                <input
                  type="text"
                  placeholder="Jean Dupont"
                  className="auth-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="auth-label">Email professionnel</label>
              <div className="auth-input-wrapper">
                <Mail className="auth-input-icon" size={18} />
                <input
                  type="email"
                  placeholder="jean.dupont@iadfrance.fr"
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
                  placeholder="Au moins 6 caractères"
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

            <div>
              <label className="auth-label">Confirmer le mot de passe</label>
              <div className="auth-input-wrapper">
                <ShieldCheck className="auth-input-icon" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="auth-input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="auth-options">
              <label
                className="auth-checkbox-label"
                style={{ fontSize: "13px" }}
              >
                <input
                  type="checkbox"
                  style={{ accentColor: "var(--primary)" }}
                  required
                />
                J&apos;accepte les{" "}
                <Link href="#" className="auth-link">
                  CGU
                </Link>{" "}
                et la{" "}
                <Link href="#" className="auth-link">
                  Politique de confidentialité
                </Link>
                .
              </label>
            </div>

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? (
                <div className="auth-spinner" />
              ) : (
                <>
                  Créer mon compte <UserPlus size={18} />
                </>
              )}
            </button>
          </form>

          <div
            style={{
              marginTop: "32px",
              textAlign: "center",
              fontSize: "12px",
              color: "#64748b",
            }}
          >
            <p>
              Utilisez les identifiants de démonstration sur la page de
              connexion pour tester rapidement la plateforme sans inscription.
            </p>
            <Link
              href="/login"
              className="auth-link"
              style={{ fontWeight: 800 }}
            >
              TESTER LA PLATEFORME (DÉMO)
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
