import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router";

import { MAIN_ABSOLUTE_PATH, SNS_LOGIN_URL } from "src/constant";

import "./style.css";

//                  Component                   //
export function Sns() {
    //                  State                   //
    const [cookies, setCookie] = useCookies();
    const { accessToken, expires } = useParams();

    //                  Function                    //
    const navigator = useNavigate();

    //                  Effect                  //
    useEffect(() => {
        if (!accessToken || !expires) return;
        const expiration = new Date(Date.now() + Number(expires) * 1000);
        setCookie("accessToken", accessToken, { path: "/", expires: expiration });

        navigator(MAIN_ABSOLUTE_PATH);
    }, []);

    return <></>;
}

//                    Component : 소셜 컴포넌트                     //
function Social() {
    //                  Event Handler                   //
    const onSnsButtonClickHandler = (type: "kakao" | "naver" | "google") => {
        if (type === "kakao") {
            window.location.href = SNS_LOGIN_URL + type;
            return;
        }
        return alert("향후 업데이트 예정입니다.");
    };

    //                    render : 소셜 컴포넌트                     //
    return (
        <div className="sns-button-box">
            <div className="sns-button naver" onClick={() => onSnsButtonClickHandler("naver")}></div>
            <div className="sns-button kakao" onClick={() => onSnsButtonClickHandler("kakao")}></div>
            <div className="sns-button google" onClick={() => onSnsButtonClickHandler("google")}></div>
        </div>
    );
}

export default Social;
