import React, { ChangeEvent, forwardRef, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

import Social from "src/components/Social";
import ResponseDto from "src/apis/response.dto";
import { emailAuthCheckRequest, emailAuthRequest, idCheckRequest, nickNameCheckRequest, singUpRequest } from "src/apis/auth";
import {
    EmailAuthCheckRequestDto,
    EmailAuthRequestDto,
    IdCheckRequestDto,
    NickNameCheckRequestDto,
    SignUpRequestDto,
} from "src/apis/auth/dto/request";
import { MAIN_ABSOLUTE_PATH, SIGN_IN_ABSOLUTE_PATH } from "src/constant";

import "./style.css";

//                    interface : 회원가입 인풋 박스 프로퍼티즈                     //
interface InputBoxProps {
    title: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    type: "text" | "password";
    messageError: boolean;
    message: string;
    buttonTitle?: string;
    onButtonClick?: () => void;
    ref?: React.RefObject<HTMLInputElement>;
}

//                    Component : 회원가입 인풋 박스 컴포넌트                     //
const InputBox = forwardRef<HTMLInputElement, InputBoxProps>((props, ref) => {
    //                    state                     //
    const { title, value, onChange, placeholder, type, messageError, message, buttonTitle, onButtonClick } = props;

    //                    render : 회원가입 인풋 박스 컴포넌트                     //
    const messageClass = "sign-up-message " + (messageError ? "error" : "primary");
    return (
        <div className="sign-up-input-box">
            <div className="sign-up-input-main">
                <div className="sign-up-input-title">{title}</div>
                <div className="sign-up-outline">
                    <input className="sign-up-input" type={type} placeholder={placeholder} value={value} onChange={onChange} ref={ref} />
                    <div className={messageClass}>{message}</div>
                </div>
                {onButtonClick && (
                    <div className="primary-button" onClick={onButtonClick}>
                        {buttonTitle}
                    </div>
                )}
            </div>
        </div>
    );
});

//                    Component : 회원가입 화면 컴포넌트                     //
function SignUp() {
    //                    state                     //
    const navigator = useNavigate();
    const focusRef = useRef<HTMLInputElement | null>(null);

    const [userId, setUserId] = useState<string>("");
    const [userPassword, setUserPassword] = useState<string>("");
    const [userPasswordCheck, setUserPasswordCheck] = useState<string>("");
    const [nickName, setNickName] = useState<string>("");
    const [userEmail, setUserEmail] = useState<string>("");
    const [authNumber, setAuthNumber] = useState<string>("");

    const [idButtonStatus, setIdButtonStatus] = useState<boolean>(false);
    const [nickNameButtonStatus, setNicknameButtonStatus] = useState<boolean>(false);
    const [emailButtonStatus, setEmailButtonStauts] = useState<boolean>(false);
    const [authNumberButtonStatus, setAuthNumberButtonStatus] = useState<boolean>(false);

    const [idCheck, setIdCheck] = useState<boolean>(false);
    const [passwordPattern, setPasswordPattern] = useState<boolean>(false);
    const [passwordCheck, setPasswordCheck] = useState<boolean>(false);
    const [nickNameCheck, setNickNameCheck] = useState<boolean>(false);
    const [emailCheck, setEmailCheck] = useState<boolean>(false);
    const [authNumberCheck, setAuthNumberCheck] = useState<boolean>(false);

    const signUpCondition = idCheck && passwordPattern && passwordCheck && nickNameCheck && emailCheck && authNumberCheck;

    const [userIdMessage, setUserIdMessage] = useState<string>("");
    const [userPasswordMessage, setUserPasswordMessage] = useState<string>("");
    const [userPasswordCheckMessage, setUserPasswordCheckMessage] = useState<string>("");
    const [nickNameMessage, setNickNameMessage] = useState<string>("");
    const [userEmailMessage, setUserEmailMessage] = useState<string>("");
    const [authNumberMessage, setAuthNumberMessage] = useState<string>("");

    const [userIdMessageError, setUserIdMessageError] = useState<boolean>(false);
    const [userPasswordMessageError] = useState<boolean>(true);
    const [userPasswordCheckMessageError] = useState<boolean>(true);
    const [nickNameMessageError, setNickNameMessageError] = useState<boolean>(true);
    const [userEmailMessageError, setUserEmailMessageError] = useState<boolean>(false);
    const [authNumberMessageError, setAuthNumberMessageError] = useState<boolean>(false);

    //                  Function                    //
    const idCheckResponse = (result: ResponseDto | null) => {
        const idMessage = !result
            ? "서버에 문제가 있습니다."
            : result.code === "VF"
            ? "아이디는 빈값 혹은 공백으로만 이루어질 수 없습니다."
            : result.code === "DI"
            ? "이미 사용중인 아이디 입니다."
            : result.code === "DBE"
            ? "서버에 문제가 있습니다."
            : result.code === "SU"
            ? "사용 가능한 아이디 입니다."
            : "";

        const idError = !(result && result.code === "SU");
        const idCheck = !idError;

        setUserIdMessage(idMessage);
        setUserIdMessageError(idError);
        setIdCheck(idCheck);
    };

    const nickNameCheckResponse = (result: ResponseDto | null) => {
        const nickNameMessage = !result
            ? "서버에 문제가 있습니다."
            : result.code === "VF"
            ? "닉네임은 빈값 혹은 공백으로만 이루어질 수 없습니다."
            : result.code === "DN"
            ? "이미 사용중인 닉네임 입니다."
            : result.code === "DBE"
            ? "서버에 문제가 있습니다."
            : result.code === "SU"
            ? "사용 가능한 닉네임 입니다."
            : "";

        const nickNameError = !(result && result.code === "SU");
        const nickNameCheck = !nickNameError;

        setNickNameMessage(nickNameMessage);
        setNickNameMessageError(nickNameMessageError);
        setNickNameCheck(nickNameCheck);
    };

    const emailAuthResponse = (result: ResponseDto | null) => {
        const emailMessage = !result
            ? "서버에 문제가 있습니다."
            : result.code === "VF"
            ? "이메일 형식이 아닙니다."
            : result.code === "DE"
            ? "중복된 이메일 입니다."
            : result.code === "DBE"
            ? "서버에 문제가 있습니다."
            : result.code === "MF"
            ? "메일 전송에 실패했습니다."
            : result.code === "SU"
            ? "인증번호가 전송되었습니다."
            : "";

        const emailError = !(result && result.code === "SU");
        const emailCheck = !emailError;

        setUserEmailMessage(emailMessage);
        setUserEmailMessageError(emailError);
        setEmailCheck(emailCheck);
    };

    const emailAuthCheckResponse = (result: ResponseDto | null) => {
        const authNumberMessage = !result
            ? "서버에 문제가 있습니다."
            : result.code === "VF"
            ? "인증번호를 입력해주세요."
            : result.code === "AF"
            ? "인증번호가 일치하지 않습니다."
            : result.code === "DBE"
            ? "서버에 문제가 있습니다."
            : result.code === "SU"
            ? "인증번호가 확인되었습니다."
            : "";

        const authNumberError = !(result && result.code === "SU");
        const authNumberCheck = !authNumberError;

        setAuthNumberMessage(authNumberMessage);
        setAuthNumberMessageError(authNumberError);
        setAuthNumberCheck(authNumberCheck);
    };

    const signUpResponse = (result: ResponseDto | null) => {
        const message = !result
            ? "서버에 문제가 있습니다"
            : result.code === "VF"
            ? "입력형식이 맞지 않습니다."
            : result.code === "DI"
            ? "이미 사용중인 아이디 입니다."
            : result.code === "DN"
            ? "이미 사용중인 닉네임 입니다."
            : result.code === "DE"
            ? "중복된 이메일 입니다."
            : result.code === "AF"
            ? "인증번호가 일치하지 않습니다."
            : result.code === "DBE"
            ? "서버에 문제가 있습니다."
            : "";

        if (!result || result.code !== "SU") {
            alert(message);
            return;
        }

        const success = result === null || result.code === "SU";
        if (!success) {
            alert(message);
            return;
        }

        navigator(SIGN_IN_ABSOLUTE_PATH);
    };

    //                    event handler                     //
    const onUserIdChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setUserId(value);
        setIdButtonStatus(value !== "");
        setIdCheck(false);
        setUserIdMessage("");
    };

    const onUserPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setUserPassword(value);
        const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,13}$/;
        const isPasswordPattern = passwordPattern.test(value);
        setPasswordPattern(isPasswordPattern);
        const passwordMessage = isPasswordPattern ? "" : value ? "영문, 숫자를 혼용하여 8 ~ 13자 입력해주세요" : "";
        setUserPasswordMessage(passwordMessage);
    };

    const onUserPasswordCheckChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setUserPasswordCheck(value);
        const isEqualPassword = userPassword === value;

        setPasswordCheck(isEqualPassword);
        const passwordCheckMessage = isEqualPassword ? "" : value ? "비밀번호가 일치하지 않습니다." : "";
        setUserPasswordCheckMessage(passwordCheckMessage);
    };

    const onNickNameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setNickName(value);
        setNicknameButtonStatus(value !== "");
        setNickNameCheck(false);
        setNickNameMessage("");
    };

    const onUserEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setUserEmail(value);
        setEmailButtonStauts(value !== "");
        setEmailCheck(false);
        setAuthNumberCheck(false);
        setUserEmailMessage("");
    };

    const onAuthNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setAuthNumber(value);
        setAuthNumberButtonStatus(value !== "");
        setAuthNumberCheck(false);
        setAuthNumberMessage("");
    };

    const onUserIdButtonClickHandler = () => {
        if (!idButtonStatus) return;
        if (!userId || !userId.trim()) return;

        const requestBody: IdCheckRequestDto = { userId };

        idCheckRequest(requestBody).then(idCheckResponse);
    };

    const onNickNameButtonClickHandler = () => {
        if (!nickNameButtonStatus) return;
        if (!nickName || !nickName.trim()) return;

        const requestBody: NickNameCheckRequestDto = { nickName };

        nickNameCheckRequest(requestBody).then(nickNameCheckResponse);
    };

    const onUserEmailButtonClickHandler = () => {
        if (!emailButtonStatus) return;

        const emailPattern = /^[a-zA-Z0-9]*@([-.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,3}$/;
        const isEmailPattern = emailPattern.test(userEmail);
        if (!isEmailPattern) {
            setUserEmailMessage("이메일 형식이 아닙니다.");
            setUserEmailMessageError(true);
            setEmailCheck(false);
        }

        const requestBody: EmailAuthRequestDto = { userEmail };
        emailAuthRequest(requestBody).then(emailAuthResponse);
    };

    const onAuthNumberButtonClickHandler = () => {
        if (!authNumberButtonStatus) return;
        if (!authNumber) return;

        const requestBody: EmailAuthCheckRequestDto = { userEmail, authNumber };
        emailAuthCheckRequest(requestBody).then(emailAuthCheckResponse);
    };

    const onSignUpButtonClickHandler = () => {
        if (!signUpCondition) return;
        if (!userId || !userPassword || !nickName || !userEmail || !authNumber) {
            alert("모든 내용을 입력해주세요.");
            return;
        }

        const requestBody: SignUpRequestDto = { userId, userPassword, nickName, userEmail, authNumber };
        singUpRequest(requestBody).then(signUpResponse);
    };

    const onHomeButtonClickHandler = () => navigator(MAIN_ABSOLUTE_PATH);

    //                  Effect                  //
    useEffect(() => {
        if (focusRef.current) focusRef.current.focus();
    }, [focusRef]);

    //                    render : 회원가입 화면 컴포넌트                     //
    const signUpButtonActive = signUpCondition ? "primary-button" : "disable-button";
    return (
        <div id="sign-up-wrapper">
            <div className="sign-up-content">
                <div className='go-to-home'>
                    <div className='go-to-home-link' onClick={onHomeButtonClickHandler}>홈으로</div>
                </div>
                <div className="sign-up-title">회원가입</div>
                <div className="sign-up-input-container">
                    <InputBox
                        title="아이디"
                        value={userId}
                        onChange={onUserIdChangeHandler}
                        placeholder=""
                        type="text"
                        messageError={userIdMessageError}
                        message={userIdMessage}
                        buttonTitle="중복 확인"
                        onButtonClick={onUserIdButtonClickHandler}
                        ref={focusRef}
                    />

                    <InputBox
                        title="비밀번호"
                        value={userPassword}
                        onChange={onUserPasswordChangeHandler}
                        placeholder=""
                        type="password"
                        messageError={userPasswordMessageError}
                        message={userPasswordMessage}
                    />

                    <InputBox
                        title="비밀번호 확인"
                        value={userPasswordCheck}
                        onChange={onUserPasswordCheckChangeHandler}
                        placeholder=""
                        type="password"
                        messageError={userPasswordCheckMessageError}
                        message={userPasswordCheckMessage}
                    />

                    <InputBox
                        title="닉네임"
                        value={nickName}
                        onChange={onNickNameChangeHandler}
                        placeholder=""
                        type="text"
                        messageError={nickNameMessageError}
                        message={nickNameMessage}
                        buttonTitle="중복 확인"
                        onButtonClick={onNickNameButtonClickHandler}
                    />

                    <InputBox
                        title="이메일"
                        value={userEmail}
                        onChange={onUserEmailChangeHandler}
                        placeholder=""
                        type="text"
                        messageError={userEmailMessageError}
                        message={userEmailMessage}
                        buttonTitle="중복 확인"
                        onButtonClick={onUserEmailButtonClickHandler}
                    />

                    <InputBox
                        title="인증번호"
                        value={authNumber}
                        onChange={onAuthNumberChangeHandler}
                        placeholder=""
                        type="text"
                        messageError={authNumberMessageError}
                        message={authNumberMessage}
                        buttonTitle="인증 확인"
                        onButtonClick={onAuthNumberButtonClickHandler}
                    />
                </div>
                <Social />
                <div className={signUpButtonActive} onClick={onSignUpButtonClickHandler} style={{ width: "360px" }}>
                    회원가입
                </div>
            </div>
        </div>
    );
}

export default SignUp;
