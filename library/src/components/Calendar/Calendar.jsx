import React, { useState } from "react";

export const Calendar = ({
  accent = "#6366f1",
  bg = "#0f172a",
  events = [],
  onDayClick = () => {},
  onEventClick = () => {}
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };
  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const weeks = [];
  let week = [];
  for (let i = 0; i < firstDay; i++) {
    week.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    week.push(i);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length > 0) {
    while (week.length < 7) {
      week.push(null);
    }
    weeks.push(week);
  }
  return (
    <div style={{ background: bg, borderRadius: "20px", padding: "24px", width: "320px", fontFamily: "system-ui,sans-serif", boxShadow: "0 10px 40px rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
        <button onClick={prevMonth} style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: "14px" }}>«</button>
        <div style={{ fontSize: "16px", fontWeight: "700", color: "#fff" }}>{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</div>
        <button onClick={nextMonth} style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: "14px" }}>»</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px", marginBottom: "12px" }}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", textAlign: "center" }}>{day}</div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px" }}>
        {weeks.map((week, i) => (
          <React.Fragment key={i}>
            {week.map((day, j) => (
              <div
                key={j}
                onClick={() => day && onDayClick(day)}
                style={{
                  background: day ? alpha(accent, 0.08) : "transparent",
                  borderRadius: "8px",
                  padding: "8px",
                  textAlign: "center",
                  cursor: day ? "pointer" : "default",
                  color: day ? "#fff" : "rgba(255,255,255,0.2)",
                  position: "relative",
                  fontSize: "14px",
                  fontWeight: "500"
                }}
              >
                {day}
                {events.filter(event => {
                  const eventDate = new Date(event.date);
                  return eventDate.getDate() === day && eventDate.getMonth() === currentDate.getMonth() && eventDate.getFullYear() === currentDate.getFullYear();
                }).map(event => (
                  <div
                    key={event.id}
                    onClick={(e) => { e.stopPropagation(); onEventClick(event); }}
                    style={{
                      background: accent,
                      borderRadius: "4px",
                      padding: "2px 4px",
                      fontSize: "10px",
                      color: "#fff",
                      position: "absolute",
                      bottom: "2px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      cursor: "pointer"
                    }}
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};