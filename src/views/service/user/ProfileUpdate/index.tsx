import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";

import ResponseDto from "src/apis/response.dto";
import { GetUserInfoResponseDto } from "src/apis/user/dto/response";
import { nickNameCheckRequest } from "src/apis/auth";
import { getUserInfoRequest, patchUserInfoRequest } from "src/apis/user";
import { PatchUserInfoRequestDto } from "src/apis/user/dto/request";
import { NickNameCheckRequestDto } from "src/apis/auth/dto/request";
import { AUTH_ABSOLUTE_PATH, MYPAGE_ABSOULUTE_PATH } from "src/constant";

import "./style.css";
import { imageUploadRequest } from "src/apis/image";

//                    interface : Profile Update Input Box Props                     //
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
    disabled: boolean;
}

//                    component : Profile Update View 화면 컴포넌트                     //
function InputBox({ title, value, onChange, placeholder, type, messageError, message, buttonTitle, onButtonClick, disabled }: InputBoxProps) {
    //                    render                     //
    const messageClass = "sign-up-message " + (messageError ? "error" : "primary");
    return (
        <div className="sign-up-input-box">
            <div className="sign-up-input-main">
                <div className="sign-up-input-title">{title}</div>
                <div className="sign-up-outline">
                    <input className="sign-up-input" type={type} placeholder={placeholder} value={value} onChange={onChange} disabled={disabled} />
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
}

//                    component : Profile Update 화면 컴포넌트                     //
export default function ProfileUpdate() {
    //                    state                     //
    const [cookies] = useCookies();

    const photoInput = useRef<HTMLInputElement | null>(null);

    const [email, setEmail] = useState<string>("");
    const [nickName, setNickName] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [nickNameCheck, setNickNameCheck] = useState<boolean>(false);

    const [emailMessage] = useState<string>("");
    const [passwordMessage] = useState<string>("");
    const [nickNameMessage, setNickNameMessage] = useState<string>("");

    const [emailMessageError] = useState<boolean>(false);
    const [passwordMessageError] = useState<boolean>(false);
    const [nickNameMessageError, setNickNameMessageError] = useState<boolean>(false);

    const [profileImage, setProfileImage] = useState<string>("");
    const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
    const [profileUpdateImage, setProfileUpdateImage] = useState<string>("");

    const [nickNameButtonStatus, setNickNameButtonStatus] = useState<boolean>(false);

    //                     function                     //
    const navigator = useNavigate();

    const getUserInfoResponse = (result: GetUserInfoResponseDto | ResponseDto | null) => {
        const message = !result ? "서버에 문제가 있습니다." : result.code === "DBE" ? "서버에 문제가 있습니다." : "";

        if (!result || result.code !== "SU") {
            alert(message);
            return result;
        }

        const { profileImage } = result as GetUserInfoResponseDto;
        setProfileImage(profileImage);
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
        if (nickNameError) setNickNameMessageError(!nickNameMessageError);
        else setNickNameMessageError(nickNameMessageError);

        setNickNameMessage(nickNameMessage);
        setNickNameCheck(nickNameCheck);
    };

    const patchUserInfoResponse = (result: ResponseDto | null) => {
        const message = !result
            ? "서버에 문제가 있습니다."
            : result.code === "VF"
            ? "닉네임은 빈값 혹은 공백으로만 이루어질 수 없습니다."
            : result.code === "DN"
            ? "이미 사용중인 닉네임 입니다."
            : result.code === "AF"
            ? "권한이 없습니다."
            : result.code === "DBE"
            ? "서버에 문제가 있습니다."
            : result.code === "SU"
            ? "사용 가능한 닉네임 입니다."
            : "";

        if (!result || result.code !== "SU") {
            alert(message);
            if (result?.code === "AF") navigator(AUTH_ABSOLUTE_PATH);
            return result;
        }

        alert("수정이 완료되었습니다.");

        navigator(MYPAGE_ABSOULUTE_PATH);

        window.location.reload();
    };

    //                     event handler                     //
    const onUpdateClickHandler = async () => {
        if (!nickNameCheck) return;
        if (!cookies.accessToken) return;
        if (!nickName) {
            alert("모든 내용을 입력해주세요.");
            return;
        }

        let newProfileImage = profileImage;

        if (profileImageFile) {
            const data = new FormData();
            data.append("file", profileImageFile);

            const changeProfileImage = await imageUploadRequest(data, cookies.accessToken);

            newProfileImage = changeProfileImage ? changeProfileImage : profileImage;
        }

        const requestBody: PatchUserInfoRequestDto = {
            nickName,
            profileImage: newProfileImage,
        };

        patchUserInfoRequest(requestBody, cookies.accessToken).then(patchUserInfoResponse);
    };

    const imageInputOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || !event.target.files.length) return;
        const file = event.target.files[0];
        setProfileImageFile(file);
        const image = URL.createObjectURL(file);
        setProfileUpdateImage(image);
    };

    const onImageUploadButtonClickHandler = () => {
        if (!photoInput.current) return;
        photoInput.current.click();
    };

    const onNickNameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setNickName(value);
        setNickNameButtonStatus(value !== "");
        setNickNameCheck(false);
    };

    const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if (!password) return;
        setPassword(value);
    };

    const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if (!email) return;
        setEmail(value);
    };

    const onNickNameButtonClickHandler = () => {
        if (!nickNameButtonStatus) return;
        if (!nickName || !nickName.trim()) return;

        const requestBody: NickNameCheckRequestDto = { nickName };

        nickNameCheckRequest(requestBody).then(nickNameCheckResponse);
    };

    //                    effect                     //
    useEffect(() => {
        if (!cookies.accessToken) return;
        getUserInfoRequest(cookies.accessToken).then(getUserInfoResponse);
    });

    //                    render                     //
    return (
        <div id="profile-update-wrapper">
            <div className="profile-update-box">
                <div className="profile-update-image-box">
                    <div
                        className="profile-image"
                        style={{
                            backgroundImage: `url(${profileUpdateImage ? profileUpdateImage : profileImage})`,
                        }}
                    >
                        <input
                            type="file"
                            accept="image/jpeg, image/png"
                            ref={photoInput}
                            onChange={imageInputOnChange}
                            style={{ display: "none" }}
                        />
                        <div className="profile-add-image" onClick={onImageUploadButtonClickHandler}></div>
                    </div>
                </div>
                <div className="profile-update-write-box">
                    <div className="profile-update-nickname">
                        <InputBox
                            title="닉네임"
                            value={nickName}
                            onChange={onNickNameChangeHandler}
                            placeholder=""
                            type="text"
                            messageError={nickNameMessageError}
                            message={nickNameMessage}
                            disabled={false}
                        />
                        <div className="primary-button width" onClick={onNickNameButtonClickHandler}>
                            중복확인
                        </div>
                    </div>
                    <div className="profile-update-password">
                        <InputBox
                            title="비밀번호"
                            value=""
                            onChange={onPasswordChangeHandler}
                            placeholder="********"
                            type="text"
                            messageError={passwordMessageError}
                            message={passwordMessage}
                            disabled={true}
                        />
                    </div>
                    <div className="profile-update-email">
                        <InputBox
                            title="이메일"
                            value=""
                            onChange={onEmailChangeHandler}
                            placeholder="********"
                            type="text"
                            messageError={emailMessageError}
                            message={emailMessage}
                            disabled={true}
                        />
                    </div>
                </div>
            </div>
            <div className="profile-update-bottom">
                <div style={{ width: "250px" }}></div>
                <div className="primary-button" onClick={onUpdateClickHandler}>
                    수정
                </div>
            </div>
        </div>
    );
}
