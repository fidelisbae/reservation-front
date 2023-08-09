import React, { useState } from "react";
import "./App.css";

// TimeSlot 컴포넌트
interface TimeSlotProps {
  hour: number;
  onReserve: (hour: number) => void;
}

const TimeSlot: React.FC<TimeSlotProps> = ({ hour, onReserve }) => {
  return (
    <div className="time-slot">
      <span>
        {hour}:00 - {hour + 1}:00
      </span>
      <button onClick={() => onReserve(hour)}>예약</button>
    </div>
  );
};

// TimeSlotList 컴포넌트
interface TimeSlotListProps {
  date: Date;
  onReserve: (hour: number) => void;
}

const TimeSlotList: React.FC<TimeSlotListProps> = ({ date, onReserve }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="time-slot-list">
      {hours.map((hour) => (
        <TimeSlot key={hour} hour={hour} onReserve={onReserve} />
      ))}
    </div>
  );
};

// App 컴포넌트
function App() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const date = new Date();

  const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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
          setSelectedDate(new Date(date.getFullYear(), currentMonth, i))
        }
      >
        {i}
      </div>
    );
  }

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
            onReserve={(hour) => {
              console.log(
                `Reserved at ${selectedDate.toDateString()} - ${hour}:00 to ${
                  hour + 1
                }:00`
              );
            }}
          />
        )}
      </div>
    </div>
  );
}

export default App;
