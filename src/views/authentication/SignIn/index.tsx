import Social from 'src/components/Social';
import './style.css';
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import { SIGN_UP_ABSOLUTE_PATH } from 'src/constant';

//                    Component : 로그인 화면 컴포넌트                     //
function SignIn () { 

    //                    state                     //
    // description: 아이디 상태 //
    const [userId, setUserId] = useState<string>('');
    // description: 비밀번호 상태 //
    const [userPassword, setUserPassword] = useState<string>('');
    
    //                     function                     //
    // description: 네비게이터 함수 //
    const navigator = useNavigate();

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