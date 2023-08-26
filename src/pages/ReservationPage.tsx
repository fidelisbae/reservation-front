import { useState } from "react";

import { Calendar, ConfigProvider } from "antd";
import styled from "@emotion/styled";
import dayjs, { Dayjs } from "dayjs";
import locale from "antd/locale/ko_KR";
import "dayjs/locale/ko";

dayjs.locale("ko");

const ReservationPage = () => {
  /**
   * 현재 시간
   */
  const now = dayjs();

  /**
   * 달력에서 선택할 수 있는 마지막 날짜
   */
  const endDate = now.add(2, "month");

  /**
   * 달력에서 선택할 수 있는 range
   */

  const rangeDate: [Dayjs, Dayjs] = [now.startOf("day"), endDate.endOf("day")];

  console.log(rangeDate);

  console.log(now);

  return (
    <Container>
      <CalendarContainer>
        <ConfigProvider locale={locale}>
          <Calendar mode="month" fullscreen={false} validRange={rangeDate} />
        </ConfigProvider>
      </CalendarContainer>
      <div>reservationPage 입니다.</div>
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
  width: 50%;
`;
