import React from 'react'
import { Outlet, useNavigate } from 'react-router'
import './style.css';
import { ADMINPAGE_REST_LIST_ABSOLUTE_PATH, ADMINPAGE_TOUR_LIST_ABSOLUTE_PATH, ADMINPAGE_USER_LIST_ABSOLUTE_PATH, REST_ADD_PATH, TOUR_ADD_PATH, USER_LIST_PATH } from 'src/constant';

//                  Component                   //
function SideNavigation () {

    //                  function                   //
    const navigator = useNavigate();

    //                  event handler                   //
    const onUserListHandler = () => navigator(ADMINPAGE_USER_LIST_ABSOLUTE_PATH);
    const onTourListHandler = () => navigator(ADMINPAGE_TOUR_LIST_ABSOLUTE_PATH);
    const onRestListHandler = () => navigator(ADMINPAGE_REST_LIST_ABSOLUTE_PATH);

    //                  Render                  //
    return (
        <div className='side-navigator-container'>
            <div className='side-container-element side-container-link'>
                <div className='user-manage' onClick={onUserListHandler}>회원관리</div>
            </div>
            <div className='side-container-element side-container-link'>
                <div className='register-tourattraction' onClick={onTourListHandler}>관광명소등록</div>
            </div>
            <div className='side-container-element side-container-link'>
                <div className='register-restaurant' onClick={onRestListHandler}>음식점등록</div>
            </div>
        </div>
    )
}

//                  Component                   //
export default function AdminContainer() {

    //                  Render                  //
    return (
    <div id='wrapper'>
        <SideNavigation />
        <Outlet />
    </div>
    )
}
