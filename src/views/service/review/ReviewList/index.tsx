import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";

import { ReviewBoardListItem } from "src/types";
import { useUserStore } from "src/stores";
import { usePagination } from "src/hooks";
import ResponseDto from "src/apis/response.dto";
import { GetReviewSearchRequestDto, GetTravelReviewBoardResponseDto } from "src/apis/review/dto/response";
import { getTravelReviewBoardRequest, getTravelReviewSearchRequest } from "src/apis/review";
import { REVIEW_ABSOULUTE_PATH, REVIEW_DETAIL_ABSOLUTE_PATH, REVIEW_WRITE_ABSOLUTE_PATH } from "src/constant";

import "./style.css";

//                    component                    //
function ListItem({
    reviewNumber,
    reviewTitle,
    writerId,
    reviewDatetime,
    travelReviewImageUrl,
    reviewViewCount,
    reviewFavoriteCount,
}: ReviewBoardListItem) {
    //                    function                    //
    const navigator = useNavigate();

    const datetime = reviewDatetime.slice(0, 10);

    //                    event handler                    //
    const onClickHandler = () => navigator(REVIEW_DETAIL_ABSOLUTE_PATH(reviewNumber));

    //                    render                    //
    return (
        <div className="review-list-table-tr" onClick={onClickHandler}>
            {travelReviewImageUrl === null ? (
                <div className="travel-list-picture">
                    <img title="travel" width="200px" height="135px" src={`${"https://cdn-icons-png.flaticon.com/128/11423/11423562.png"}`} />
                </div>
            ) : (
                <div className="travel-list-picture">
                    <img title="travel" width="200px" height="135px" src={`${travelReviewImageUrl}`} />
                </div>
            )}
            <div className="review-list-table-title">{reviewTitle}</div>
            <div className="review-list-table-writer">{writerId}</div>
            <div className="review-list-table-write-date">{datetime}</div>
            <div className="review-list-table-view-count">{reviewViewCount}</div>
            <div className="review-list-table-favorite-count">{reviewFavoriteCount}</div>
        </div>
    );
}

