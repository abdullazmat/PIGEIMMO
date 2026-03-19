"use client";

import { useState } from "react";
import { demoAppointments } from "@/lib/demoData";
import {
  Clock,
  RefreshCw,
  MapPin,
  Plus,
  ChevronLeft,
  ChevronRight,
  Share,
  Download,
  Settings,
} from "lucide-react";

const timeSlots = Array.from({ length: 11 }, (_, i) => `${i + 9}:00`);
const weekDays = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];

function startOfWeekMonday(date) {
  const clone = new Date(date);
  const day = clone.getDay();
  const offset = day === 0 ? -6 : 1 - day;
  clone.setDate(clone.getDate() + offset);
  clone.setHours(0, 0, 0, 0);
  return clone;
}

function toDateKey(date) {
  return new Date(date).toISOString().slice(0, 10);
}

function isSameDay(a, b) {
  return toDateKey(a) === toDateKey(b);
}

function getTimeLabel(dateValue) {
  const date = new Date(dateValue);
  return `${String(date.getHours()).padStart(2, "0")}:00`;
}

function formatMonthYear(date) {
  return new Intl.DateTimeFormat("fr-FR", {
    month: "long",
    year: "numeric",
  }).format(date);
}

function formatWeekLabel(date) {
  const weekStart = startOfWeekMonday(date);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 4);

  return `${weekStart.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
  })} au ${weekEnd.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
  })}`;
}

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("week");
  const [currentMonth, setCurrentMonth] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  );

  const appointments = demoAppointments.map((appt) => {
    const startDate = new Date(appt.startTime);
    return {
      ...appt,
      startDate,
      time: startDate.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      slotLabel: getTimeLabel(startDate),
    };
  });

  const dayAppointments = appointments.filter((appt) =>
    isSameDay(appt.startDate, selectedDate),
  );

  const weekStart = startOfWeekMonday(selectedDate);
  const weekDates = weekDays.map((_, index) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + index);
    return date;
  });

  const monthStart = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1,
  );
  const monthEnd = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0,
  );
  const firstDayIndex = (monthStart.getDay() + 6) % 7;

  const monthCells = [
    ...Array.from({ length: firstDayIndex }, () => null),
    ...Array.from({ length: monthEnd.getDate() }, (_, i) => i + 1),
  ];

  const movePeriod = (direction) => {
    if (viewMode === "month") {
      const next = new Date(currentMonth);
      next.setMonth(next.getMonth() + direction);
      setCurrentMonth(new Date(next.getFullYear(), next.getMonth(), 1));
      return;
    }

    const next = new Date(selectedDate);
    next.setDate(next.getDate() + (viewMode === "week" ? 7 : 1) * direction);
    setSelectedDate(next);
    setCurrentMonth(new Date(next.getFullYear(), next.getMonth(), 1));
  };

  return (
    <div className="calendar-layout">
      <aside className="calendar-sidebar-card">
        <button
          className="btn btn-primary"
          style={{ width: "100%", marginBottom: 16 }}
        >
          <Plus size={16} /> Nouveau rendez-vous
        </button>

        <div className="mini-calendar">
          <div className="mini-calendar-header">
            <div className="mini-calendar-month">
              {formatMonthYear(currentMonth)}
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                className="btn-icon btn-sm"
                onClick={() =>
                  setCurrentMonth(
                    new Date(
                      currentMonth.getFullYear(),
                      currentMonth.getMonth() - 1,
                      1,
                    ),
                  )
                }
              >
                <ChevronLeft size={14} />
              </button>
              <button
                className="btn-icon btn-sm"
                onClick={() =>
                  setCurrentMonth(
                    new Date(
                      currentMonth.getFullYear(),
                      currentMonth.getMonth() + 1,
                      1,
                    ),
                  )
                }
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

          <div className="mini-calendar-grid">
            {["L", "M", "M", "J", "V", "S", "D"].map((d) => (
              <div key={d} className="mini-calendar-day-label">
                {d}
              </div>
            ))}
            {monthCells.map((day, index) => {
              if (!day) {
                return (
                  <div
                    key={`empty-${index}`}
                    className="mini-calendar-day empty"
                  />
                );
              }

              const cellDate = new Date(
                currentMonth.getFullYear(),
                currentMonth.getMonth(),
                day,
              );

              const hasEvent = appointments.some((appt) =>
                isSameDay(appt.startDate, cellDate),
              );

              const isToday = isSameDay(cellDate, new Date());
              const isSelected = isSameDay(cellDate, selectedDate);

              return (
                <button
                  key={day}
                  type="button"
                  className={`mini-calendar-day ${isToday ? "today" : ""} ${hasEvent ? "has-event" : ""} ${isSelected ? "selected" : ""}`}
                  onClick={() => {
                    setSelectedDate(cellDate);
                    setViewMode("day");
                  }}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <div className="section-title">
            <Clock size={16} /> A venir aujourd&apos;hui
          </div>
          {(dayAppointments.length ? dayAppointments : appointments)
            .slice(0, 3)
            .map((appt) => (
              <div
                key={appt._id}
                style={{
                  padding: "10px 0",
                  borderBottom: "1px solid var(--border-light)",
                }}
              >
                <div className="upcoming-time">{appt.time}</div>
                <div className="upcoming-info">
                  <div className="upcoming-title">{appt.title}</div>
                  <div
                    className="upcoming-loc"
                    style={{ color: "var(--text-muted)", fontSize: 12 }}
                  >
                    <MapPin size={10} /> {appt.location}
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div
          style={{
            marginTop: 14,
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-md)",
            padding: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div className="sync-icon">
            <RefreshCw size={18} style={{ color: "var(--primary)" }} />
          </div>
          <div className="sync-info">
            <div style={{ fontWeight: 700, fontSize: "13px" }}>
              Google Calendar
            </div>
            <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>
              Derniere sync : 10h12
            </div>
          </div>
          <button className="btn-icon btn-sm circle">
            <Settings size={14} />
          </button>
        </div>
      </aside>

      <div className="calendar-main">
        <div className="page-header" style={{ marginBottom: 16 }}>
          <h2
            className="section-title"
            style={{ fontSize: "18px", marginBottom: 0 }}
          >
            {viewMode === "month"
              ? `Mois de ${formatMonthYear(currentMonth)}`
              : viewMode === "week"
                ? `Semaine - du ${formatWeekLabel(selectedDate)}`
                : `Jour - ${selectedDate.toLocaleDateString("fr-FR", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}`}
          </h2>
          <div className="page-actions">
            <div className="view-toggle">
              <button
                className="view-toggle-btn"
                onClick={() => movePeriod(-1)}
              >
                <ChevronLeft size={14} />
              </button>
              <button className="view-toggle-btn" onClick={() => movePeriod(1)}>
                <ChevronRight size={14} />
              </button>
            </div>
            <div className="view-toggle">
              <button
                className={`view-toggle-btn ${viewMode === "day" ? "active" : ""}`}
                onClick={() => setViewMode("day")}
              >
                Jour
              </button>
              <button
                className={`view-toggle-btn ${viewMode === "week" ? "active" : ""}`}
                onClick={() => setViewMode("week")}
              >
                Semaine
              </button>
              <button
                className={`view-toggle-btn ${viewMode === "month" ? "active" : ""}`}
                onClick={() => setViewMode("month")}
              >
                Mois
              </button>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <button className="btn btn-secondary btn-sm">
                <Share size={14} /> Partager
              </button>
              <button className="btn btn-secondary btn-sm">
                <Download size={14} /> Exporter
              </button>
            </div>
          </div>
        </div>

        {viewMode === "month" ? (
          <div className="calendar-month-grid">
            {["L", "M", "M", "J", "V", "S", "D"].map((label) => (
              <div key={label} className="calendar-month-head">
                {label}
              </div>
            ))}
            {monthCells.map((day, index) => {
              if (!day) {
                return (
                  <div
                    key={`month-empty-${index}`}
                    className="calendar-month-cell empty"
                  />
                );
              }

              const date = new Date(
                currentMonth.getFullYear(),
                currentMonth.getMonth(),
                day,
              );
              const dateEvents = appointments.filter((appt) =>
                isSameDay(appt.startDate, date),
              );

              return (
                <button
                  type="button"
                  key={`${day}-${index}`}
                  className={`calendar-month-cell ${isSameDay(date, selectedDate) ? "selected" : ""}`}
                  onClick={() => {
                    setSelectedDate(date);
                    setViewMode("day");
                  }}
                >
                  <div className="calendar-month-cell-date">{day}</div>
                  <div className="calendar-month-cell-events">
                    {dateEvents.slice(0, 2).map((event) => (
                      <span key={event._id}>{event.title}</span>
                    ))}
                    {dateEvents.length > 2 && (
                      <span>+{dateEvents.length - 2} autres</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="data-table">
            <table>
              <thead>
                <tr>
                  <th>Heure</th>
                  {viewMode === "day" ? (
                    <th>
                      {selectedDate.toLocaleDateString("fr-FR", {
                        weekday: "long",
                      })}
                    </th>
                  ) : (
                    weekDates.map((date, idx) => (
                      <th key={idx}>
                        {weekDays[idx]}
                        <br />
                        {date.toLocaleDateString("fr-FR", {
                          day: "2-digit",
                          month: "2-digit",
                        })}
                      </th>
                    ))
                  )}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((time) => (
                  <tr key={time}>
                    <td style={{ fontWeight: 700 }}>{time}</td>
                    {viewMode === "day" ? (
                      <td>
                        {(() => {
                          const appt = appointments.find(
                            (a) =>
                              isSameDay(a.startDate, selectedDate) &&
                              a.slotLabel === time,
                          );

                          if (!appt) {
                            return (
                              <span
                                style={{
                                  color: "var(--text-muted)",
                                  fontSize: 12,
                                }}
                              >
                                -
                              </span>
                            );
                          }

                          return (
                            <div className="calendar-event-pill">
                              <div>{appt.title}</div>
                              <small>{appt.contactName}</small>
                            </div>
                          );
                        })()}
                      </td>
                    ) : (
                      weekDates.map((dayDate, dayIndex) => {
                        const appt = appointments.find(
                          (a) =>
                            isSameDay(a.startDate, dayDate) &&
                            a.slotLabel === time,
                        );

                        return (
                          <td key={`${time}-${dayIndex}`}>
                            {appt ? (
                              <div className="calendar-event-pill">
                                <div>{appt.title}</div>
                                <small>{appt.contactName}</small>
                              </div>
                            ) : (
                              <span
                                style={{
                                  color: "var(--text-muted)",
                                  fontSize: 12,
                                }}
                              >
                                -
                              </span>
                            )}
                          </td>
                        );
                      })
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
