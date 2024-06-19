import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";

import { TravelReviewMyList } from "src/types";
import { useUserStore } from "src/stores";
import { usePagination } from "src/hooks";
import ResponseDto from "src/apis/response.dto";
import { GetTravelReviewMyListResponseDto, GetTravelReviewMyListSearchResponseDto } from "src/apis/review/dto/response";
import { getTravelReviewMyListRequest, getTravelReviewMyListSearchRequest } from "src/apis/review";
import { AUTH_ABSOLUTE_PATH, REVIEW_DETAIL_ABSOLUTE_PATH, REVIEW_WRITE_ABSOLUTE_PATH } from "src/constant";

import "./style.css";

//                    component : My Review View List 화면 컴포넌트                     //
function ListItem({ reviewNumber, reviewTitle, reviewDatetime, reviewViewCount }: TravelReviewMyList) {
    const datetime = reviewDatetime.slice(0, 10);
    //                     function                     //
    const navigator = useNavigate();

    //                     event handler                     //
    const onClickHandler = () => navigator(REVIEW_DETAIL_ABSOLUTE_PATH(reviewNumber));

    return (
        <div>
            <div className="myreview-list-table-list" onClick={onClickHandler}>
                <div className="myreview-list-reception-number">{reviewNumber}</div>
                <div className="myreview-list-title" style={{ textAlign: "left" }}>
                    {reviewTitle}
                </div>
                <div className="myreview-list-write-date">{datetime}</div>
                <div className="myreview-list-view-count">{reviewViewCount}</div>
            </div>
        </div>
    );
}

//                    component : My Review List 화면 컴포넌트                     //
export default function MyReviewList() {
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
    } = usePagination<TravelReviewMyList>();

    const [searchWord, setSearchWord] = useState<string>("");

    //                     function                     //
    const navigator = useNavigate();

    const getTravelReviewMyListResponse = (result: GetTravelReviewMyListResponseDto | ResponseDto | null) => {
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

        const { travelReviewMyList } = result as GetTravelReviewMyListResponseDto;
        changeBoardList(travelReviewMyList);

        setCurrentPage(!travelReviewMyList.length ? 0 : 1);
        setCurrentSection(!travelReviewMyList.length ? 0 : 1);
    };

    const getTravelReviewMyListSearchResponse = (result: GetTravelReviewMyListSearchResponseDto | ResponseDto | null) => {
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

        const { reviewSearchList } = result as GetTravelReviewMyListSearchResponseDto;
        changeBoardList(reviewSearchList);

        setCurrentPage(!reviewSearchList.length ? 0 : 1);
        setCurrentSection(!reviewSearchList.length ? 0 : 1);
    };

    //                     event handler                     //
    const onWriteButtonClickHandler = () => {
        if (loginUserRole !== "ROLE_USER") return;
        navigator(REVIEW_WRITE_ABSOLUTE_PATH);
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

        getTravelReviewMyListSearchRequest(searchWord, cookies.accessToken).then(getTravelReviewMyListSearchResponse);
    };

    //                    effect                     //
    useEffect(() => {
        if (!cookies.accessToken) return;
        getTravelReviewMyListRequest(cookies.accessToken).then(getTravelReviewMyListResponse);
    }, []);

    //                    render                     //
    const searchButtonClass = searchWord ? "primary-button" : "disable-button";

    return (
        <div id="myreview-list-wrapper">
            <div className="myreview-list-top">
                <div className="myreview-list-top-left">
                    전체 <span className="emphasis">{totalLength}건</span> | 페이지{" "}
                    <span className="emphasis">
                        {currentPage}/{totalPage}
                    </span>
                </div>
            </div>

            <div className="myreview-list-table">
                <div className="myreview-list-table-title">
                    <div className="myreview-list-reception-number">접수번호</div>
                    <div className="myreview-list-title">제목</div>
                    <div className="myreview-list-write-date">작성일</div>
                    <div className="myreview-list-view-count">조회수</div>
                </div>
                {viewList.map((item) => (
                    <ListItem {...item} />
                ))}
            </div>

            <div className="myreview-list-bottom">
                <div className="myreview-list-write-box" onClick={onWriteButtonClickHandler}>
                    글쓰기
                </div>
                <div className="myreview-list-pagenation">
                    <div className="myreview-list-page-left" onClick={onPreSectionClickHandler}></div>
                    <div className="myreview-list-page-box">
                        {pageList.map((page) =>
                            page === currentPage ? (
                                <div className="myreview-list-page-active" key={page}>
                                    {page}
                                </div>
                            ) : (
                                <div className="myreview-list-page" onClick={() => onPageClickHandler(page)} key={page}>
                                    {page}
                                </div>
                            )
                        )}
                    </div>
                    <div className="myreview-list-page-right" onClick={onNextSectionClickHandler}></div>
                </div>

                <div className="myreview-list-bottom-right">
                    <div className="myreview-list-search-box">
                        <input
                            className="myreview-list-search-input"
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
