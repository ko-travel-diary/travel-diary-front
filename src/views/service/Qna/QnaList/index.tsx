import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import "./style.css";
import { QnaListItem } from "src/types";
import { useNavigate } from "react-router";
import { AUTH_ABSOLUTE_PATH, COUNT_PER_PAGE, COUNT_PER_SECTION, QNA_DETAIL_ABSOLUTE_PATH, QNA_WRITE_ABSOLUTE_PATH } from "src/constant";
import { useUserStore } from "src/stores";
import { useCookies } from "react-cookie";
import { getQnaListRequest, getQnaSearchListRequest } from "src/apis/qna";
import { GetQnaListResponseDto, GetQnaSearchListResponseDto } from "src/apis/qna/dto/response";
import ResponseDto from "src/apis/response.dto";

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

    const [qnaList, setQnaList] = useState<QnaListItem[]>([]);
    const [viewList, setViewList] = useState<QnaListItem[]>([]);
    const [totalLength, setTotalLength] = useState<number>(0);
    const [totalPage, setTotalPage] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageList, setPageList] = useState<number[]>([1]);
    const [totalSection, setTotalSection] = useState<number>(1);
    const [currentSection, setCurrentSection] = useState<number>(1);
    const [isToggleOn, setToggleOn] = useState<boolean>(false);
    const [searchWord, setSearchWord] = useState<string>("");

    //                     function                     //
    const navigator = useNavigate();

    const changePage = (qnaList: QnaListItem[], totalLength: number) => {
        if (!currentPage) return;
        const startIndex = (currentPage - 1) * COUNT_PER_PAGE;
        let endIndex = currentPage * COUNT_PER_PAGE;
        if (endIndex > totalLength - 1) endIndex = totalLength;
        const viewList = qnaList.slice(startIndex, endIndex);
        setViewList(viewList);
    };

    const changeSection = (totalPage: number) => {
        if (!currentSection) return;
        const startPage = currentSection * COUNT_PER_SECTION - (COUNT_PER_SECTION - 1);
        let endPage = currentSection * COUNT_PER_SECTION;
        if (endPage > totalPage) endPage = totalPage;
        const pageList: number[] = [];
        for (let page = startPage; page <= endPage; page++) pageList.push(page);
        setPageList(pageList);
    };

    const changeQnaList = (qnaList: QnaListItem[]) => {
        if (isToggleOn) qnaList = qnaList.filter((qna) => !qna.qnaStatus);
        setQnaList(qnaList);

        const totalLength = qnaList.length;
        setTotalLength(totalLength);

        const totalPage = Math.floor((totalLength - 1) / COUNT_PER_PAGE) + 1;
        setTotalPage(totalPage);

        const totalSection = Math.floor((totalPage - 1) / COUNT_PER_SECTION) + 1;
        setTotalSection(totalSection);

        changePage(qnaList, totalLength);
        changeSection(totalPage);
    };

    const getQnaListResponse = (result: GetQnaListResponseDto | ResponseDto | null) => {
        const message = !result
            ? "서버에 문제가 있습니다."
            : result.code === "AF"
            ? "인증에 실패했습니다."
            : result.code === "DBE"
            ? "서버에 문제가 있습니다."
            : "";

        if (!result || result.code !== "SU") {
            alert(message);
            if (result?.code === "AF") navigator(AUTH_ABSOLUTE_PATH);
            return result;
        }

        const { qnaList } = result as GetQnaListResponseDto;
        changeQnaList(qnaList);

        setCurrentPage(!qnaList.length ? 0 : 1);
        setCurrentSection(!qnaList.length ? 0 : 1);
    };

    const getQnaSearchListResponse = (result: GetQnaSearchListResponseDto | ResponseDto | null) => {
        const message = !result
            ? "서버에 문제가 있습니다."
            : result.code === "VF"
            ? "검색어를 입력하세요."
            : result.code === "AF"
            ? "인증에 실패했습니다."
            : result.code === "DBE"
            ? "서버에 문제가 있습니다."
            : "";

        if (!result || result.code !== "SU") {
            alert(message);
            if (result?.code === "AF") navigator(AUTH_ABSOLUTE_PATH);
            return result;
        }
        const { searchQnaList } = result as GetQnaSearchListResponseDto;
        changeQnaList(searchQnaList);

        setCurrentPage(!searchQnaList.length ? 0 : 1);
        setCurrentSection(!searchQnaList.length ? 0 : 1);
    };

    //                     event handler                     //
    const onWriteButtonClickHandler = () => {
        if (loginUserRole !== "ROLE_USER") return;
        navigator(QNA_WRITE_ABSOLUTE_PATH);
    };

    const onPageClickHandler = (page: number) => {
        setCurrentPage(page);
    };

    const onPreSectionClickHandler = () => {
        if (currentSection <= 1) return;
        setCurrentSection(currentSection - 1);
        setCurrentPage((currentSection - 1) * COUNT_PER_SECTION);
    };

    const onNextSectionClickHandler = () => {
        if (currentSection === totalSection) return;
        setCurrentSection(currentSection + 1);
        setCurrentPage(currentSection * COUNT_PER_SECTION + 1);
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
    };

    const onToggleClickHandler = () => {
        if (loginUserRole !== "ROLE_ADMIN") return;
        setToggleOn(!isToggleOn);
    };

    //                    effect                     //
    useEffect(() => {
        getQnaListRequest().then(getQnaListResponse);
    }, []);

    useEffect(() => {
        if (!cookies.accessToken || loginUserRole !== "ROLE_ADMIN") return;
        getQnaSearchListRequest(searchWord, cookies.accessToken).then(getQnaSearchListResponse);
    }, [isToggleOn]);

    useEffect(() => {
        if (!qnaList.length) return;
        changePage(qnaList, totalLength);
    }, [currentPage]);

    useEffect(() => {
        if (!qnaList.length) return;
        changeSection(totalPage);
    }, [currentSection]);

    //                    render                     //
    const toggleClass = isToggleOn ? "toggle-active" : "toggle";

    const searchButtonClass = searchWord ? "primary-button" : "disable-button";

    return (
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
                        <div className="qna-list-top-right-text">내가 쓴 문의내역</div>
                    ) : (
                        <>
                            <div className={toggleClass} onClick={onToggleClickHandler}></div>
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
    );
}
