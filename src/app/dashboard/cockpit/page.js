"use client";

import { useState } from "react";
import { demoConversations } from "@/lib/demoData";
import {
  MessageSquare,
  Bot,
  Phone,
  Send,
  Info,
  CheckCircle2,
  Target,
  Zap,
  TrendingUp,
  Search,
  User,
  UserCheck,
  PhoneCall,
  Paperclip,
  MoreVertical,
  X,
  Settings2,
  Sparkles,
  Filter,
  ArrowRight,
} from "lucide-react";

export default function CockpitPage() {
  const [selectedConv, setSelectedConv] = useState(demoConversations[0]);
  const [activeTab, setActiveTab] = useState("all");
  const [message, setMessage] = useState("");

  const filteredConversations = demoConversations.filter((conv) => {
    if (activeTab === "tous" || activeTab === "all") return true;
    if (activeTab === "sms") return conv.channel === "sms";
    if (activeTab === "whatsapp") return conv.channel === "whatsapp";
    if (activeTab === "lbc") return conv.channel === "platform";
    return true;
  });

  return (
    <div className="cockpit-layout">
      <aside className="cockpit-panel">
        <div className="cockpit-panel-header">
          <div className="section-title" style={{ marginBottom: 10 }}>
            <MessageSquare size={16} /> MESSAGES
          </div>
          <div
            className="header-search"
            style={{ width: "100%", marginBottom: 10 }}
          >
            <Search size={14} />
            <input type="text" placeholder="Rechercher..." />
          </div>
          <div className="channel-tabs">
            {["Tous", "SMS", "WhatsApp", "LBC"].map((tab) => (
              <button
                key={tab}
                className={`channel-tab ${activeTab === tab.toLowerCase() ? "active" : ""}`}
                onClick={() => setActiveTab(tab.toLowerCase())}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="cockpit-conversations">
          {filteredConversations.map((conv) => (
            <div
              key={conv._id}
              className={`cockpit-conversation-item ${selectedConv?._id === conv._id ? "active" : ""}`}
              onClick={() => setSelectedConv(conv)}
            >
              <div className="cockpit-conversation-avatar">
                {conv.contactName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="cockpit-conversation-info">
                <div className="cockpit-conversation-name">
                  {conv.contactName}
                </div>
                <div className="cockpit-conversation-preview">
                  {conv.messages[conv.messages.length - 1]?.content}
                </div>
              </div>
              <div className="cockpit-conversation-meta">
                <div className="cockpit-conversation-time">14:30</div>
                {conv.unreadCount > 0 && (
                  <div className="cockpit-conversation-unread">
                    {conv.unreadCount}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </aside>

      <section className="cockpit-panel cockpit-chat">
        {selectedConv ? (
          <>
            <div className="cockpit-chat-header">
              <div className="cockpit-chat-contact">
                <div className="cockpit-conversation-avatar">
                  {selectedConv.contactName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div style={{ fontWeight: 700 }}>
                    {selectedConv.contactName}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--success)",
                      fontWeight: 600,
                    }}
                  >
                    Canal: {selectedConv.channel.toUpperCase()}
                  </div>
                </div>
              </div>
              <div className="action-group">
                <button className="btn-icon" title="Profil">
                  <User size={16} />
                </button>
                <button className="btn-icon" title="Appeler">
                  <PhoneCall size={16} />
                </button>
                <button className="btn-icon" title="Plus">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>

            <div className="cockpit-chat-messages">
              {selectedConv.messages.map((msg, i) => (
                <div
                  key={i}
                  className={`chat-message ${msg.sender === "agent" ? "sent" : msg.sender === "ai" ? "ai-suggestion" : "received"}`}
                >
                  {msg.content}
                  <div className="chat-message-time">14:45</div>
                </div>
              ))}
            </div>

            <div className="cockpit-chat-input">
              <button className="btn-icon">
                <Paperclip size={16} />
              </button>
              <input
                className="cockpit-chat-input-field"
                type="text"
                placeholder="Écrivez votre message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button className="btn btn-primary btn-sm">
                <Send size={14} /> Envoyer
              </button>
            </div>
          </>
        ) : (
          <div className="cockpit-empty">
            <MessageSquare
              size={48}
              style={{ opacity: 0.1, marginBottom: "16px" }}
            />
            <p>Sélectionnez une conversation pour commencer</p>
          </div>
        )}
      </section>

      <aside className="cockpit-panel ai-panel">
        <div
          className="cockpit-panel-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="section-title" style={{ marginBottom: 0 }}>
            <Bot size={18} /> ASSISTANT IA
          </div>
          <button className="btn-icon">
            <Settings2 size={16} />
          </button>
        </div>

        <div className="ai-panel-suggestions">
          <div className="ai-suggestion-card">
            <div className="ai-suggestion-label">
              <Sparkles size={16} /> SUGGESTION DE RÉPONSE
            </div>
            <p className="ai-suggestion-text">
              &quot;Parfait ! Mercredi à 14h me convient très bien. Je vous
              confirme le rendez-vous. L&apos;adresse est bien Rue Garibaldi,
              Lyon 3ème ?&quot;
            </p>
            <div className="action-group" style={{ marginTop: 10 }}>
              <button className="btn btn-primary btn-sm">Appliquer</button>
              <button className="btn btn-secondary btn-sm">Modifier</button>
            </div>
          </div>

          <div>
            <div
              className="section-title"
              style={{ fontSize: "11px", marginBottom: "12px", opacity: 0.6 }}
            >
              <Target size={14} /> GESTION DES OBJECTIONS
            </div>
            <div className="ai-suggestion-card" style={{ marginBottom: 10 }}>
              <div className="objection-title">Objection Prix</div>
              <p className="objection-text">
                Le prix est au-dessus du marché local...
              </p>
              <button className="btn-link">
                Voir le script <ArrowRight size={12} />
              </button>
            </div>
            <div className="ai-suggestion-card">
              <div className="objection-title">Prise de RDV</div>
              <p className="objection-text">
                Proposition de visite immédiate...
              </p>
              <button className="btn-link">
                Voir le script <ArrowRight size={12} />
              </button>
            </div>
          </div>

          <div className="ai-suggestion-card">
            <div
              className="section-title"
              style={{ fontSize: "11px", marginBottom: "12px", opacity: 0.6 }}
            >
              <Settings2 size={14} /> CONFIGURATION IA
            </div>
            <div className="setting-row">
              <label>Réponses automatiques</label>
              <input type="checkbox" defaultChecked />
            </div>
            <div className="setting-row">
              <label>Proposer des RDV</label>
              <input type="checkbox" />
            </div>
            <div className="setting-row">
              <label>Gestion objections</label>
              <input type="checkbox" defaultChecked />
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
