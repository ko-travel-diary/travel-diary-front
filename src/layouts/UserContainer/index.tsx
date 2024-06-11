import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import "./style.css";
import { DELETE_USER_ABSOLUTE_PAGE, MYPAGE_PROFILEUPDATE_ABSOLUTE_PAGE, MY_REVIEWLIST_ABSOLUTE_PATH, SCHEDULE_ABSOLUTE_PATH } from "src/constant";

//                  Component                   //
function SideNavigation() {
    //                  function                   //
    const navigator = useNavigate();
    const currentLocation = useLocation();

    //                  event handler                   //
    const onProfileUpdateClickHandler = () => navigator(MYPAGE_PROFILEUPDATE_ABSOLUTE_PAGE);
    const onScheduleListClickHandler = () => navigator(SCHEDULE_ABSOLUTE_PATH);
    const onMyReviewListClickHandler = () => navigator(MY_REVIEWLIST_ABSOLUTE_PATH);
    const onDeleteUserClickHandler = () => navigator(DELETE_USER_ABSOLUTE_PAGE);

    //                  Render                  //
    const profileUpdateClass =
        currentLocation.pathname === MYPAGE_PROFILEUPDATE_ABSOLUTE_PAGE ? "side-container-content-active" : "side-container-content";
    const myScheduleClass = currentLocation.pathname === SCHEDULE_ABSOLUTE_PATH ? "side-container-content-active" : "side-container-content";
    const myReviewClass = currentLocation.pathname === MY_REVIEWLIST_ABSOLUTE_PATH ? "side-container-content-active" : "side-container-content";
    const userDeleteClass = currentLocation.pathname === DELETE_USER_ABSOLUTE_PAGE ? "side-container-content-active" : "side-container-content";
    return (
        <div className="side-navigator-container">
            <div className="side-container-element side-container-link">
                <div className={profileUpdateClass} onClick={onProfileUpdateClickHandler}>
                    프로필 수정
                </div>
            </div>
            <div className="side-container-element side-container-link">
                <div className={myScheduleClass} onClick={onScheduleListClickHandler}>
                    나의 여행일정
                </div>
            </div>
            <div className="side-container-element side-container-link">
                <div className={myReviewClass} onClick={onMyReviewListClickHandler}>
                    작성한 게시물
                </div>
            </div>
            <div className="side-container-element side-container-link">
                <div className={userDeleteClass} onClick={onDeleteUserClickHandler}>
                    회원탈퇴
                </div>
            </div>
        </div>
    );
}

//                  Component                   //
export default function UserContainer() {
    //                  Render                  //
    return (
        <div id="wrapper">
            <SideNavigation />
            <Outlet />
        </div>
    );
}
