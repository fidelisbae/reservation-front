import { Dayjs } from "dayjs";

export interface Reservation {
  year: number;
  month: number;
  date: number;
  hour: number;
}

export interface TimeSlotListProps {
  date: Dayjs;
  onReserve: (hour: number) => void;
  reservations: number[];
  data: Reservation[] | undefined;
}

export interface TimeSlotProps {
  hour: number;
  onReserve: (hour: number) => void;
  isReserved: boolean;
}

export interface CurrentReservationProps {
  data: Reservation[] | undefined;
  selectedDate: Dayjs;
}
