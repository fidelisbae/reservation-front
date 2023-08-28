import { Dayjs } from "dayjs";

export interface Reservation {
  year: string;
  month: string;
  date: string;
  hour: string;
}

export interface TimeSlotListProps {
  date: Dayjs;
  onReserve: (hour: number) => void;
  reservations: number[];
}

export interface TimeSlotProps {
  hour: number;
  onReserve: (hour: number) => void;
  isReserved: boolean;
}
