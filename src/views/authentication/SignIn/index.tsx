import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';

import Social from 'src/components/Social';

import { useUserStore } from 'src/stores';

import { signInRequest } from 'src/apis/auth';
import ResponseDto from 'src/apis/response.dto';
import { getUserInfoRequest } from 'src/apis/user';
import { SignInRequestDto } from 'src/apis/auth/dto/request';
import { SignInResponseDto } from 'src/apis/auth/dto/response';
import { GetUserInfoResponseDto } from 'src/apis/user/dto/response';
import { MAIN_ABSOLUTE_PATH, SIGN_IN_ABSOLUTE_PATH, SIGN_UP_ABSOLUTE_PATH } from 'src/constant';

import './style.css';

//                    Component : 로그인 화면 컴포넌트                     //
function SignIn () { 

    //                    state                     //
    const[cookies, setCookies] = useCookies();

    const [userId, setUserId] = useState<string>('');
    const [userPassword, setUserPassword] = useState<string>('');

    const { setLoginUserId, setLoginUserRole } = useUserStore();

    const focusRef = useRef<HTMLInputElement | null>(null);
    
    //                     function                     //
    const navigator = useNavigate();

    const getSignInUserResponse = (result: GetUserInfoResponseDto | ResponseDto | null) => {

        const message = 
            !result ? '서버에 문제가 있습니다.' : 
            result.code === 'VF' ? '아이디와 비밀번호를 모두 입력하세요.' :
            result.code === 'AF' ? '권한이 없습니다.' :
            result.code === 'TF' ? '서버에 문제가 있습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if( !result || result.code !== 'SU') {
            alert(message);
            return;
        }

        const { userId, userRole } = result as GetUserInfoResponseDto;
        setLoginUserId(userId);
        setLoginUserRole(userRole);

    }

    const signInResponse = (result: SignInResponseDto | ResponseDto | null) => {

        const message = 
            !result ? '서버에 문제가 있습니다.' : 
            result.code === 'VF' ? '아이디와 비밀번호를 모두 입력하세요.' :
            result.code === 'SF' ? '로그인 정보가 일치하지 않습니다.' :
            result.code === 'TF' ? '서버에 문제가 있습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if( !result || result.code !== 'SU') {
            alert(message);
            navigator(SIGN_IN_ABSOLUTE_PATH);
            return;
        }

        const {accessToken, expires} = result as SignInResponseDto; 
        const expiration = new Date(Date.now() + (expires * 1000));
        setCookies('accessToken', accessToken, { path: '/' , expires: expiration });
        getUserInfoRequest(accessToken).then(getSignInUserResponse);

    };

    //                     event handler                     //
    const onUserIdChangeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {

        const { value } = event.target;
        setUserId(value);

    };
    
    const onUserPasswordChangeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {

        const { value } = event.target;
        setUserPassword(value);

    };


    const onEnterKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {

        if (event.key === 'Enter') return onSignInButtonClickHandler();

    }

    const onSignInButtonClickHandler = () => {

        if (!userId || !userPassword) {
            alert('아이디와 비밀번호를 모두 입력해주세요.')
            return;
        }

        const requestBody: SignInRequestDto = {userId, userPassword};
        signInRequest(requestBody).then(signInResponse);

        navigator(MAIN_ABSOLUTE_PATH);

    };

    const onSignUpButtonClickHandler = () => navigator(SIGN_UP_ABSOLUTE_PATH);

    //                  Effect                  //
    useEffect(() => {
        if (focusRef.current) focusRef.current.focus();
    }, [])

    //                    render : 로그인 화면 컴포넌트                     //
    return (
        <div id='sign-in-wrapper'>
            <div className='sign-in-content'>    
                <div className='sign-in-title'>로그인</div>
                <div className='sign-in-input-container'>
                    <div className='sign-in-input-box'>
                        <div className='sign-in-input-title'>아이디</div>
                        <div className='sign-in-input-border'>
                            <input className='sign-in-input' value={userId} onChange={onUserIdChangeEventHandler} onKeyDown={onEnterKeyDownHandler} ref={focusRef}/>
                        </div>
                    </div>
                    <div className='sign-in-input-box'>
                        <div className='sign-in-input-title'>비밀번호</div>
                        <div className='sign-in-input-border'>
                            <input className='sign-in-input' type='password' value={userPassword} onChange={onUserPasswordChangeEventHandler} onKeyDown={onEnterKeyDownHandler}/>
                        </div>
                    </div>
                </div>
                <Social title='sns 로그인' />
                <div className='sign-in-button-box'>
                    <div className='primary-button full-width' onClick={onSignInButtonClickHandler}>로그인</div>
                    <div className='primary-button full-width' onClick={onSignUpButtonClickHandler}>회원가입</div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;