import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import "./style.css";
import { useUserStore } from "src/stores";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router";
import ResponseDto from "src/apis/response.dto";
import { QNA_ABSOLUTE_PATH, QNA_DETAIL_ABSOLUTE_PATH } from "src/constant";
import { GetQnaResponseDto } from "src/apis/qna/dto/response";
import { getQnaRequest, patchQnaRequest } from "src/apis/qna";
import { PatchQnaRequestDto } from "src/apis/qna/dto/request";

//                    component : Qna Update 화면 컴포넌트                     //
export default function QnaUpdate() {
    //                    state                     //
    const [cookies] = useCookies();

    const { receptionNumber } = useParams();

    const { loginUserId, loginUserRole } = useUserStore();

    const [writerId, setWriterId] = useState<string>("");
    const [qnaTitle, setQnaTitle] = useState<string>("");
    const [qnaContent, setQnaContent] = useState<string>("");

    const qnaContentRef = useRef<HTMLTextAreaElement | null>(null);

    //                   function                        //
    const navigator = useNavigate();

    const getQnaResponse = (result: ResponseDto | null) => {
        const message = !result
            ? "서버에 문제가 있습니다"
            : result.code === "VF"
            ? "올바르지 않은 접수 번호입니다."
            : result.code === "AF"
            ? "인증에 실패했습니다."
            : result.code === "NB"
            ? "존재하지 않는 접수 번호입니다."
            : result.code === "DBE"
            ? "서버에 문제가 있습니다."
            : "";

        if (!result || result.code !== "SU") {
            alert(message);
            navigator(QNA_ABSOLUTE_PATH);
            return;
        }

        const { qnaWriterId, qnaTitle, qnaContent, qnaStatus } = result as GetQnaResponseDto;
        if (qnaWriterId !== loginUserId) {
            alert("권한이 없습니다.");
            navigator(QNA_ABSOLUTE_PATH);
            return;
        }

        if (qnaStatus) {
            alert("답변이 완료된 게시물입니다.");
            navigator(QNA_ABSOLUTE_PATH);
            return;
        }

        setQnaTitle(qnaTitle);
        setQnaContent(qnaContent);
        setWriterId(writerId);
    };

    const patchQnaResponse = (result: ResponseDto | null) => {
        const message = !result
            ? "서버에 문제가 있습니다"
            : result.code === "VF"
            ? "권한이 없습니다."
            : result.code === "AF"
            ? "모든 값을 입력해주세요."
            : result.code === "NB"
            ? "존재하지 않는 접수 번호입니다."
            : result.code === "WC"
            ? "이미 답글이 작성되어 있습니다."
            : result.code === "DBE"
            ? "서버에 문제가 있습니다."
            : "";

        if (!result || result.code !== "SU") {
            alert(message);
            return;
        }

        alert("수정이 완료되었습니다.");

        if (!receptionNumber) return;
        navigator(QNA_DETAIL_ABSOLUTE_PATH(receptionNumber));
    };

    //                   event handler                        //
    const onQnaTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const qnaTitle = event.target.value;
        setQnaTitle(qnaTitle);
    };

    const onQnaContentsChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const qnaContent = event.target.value;
        if (qnaContent.length > 1000) return;
        setQnaContent(qnaContent);

        if (!qnaContentRef.current) return;
        qnaContentRef.current.style.height = "auto";
        qnaContentRef.current.style.height = `${qnaContentRef.current.scrollHeight}px`;
    };

    const onUpdateButtonClickHandler = () => {
        if (!cookies.accessToken || !receptionNumber) return;
        if (!qnaTitle.trim() || !qnaContent.trim()) return;

        const requestBody: PatchQnaRequestDto = { qnaTitle, qnaContent };
        patchQnaRequest(receptionNumber, requestBody, cookies.accessToken).then(patchQnaResponse);
    };

    //                   effect                        //
    let effectFlag = false;
    useEffect(() => {
        if (!receptionNumber || !cookies.accessToken) return;
        if (!loginUserRole) return;
        if (effectFlag) return;
        effectFlag = true;
        if (loginUserRole !== "ROLE_USER") {
            navigator(QNA_ABSOLUTE_PATH);
            return;
        }
        getQnaRequest(receptionNumber, cookies.accessToken).then(getQnaResponse);
    }, [loginUserRole]);

    //                    render                     //
    return (
        <div id="qna-write-wrapper">
            <div className="qna-write-top">
                <div className="qna-write-title-box">
                    <input
                        className="qna-write-title-input"
                        placeholder="제목을 입력해주세요. / 30자"
                        maxLength={30}
                        value={qnaTitle}
                        onChange={onQnaTitleChangeHandler}
                    />
                </div>
            </div>
            <div className="qna-write-contents-box">
                <textarea
                    ref={qnaContentRef}
                    className="qna-write-contents-textarea"
                    placeholder="내용을 입력해주세요. / 1000자"
                    maxLength={1000}
                    value={qnaContent}
                    onChange={onQnaContentsChangeHandler}
                />
            </div>
            <div className="qna-write-bottom">
                <div className="primary-button" onClick={onUpdateButtonClickHandler}>
                    수정
                </div>
            </div>
        </div>
    );
}
