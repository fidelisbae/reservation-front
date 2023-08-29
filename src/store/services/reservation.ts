import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Reservation } from "src/types/reservation";

// baseUrl 있어야함.
// 엔드포인트 있어야함.

// 여기서 api 설정? ㅇㅇ
export const reservationApi = createApi({
  reducerPath: "reservationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/",
  }),
  endpoints: (builder) => ({
    getReservationList: builder.query<Reservation[], string>({
      query: (name) => `reservations`, // 그래프큐엘이 쿼리랑 뮤테이션으로 나눠짐
    }), // 이거 그래프큐엘에 쓰는거 아님? 비슷한가 보네 요즘 나오는 api 관리 라이브러리는 이런식으로 생김, react-query 도 비슷
    // post 의 result 는 뭐임? 결과값 주지 않을까. success 나 failed 뭐 인런식으로?
    // post는 { 이거는 보내는 body 인거지 ?  이거 리스폰즈
    // 리퀘스트는 여기서 id만 뺴면됨
    // 야 그러면 내가 작성한거는 id 로 판별하는거임 ?
    // id로 뭘 판별해? 내가 예약한거는 취소할 수 있어야 되자나
    // 그거는 나중에 user: username 추가할건데 지금은 구현안함
    // 아하 ㅇㅋㅇㅋ
    // 이거 그러면 내가 서버 받고 코드 추가해야겠다 api 실행시키는 코드 추가할게 reservation page 에서
    // 굳
    // 이거 푸쉬해주셈 !1 깃헙 뭐라고 검색해야됨 ?
    // 나 팔로우 햇ㅂ자나 ㅇㅋㅇㅋ 너가 걍 초대하면 굿
    // 백엔드도 초대해줘?
    // 내컴에서 저 주소 쓰려면 해야될듯 read 만 되게 해주셈
    // 초대함 push 안할거면 걍 퍼블릭으로도 가능함 원래 굿굿
    // 오늘 이거랑 문제 2개 마무리할게
    //ㅇㅋㅇㅋ 난 퇴근한다
    // 오운몇?  오운쉬... ????????????????????????????????/?
    // 낼운고 ㅋㅋ 하아... 어께랑 허리가 휴식필요함 일단 오케 ㅋㅋ 낼봅세 수고수고
    // 이거 프론트는 푸쉬해줘
    // {
    //   id: number,
    //   hour,
    //   date,
    //   month,
    //   year
    // }
    // Reservation 객체하나 mysql 로 만듬 ?
    // ㅇㅇ 그럼 도커로 띄워서 나도 서버 만들게 해줭 저 id 는 지금 안넣은 상태.
    // 레포 퍼블릭으로 바꿀게 잠만
    // 이미 퍼블릭이네 ㅋㅋ 굿네
    // 클론한다음에 docker-compose up --build -d 하면됨
    // 도커 깔고

    postReservation: builder.mutation<Boolean, Reservation>({
      query: (body) => ({
        url: "reservations", // 엔드포인트,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetReservationListQuery, usePostReservationMutation } =
  reservationApi;
