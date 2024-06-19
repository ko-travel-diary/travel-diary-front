import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";

import { QnaListItem } from "src/types";
import { useUserStore } from "src/stores";
import { usePagination } from "src/hooks";
import ResponseDto from "src/apis/response.dto";
import { GetQnaListResponseDto, GetQnaSearchListResponseDto } from "src/apis/qna/dto/response";
import { getQnaListRequest, getQnaSearchListRequest } from "src/apis/qna";
import { AUTH_ABSOLUTE_PATH, QNA_DETAIL_ABSOLUTE_PATH, QNA_WRITE_ABSOLUTE_PATH } from "src/constant";

import "./style.css";

//                    component : Qna View List 컴포넌트                     //
function ListItem({ receptionNumber, qnaStatus, qnaTitle, qnaWriterId, qnaDatetime }: QnaListItem) {
    const datetime = qnaDatetime.slice(0, 10);
    //                     function                     //
    const navigator = useNavigate();

    //                     event handler                     //
    const onClickHandler = () => navigator(QNA_DETAIL_ABSOLUTE_PATH(receptionNumber));

    return (
        <div className="qna-list-table-list" onClick={onClickHandler}>
            <div className="qna-list-reception-number">{receptionNumber}</div>
            <div className="qna-list-status">{qnaStatus ? <div className="disable-bedge">완료</div> : <div className="primary-bedge">접수</div>}</div>
            <div className="qna-list-title" style={{ textAlign: "left" }}>
                {qnaTitle}
            </div>
            <div className="qna-list-writer-id">{qnaWriterId}</div>
            <div className="qna-list-write-date">{datetime}</div>
        </div>
    );
}

