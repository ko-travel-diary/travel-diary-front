import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import SelectBox from "src/components/Selectbox";
import { changeText } from "src/utils";
import { RestaurantListItem, TourAttractionsListItem } from "src/types";
import { usePagination } from "src/hooks";
import ResponseDto from "src/apis/response.dto";
import { GetRestaurantListResponseDto, GetSearchRestaurantListResponseDto } from "src/apis/restaurant/dto/response";
import { GetSearchTourAttractionsListResponseDto, GetTourAttractionsListResponseDto } from "src/apis/tour_attraction/dto/response";
import { getRestaurantListRequest, getSearchRestaurantListRequest } from "src/apis/restaurant";
import { getSearchTourAttractionsListRequest, getTourAttractionsListRequest } from "src/apis/tour_attraction";
import { AUTH_ABSOLUTE_PATH, RESTAURANT_DETAIL_ABSOLUTE_PATH, TOURATTRACTIONS_DETAIL_ABSOLUTE_PATH } from "src/constant";

import "./style.css";

//                    component : Tour Search View List 화면 컴포넌트                     //
function Tourlist({
    tourAttractionsNumber,
    tourAttractionsImageUrl,
    tourAttractionsName,
    tourAttractionsLocation,
    tourAttractionsTelNumber,
    tourAttractionsHours,
    tourAttractionsOutline,
}: TourAttractionsListItem) {
    //                     function                     //
    const navigator = useNavigate();

    //                     event handler                     //
    const onClickHandler = () => {
        if (tourAttractionsNumber) {
            navigator(TOURATTRACTIONS_DETAIL_ABSOLUTE_PATH(tourAttractionsNumber));
        }
    };

    return (
        <div className="travel-list-table" onClick={onClickHandler}>
            <div className="travel-list-table-th">
                {tourAttractionsImageUrl === null ? (
                    <div className="travel-list-picture">
                        <img title="travel" width="200px" height="133px" src={`${"https://cdn-icons-png.flaticon.com/128/11423/11423562.png"}`} />
                    </div>
                ) : (
                    <div className="travel-list-picture">
                        <img title="travel" width="200px" src={`${tourAttractionsImageUrl}`} />
                    </div>
                )}
                <div className="travel-list-table-show">
                    <div className="travel-list-table-title">
                        <div className="travel-name">
                            <div className="travel-title">이름</div>
                            <div className="travel-detail-info-devider">{"|"}</div>
                            <div className="travel-detail-info">{tourAttractionsName}</div>
                        </div>
                        <div className="travel-telNumber">
                            <div className="travel-title">연락처</div>
                            <div className="travel-detail-info-devider">{"|"}</div>
                            <div className="travel-detail-info">{changeText(tourAttractionsTelNumber)}</div>
                        </div>
                    </div>
                    <div className="travel-list-table-title">
                        <div className="travel-location">
                            <div className="travel-title">지역</div>
                            <div className="travel-detail-info-devider">{"|"}</div>
                            <div className="travel-detail-info">{tourAttractionsLocation}</div>
                        </div>
                        <div className="travel-hours">
                            <div className="travel-title">운영시간</div>
                            <div className="travel-detail-info-devider">{"|"}</div>
                            <div className="travel-detail-info">{changeText(tourAttractionsHours)}</div>
                        </div>
                    </div>
                    <div className="travel-list-table-outline">
                        <div className="travel-outline-text">
                            <div className="travel-title ot">개요</div>
                            <div className="travel-outline">{changeText(tourAttractionsOutline)}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

//                    component : Rest Search List 컴포넌트                     //
function Restlist({
    restaurantNumber,
    restaurantImageUrl,
    restaurantName,
    restaurantLocation,
    restaurantTelNumber,
    restaurantHours,
    restaurantOutline,
}: RestaurantListItem) {
    //                     function                     //
    const navigator = useNavigate();

    //                     event handler                     //
    const onClickHandler = () => {
        if (restaurantNumber) {
            navigator(RESTAURANT_DETAIL_ABSOLUTE_PATH(restaurantNumber));
        }
    };
    //                    render                     //
    return (
        <div className="travel-list-table" onClick={onClickHandler}>
            <div className="travel-list-table-th">
                {restaurantImageUrl === null ? (
                    <div className="travel-list-picture">
                        <img title="travel" width="200px" height="135px" src={`${"https://cdn-icons-png.flaticon.com/128/11423/11423562.png"}`} />
                    </div>
                ) : (
                    <div className="travel-list-picture">
                        <img title="travel" width="200px" height="135px" src={`${restaurantImageUrl}`} />
                    </div>
                )}
                <div>
                    <div className="travel-list-table-title">
                        <div className="travel-name">
                            <div className="travel-title">이름</div>
                            <div className="travel-detail-info-devider">{"|"}</div>
                            <div className="travel-detail-info">{restaurantName}</div>
                        </div>
                        <div className="travel-telNumber">
                            <div className="travel-title">연락처</div>
                            <div className="travel-detail-info-devider">{"|"}</div>
                            <div className="travel-detail-info">{changeText(restaurantTelNumber)}</div>
                        </div>
                    </div>
                    <div className="travel-list-table-title">
                        <div className="travel-location">
                            <div className="travel-title">지역</div>
                            <div className="travel-detail-info-devider">{"|"}</div>
                            <div className="travel-detail-info">{restaurantLocation}</div>
                        </div>
                        <div className="travel-hours">
                            <div className="travel-title">운영시간</div>
                            <div className="travel-detail-info-devider">{"|"}</div>
                            <div className="travel-detail-info">{changeText(restaurantHours)}</div>
                        </div>
                    </div>
                    <div className="travel-list-table-outline">
                        <div className="travel-outline-text">
                            <div className="travel-title">개요</div>
                            <div className="travel-outline">{changeText(restaurantOutline)}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

//                    component : Tour / Rest Search List 컴포넌트                     //
export default function SearchTravelList() {
    //                    state                     //
    const {
        pageList,
        tourViewList,
        restViewList,
        currentPage,

        setCurrentPage,
        setCurrentSection,

        changeRestList,
        changeTourList,

        onPreSectionClickHandler,
        onPageClickHandler,
        onNextSectionClickHandler,
    } = usePagination<TourAttractionsListItem | RestaurantListItem>();

    const [searchWord, setSearchWord] = useState<string>("");
    const [selectLocal, setSelectLocal] = useState<string>("");
    const [selectOption, setSelectOption] = useState<string>("tourAttractions");
    const [searchButtonStatus, setSearchButtonStatus] = useState<boolean>(false);

    //                     function                     //
    const navigator = useNavigate();

    //                     event handler                     //
    const onLocalChangeHandler = (selectLocal: string) => {
        setSelectLocal(selectLocal);
    };

    const onRadioChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectOption(event.target.value);
    };

    const getTourAttractionsListResponse = (result: GetTourAttractionsListResponseDto | ResponseDto | null) => {
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

        const { tourAttractionsListItem } = result as GetTourAttractionsListResponseDto;
        changeTourList(tourAttractionsListItem);

        setCurrentPage(!tourAttractionsListItem.length ? 0 : 1);
        setCurrentSection(!tourAttractionsListItem.length ? 0 : 1);
    };

    const getRestaurantListResponse = (result: GetRestaurantListResponseDto | ResponseDto | null) => {
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

        const { restaurantListItem } = result as GetRestaurantListResponseDto;
        changeRestList(restaurantListItem);

        setCurrentPage(!restaurantListItem.length ? 0 : 1);
        setCurrentSection(!restaurantListItem.length ? 0 : 1);
    };

    const getSearchTourAttractionsListResponse = (result: GetSearchTourAttractionsListResponseDto | ResponseDto | null) => {
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

        const { tourAttractionsListItem } = result as GetSearchTourAttractionsListResponseDto;

        let tourViewList = [];

        if (selectLocal !== "all") {
            tourViewList = tourAttractionsListItem.filter((value) => {
                return value.tourAttractionsLocation.startsWith(selectLocal);
            });
        } else {
            tourViewList = tourAttractionsListItem;
        }

        changeTourList(tourViewList);

        setCurrentPage(!tourAttractionsListItem.length ? 0 : 1);
        setCurrentSection(!tourAttractionsListItem.length ? 0 : 1);
    };

    const getSearchRestaurantListResponse = (result: GetSearchRestaurantListResponseDto | ResponseDto | null) => {
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

        const { restaurantListItem } = result as GetRestaurantListResponseDto;

        let restViewList = [];

        if (selectLocal !== "all") {
            restViewList = restaurantListItem.filter((value) => value.restaurantLocation.startsWith(selectLocal));
        } else {
            restViewList = restaurantListItem;
        }

        changeRestList(restViewList);

        setCurrentPage(!restaurantListItem.length ? 0 : 1);
        setCurrentSection(!restaurantListItem.length ? 0 : 1);
    };

    const onSearchWordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const searchWord = event.target.value;
        setSearchWord(searchWord);
    };

    const onSearchButtonClickHandler = () => {
        if (selectOption === "tourAttractions") getSearchTourAttractionsListRequest(searchWord).then(getSearchTourAttractionsListResponse);

        if (selectOption === "restaurant") getSearchRestaurantListRequest(searchWord).then(getSearchRestaurantListResponse);
    };

    const onPasswordKeydownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") return onSearchButtonClickHandler();
    };

    //                    effect                     //
    useEffect(() => {
        getTourAttractionsListRequest().then(getTourAttractionsListResponse);
        getRestaurantListRequest().then(getRestaurantListResponse);
    }, []);

    useEffect(() => {
        setSelectOption(selectOption);
    }, [selectOption]);

    useEffect(() => {
        setSearchButtonStatus(!setSearchButtonStatus);
    }, [searchButtonStatus]);

    //                    render                     //
    return (
        <>
            <div className="travel-top-image" />
            <div style={{ height: "500px" }}></div>
            <div id="travelList-wrapper">
                <div className="travel-search-list">
                    <div className="travel-search-location">
                        <div>지역</div>
                        <div>{"|"}</div>
                        <SelectBox value={selectLocal} onChange={onLocalChangeHandler} />
                    </div>
                    <div className="travel-search-category">
                        <div>카테고리</div>
                        <div>{"|"}</div>
                        <div className="review-search-item-travel-attraction travel-font ">
                            <input
                                title="travel"
                                name="check"
                                type="radio"
                                onChange={onRadioChangeHandler}
                                defaultChecked
                                value={"tourAttractions"}
                            />
                            관광명소
                        </div>
                        <div className="review-search-item-restaurant travel-font ">
                            <input title="travel" name="check" type="radio" onChange={onRadioChangeHandler} value={"restaurant"} />
                            음식점
                        </div>
                    </div>
                    <div className="travel-write-box">
                        <div className="travel-search-box">
                            <div className="travel-search-input-box">
                                <input
                                    className="travel-search-input"
                                    placeholder="검색어를 입력하세요."
                                    value={searchWord}
                                    onChange={onSearchWordChangeHandler}
                                    onKeyDown={onPasswordKeydownHandler}
                                />
                                <div className="travel-search-button primary-button" onClick={onSearchButtonClickHandler}>
                                    검색
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {selectOption === "tourAttractions" && (tourViewList as TourAttractionsListItem[]).map((item) => <Tourlist {...item} />)}
                {selectOption === "restaurant" && (restViewList as RestaurantListItem[]).map((item) => <Restlist {...item} />)}

                <div className="travel-list-bottom">
                    <div className="travel-list-pagenation">
                        <div className="travel-list-page-left" onClick={onPreSectionClickHandler}></div>
                        <div className="travel-list-page-box">
                            {pageList.map((page) =>
                                page === currentPage ? (
                                    <div className="travel-list-page-active" key={page}>
                                        {page}
                                    </div>
                                ) : (
                                    <div className="travel-list-page" onClick={() => onPageClickHandler(page)} key={page}>
                                        {page}
                                    </div>
                                )
                            )}
                        </div>
                        <div className="travel-list-page-right" onClick={onNextSectionClickHandler}></div>
                    </div>
                </div>
            </div>
        </>
    );
}
