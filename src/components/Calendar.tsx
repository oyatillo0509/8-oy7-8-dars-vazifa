import React from "react";
import { Event } from "../types";

interface CalendarProps {
  currentDate: Date;
  events: Event[];
  onDateClick: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({
  currentDate,
  events,
  onDateClick,
}) => {
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const getEventsForDate = (day: number) => {
    return events.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === day &&
        eventDate.getMonth() === currentDate.getMonth() &&
        eventDate.getFullYear() === currentDate.getFullYear()
      );
    });
  };

  return (
    <div className="grid grid-cols-7 gap-1">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
        <div
          key={day}
          className="text-center text-sm font-semibold text-gray-600"
        >
          {day}
        </div>
      ))}

      {/* Bo'sh joylar */}
      {Array.from({ length: firstDayOfMonth }).map((_, i) => (
        <div key={`empty-${i}`} />
      ))}

      {/* Kalendar kunlari */}
      {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
        const dayEvents = getEventsForDate(day);
        const isToday =
          day === new Date().getDate() &&
          currentDate.getMonth() === new Date().getMonth() &&
          currentDate.getFullYear() === new Date().getFullYear();

        return (
          <div
            key={day}
            onClick={() =>
              onDateClick(
                new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
              )
            }
            className={`border p-1 relative cursor-pointer ${
              isToday ? "bg-indigo-50 font-bold text-indigo-600" : "bg-white"
            }`}
          >
            <span>{day}</span>

            {dayEvents.length > 0 && (
              <div className="absolute bottom-1 left-1 text-xs">
                {dayEvents.slice(0, 2).map((event, i) => (
                  <div key={i} className="bg-indigo-100 rounded px-1 mb-0.5">
                    {event.title}
                  </div>
                ))}
                {dayEvents.length > 2 && (
                  <div>+{dayEvents.length - 2} more</div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Calendar;
