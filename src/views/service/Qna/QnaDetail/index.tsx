import React, { ChangeEvent, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router";

import { useUserStore } from "src/stores";
import ResponseDto from "src/apis/response.dto";
import { GetQnaResponseDto } from "src/apis/qna/dto/response";
import { deleteQnaCommentRequest, deleteQnaRequest, getQnaRequest, patchQnaCommentRequest, postQnaCommentRequest } from "src/apis/qna";
import { PatchQnaCommentRequestDto, PostQnaCommentRequestDto } from "src/apis/qna/dto/request";
import { AUTH_ABSOLUTE_PATH, QNA_ABSOLUTE_PATH, QNA_UPDATE_ABSOLUTE_PATH } from "src/constant";

import "./style.css";

//                    component : Qna Detail 화면 컴포넌트                     //
export default function QnaDetail() {
    //                    state                     //
    const [cookies] = useCookies();

    const { receptionNumber } = useParams();

    const { loginUserId, loginUserRole } = useUserStore();

    const [qnaTitle, setQnaTitle] = useState<string>("");
    const [qnaContent, setQnaContent] = useState<string>("");
    const [qnaWriterId, setQnaWriterId] = useState<string>("");
    const [qnaStatus, setQnaStatus] = useState<boolean>(false);
    const [qnaDatetime, setQnaWriteDate] = useState<string>("");
    const [qnaCommentRows, setQnaCommentRows] = useState<number>(1);
    const [qnaComment, setQnaComment] = useState<string | null>(null);
    const [commentStatus, setCommentStatus] = useState<boolean>(true);
    const [qnaCommentUpdate, setQnaCommentUpdate] = useState<string>("");

    //                     function                     //
    const navigator = useNavigate();

    const getQnaResponse = (result: GetQnaResponseDto | ResponseDto | null) => {
        const message = !result
            ? "서버에 문제가 있습니다"
            : result.code === "VF"
            ? "잘못된 접수번호입니다."
            : result.code === "AF"
            ? "로그인 후 이용 가능합니다."
            : result.code === "NB"
            ? "존재하지 않는 접수번호입니다."
            : result.code === "DBE"
            ? "서버에 문제가 있습니다"
            : "";

        if (!result || result.code !== "SU") {
            alert(message);
            if (result?.code === "AF") {
                navigator(AUTH_ABSOLUTE_PATH);
                return result;
            }
            navigator(QNA_ABSOLUTE_PATH);
            return;
        }

        const { qnaTitle, qnaWriterId, qnaDatetime, qnaContent, qnaStatus, qnaComment } = result as GetQnaResponseDto;
        setQnaTitle(qnaTitle);
        setQnaWriterId(qnaWriterId);
        const datetime = qnaDatetime.slice(0, 10);
        setQnaWriteDate(datetime);
        setQnaContent(qnaContent);
        setQnaStatus(qnaStatus);
        setQnaComment(qnaComment);
    };

    const postQnaCommentResponse = (result: ResponseDto | null) => {
        const message = !result
            ? "서버에 문제가 있습니다."
            : result.code === "AF"
            ? "권한이 없습니다."
            : result.code === "VF"
            ? "입력 데이터가 올바르지 않습니다."
            : result.code === "NB"
            ? "존재하지 않는 게시물입니다."
            : result.code === "WC"
            ? "이미 답글이 작성된 게시글입니다."
            : result.code === "DBE"
            ? "서버에 문제가 있습니다."
            : "";

        if (!result || result.code !== "SU") {
            alert(message);
            return result;
        }

        alert("댓글 입력이 완료되었습니다.");

        if (!receptionNumber || !cookies.accessToken) return;
        getQnaRequest(receptionNumber, cookies.accessToken).then(getQnaResponse);
    };

    const patchQnaCommentResponse = (result: ResponseDto | null) => {
        const message = !result
            ? "서버에 문제가 있습니다."
            : result.code === "AF"
            ? "권한이 없습니다."
            : result.code === "VF"
            ? "입력 데이터가 올바르지 않습니다."
            : result.code === "NB"
            ? "존재하지 않는 게시물입니다."
            : result.code === "DBE"
            ? "서버에 문제가 있습니다."
            : "";

        if (!result || result.code !== "SU") {
            alert(message);
            return result;
        }

        alert("수정이 완료되었습니다.");

        window.location.reload();
    };

    const deleteQnaResponse = (result: ResponseDto | null) => {
        const message = !result
            ? "서버에 문제가 있습니다."
            : result.code === "AF"
            ? "권한이 없습니다."
            : result.code === "VF"
            ? "올바르지 않은 접수 번호입니다."
            : result.code === "NB"
            ? "존재하지 않는 접수 번호입니다."
            : result.code === "DBE"
            ? "서버에 문제가 있습니다."
            : "";

        if (!result || result.code !== "SU") {
            alert(message);
            return result;
        }

        alert("게시물 삭제가 완료되었습니다.");

        navigator(QNA_ABSOLUTE_PATH);
    };

    const deleteQnaCommentResponse = (result: ResponseDto | null) => {
        const message = !result
            ? "서버에 문제가 있습니다."
            : result.code === "AF"
            ? "권한이 없습니다."
            : result.code === "VF"
            ? "올바르지 않은 접수 번호입니다."
            : result.code === "NB"
            ? "존재하지 않는 접수 번호입니다."
            : result.code === "DBE"
            ? "서버에 문제가 있습니다."
            : "";

        if (!result || result.code !== "SU") {
            alert(message);
            return result;
        }

        alert("댓글 삭제가 완료되었습니다.");

        if (!receptionNumber) return;
        getQnaRequest(receptionNumber, cookies.accessToken).then(getQnaResponse);
    };

    //                     event handler                     //
    const onCommentUpdateChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        if (!qnaComment || !qnaComment.trim() || loginUserRole !== "ROLE_ADMIN") return;
        const qnaCommentUpdate = event.target.value;
        setQnaCommentUpdate(qnaCommentUpdate);
    };

    const onCommentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        if (qnaStatus || loginUserRole !== "ROLE_ADMIN") return;
        const qnaComment = event.target.value;
        setQnaComment(qnaComment);

        const qnaCommentRows = qnaComment.split("\n").length;
        setQnaCommentRows(qnaCommentRows);
    };

    const onCommentSubmitClickHandler = () => {
        if (!qnaComment || !qnaComment.trim() || loginUserRole !== "ROLE_ADMIN" || !cookies.accessToken) return;
        if (!receptionNumber) return;

        const requestBody: PostQnaCommentRequestDto = { qnaComment };
        postQnaCommentRequest(requestBody, receptionNumber, cookies.accessToken).then(postQnaCommentResponse);
    };

    const onListClickHandler = () => {
        navigator(QNA_ABSOLUTE_PATH);
    };

    const onUpdateQnaClickHandler = () => {
        if (!receptionNumber) return;
        navigator(QNA_UPDATE_ABSOLUTE_PATH(receptionNumber));
    };

    const onUpdateCommentClickHandler = () => {
        if (!qnaComment || !qnaComment.trim() || loginUserRole !== "ROLE_ADMIN" || !cookies.accessToken) return;
        if (!receptionNumber) return;
        if (!qnaCommentUpdate) return;

        const requestBody: PatchQnaCommentRequestDto = { qnaComment: qnaCommentUpdate };
        patchQnaCommentRequest(receptionNumber, requestBody, cookies.accessToken).then(patchQnaCommentResponse);
    };

    const onDeleteQnaClickHandler = () => {
        if (!receptionNumber || !cookies.accessToken || loginUserRole !== "ROLE_ADMIN") return;
        const isQnaConfirm = window.confirm("정말로 삭제하시겠습니까?");
        if (!isQnaConfirm) return;

        deleteQnaRequest(receptionNumber, cookies.accessToken).then(deleteQnaResponse);
    };

    const onDeleteCommentClickHandler = () => {
        if (!receptionNumber || loginUserRole !== "ROLE_ADMIN" || !cookies.accessToken) return;
        const isCommentConfirm = window.confirm("정말로 삭제하시겠습니까?");
        if (!isCommentConfirm) return;

        deleteQnaCommentRequest(receptionNumber, cookies.accessToken).then(deleteQnaCommentResponse);
    };

    const onCommentButtonClickHandler = () => {
        setCommentStatus(!commentStatus);
    };

    //                    effect                     //
    useEffect(() => {
        if (!receptionNumber) return;
        getQnaRequest(receptionNumber, cookies.accessToken).then(getQnaResponse);
    }, []);

    //                    render                     //
    return (
        <div id="qna-detail-wrapper">
            <div className="qna-detail-main-box">
                <div className="qna-detail-top-box">
                    <div className="qna-detail-info-box">
                        <div className="qna-detail-info">작성자 {qnaWriterId}</div>
                        <div className="qna-detail-info-devider">{"|"}</div>
                        <div className="qna-detail-info">작성일 {qnaDatetime}</div>
                    </div>
                </div>
                <div className="qna-detail-title-box">{qnaTitle}</div>
                <div className="qna-detail-contents-box">{qnaContent}</div>
            </div>

            <div className="qna-detail-button-box">
                <div className="qna-show-list" onClick={onListClickHandler}>
                    목록보기
                </div>
                {loginUserId === qnaWriterId && loginUserRole === "ROLE_USER" && (
                    <div className="qna-detail-owner-button-box">
                        <div className="primary-button" onClick={onUpdateQnaClickHandler}>
                            수정
                        </div>
                        <div className="error-button" onClick={onDeleteQnaClickHandler}>
                            삭제
                        </div>
                    </div>
                )}
            </div>
            <div className="qna-detail-comment-box">
                <div className="admin-bedge">관리자</div>
                {commentStatus ? (
                    <div className="qna-comment-right-box">
                        <div className="qna-detail-comment">{qnaComment}</div>
                        {loginUserRole === "ROLE_ADMIN" && (
                            <div className="qna-detail-owner-button-box">
                                <div className="primary-button" onClick={onCommentButtonClickHandler}>
                                    수정
                                </div>
                                <div className="error-button" onClick={onDeleteCommentClickHandler}>
                                    삭제
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        {loginUserRole === "ROLE_ADMIN" && qnaStatus && (
                            <div className="qna-detail-comment-write-box">
                                <div className="qna-detail-comment-textarea-box">
                                    <textarea
                                        style={{ height: `${28 * qnaCommentRows}px` }}
                                        className="qna-detail-comment-textarea"
                                        placeholder="댓글을 작성해주세요."
                                        value={qnaCommentUpdate == null ? "" : qnaCommentUpdate}
                                        onChange={onCommentUpdateChangeHandler}
                                    />
                                </div>
                                <div className="primary-button" onClick={onUpdateCommentClickHandler}>
                                    수정
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
            {loginUserRole === "ROLE_ADMIN" && !qnaStatus && (
                <div className="qna-detail-comment-write-box">
                    <div className="qna-detail-comment-textarea-box">
                        <textarea
                            style={{ height: `${28 * qnaCommentRows}px` }}
                            className="qna-detail-comment-textarea"
                            placeholder="댓글을 작성해주세요."
                            value={qnaComment == null ? "" : qnaComment}
                            onChange={onCommentChangeHandler}
                        />
                    </div>
                    <div className="primary-button" onClick={onCommentSubmitClickHandler}>
                        댓글달기
                    </div>
                </div>
            )}
        </div>
    );
}
