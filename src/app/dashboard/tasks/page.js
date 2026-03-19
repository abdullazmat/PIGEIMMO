"use client";

import { useState } from "react";
import {
  FileText,
  CheckCircle2,
  Clock,
  Calendar,
  Search,
  Filter,
  Plus,
  MessageSquare,
  Target,
  User,
  Building2,
  MapPin,
  ChevronDown,
  XCircle,
  MoreVertical,
  Star,
} from "lucide-react";

const tasksData = [
  {
    id: 1,
    title: "Rappeler Jean-Marc Leblanc",
    deadline: "Aujourd'hui, 17:00",
    priority: "Haute",
    status: "En cours",
    color: "var(--danger)",
  },
  {
    id: 2,
    title: "Envoyer le mandat pour Lyon 3",
    deadline: "Demain, 10:00",
    priority: "Moyenne",
    status: "À faire",
    color: "var(--warning)",
  },
  {
    id: 3,
    title: "Confirmer visite Bordeaux",
    deadline: "Vendredi, 14:00",
    priority: "Basse",
    status: "À faire",
    color: "var(--info)",
  },
];

export default function TasksPage() {
  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">MES TÂCHES</h1>
          <p className="page-subtitle">
            Gérez vos rappels et actions commerciales
          </p>
        </div>
        <div className="page-actions">
          <button className="btn btn-primary">
            <Plus size={16} /> Nouvelle tâche
          </button>
        </div>
      </div>

      <div className="pipeline-controls">
        <div className="controls-left">
          <div className="header-search control-search">
            <Search size={16} />
            <input type="text" placeholder="Rechercher..." />
          </div>
          <button className="filter-tag active">À faire (3)</button>
          <button className="filter-tag">Complétées (12)</button>
        </div>
        <button className="btn btn-secondary">
          <Filter size={16} /> Toutes les priorités
        </button>
      </div>

      <div className="tasks-grid">
        {tasksData.map((task) => (
          <div key={task.id} className="task-card task-card-surface">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "11px",
                  fontWeight: 800,
                  color: task.color,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                <Star size={12} fill={task.color} />
                {task.priority}
              </div>
              <button className="btn-icon btn-sm">
                <MoreVertical size={14} />
              </button>
            </div>
            <h3
              style={{
                fontSize: "16px",
                fontWeight: 700,
                marginBottom: "24px",
              }}
            >
              {task.title}
            </h3>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "13px",
                color: "var(--text-muted)",
                marginBottom: "24px",
              }}
            >
              <Clock size={14} /> DL : {task.deadline}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: "16px",
                borderTop: "1px solid var(--border-light)",
              }}
            >
              <span
                className="badge-active"
                style={{
                  background: "var(--bg-body)",
                  color: "var(--text-secondary)",
                }}
              >
                {task.status}
              </span>
              <button className="btn btn-primary btn-sm">Terminer</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
