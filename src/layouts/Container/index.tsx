import React, { useEffect, useState } from 'react'
import './style.css';
import { Outlet, useNavigate } from 'react-router';
import SignIn from 'src/views/authentication/SignIn';
import { ADMINPAGE_ABSOULUTE_PAGE, AUTH_ABSOLUTE_PATH, MAIN_ABSOLUTE_PATH, MYPAGE_ABSOULUTE_PATH, QNA_ABSOLUTE_PATH, REVIEW_ABSOULUTE_PATH, SIGN_IN_ABSOLUTE_PATH, SIGN_OUT_REQUEST_URL, TRAVEL_ABSOLUTE_PATH } from 'src/constant';
import { useUserStore } from 'src/stores';
import { useCookies } from 'react-cookie';
import { getUserInfoRequest } from 'src/apis/user';
import { GetUserInfoResponseDto } from 'src/apis/user/dto/response';
import ResponseDto from 'src/apis/response.dto';
import axios from 'axios';
import { bearerAuthorization } from 'src/apis';

//                  Component                    //
function TopNavigation () {

    //                                       state                                        //
    const { loginUserId, setLoginUserId, loginUserRole, setLoginUserRole } = useUserStore();
    const [cookies, setCookies] = useCookies();

    const [userProfile, setUserProfile] = useState<string>('');
    const [nickName, setNickName] = useState<string>('');

    const [buttonStatus, setButtonStatus] = useState<boolean>(false);
    

    //                  function                   //
    const navigator = useNavigate();

    const getSignInUserResponse = (result: GetUserInfoResponseDto | ResponseDto | null) => {

        const message = 
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'AF' ? '인증에 실패하였습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if(!result || result.code !== 'SU') {
            alert(message);
            navigator(MAIN_ABSOLUTE_PATH);
            return;
        }

        const { profileImage, userId, nickName, userRole } = result as GetUserInfoResponseDto;
        setUserProfile(profileImage);
        setNickName(nickName);
        setLoginUserId(userId);
        setLoginUserRole(userRole);
    };

    //                  event handler                   //
    const onSignInButtonClickHandler = () => navigator(SIGN_IN_ABSOLUTE_PATH);
    const onMainPageButtonClickHandler = () => navigator(MAIN_ABSOLUTE_PATH);
    const onTourButtonClickHandler = () => navigator(TRAVEL_ABSOLUTE_PATH);
    const onReivewButtonClickHandler = () => navigator(REVIEW_ABSOULUTE_PATH);
    const onQnaButtonClickHandler = () => navigator(QNA_ABSOLUTE_PATH);

    const onButtonClickHandler =() => setButtonStatus(!buttonStatus);
    const onMovePageButtonClickHandler = () => {
        const page = loginUserRole === 'ROLE_USER' ? MYPAGE_ABSOULUTE_PATH : ADMINPAGE_ABSOULUTE_PAGE;
        navigator(page);
    }

    const onSignOutButtonClickHandler = async () => {

        const expiration = new Date(Date.now());
        setLoginUserId('');
        setLoginUserId('');
        setCookies('accessToken', '', { path: '/' , expires: expiration})
    }

    //                  effect                    //
    useEffect(() => {
        
        if(!cookies.accessToken) {
            navigator(MAIN_ABSOLUTE_PATH);
            return;
        }

        getUserInfoRequest(cookies.accessToken).then(getSignInUserResponse);

    }, [cookies.accessToken]);


    //                  Render                  //
    const movePage = loginUserRole === "ROLE_ADMIN" ? <div className='navigation-move-page' onClick={onMovePageButtonClickHandler}>관리자페이지</div> : <div className='navigation-move-page' onClick={onMovePageButtonClickHandler}>마이페이지</div>;
    return (
        <div id='top-navigation'>
            <div className='top-navigation-left'>
                <div className='top-navigation-logo'></div>
                <div className='top-navigation-title' onClick={onMainPageButtonClickHandler}>여행 일기</div>
            </div>
            <div className='top-navigation-main'>
                <div className='top-navigation-item-active' onClick={onMainPageButtonClickHandler}>메인 페이지</div>
                <div className='vertical-divider'></div>
                <div className='top-navigation-item' onClick={onTourButtonClickHandler}>관광명소 & 음식점 조회</div>
                <div className='vertical-divider'></div>
                <div className='top-navigation-item' onClick={onReivewButtonClickHandler}>여행 후기 게시글</div>
                <div className='vertical-divider'></div>
                <div className='top-navigation-item' onClick={onQnaButtonClickHandler}>Q&A</div>
            </div>
            <div className='top-navigation-right'>
                {!cookies.accessToken ? 
                    <div className='primary-button' onClick={onSignInButtonClickHandler}>로그인</div> :
                    <div className='loginUser-form' onClick={onButtonClickHandler}>

                        {userProfile === null ?
                            <>
                                <div className='user-profile default'>
                                    {buttonStatus &&
                                        <div className='top-navigation-right-drop-down'>
                                            <div className='navigation-box'>
                                                {movePage}
                                                <div className='sign-out-button' onClick={onSignOutButtonClickHandler}>로그아웃</div>
                                            </div>
                                        </div>
                                    }
                                </div> 
                                <div>{nickName}</div>
                            </>
                            :
                            <>
                                <div className='user-profile.image' style={{backgroundImage: `url(${userProfile})`, 
                                    width:'50px', height: '50px',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    borderRadius: '25px',
                                    backgroundRepeat: 'no-repeat'}}>
                                    {buttonStatus &&
                                        <div className='top-navigation-right-drop-down'>
                                            <div className='navigation-box'>
                                                {movePage}
                                                <div className='sign-out-button' onClick={onSignOutButtonClickHandler}>로그아웃</div>
                                            </div>
                                        </div>
                                    }
                                </div>
                                <div>{nickName}</div>
                            </>
                        }

                    </div>
                }
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