//                    Component : 리뷰 게시판 화면 컴포넌트                     //
export default function ReviewList() {
    //                    state                    //
    const [cookies] = useCookies();

    const { loginUserRole } = useUserStore();

    const [searchWord, setSearchWord] = useState<string>("");
    const [searchButtonStatus, setSearchButtonStatus] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<string>("title-contents");

    const { 
        viewList,
        pageList,
        boardList,
        currentPage,

        setCurrentPage,
        setCurrentSection,

        changeBoardList,

        onPreSectionClickHandler,
        onPageClickHandler,
        onNextSectionClickHandler
    } = usePagination<ReviewBoardListItem>();

    //                    function                    //
    const navigator = useNavigate();

    const getTravelReviewBoardResponse = (result: GetTravelReviewBoardResponseDto | ResponseDto | null) => {
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
            return;
        }

        const { reviewBoardList } = result as GetTravelReviewBoardResponseDto;
        changeBoardList(reviewBoardList);

        setCurrentPage(1);
        setCurrentSection(1);
    };

    const getTravelSearchResponse = (result: ResponseDto | GetReviewSearchRequestDto | null) => {
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
            return;
        }

        const { reviewSearchList } = result as GetReviewSearchRequestDto;
        changeBoardList(reviewSearchList);

        if (reviewSearchList.length === 0) alert("검색 결과가 없습니다.");

        setCurrentPage(!boardList.length ? 0 : 1);
        setCurrentSection(!boardList.length ? 0 : 1);
    };

    //                    event handler                    //

    const onWriteButtonClickHandler = () => {
        if (!cookies.accessToken) {
            alert("로그인 후 이용해 주세요");
            navigator(REVIEW_ABSOULUTE_PATH);
            return;
        }
        if (loginUserRole !== "ROLE_USER") {
            alert("사용자가 아닙니다.");
            navigator(REVIEW_ABSOULUTE_PATH);
            return;
        }
        navigator(REVIEW_WRITE_ABSOLUTE_PATH);
    };

    const onRadioChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
    };

    const onSearchWordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const searchWord = event.target.value;
        setSearchWord(searchWord);
    };

    const onSearchWordKeydownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") return onSearchButtonClickHandler();
    };

    const onSearchButtonClickHandler = () => {
        if (selectedOption === "title-contents") {
            const titleAndContent = searchWord;
            getTravelReviewSearchRequest(titleAndContent, "", "").then(getTravelSearchResponse);
        }

        if (selectedOption === "writer") {
            const writer = searchWord;
            getTravelReviewSearchRequest("", writer, "").then(getTravelSearchResponse);
        }

        if (selectedOption === "write-date") {
            const writedate = searchWord;
            getTravelReviewSearchRequest("", "", writedate).then(getTravelSearchResponse);
        }
    };

    //                    effect                    //
    useEffect(() => {
        getTravelReviewBoardRequest().then(getTravelReviewBoardResponse);
    }, []);

    useEffect(() => {
        setSelectedOption(selectedOption);
    }, [selectedOption]);

    useEffect(() => {
        setSearchButtonStatus(!setSearchButtonStatus);
    }, [searchButtonStatus]);

    //                    render                    //
    return (
        <>
            <div className="review-top-image"></div>
            <div style={{height: "500px"}}></div>
            <div className="review-title-page">Travel Review</div>
            <div id="review-wrapper">
                <div className="review-search-wrapper">
                    <div className="review-search-item">
                        <div className="review-search-item-title-contents font-size-color">
                            <input name="check" type="radio" defaultChecked onChange={onRadioChangeHandler} value={"title-contents"} />
                            제목 + 내용
                        </div>
                        <div className="review-search-item-writer font-size-color ">
                            <input name="check" type="radio" onChange={onRadioChangeHandler} value={"writer"} />
                            작성자
                        </div>
                        <div className="review-search-item-write-date font-size-color">
                            <input name="check" type="radio" onChange={onRadioChangeHandler} value={"write-date"} />
                            작성일
                        </div>
                    </div>
                    <div className="review-search-box">
                        <div className="review-search-input-box">
                            <input
                                className="review-search-input"
                                placeholder="검색어를 입력하세요."
                                value={searchWord}
                                onChange={onSearchWordChangeHandler}
                                onKeyDown={onSearchWordKeydownHandler}
                            />
                        </div>
                        <div className="review-search-button primary-button" onClick={onSearchButtonClickHandler}>
                            검색
                        </div>
                    </div>
                    <div className="writebox">
                        <div className="review-write-button primary-button" onClick={onWriteButtonClickHandler}>
                            글쓰기
                        </div>
                    </div>
                </div>

                <div className="review-list-table">
                    <div className="review-list-table-th">
                        <div className="review-list-table-image">사진</div>
                        <div className="review-list-table-title">제목</div>
                        <div className="review-list-table-writer">작성자</div>
                        <div className="review-list-table-write-date">작성일</div>
                        <div className="review-list-table-view-count">조회수</div>
                        <div className="review-list-table-favorite-count">추천수</div>
                    </div>
                    {viewList.map((item) => (
                        <ListItem {...item} />
                    ))}
                </div>

                <div className="review-list-bottom">
                    <div className="review-list-pagenation">
                        <div className="review-list-page-left" onClick={onPreSectionClickHandler}></div>
                        <div className="review-list-page-box">
                            {pageList.map((page) =>
                                page === currentPage ? (
                                    <div className="review-list-page-active">{page}</div>
                                ) : (
                                    <div className="review-list-page" onClick={() => onPageClickHandler(page)}>
                                        {page}
                                    </div>
                                )
                            )}
                        </div>
                        <div className="review-list-page-right" onClick={onNextSectionClickHandler}></div>
                    </div>
                </div>
            </div>
        </>
    );
}
