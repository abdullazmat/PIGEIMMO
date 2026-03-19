"use client";

import {
  UserPlus,
  Mail,
  MessageSquare,
  Eye,
  MapPin,
  MoreVertical,
} from "lucide-react";

export default function TeamPage() {
  const team = [
    {
      name: "Marc Dupont",
      role: "Agent Senior",
      email: "marc.dupont@iad-france.fr",
      status: "active",
      leads: 42,
      mandates: 4,
      city: "Lyon",
    },
    {
      name: "Claire Fontaine",
      role: "Agent",
      email: "claire.fontaine@iad-france.fr",
      status: "active",
      leads: 28,
      mandates: 2,
      city: "Lyon",
    },
    {
      name: "Thomas Girard",
      role: "Agent Junior",
      email: "thomas.girard@iad-france.fr",
      status: "trial",
      leads: 12,
      mandates: 0,
      city: "Paris",
    },
    {
      name: "Nadia Belkacem",
      role: "Agent",
      email: "nadia.belkacem@iad-france.fr",
      status: "active",
      leads: 35,
      mandates: 3,
      city: "Marseille",
    },
  ];

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">ÉQUIPE</h1>
          <p className="page-subtitle">Gérez les membres de votre équipe IAD</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-primary">
            <UserPlus size={16} /> Ajouter un membre
          </button>
        </div>
      </div>

      <div className="team-grid">
        {team.map((member, i) => (
          <div key={i} className="team-card">
            <div className="team-card-header">
              <div className="team-avatar">
                {member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="team-info">
                <div className="team-name">{member.name}</div>
                <div className="team-role">{member.role}</div>
              </div>
              <div className={`status-badge ${member.status}`}>
                {member.status === "active" ? "ACTIF" : "ESSAI"}
              </div>
            </div>

            <div className="team-stats-grid">
              <div className="team-stat-item">
                <div className="stat-val" style={{ color: "var(--info)" }}>
                  {member.leads}
                </div>
                <div className="stat-label">Leads</div>
              </div>
              <div className="team-stat-item">
                <div className="stat-val" style={{ color: "var(--success)" }}>
                  {member.mandates}
                </div>
                <div className="stat-label">Mandats</div>
              </div>
              <div className="team-stat-item">
                <div className="stat-val" style={{ color: "var(--primary)" }}>
                  <MapPin size={14} />
                </div>
                <div className="stat-label">{member.city}</div>
              </div>
            </div>

            <div className="team-card-footer">
              <div className="team-email">
                <Mail size={12} /> {member.email}
              </div>
              <div className="team-actions">
                <button
                  className="btn btn-secondary btn-sm"
                  style={{ flex: 1 }}
                >
                  <Eye size={12} /> Profil
                </button>
                <button className="btn-icon btn-sm">
                  <MessageSquare size={13} />
                </button>
                <button className="btn-icon btn-sm">
                  <MoreVertical size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
