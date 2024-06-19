import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";

import { changeText } from "src/utils";
import { RestaurantListItem } from "src/types";
import ResponseDto from "src/apis/response.dto";
import { getRestaurantListRequest, getSearchRestaurantListRequest } from "src/apis/restaurant";
import { GetRestaurantListResponseDto, GetSearchRestaurantListResponseDto } from "src/apis/restaurant/dto/response";
import {
    ADMINPAGE_REST_ADD_ABSOLUTE_PATH,
    ADMINPAGE_REST_CONTROL_ABSOLUTE_PATH,
    AUTH_ABSOLUTE_PATH,
    RESTAURANT_DETAIL_ABSOLUTE_PATH,
} from "src/constant";

import "./style.css";
import { usePagination } from "src/hooks";

//                  Component                    //
export function RestListItems({
    restaurantNumber,
    restaurantImageUrl,
    restaurantName,
    restaurantLocation,
    restaurantTelNumber,
    restaurantHours,
}: RestaurantListItem) {
    //                  Function                    //
    const navigator = useNavigate();

    //                  Event Handler                  //
    const onControlButton = () => {
        navigator(ADMINPAGE_REST_CONTROL_ABSOLUTE_PATH(restaurantNumber));
    };

    const onRestaurantListClickHandler = () => {
        if (restaurantNumber) navigator(RESTAURANT_DETAIL_ABSOLUTE_PATH(restaurantNumber));
    };

    //                  Render                  //
    return (
        <div id="rest-list-table-box">
            <div className="rest-list-table-number">{restaurantNumber}</div>
            {restaurantImageUrl === null ? (
                <div className="rest-list-table-image">
                    <img
                        width="75px"
                        height="50px"
                        style={{ margin: "0 10px" }}
                        src={`${"https://cdn-icons-png.flaticon.com/128/11423/11423562.png"}`}
                    />
                </div>
            ) : (
                <div className="rest-list-table-image">
                    <img width="75px" height="50px" src={`${restaurantImageUrl}`} />
                </div>
            )}
            <div className="rest-list-table-name long-text" onClick={onRestaurantListClickHandler}>
                {restaurantName}
            </div>
            <div className="rest-list-table-locate long-text">{restaurantLocation}</div>
            <div className="rest-list-table-tel long-text">{changeText(restaurantTelNumber)}</div>
            <div className="rest-list-table-hours long-text">{changeText(restaurantHours)}</div>
            <div className="control-button" onClick={onControlButton}>
                관리
            </div>
        </div>
    );
}

//                  Component                    //
export default function RestList() {
    //                  State                   //
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
    } = usePagination<RestaurantListItem>();

    //                  Function                   //
    const navigator = useNavigate();

    const getRestaurantListResponse = (result: GetRestaurantListResponseDto | ResponseDto | null) => {
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

        const { restaurantListItem } = result as GetRestaurantListResponseDto;
        changeBoardList(restaurantListItem);

        setCurrentPage(!restaurantListItem.length ? 0 : 1);
        setCurrentSection(!restaurantListItem.length ? 0 : 1);
    };

    const getSearchRestaurantListResopnse = (result: GetSearchRestaurantListResponseDto | ResponseDto | null) => {
        const message = !result
            ? "서버에 문제가 있습니다"
            : result.code === "AF"
            ? "인증에 실패했습니다."
            : result.code === "VF"
            ? "데이터 유효성 검사 실패"
            : result.code === "DBE"
            ? "서버에 문제가 있습니다."
            : "";

        if (!result || result.code !== "SU") {
            alert(message);
            if (result?.code === "AF") navigator(AUTH_ABSOLUTE_PATH);
            return;
        }

        const { restaurantListItem } = result as GetSearchRestaurantListResponseDto;
        changeBoardList(restaurantListItem);

        setCurrentPage(!restaurantListItem.length ? 0 : 1);
        setCurrentSection(!restaurantListItem.length ? 0 : 1);
    };

    //                  Event Handler                   //
    const onSearchWordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const searchWord = event.target.value;
        setSearchWord(searchWord);
    };

    const onSearchButtonClickHandler = () => {
        if (!searchWord) return;
        if (!cookies.accessToken) return;

        getSearchRestaurantListRequest(searchWord).then(getSearchRestaurantListResopnse);
    };

    const onRegisterButtonClickHandler = () => {
        if (!cookies.accessToken) return;

        navigator(ADMINPAGE_REST_ADD_ABSOLUTE_PATH);
    };

    const onEnterKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") return onSearchButtonClickHandler();
    };

    //                  Effect                  //
    useEffect(() => {
        getRestaurantListRequest().then(getRestaurantListResponse);
    }, []);

    //                  Render                  //
    return (
        <div id="rest-list-wrapper">
            <div className="rest-list-top">
                <div className="rest-list-count-text">
                    전체 음식점수 | <span className="emphasis">{boardCount}개</span>
                </div>
                <div className="rest-list-control-box">
                    <div className="primary-button" onClick={onRegisterButtonClickHandler}>
                        등록
                    </div>
                </div>
            </div>

            <div className="rest-list-table">
                <div className="rest-list-table-top">
                    <div className="rest-list-table-number">번호</div>
                    <div className="rest-list-table-image">사진</div>
                    <div className="rest-list-table-name">이름</div>
                    <div className="rest-list-table-locate">장소</div>
                    <div className="rest-list-table-tel">연락처</div>
                    <div className="rest-list-table-hours">시간</div>
                    <div className="rest-list-table-button">관리</div>
                </div>
                <div className="rest-list-table-line"></div>
                {viewList.map((item) => (
                    <RestListItems {...item} />
                ))}
            </div>

            <div className="rest-list-bottom">
                <div className="rest-list-bottom-left"></div>
                <div className="rest-list-bottom-middle">
                    <div className="rest-list-pagenation">
                        <div className="rest-list-page-left" onClick={onPreSectionClickHandler}></div>
                        <div className="rest-list-page-box">
                            {pageList.map((page) =>
                                page === currentPage ? (
                                    <div className="rest-list-page-active" key={page}>
                                        {page}
                                    </div>
                                ) : (
                                    <div className="rest-list-page" key={page} onClick={() => onPageClickHandler(page)}>
                                        {page}
                                    </div>
                                )
                            )}
                        </div>
                        <div className="rest-list-page-right" onClick={onNextSectionClickHandler}></div>
                    </div>
                </div>
                <div className="rest-list-bottom-right">
                    <div className="rest-list-search-box">
                        <div className="rest-list-search-input-box">
                            <input
                                className="rest-list-search-input"
                                placeholder="음식점명으로 검색"
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
