import { ChangeEvent, useState } from 'react';
import Social from 'src/components/Social';
import './style.css'

//                    interface : 회원가입 인풋 박스 프로퍼티즈                     //
interface InputBoxProps {
    title: string;
    value: string;
    onChnage: (event: ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    type: 'text' | 'password';
    messageError: boolean;
    message: string;
    buttonTitle?: string;
    onButtonClick?: () => void;
}

//                    Component : 회원가입 인풋 박스 컴포넌트                     //
function InputBox ({ title, value, onChnage, placeholder, type, messageError, message, buttonTitle, onButtonClick }: InputBoxProps) {

    //                    render :  회원가입 인풋 박스 컴포넌트                     //
    const messageClass = 'sign-up-message ' + (messageError ? 'error' :  'primary');
    return (
        <div className='sign-up-input-box'>
            <div className='sign-up-input-main'>
                <div className='sign-up-input-title'>{title}</div>
                <div  className='sign-up-outline'>
                    <input  className='sign-up-input' type={type} placeholder={placeholder} value={value} onChange={onChnage}  />
                    <div className={messageClass}>{message}</div>
                </div>
                {onButtonClick && <div className='primary-button' onClick={onButtonClick}>{buttonTitle}</div>}
            </div>
        </div>
    );

}

//                    Component : 회원가입 화면 컴포넌트                     //
function SignUp () { 

    //                    state                     //
    // description: 아이디 상태 //
    const [userId, setUserId] = useState<string>('');
    // description: 비밀번호 상태 //
    const [userPassword, setUserPassword] = useState<string>('');
    // description: 비밀번호 확인 상태 //
    const [userPasswordCheck, setUserPasswordCheck] = useState<string>('');
    // description: 닉네임 상태 //
    const [nickName, setNickName] = useState<string>('');
    // description: 이메일 상태 //
    const [userEmail, setUserEmail] = useState<string>('');
    // description: 인증번호 상태 //
    const [authNumber, setAuthNumber] = useState<string>('');
    // description: 아이디 메세지  상태 //
    const [userIdMessage, setUserIdMessage] = useState<string>('이미 사용중인 아이디입니다.');
    // description: 비밀번호 메세지 상태 //
    const [userPasswordMessage, setUserPasswordMessage] = useState<string>('');
    // description: 비밀번호 확인 메세지 상태 //
    const [userPasswordCheckMessage, setUserPasswordCheckMessage] = useState<string>('');
    // description: 닉네임 메세지 상태 //
    const [nickNameMessage, setNickNameMessage] = useState<string>('');
    // description: 이메일 메세지 상태 //
    const [userEmailMessage, setUserEmailMessage] = useState<string>('');
    // description: 인증번호 메세지 상태 //
    const [authNumberMessage, setAuthNumberMessage] = useState<string>('');
    // description: 아이디 메세지 에러  상태 //
    const [userIdMessageError, setUserIdMessageError] = useState<boolean>(false);
    // description: 비밀번호 메세지 에러 상태 //
    const [userPasswordMessageError, setUserPasswordMessageError] = useState<boolean>(false);
    // description: 비밀번호 확인 메세지 에러 상태 //
    const [userPasswordCheckMessageError, setUserPasswordCheckMessageError] = useState<boolean>(false);
    // description: 닉네임 메세지 에러 상태 //
    const [nickNameMessageError, setNickNameMessageError] = useState<boolean>(false);
    // description: 이메일 메세지 에러 상태 //
    const [userEmailMessageError, setUserEmailMessageError] = useState<boolean>(false);
    // description: 인증번호 메세지 에러 상태 //
    const [authNumberMessageError, setAuthNumberMessageError] = useState<boolean>(false);

    //                    event handler                     //
    // description: 아이디 변경 처리 이벤트 //
    const onUserIdChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setUserId(value);
    };
    // description: 비밀번호 변경 처리 이벤트 //
    const onUserPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setUserPassword(value);
    };
    // description: 비밀번호 확인 변경 처리 이벤트 //
    const onUserPasswordCheckChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setUserPasswordCheck(value);
    };
    // description: 닉네임 변경 처리 이벤트 //
    const onNickNameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setNickName(value);
    };
    // description: 이메일 변경 처리 이벤트 //
    const onUserEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setUserEmail(value);
    };
    // description: 인증번호 변경 처리 이벤트 //
    const onAuthNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setAuthNumber(value);
    };
    // description: 아이디 버튼 클릭 처리 이벤트 //
    const onUserIdButtonClickHandler = () => {

    };
    // description: 닉네임 버튼 클릭 처리 이벤트 //
    const onNickNameButtonClickHandler = () => {
        
    };
    // description: 이메일 버튼 클릭 처리 이벤트 //
    const onUserEmailButtonClickHandler = () => {
        
    };
    // description: 인증번호 버튼 클릭 처리 이벤트 //
    const onAuthNumberButtonClickHandler = () => {
        
    };

    //                    render : 회원가입 화면 컴포넌트                     //
    return (
        <div id='sign-up-wrapper'>
            <div className='sign-up-title'>회원가입</div>
            <div className='sign-up-input-container'>
                <InputBox title='아이디' value={userId} onChnage={onUserIdChangeHandler} placeholder='' type='text' messageError={userIdMessageError} message={userIdMessage} buttonTitle='중복 확인' onButtonClick={onUserIdButtonClickHandler}  />
                <InputBox title='비밀번호' value={userPassword} onChnage={onUserPasswordChangeHandler} placeholder='' type='password' messageError={userPasswordMessageError} message={userPasswordMessage}  />
                <InputBox title='비밀번호 확인' value={userPasswordCheck} onChnage={onUserPasswordCheckChangeHandler} placeholder='' type='password' messageError={userPasswordCheckMessageError} message={userPasswordCheckMessage} />
                <InputBox title='닉네임' value={nickName} onChnage={onNickNameChangeHandler} placeholder='' type='text' messageError={nickNameMessageError} message={nickNameMessage} buttonTitle='중복 확인' onButtonClick={onUserIdButtonClickHandler}  />
                <InputBox title='이메일' value={userEmail} onChnage={onUserEmailChangeHandler} placeholder='' type='text' messageError={userEmailMessageError} message={userEmailMessage} buttonTitle='중복 확인' onButtonClick={onUserIdButtonClickHandler}  />
                <InputBox title='인증번호' value={authNumber} onChnage={onAuthNumberChangeHandler} placeholder='' type='text' messageError={authNumberMessageError} message={authNumberMessage} buttonTitle='인증 확인' onButtonClick={onUserIdButtonClickHandler}  />
            </div>
            <Social />
            <div className='primary-button full-width'>회원가입</div>
        </div>
    );
}

export default SignUp;