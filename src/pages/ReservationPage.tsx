import { useEffect, useMemo, useState } from "react";

import { Calendar, ConfigProvider } from "antd";
import styled from "@emotion/styled";
import dayjs, { Dayjs } from "dayjs";
import locale from "antd/locale/ko_KR";
import "dayjs/locale/ko";

import {
  CurrentReservationProps,
  TimeSlotListProps,
  TimeSlotProps,
} from "src/types/reservation";

import {
  useGetReservationListQuery,
  usePostReservationMutation,
} from "src/store/services/reservation";

dayjs.locale("ko");

const ReservationPage = () => {
  const {
    data,
    isError: getError,
    isSuccess: getSuccess,
    isLoading: getLoading,
  } = useGetReservationListQuery("");
  const [
    postReservate,
    { isLoading: postLoading, isSuccess: postSuccess, isError: postError },
  ] = usePostReservationMutation();

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  /**
   * 현재 시간
   */
  const now = dayjs();

  const [selectedDate, setSelectedDate] = useState<Dayjs>(now);
  /**
   * 달력에서 선택할 수 있는 마지막 날짜
   */
  const endDate = now.add(2, "month");

  /**
   * 달력에서 선택할 수 있는 range
   */

  const rangeDate: [Dayjs, Dayjs] = [now.startOf("day"), endDate.endOf("day")];

  /**
   *
   * 달력을 클릭하면 eventhandler
   */
  const onSelect = (date: Dayjs) => {
    setSelectedDate(date);
  };

  /**
   * 예약하는 함수
   */
  const handleReserve = (hour: number) => {
    const data = {
      year: selectedDate.get("y"),
      month: selectedDate.get("M") + 1,
      date: selectedDate.get("D"),
      hour,
    };
    postReservate(data);
    console.log(data);
  };

  const getCurrentReservations = ({
    data,
    selectedDate,
  }: CurrentReservationProps) => {
    const filteredData = data
      ?.filter((el) => {
        return (
          el.year === selectedDate.get("y") &&
          el.month === selectedDate.get("M") + 1 &&
          el.date === selectedDate.get("D")
        );
      })
      .map((el) => el.hour);

    return filteredData ? filteredData : [];
  };

  /**
   * Timeslot 컴포넌트
   */
  const TimeSlot: React.FC<TimeSlotProps> = ({
    hour,
    onReserve,
    isReserved,
  }) => (
    <div className="time-slot">
      <span>
        {hour}:00 - {hour + 1}:00
      </span>
      <button disabled={isReserved} onClick={() => onReserve(hour)}>
        {isReserved ? "예약됨" : "예약"}
      </button>
    </div>
  );
  /**
   * timeSlotList 컴포넌트
   */
  const TimeSlotList: React.FC<TimeSlotListProps> = ({
    date,
    onReserve,
    reservations,
    data,
  }) => {
    const hours = Array.from({ length: 24 }, (_, i) => i);

    // const selectedDateReservation = data?.filter(el => {
    //   dayjs(`${el.year}-${el.month}-${el.date}`)
    // })

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

  return (
    <Container>
      <CalendarContainer>
        <ConfigProvider locale={locale}>
          <Calendar
            mode="month"
            onSelect={onSelect}
            fullscreen={false}
            validRange={rangeDate}
          />
        </ConfigProvider>
      </CalendarContainer>
      <div>
        <div>
          선택된 날짜는
          {selectedDate ? `${selectedDate.format("YYYY-MM-DD")}` : null}
        </div>
        <div>나의 예약 상태: {}</div>
        <TimeslotContainer>
          {selectedDate && (
            <TimeSlotList
              date={selectedDate}
              onReserve={handleReserve}
              reservations={getCurrentReservations({ data, selectedDate })}
              data={data}
            />
          )}
        </TimeslotContainer>
      </div>
    </Container>
  );
};

export default ReservationPage;

const Container = styled.div`
  display: flex;
  /* flex-direction: column; */
  width: 80%;
  align-items: center;
  justify-content: center;
`;

const CalendarContainer = styled.div`
  width: 100%;
`;

const TimeslotContainer = styled.div`
  width: 70%;
`;
