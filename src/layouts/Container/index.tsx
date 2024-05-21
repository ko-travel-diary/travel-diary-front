import React from 'react'
import './style.css';
import { Outlet, useNavigate } from 'react-router';
import SignIn from 'src/views/authentication/SignIn';
import { MAIN_ABSOLUTE_PATH, QNA_ABSOLUTE_PATH, REVIEW_ABSOULUTE_PATH, SIGN_IN_ABSOLUTE_PATH, TOURATTRACTIONS_ABSOULUTE_PATH } from 'src/constant';

function TopNavigation () {

    const navigator = useNavigate();

    const onSignInButtonClickHandler = () => navigator(SIGN_IN_ABSOLUTE_PATH);
    const onMainPageButtonClickHandler = () => navigator(MAIN_ABSOLUTE_PATH);
    const onTourButtonClickHandler = () => navigator(TOURATTRACTIONS_ABSOULUTE_PATH);
    const onReivewButtonClickHandler = () => navigator(REVIEW_ABSOULUTE_PATH);
    const onQnaButtonClickHandler = () => navigator(QNA_ABSOLUTE_PATH);

    return (
        <div id='top-navigation'>
            <div className='top-navigation-left'>
                <div className='top-navigation-logo'></div>
                <div className='top-navigation-title' onClick={onMainPageButtonClickHandler}>여행 일기</div>
            </div>
            <div className='top-navigation-main'>
                <div className='top-navigation-item-active' onClick={onMainPageButtonClickHandler}>메인 페이지</div>
                <div className='vertical-divider'></div>
                <div className='top-navigation-item' onClick={onTourButtonClickHandler}>관광명소 & 맛집 조회</div>
                <div className='vertical-divider'></div>
                <div className='top-navigation-item' onClick={onReivewButtonClickHandler}>여행 후기 게시글</div>
                <div className='vertical-divider'></div>
                <div className='top-navigation-item' onClick={onQnaButtonClickHandler}>Q&A</div>
            </div>
            <div className='top-navigation-right'>
                <div className='primary-button' onClick={onSignInButtonClickHandler}>로그인</div>
                {/* <div className='profile-icon'></div>
                <div className='top-navigation-right-drop-down'>
                    <div className='profile-icon'></div>
                    <div className='top-navigation-right-drop-down-box'>
                        <div className='top-navigation-right-drop-down-nickname'>{'닉네임'}</div>
                        <div className='top-navigation-right-drop-down-link'>
                            <div>마이페이지</div>
                            <div>로그아웃</div>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
}

export default function Container() {
  return (
    <div>
        <TopNavigation />
        <Outlet />
    </div>
  )
}
