import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";

import { changeText } from "src/utils";
import { TourAttractionsListItem } from "src/types";
import ResponseDto from "src/apis/response.dto";
import { getSearchTourAttractionsListRequest, getTourAttractionsListRequest } from "src/apis/tour_attraction";
import { GetSearchTourAttractionsListResponseDto, GetTourAttractionsListResponseDto } from "src/apis/tour_attraction/dto/response";
import {
    ADMINPAGE_TOUR_ADD_ABSOLUTE_PATH,
    ADMINPAGE_TOUR_CONTROL_ABSOLUTE_PATH,
    AUTH_ABSOLUTE_PATH,
    TOURATTRACTIONS_DETAIL_ABSOLUTE_PATH,
} from "src/constant";

import "./style.css";
import { usePagination } from "src/hooks";

//                  Component                   //
export function TourListItems({
    tourAttractionsNumber,
    tourAttractionsImageUrl,
    tourAttractionsName,
    tourAttractionsLocation,
    tourAttractionsTelNumber,
    tourAttractionsHours,
}: TourAttractionsListItem) {
    //                  Function                    //
    const navigator = useNavigate();

    //                  Event Handler`                  //
    const onControlButton = () => {
        if (tourAttractionsNumber) {
            navigator(ADMINPAGE_TOUR_CONTROL_ABSOLUTE_PATH(tourAttractionsNumber));
        }
    };

    const onTourAttrctionListClickHandler = () => {
        if (tourAttractionsNumber) {
            navigator(TOURATTRACTIONS_DETAIL_ABSOLUTE_PATH(tourAttractionsNumber));
        }
    };

    //                  Render                  //
    return (
        <div className="tour-list-table-box">
            <div className="tour-list-table-number">{tourAttractionsNumber}</div>
            {tourAttractionsImageUrl === null ? (
                <div className="tour-list-table-image">
                    <img title="travel" width="75px" height="50px" src={`${"https://cdn-icons-png.flaticon.com/128/11423/11423562.png"}`} />
                </div>
            ) : (
                <div className="tour-list-table-image">
                    <img title="travel" width="75px" height="50px" src={`${tourAttractionsImageUrl}`} />
                </div>
            )}
            <div className="tour-list-table-name long-text" onClick={onTourAttrctionListClickHandler}>
                {tourAttractionsName}
            </div>
            <div className="tour-list-table-locate long-text">{tourAttractionsLocation}</div>
            <div className="tour-list-table-tel long-text">{changeText(tourAttractionsTelNumber)}</div>
            <div className="tour-list-table-hours long-text">{changeText(tourAttractionsHours)}</div>
            <div className="control-button" onClick={onControlButton}>
                관리
            </div>
        </div>
    );
}

//                  Component                   //
export default function TourList() {
    //                  state                  //
    const [cookies] = useCookies();

    const [searchWord, setSearchWord] = useState<string>("");

    const {
        viewList,
        pageList,
        currentPage,
        boardCount,
        setCurrentPage,
        setCurrentSection,
        changeBoardList,
        onPreSectionClickHandler,
        onPageClickHandler,
        onNextSectionClickHandler
    } = usePagination<TourAttractionsListItem>();

    //                  function                    //
    const navigator = useNavigate();

    const getTourAttractionsListResponse = (result: GetTourAttractionsListResponseDto | ResponseDto | null) => {
        const message = !result
            ? "서버에 문제가 있습니다."
            : result.code === "AF"
            ? "인증에 실패했습니다."
            : result.code === "DBE"
            ? "서버에 문제가 있습니다"
            : "";

        if (!result || result.code !== "SU") {
            alert(message);
            if (result?.code === "AF") navigator(AUTH_ABSOLUTE_PATH);
            return;
        }

        const { tourAttractionsListItem } = result as GetTourAttractionsListResponseDto;
        changeBoardList(tourAttractionsListItem);

        setCurrentPage(!tourAttractionsListItem.length ? 0 : 1);
        setCurrentSection(!tourAttractionsListItem.length ? 0 : 1);
    };

    const getSearchTourListResponse = (result: GetSearchTourAttractionsListResponseDto | ResponseDto | null) => {
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
            return;
        }

        const { tourAttractionsListItem } = result as GetSearchTourAttractionsListResponseDto;
        changeBoardList(tourAttractionsListItem);

        setCurrentPage(!tourAttractionsListItem.length ? 0 : 1);
        setCurrentSection(!tourAttractionsListItem.length ? 0 : 1);
    };

    //                  Event handler                   //
    const onSearchWordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const searchWord = event.target.value;
        setSearchWord(searchWord);
    };

    const onSearchButtonClickHandler = () => {
        if (!searchWord) return;
        if (!cookies.accessToken) return;

        getSearchTourAttractionsListRequest(searchWord).then(getSearchTourListResponse);
    };

    const onRegisterButtonClickHandler = () => {
        if (!cookies.accessToken) return;

        navigator(ADMINPAGE_TOUR_ADD_ABSOLUTE_PATH);
    };

    const onEnterKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") return onSearchButtonClickHandler();
    };

    //                  effect                  //
    useEffect(() => {
        getTourAttractionsListRequest().then(getTourAttractionsListResponse);
    }, []);

    //                  Render                   //
    return (
        <div id="tour-list-wrapper">
            <div className="tour-list-top">
                <div className="tour-list-count-text">
                    전체 관광지수 | <span className="emphasis">{boardCount}개</span>
                </div>
                <div className="tour-list-control-box">
                    <div className="tour-list-add-button primary-button" onClick={onRegisterButtonClickHandler}>
                        등록
                    </div>
                </div>
            </div>

            <div className="tour-list-table">
                <div className="tour-list-table-top">
                    <div className="tour-list-table-number">번호</div>
                    <div className="tour-list-table-image">사진</div>
                    <div className="tour-list-table-name">이름</div>
                    <div className="tour-list-table-locate">장소</div>
                    <div className="tour-list-table-tel">연락처</div>
                    <div className="tour-list-table-hours">시간</div>
                    <div className="tour-list-table-button">관리</div>
                </div>
                <div className="tour-list-table-line"></div>
                {viewList.map((item) => (
                    <TourListItems {...item} />
                ))}
            </div>

            <div className="tour-list-bottom">
                <div className="tour-list-bottom-left"></div>
                <div className="tour-list-bottom-middle">
                    <div className="tour-list-pagenation">
                        <div className="tour-list-page-left" onClick={onPreSectionClickHandler}></div>
                        <div className="tour-list-page-box">
                            {pageList.map((page) =>
                                page === currentPage ? (
                                    <div className="tour-list-page-active" key={page}>
                                        {page}
                                    </div>
                                ) : (
                                    <div className="tour-list-page" key={page} onClick={() => onPageClickHandler(page)}>
                                        {page}
                                    </div>
                                )
                            )}
                        </div>
                        <div className="tour-list-page-right" onClick={onNextSectionClickHandler}></div>
                    </div>
                </div>
                <div className="tour-list-bottom-right">
                    <div className="tour-list-search-box">
                        <div className="tour-list-search-input-box">
                            <input
                                className="tour-list-search-input"
                                placeholder="관광명소명으로 검색"
                                value={searchWord}
                                onChange={onSearchWordChangeHandler}
                                onKeyDown={onEnterKeyDownHandler}
                            />
                        </div>
                        <div className="primary-button" onClick={onSearchButtonClickHandler}>
                            검색
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
