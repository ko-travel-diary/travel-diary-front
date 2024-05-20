import React, { useEffect } from 'react';
import './App.css';
import Container from './layouts/Container';
import { Route, Routes, useNavigate } from 'react-router';
import Main from './views/Main';
import { AUTH_PATH, MAIN_PATH, MYPAGE_PATH, QNA_DETAIL_PATH, QNA_PATH, QNA_UPDATE_PATH, QNA_WRITE_PATH, REVIEW_DETAIL_PATH, REVIEW_PATH, REVIEW_UPDATE_PATH, REVIEW_WRITE_PATH, SCHEDULE_PATH, SERVICE_PATH, SIGN_IN_ABSOLUTE_PATH, SIGN_IN_PATH, SIGN_UP_PATH } from './constant';
import SignIn from './views/authentication/SignIn';
import SignUp from './views/authentication/SignUp';

//                    Component : 인증화면 index 컴포넌트                     //
function AuthIndex() {

  //                    function                      //
  //     description: 네비게이터 함수      //
  const navigator = useNavigate();

  //                    effect                      //
  //     description: 마운트시에만 실행할 effect (로그인 페이지로 이동)      //
  useEffect(() => navigator(SIGN_IN_ABSOLUTE_PATH), []);

  //                    render : 인증화면 index 컴포넌트                     //
  return (<></>);
}

//                    Component : App 컴포넌트                     //
function App() {

  //                    render : App 컴포넌트                     //
  return (
    <Routes>
        <Route path={MAIN_PATH} element={<Container />}>
          <Route index element={<Main />} />
        </Route>
        <Route path={AUTH_PATH}>
          <Route index element={<AuthIndex />} />
          <Route path={SIGN_IN_PATH} element={<SignIn />} />
          <Route path={SIGN_UP_PATH} element={<SignUp />} />
          <Route path={SERVICE_PATH} element={<></>}>
            <Route path={REVIEW_PATH} element={<></>}>
              <Route path={REVIEW_DETAIL_PATH} element={<></>} />
              <Route path={REVIEW_UPDATE_PATH} element={<></>} />
              <Route path={REVIEW_WRITE_PATH} element={<></>} />
            </Route>
            <Route path={QNA_PATH} element={<></>}>
              <Route path={QNA_DETAIL_PATH} element={<></>} />
              <Route path={QNA_UPDATE_PATH} element={<></>} />
              <Route path={QNA_WRITE_PATH} element={<></>} />
            </Route>
            <Route path={MYPAGE_PATH} element={<></>} >
              <Route path={MYPAE} element={<></>} />
            </Route>
            <Route path={} element={<></>} />
          </Route>
        </Route>
    </Routes>
  );
}

export default App;
