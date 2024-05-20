import React, { useEffect } from 'react';
import './App.css';
import Container from './layouts/Container';
import { Route, Routes, useNavigate } from 'react-router';
import Main from './views/Main';
import { AUTH_PATH, MAIN_PATH, SERVICE_PATH, SIGN_IN_ABSOLUTE_PATH, SIGN_IN_PATH, SIGN_UP_PATH } from './constant';
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
        </Route>
    </Routes>
  );
}

export default App;
