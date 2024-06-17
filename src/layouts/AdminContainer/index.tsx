import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router";

import { ADMINPAGE_REST_LIST_ABSOLUTE_PATH, ADMINPAGE_TOUR_LIST_ABSOLUTE_PATH, ADMINPAGE_USER_LIST_ABSOLUTE_PATH } from "src/constant";

import "./style.css";

//                  Component                   //
function SideNavigation() {
    //                  function                   //
    const navigator = useNavigate();
    const currentLocation = useLocation();

    //                  event handler                   //
    const onUserListHandler = () => navigator(ADMINPAGE_USER_LIST_ABSOLUTE_PATH);
    const onTourListHandler = () => navigator(ADMINPAGE_TOUR_LIST_ABSOLUTE_PATH);
    const onRestListHandler = () => navigator(ADMINPAGE_REST_LIST_ABSOLUTE_PATH);

    //                  Render                  //
    const userList = currentLocation.pathname === ADMINPAGE_USER_LIST_ABSOLUTE_PATH ? "side-container-content-active" : "side-container-content";
    const tourList = currentLocation.pathname === ADMINPAGE_TOUR_LIST_ABSOLUTE_PATH ? "side-container-content-active" : "side-container-content";
    const restList = currentLocation.pathname === ADMINPAGE_REST_LIST_ABSOLUTE_PATH ? "side-container-content-active" : "side-container-content";
    return (
        <div className="side-navigator-container">
            <div className="side-container-element side-container-link">
                <div className={userList} onClick={onUserListHandler}>
                    회원관리
                </div>
            </div>
            <div className="side-container-element side-container-link">
                <div className={tourList} onClick={onTourListHandler}>
                    관광명소등록
                </div>
            </div>
            <div className="side-container-element side-container-link">
                <div className={restList} onClick={onRestListHandler}>
                    음식점등록
                </div>
            </div>
        </div>
    );
}

//                  Component                   //
export default function AdminContainer() {
    //                  Render                  //
    return (
        <div id="wrapper">
            <SideNavigation />
            <Outlet />
        </div>
    );
}
