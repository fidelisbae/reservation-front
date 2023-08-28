import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

interface TimeSlotProps {
  hour: number;
  onReserve: (hour: number) => void;
  isReserved: boolean;
}

const TimeSlot: React.FC<TimeSlotProps> = ({ hour, onReserve, isReserved }) => (
  <div className="time-slot">
    <span>
      {hour}:00 - {hour + 1}:00
    </span>
    <button disabled={isReserved} onClick={() => onReserve(hour)}>
      {isReserved ? "예약됨" : "예약"}
    </button>
  </div>
);

interface TimeSlotListProps {
  date: Date;
  onReserve: (hour: number) => void;
  reservations: number[];
}

const TimeSlotList: React.FC<TimeSlotListProps> = ({
  date,
  onReserve,
  reservations,
}) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="time-slot-list">
      {hours.map((hour) => (
        <TimeSlot
          key={hour}
          hour={hour}
          onReserve={onReserve}
          isReserved={reservations.includes(hour)}
        />
      ))}
    </div>
  );
};

function App() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [reservations, setReservations] = useState<Record<string, number[]>>(
    {}
  );

  const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const date = new Date();
  const startDay = new Date(date.getFullYear(), currentMonth, 1).getDay();
  const daysInMonth = new Date(
    date.getFullYear(),
    currentMonth + 1,
    0
  ).getDate();
  let days: JSX.Element[] = [];

  for (let i = 0; i < startDay; i++) {
    days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(
      <div
        key={i}
        className={`calendar-day ${
          selectedDate &&
          selectedDate.getDate() === i &&
          selectedDate.getMonth() === currentMonth
            ? "selected"
            : ""
        }`}
        onClick={() =>
          selectedDate && selectedDate.getDate() === i
            ? setSelectedDate(null)
            : setSelectedDate(new Date(date.getFullYear(), currentMonth, i))
        }
      >
        {i}
      </div>
    );
  }

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get("/api/reservations");
        setReservations(
          response.data.reduce(
            (
              acc: Record<string, number[]>,
              r: { date: string; hour: number }
            ) => {
              if (!acc[r.date]) {
                acc[r.date] = [];
              }
              acc[r.date].push(r.hour);
              return acc;
            },
            {}
          )
        );
      } catch (error) {
        console.error("Failed to fetch reservations:", error);
      }
    };

    fetchReservations();
  }, []);

  const handleReserve = async (hour: number) => {
    if (!selectedDate) return;

    const dateString = selectedDate.toISOString().split("T")[0];

    try {
      await axios.post("http://localhost:4000/api/reserve", {
        date: dateString,
        hour,
      });
      setReservations((prev) => {
        const updated = { ...prev };
        if (!updated[dateString]) {
          updated[dateString] = [];
        }
        updated[dateString].push(hour);
        return updated;
      });
    } catch (error) {
      console.error("Failed to make a reservation:", error);
    } finally {
      console.log(currentReservations);
    }
  };

  const currentReservations = selectedDate
    ? reservations[selectedDate.toISOString().split("T")[0]] || []
    : [];

  return (
    <div className="App">
      <div className="calendar-controls">
        <select
          value={currentMonth}
          onChange={(e) => setCurrentMonth(Number(e.target.value))}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i}>
              {i + 1}월
            </option>
          ))}
        </select>
      </div>
      <div className="calendar">
        <div className="calendar-header">
          {DAYS.map((day) => (
            <div key={day} className="calendar-day-name">
              {day}
            </div>
          ))}
        </div>
        <div className="calendar-body">{days}</div>
        {selectedDate && (
          <TimeSlotList
            date={selectedDate}
            onReserve={handleReserve}
            reservations={currentReservations}
          />
        )}
      </div>
    </div>
  );
}

export default App;
