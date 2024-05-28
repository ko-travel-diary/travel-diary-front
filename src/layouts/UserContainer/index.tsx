import React from 'react'
import { Outlet, useNavigate } from 'react-router'
import './style.css';
import { DELETE_USER_ABSOLUTE_PAGE, MYPAGE_PROFILEUPDATE_ABSOLUTE_PAGE, MY_REVIEWLIST_ABSOLUTE_PATH, SCHEDULE_ABSOLUTE_PATH } from 'src/constant';

//                  Component                   //
function SideNavigation () {

    //                  function                   //
    const navigator = useNavigate();

    //                  event handler                   //
    const onProfileUpdateClickHandler = () => navigator(MYPAGE_PROFILEUPDATE_ABSOLUTE_PAGE);
    const onScheduleListClickHandler = () => navigator(SCHEDULE_ABSOLUTE_PATH);
    const onMyReviewListClickHandler = () => navigator(MY_REVIEWLIST_ABSOLUTE_PATH);
    const onDeleteUserClickHandler = () => navigator(DELETE_USER_ABSOLUTE_PAGE);

    //                  Render                  //
    return (
        <div className='side-navigator-container'>
            <div className='side-container-element side-container-link'>
                <div className='user-manage' onClick={onProfileUpdateClickHandler}>프로필 수정</div>
            </div>
            <div className='side-container-element side-container-link'>
                <div className='register-tourattraction' onClick={onScheduleListClickHandler}>나의 여행일정</div>
            </div>
            <div className='side-container-element side-container-link'>
                <div className='register-restaurant' onClick={onMyReviewListClickHandler}>작성한 게시물</div>
            </div>
            <div className='side-container-element side-container-link'>
                <div className='register-restaurant' onClick={onDeleteUserClickHandler}>회원탈퇴</div>
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
