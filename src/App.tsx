import React, { useEffect } from "react";
import "./App.css";
import Container from "./layouts/Container";
import { Route, Routes, useNavigate } from "react-router";
import Main from "./views/Main";
import {
    ADMINPAGE_PATH,
    AUTH_PATH,
    DELETE_USER_PATH,
    MAIN_PATH,
    MYPAGE_PATH,
    MY_REVIEWLIST_PATH,
    PROFILE_UPDATE_PATH,
    QNA_DETAIL_PATH,
    QNA_PATH,
    QNA_UPDATE_PATH,
    QNA_WRITE_PATH,
    REST_ADD_PATH,
    REST_CONTROL_PATH,
    REST_DETAIL_PATH,
    REST_LIST_PATH,
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
    SNS_PATH,
    TOUR_ADD_PATH,
    TOUR_CONTROL_PATH,
    TOUR_DETAIL_PATH,
    TOUR_LIST_PATH,
    TOUR_PATH,
    USER_LIST_PATH,
} from "./constant";
import SignIn from "./views/authentication/SignIn";
import SignUp from "./views/authentication/SignUp";
import ReviewList from "./views/service/review/ReviewList";
import ReviewDetail from "./views/service/review/ReviewDetail";
import ReviewUpdate from "./views/service/review/ReviewUpdate";
import ReviewWrite from "./views/service/review/ReviewWrite";
import QnaList from "./views/service/Qna/QnaList";
import QnaDetail from "./views/service/Qna/QnaDetail";
import QnaUpdate from "./views/service/Qna/QnaUpdate";
import QnaWrite from "./views/service/Qna/QnaWrite";
import AdminContainer from "./layouts/AdminContainer";
import UserList from "./views/service/admin/userList";
import TourAdd from "./views/service/admin/tourAdd";
import RestAdd from "./views/service/admin/restAdd";
import TourList from "./views/service/admin/tourList";
import RestList from "./views/service/admin/restList";
import SearchTravelList from "./views/service/SearchTravel/SearchTravelList";
import TourDetail from "./views/service/SearchTravel/SearchTravelDetail/TourDetail";
import RestDetail from "./views/service/SearchTravel/SearchTravelDetail/RestDetail";
import UserContainer from "./layouts/UserContainer";
import ProfileUpdate from "./views/service/user/ProfileUpdate";
import ScheduleList from "./views/service/user/schedule/ScheduleList";
import MyReviewList from "./views/service/user/MyReviewList";
import ScheduleDetail from "./views/service/user/schedule/ScheduleDetail";
import ScheduleUpdate from "./views/service/user/schedule/ScheduleUpdate";
import ScheduleWrite from "./views/service/user/schedule/ScheduleWrite";
import DeleteUser from "./views/service/user/DeleteUser";
import TourControl from "./views/service/admin/tourControl";
import RestControl from "./views/service/admin/restControl";
import { Sns } from "./components/Social";
import NotFound from "./views/notFound";

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
                <Route path={SERVICE_PATH}>
                    <Route path={REVIEW_PATH}>
                        <Route index element={<ReviewList />} />
                        <Route path={REVIEW_DETAIL_PATH} element={<ReviewDetail />} />
                        <Route path={REVIEW_UPDATE_PATH} element={<ReviewUpdate />} />
                        <Route path={REVIEW_WRITE_PATH} element={<ReviewWrite />} />
                    </Route>

                    <Route path={QNA_PATH}>
                        <Route index element={<QnaList />} />
                        <Route path={QNA_DETAIL_PATH} element={<QnaDetail />} />
                        <Route path={QNA_UPDATE_PATH} element={<QnaUpdate />} />
                        <Route path={QNA_WRITE_PATH} element={<QnaWrite />} />
                    </Route>

                    <Route path={MYPAGE_PATH} element={<UserContainer />}>
                        <Route path={PROFILE_UPDATE_PATH} element={<ProfileUpdate />} />
                        <Route path={SCHEDULE_PATH}>
                            <Route index element={<ScheduleList />} />
                            <Route path={SCHEDULE_DETAIL_PATH} element={<ScheduleDetail />} />
                            <Route path={SCHEDULE_UPDATE_PATH} element={<ScheduleUpdate />} />
                            <Route path={SCHEDULE_WRITE_PATH} element={<ScheduleWrite />} />
                        </Route>
                        <Route path={MY_REVIEWLIST_PATH} element={<MyReviewList />} />
                        <Route path={DELETE_USER_PATH} element={<DeleteUser />} />
                    </Route>

                    <Route path={ADMINPAGE_PATH} element={<AdminContainer />}>
                        <Route index element={<UserList />} />
                        <Route path={USER_LIST_PATH} element={<UserList />} />
                        <Route path={TOUR_CONTROL_PATH} element={<TourControl />} />
                        <Route path={TOUR_LIST_PATH} element={<TourList />} />
                        <Route path={TOUR_ADD_PATH} element={<TourAdd />} />
                        <Route path={REST_CONTROL_PATH} element={<RestControl />} />
                        <Route path={REST_LIST_PATH} element={<RestList />} />
                        <Route path={REST_ADD_PATH} element={<RestAdd />} />
                    </Route>

                    <Route path={TOUR_PATH}>
                        <Route index element={<SearchTravelList />} />
                        <Route path={TOUR_DETAIL_PATH} element={<TourDetail />} />
                        <Route path={REST_DETAIL_PATH} element={<RestDetail />} />
                    </Route>
                </Route>
            </Route>

                <Route path={SNS_PATH} element={<Sns />}></Route>
            <Route path={AUTH_PATH}>
                <Route index element={<AuthIndex />} />
                <Route path={SIGN_IN_PATH} element={<SignIn />} />
                <Route path={SIGN_UP_PATH} element={<SignUp />} />
            </Route>

            <Route path="*" element={<NotFound />}></Route>
        </Routes>
    );
}

export default App;
