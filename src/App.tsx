import React, { useEffect } from "react";
import "./App.css";
import Container from "./layouts/Container";
import { Route, Routes, useNavigate } from "react-router";
import Main from "./views/Main";
import {
  ADMINPAGE_PATH,
  AUTH_PATH,
  MAIN_PATH,
  MYPAGE_PATH,
  MY_REVIEWLIST_PATH,
  PROFILE_UPDATE_PATH,
  QNA_DETAIL_PATH,
  QNA_PATH,
  QNA_UPDATE_PATH,
  QNA_WRITE_PATH,
  REST_ADD_PATH,
  REST_DETAIL_PATH,
  REVIEW_DETAIL_PATH,
  REVIEW_PATH,
  REVIEW_UPDATE_PATH,
  REVIEW_WRITE_PATH,
  SCHEDULE_DETAIL_PATH,
  SCHEDULE_PATH,
  SCHEDULE_UPDATE_PATH,
  SCHEDULE_WRITE_PATH,
  SERVICE_PATH,
  SIGN_IN_ABSOLUTE_PATH,
  SIGN_IN_PATH,
  SIGN_UP_PATH,
  TOUR_ADD_PATH,
  TOUR_DETAIL_PATH,
  TOUR_PATH,
  USER_LIST_PATH,
} from "./constant";
import SignIn from "./views/authentication/SignIn";
import SignUp from "./views/authentication/SignUp";
import Review from "./views/Main/service/review";

//                    Component : 인증화면 index 컴포넌트                     //
function AuthIndex() {
  //                    function                      //
  //     description: 네비게이터 함수      //
  const navigator = useNavigate();

  //                    effect                      //
  //     description: 마운트시에만 실행할 effect (로그인 페이지로 이동)      //
  useEffect(() => navigator(SIGN_IN_ABSOLUTE_PATH), []);

  //                    render : 인증화면 index 컴포넌트                     //
  return <></>;
}

//                    Component : App 컴포넌트                     //
function App() {
  //                    render : App 컴포넌트                     //
  return (
    <Routes>
      <Route path={MAIN_PATH} element={<Container />}>
        <Route index element={<Main />} />
        <Route path={SERVICE_PATH} element={<></>}>
          <Route path={REVIEW_PATH} element={<Review/>}>
            <Route index element={<></>} />
            <Route path={REVIEW_DETAIL_PATH} element={<></>} />
            <Route path={REVIEW_UPDATE_PATH} element={<></>} />
            <Route path={REVIEW_WRITE_PATH} element={<></>} />
          </Route>

          <Route path={QNA_PATH} element={<></>}>
            <Route index element={<></>} />
            <Route path={QNA_DETAIL_PATH} element={<></>} />
            <Route path={QNA_UPDATE_PATH} element={<></>} />
            <Route path={QNA_WRITE_PATH} element={<></>} />
          </Route>

          <Route path={MYPAGE_PATH} element={<></>}>
            <Route index element={<></>} />
            <Route path={PROFILE_UPDATE_PATH} element={<></>} />
            <Route path={SCHEDULE_PATH} element={<></>}>
              <Route index element={<></>} />
              <Route path={SCHEDULE_DETAIL_PATH} element={<></>} />
              <Route path={SCHEDULE_UPDATE_PATH} element={<></>} />
              <Route path={SCHEDULE_WRITE_PATH} element={<></>} />
            </Route>
            <Route path={MY_REVIEWLIST_PATH} element={<></>} />
          </Route>

          <Route path={ADMINPAGE_PATH} element={<></>}>
            <Route index element={<></>} />
            <Route path={USER_LIST_PATH} element={<></>} />
            <Route path={TOUR_ADD_PATH} element={<></>} />
            <Route path={REST_ADD_PATH} element={<></>} />
          </Route>

          <Route path={TOUR_PATH} element={<></>}>
            <Route index element={<></>} />
            <Route path={TOUR_DETAIL_PATH} element={<></>} />
            <Route path={REST_DETAIL_PATH} element={<></>} />
          </Route>
        </Route>
      </Route>
      <Route path={AUTH_PATH}>
        <Route index element={<AuthIndex />} />
        <Route path={SIGN_IN_PATH} element={<SignIn />} />
        <Route path={SIGN_UP_PATH} element={<SignUp />} />
      </Route>
    </Routes>
  );
}

export default App;
