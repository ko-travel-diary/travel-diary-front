import { ChangeEvent, KeyboardEvent, MouseEvent } from "react";

import { useCheckBoxStore, useOpenListStore, useSearchWordStore, useTourListStore } from "src/stores";
import ResponseDto from "src/apis/response.dto";
import { GetSearchTourAttractionsListResponseDto } from "src/apis/tour_attraction/dto/response";
import { GetRestaurantListResponseDto, GetSearchRestaurantListResponseDto } from "src/apis/restaurant/dto/response";
import { getSearchRestaurantListRequest } from "src/apis/restaurant";
import { getSearchTourAttractionsListRequest } from "src/apis/tour_attraction";
import SideListItem from "../SideList";

import "./style.css";

//                    component : 사이드 컴포넌트                     //
export default function Side() {
    //                    state                     //
    const { setOpenList } = useOpenListStore();
    const { searchWord, setSearchWord } = useSearchWordStore();
    const { restCheckStatus, tourCheckStatus, setRestCheckStatus, setTourCheckStatus } = useCheckBoxStore();
    const { tourAttractionsListItem, restaurantListItem, setRestaurantListItem, setTourAttractionsListItem } = useTourListStore();

    //                    function                     //
    const onTourCheckBoxClickHandler = () => {
        setTourCheckStatus(!tourCheckStatus);
    };

    const onRestCheckBoxClickHandler = () => {
        setRestCheckStatus(!restCheckStatus);
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
            return result;
        }

        const { tourAttractionsListItem } = result as GetSearchTourAttractionsListResponseDto;
        setTourAttractionsListItem(tourAttractionsListItem);
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
            return result;
        }

        const { restaurantListItem } = result as GetRestaurantListResponseDto;
        setRestaurantListItem(restaurantListItem);
    };

    //                    event handler                     //
    const onSearchWordChangeHanlder = (event: ChangeEvent<HTMLInputElement>) => {
        const searchWord = event.target.value;
        setSearchWord(searchWord);
    };

    const onSearchWordKeydownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") return onSaerchButtonClickHandler(event as unknown as MouseEvent<HTMLDivElement>);
    };

    const onSaerchButtonClickHandler = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        setOpenList([]);
        if (tourCheckStatus) getSearchTourAttractionsListRequest(searchWord).then(getSearchTourAttractionsListResponse);
        if (restCheckStatus) getSearchRestaurantListRequest(searchWord).then(getSearchRestaurantListResponse);
        if (!tourCheckStatus && !restCheckStatus) alert("관광 명소 또는 음식점을 체크해주세요.");
    };

    //                    render : 사이드 컴포넌트                     //
    return (
        <div className="main-side-container">
            <div className="main-side-top">
                <div className="main-side-top-title-box">
                    <div className="main-side-top-title">지도</div>
                    <div className="main-side-top-title-divider">{"|"}</div>
                    <div className="main-side-top-title">길찾기</div>
                </div>
                <div className="main-side-top-search-box">
                    <input
                        className="main-side-top-search-input"
                        value={searchWord}
                        onChange={onSearchWordChangeHanlder}
                        onKeyDown={onSearchWordKeydownHandler}
                    />
                    <div className="main-side-top-search-button" onClick={onSaerchButtonClickHandler}></div>
                </div>
            </div>
            <div className="main-side-sort">
                <div className="main-side-check-container">
                    <div className="main-side-check-box">
                        <input type="checkbox" onClick={onTourCheckBoxClickHandler} checked={tourCheckStatus} defaultChecked />
                        <div className="main-side-check-label">관광 명소</div>
                    </div>
                    <div className="main-side-check-box">
                        <input type="checkbox" onClick={onRestCheckBoxClickHandler} checked={restCheckStatus} />
                        <div className="main-side-check-label">음식점</div>
                    </div>
                </div>
            </div>
            <div className="main-side-item-container">
                {tourCheckStatus && tourAttractionsListItem.map((item) => <SideListItem key={item.tourAttractionsNumber} {...item} />)}
                {restCheckStatus && restaurantListItem.map((item) => <SideListItem key={item.restaurantNumber} {...item} />)}
            </div>
            <div className="main-side-more-button">더보기</div>
        </div>
    );
}