//                    component : Qna List 화면 컴포넌트                     //
export default function QnaList() {
    //                    state                     //
    const [cookies] = useCookies();

    const { loginUserRole } = useUserStore();

    const {
        viewList,
        pageList,
        totalPage,
        totalLength,
        currentPage,
        setCurrentPage,
        setCurrentSection,
        changeBoardList,
        onPreSectionClickHandler,
        onPageClickHandler,
        onNextSectionClickHandler,
    } = usePagination<QnaListItem>();

    const [isUserToggleOn, setUserToggleOn] = useState<boolean>(false);
    const [isAdminToggleOn, setAdminToggleOn] = useState<boolean>(false);

    const [searchWord, setSearchWord] = useState<string>("");

    //                     function                     //
    const navigator = useNavigate();

    const getQnaListResponse = (result: GetQnaListResponseDto | ResponseDto | null) => {
        const message = !result ? "서버에 문제가 있습니다." : result.code === "DBE" ? "서버에 문제가 있습니다." : "";

        if (!result || result.code !== "SU") {
            alert(message);
            if (result?.code === "AF") navigator(AUTH_ABSOLUTE_PATH);
            return result;
        }

        const { qnaList } = result as GetQnaListResponseDto;
        if (loginUserRole === "ROLE_USER") {
            changeBoardList(qnaList, undefined, isUserToggleOn);
            setCurrentPage(!qnaList.length ? 0 : 1);
            setCurrentSection(!qnaList.length ? 0 : 1);
        }
        if (loginUserRole === "ROLE_ADMIN") {
            changeBoardList(qnaList, isAdminToggleOn);
            setCurrentPage(!qnaList.length ? 0 : 1);
            setCurrentSection(!qnaList.length ? 0 : 1);
        }
        if (!loginUserRole) {
            changeBoardList(qnaList);
            setCurrentPage(!qnaList.length ? 0 : 1);
            setCurrentSection(!qnaList.length ? 0 : 1);
        }
    };

    const getQnaSearchListResponse = (result: GetQnaSearchListResponseDto | ResponseDto | null) => {
        const message = !result ? "서버에 문제가 있습니다." : result.code === "DBE" ? "서버에 문제가 있습니다." : "";

        if (!result || result.code !== "SU") {
            alert(message);
            if (result?.code === "AF") navigator(AUTH_ABSOLUTE_PATH);
            return result;
        }
        const { searchQnaList } = result as GetQnaSearchListResponseDto;
        if (loginUserRole === "ROLE_USER") {
            changeBoardList(searchQnaList, undefined, isUserToggleOn);
            setCurrentPage(!searchQnaList.length ? 0 : 1);
            setCurrentSection(!searchQnaList.length ? 0 : 1);
        }
        if (loginUserRole === "ROLE_ADMIN") {
            changeBoardList(searchQnaList, isAdminToggleOn);
            setCurrentPage(!searchQnaList.length ? 0 : 1);
            setCurrentSection(!searchQnaList.length ? 0 : 1);
        }
        if (!loginUserRole) {
            changeBoardList(searchQnaList);
            setCurrentPage(!searchQnaList.length ? 0 : 1);
            setCurrentSection(!searchQnaList.length ? 0 : 1);
        }

        setCurrentPage(!searchQnaList.length ? 0 : 1);
        setCurrentSection(!searchQnaList.length ? 0 : 1);
    };

    //                     event handler                     //
    const onWriteButtonClickHandler = () => {
        if (loginUserRole !== "ROLE_USER") return;
        navigator(QNA_WRITE_ABSOLUTE_PATH);
    };

    const onSearchWordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const searchWord = event.target.value;
        setSearchWord(searchWord);
    };

    const onPasswordKeydownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") return onSearchButtonClickHandler();
    };

    const onSearchButtonClickHandler = () => {
        if (!searchWord) return;
        if (!cookies.accessToken) return;
        getQnaSearchListRequest(searchWord, cookies.accessToken).then(getQnaSearchListResponse);
        setButtonStatus(!buttonStatus);
    };

    const onToggleUserClickHandler = () => {
        if (loginUserRole !== "ROLE_USER") return;
        setUserToggleOn(!isUserToggleOn);
    };

    const onToggleAdminClickHandler = () => {
        if (loginUserRole !== "ROLE_ADMIN") return;
        setAdminToggleOn(!isAdminToggleOn);
    };

    //                    effect                     //
    const [buttonStatus, setButtonStatus] = useState<boolean>(false);
    useEffect(() => {
        getQnaListRequest().then(getQnaListResponse);
    }, []);

    useEffect(() => {
        if (!cookies.accessToken || loginUserRole !== "ROLE_USER") return;
        getQnaListRequest().then(getQnaListResponse);
    }, []);

    useEffect(() => {
        if (!cookies.accessToken || loginUserRole !== "ROLE_USER") return;
        getQnaListRequest().then(getQnaListResponse);
    }, [isUserToggleOn]);

    useEffect(() => {
        if (!searchWord) return;
        getQnaSearchListRequest(searchWord, cookies.accessToken).then(getQnaSearchListResponse);
    }, [isUserToggleOn, buttonStatus]);

    useEffect(() => {
        if (!cookies.accessToken || loginUserRole !== "ROLE_ADMIN") return;
        getQnaListRequest().then(getQnaListResponse);
    }, []);

    useEffect(() => {
        if (!cookies.accessToken || loginUserRole !== "ROLE_ADMIN") return;
        getQnaListRequest().then(getQnaListResponse);
    }, [isAdminToggleOn]);

    useEffect(() => {
        if (!searchWord) return;
        getQnaSearchListRequest(searchWord, cookies.accessToken).then(getQnaSearchListResponse);
    }, [isAdminToggleOn, buttonStatus]);

    //                    render                     //\
    const toggleAdminClass = isAdminToggleOn ? "toggle-active" : "toggle";
    const toggleUserClass = isUserToggleOn ? "toggle-active" : "toggle";
    const searchButtonClass = searchWord ? "primary-button" : "disable-button";

    return (
        <>
            <div className="qna-top-image"></div>
            <div style={{ height: "500px" }}></div>
            <div id="qna-list-wrapper">
                <div className="qna-list-top">
                    <div className="qna-list-top-left">
                        전체 <span className="emphasis">{totalLength}건</span> | 페이지{" "}
                        <span className="emphasis">
                            {currentPage}/{totalPage}
                        </span>
                    </div>
                    <div className="qna-list-top-right">
                        {loginUserRole === "ROLE_USER" ? (
                            <>
                                <div className={toggleUserClass} onClick={onToggleUserClickHandler}></div>
                                <div className="qna-list-top-right-text">내가 쓴 문의내역</div>
                            </>
                        ) : (
                            <>
                                <div className={toggleAdminClass} onClick={onToggleAdminClickHandler}></div>
                                <div className="qna-list-admin-text">미완료 보기</div>
                            </>
                        )}
                    </div>
                </div>

                <div className="qna-list-table">
                    <div className="qna-list-table-title">
                        <div className="qna-list-reception-number">접수번호</div>
                        <div className="qna-list-status">상태</div>
                        <div className="qna-list-title">제목</div>
                        <div className="qna-list-writer-id">작성자</div>
                        <div className="qna-list-write-date">작성일</div>
                    </div>
                    {viewList.map((item) => (
                        <ListItem {...item} />
                    ))}
                </div>

                <div className="qna-list-bottom">
                    <div className="qna-list-write-box" onClick={onWriteButtonClickHandler}>
                        글쓰기
                    </div>

                    <div className="qna-list-pagenation">
                        <div className="qna-list-page-left" onClick={onPreSectionClickHandler}></div>
                        <div className="qna-list-page-box">
                            {pageList.map((page) =>
                                page === currentPage ? (
                                    <div className="qna-list-page-active" key={page}>
                                        {page}
                                    </div>
                                ) : (
                                    <div className="qna-list-page" onClick={() => onPageClickHandler(page)} key={page}>
                                        {page}
                                    </div>
                                )
                            )}
                        </div>
                        <div className="qna-list-page-right" onClick={onNextSectionClickHandler}></div>
                    </div>

                    <div className="qna-list-bottom-right">
                        <div className="qna-list-search-box">
                            <input
                                className="qna-list-search-input"
                                placeholder="검색어를 입력해주세요."
                                value={searchWord}
                                onChange={onSearchWordChangeHandler}
                                onKeyDown={onPasswordKeydownHandler}
                            ></input>
                        </div>
                        <div className={searchButtonClass} onClick={onSearchButtonClickHandler}>
                            검색
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
