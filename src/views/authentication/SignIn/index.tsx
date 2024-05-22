import Social from 'src/components/Social';
import './style.css';
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import { MAIN_ABSOLUTE_PATH, SIGN_UP_ABSOLUTE_PATH } from 'src/constant';
import { signInRequest } from 'src/apis/auth';
import { SignInRequestDto } from 'src/apis/auth/dto/request';
import { SignInResponseDto } from 'src/apis/auth/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { useCookies } from 'react-cookie';
import { useStore } from 'zustand';
import { useUserStore } from 'src/stores';

//                    Component : 로그인 화면 컴포넌트                     //
function SignIn () { 

    //                    state                     //
    const[cookies, setCookies] = useCookies();
    // description: 아이디 상태 //
    const [userId, setUserId] = useState<string>('');
    // description: 비밀번호 상태 //
    const [userPassword, setUserPassword] = useState<string>('');
    
    //                     function                     //
    // description: 네비게이터 함수 //
    const navigator = useNavigate();

    const signInResponse = (result: SignInResponseDto | ResponseDto | null) => {

        const message = 
            !result ? '서버에 문제가 있습니다.' : 
            result.code === 'VF' ? '아이디와 비밀번호를 모두 입력하세요.' :
            result.code === 'SF' ? '로그인 정보가 일치하지 않습니다.' :
            result.code === 'TF' ? '서버에 문제가 있습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if( !result || result.code !== 'SU') {
            alert(message);
            return;
        }

        const {accessToken, expires} = result as SignInResponseDto; 
        const expiration = new Date(Date.now() + (expires * 1000));
        setCookies('accessToken', accessToken, { path: '/' , expires: expiration});

        navigator(MAIN_ABSOLUTE_PATH);
        alert('로그인 성공');
    };

    //                     event handler                     //
    // description: 아이디 변경 이벤트 처리 함수 //
    const onUserIdChangeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setUserId(value);
    }
    // description: 비밀번호 변경 이벤트 처리 함수 //
    const onUserPasswordChangeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setUserPassword(value);
    }
    // description: 로그인 버튼 클릭 이벤트 처리 함수 //
    const onSignInButtonClickHandler = () => {
        const requestBody: SignInRequestDto = {userId, userPassword};
        signInRequest(requestBody).then(signInResponse);
    }
    // description: 회원가입 버튼 클릭 이벤트 처리 함수 //
    const onSignUpButtonClickHandler = () => navigator(SIGN_UP_ABSOLUTE_PATH);

    //                    render : 로그인 화면 컴포넌트                     //
    return (
        <div id='sign-in-wrapper'>
            <div className='sign-in-title'>로그인</div>
            <div className='sign-in-input-container'>
                <div className='sign-in-input-box'>
                    <div className='sign-in-input-title'>아이디</div>
                    <div className='sign-in-input-border'>
                        <input className='sign-in-input' value={userId} onChange={onUserIdChangeEventHandler} />
                    </div>
                </div>
                <div className='sign-in-input-box'>
                    <div className='sign-in-input-title'>비밀번호</div>
                    <div className='sign-in-input-border'>
                        <input className='sign-in-input' type='password' value={userPassword} onChange={onUserPasswordChangeEventHandler} />
                    </div>
                </div>
            </div>
            <Social />
            <div className='sign-in-button-box'>
                <div className='primary-button full-width' onClick={onSignInButtonClickHandler}>로그인</div>
                <div className='primary-button full-width' onClick={onSignUpButtonClickHandler}>회원가입</div>
            </div>
        </div>
    );
}

export default SignIn;