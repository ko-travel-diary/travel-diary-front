import React, { ChangeEvent, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router";
import { MAIN_ABSOLUTE_PATH, MYPAGE_PROFILEUPDATE_ABSOLUTE_PAGE } from "src/constant";
import { useCookies } from "react-cookie";
import { deleteUserRequest } from "src/apis/user";
import { DeleteUserRequestDto } from "src/apis/user/dto/request";
import ResponseDto from "src/apis/response.dto";
import { useUserStore } from "src/stores";

//                    component : Delete User 화면 컴포넌트                     //
export default function DeleteUser() {
    //                    state                     //
    const [cookies, setCookies] = useCookies();

    const { setLoginUserId } = useUserStore();

    const [password, setPassword] = useState<string>("");

    //                     function                     //
    const navigator = useNavigate();

    //                     event handler                     //
    const onNoButtonClickHandler = () => navigator(MYPAGE_PROFILEUPDATE_ABSOLUTE_PAGE);

    const deleteUserResponse = (result: ResponseDto | null) => {
        const message = !result
            ? "서버에 문제가 있습니다."
            : result.code === "AF"
            ? "권한이 없습니다."
            : result.code === "NU"
            ? "존재하지 않는 아이디입니다."
            : result.code === "DBE"
            ? "서버에 문제가 있습니다."
            : "감사합니다.";

        if (!result || result.code !== "SU") {
            alert(message);
            return;
        }
    };

    const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const password = event.target.value;
        setPassword(password);
    };

    const onYesButtonClickHandler = () => {
        if (!cookies.accessToken || !password) return;
        alert("삭제가 완료되었습니다.");

        const requestBody: DeleteUserRequestDto = { userPassword: password };

        if (!requestBody) return;
        if (!cookies.accessToken) return;
        deleteUserRequest(requestBody, cookies.accessToken).then(deleteUserResponse);

        const expiration = new Date(Date.now());
        setLoginUserId("");
        setLoginUserId("");
        setCookies("accessToken", "", { path: "/", expires: expiration });

        navigator(MAIN_ABSOLUTE_PATH);
    };

    //                    render                     //
    return (
        <div id="delete-user-wrapper">
            <div className="delete-user-box">
                <div className="delete-user-box-top">
                    정말로 회원탈퇴 하시겠습니까?
                    <br />
                    탈퇴하시려면 비밀번호를 입력해주세요.
                </div>
                <div className="delete-user-box-mid">
                    <input
                        className="delete-password-box"
                        type="password"
                        value={password}
                        onChange={onPasswordChangeHandler}
                        placeholder="비밀번호 입력"
                    />
                </div>
                <div className="delete-user-box-bottom">
                    <div className="box-buttom-yes" onClick={onYesButtonClickHandler}>
                        예
                    </div>
                    <div className="box-buttom-no" onClick={onNoButtonClickHandler}>
                        아니요
                    </div>
                </div>
            </div>
        </div>
    );
}
