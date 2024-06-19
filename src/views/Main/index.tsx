import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import { Map, MapMarker, MarkerClusterer, Polyline } from "react-kakao-maps-sdk";

import {
    usePathStore,
    useTourListStore,
    useCheckBoxStore,
    useOpenListStore,
    useMapCenterStore,
    useSearchWordStore,
} from "src/stores";
import { RestaurantListItem, TourAttractionsListItem } from "src/types";
import ResponseDto from "src/apis/response.dto";
import { GetRestaurantListResponseDto } from "src/apis/restaurant/dto/response";
import { GetTourAttractionsListResponseDto } from "src/apis/tour_attraction/dto/response";
import { getRestaurantListRequest } from "src/apis/restaurant";
import { getTourAttractionsListRequest } from "src/apis/tour_attraction";
import TourIcon from "src/assets/image/tour-attracion-icon.png";
import RestaurantIcon from "src/assets/image/restaurant-icon.png";
import { AUTH_ABSOLUTE_PATH } from "src/constant";

import Side from "./Side";
import InfoItem from "./InfoItem";
import Waypoints from "./Waypoints";

import "./style.css";

//                    component : 메인 화면 컴포넌트                     //
export default function Main() {
    //                    state                     //
    // description: 사이드 상태 //
    const [sideOpen, setSideOpen] = useState<boolean>(false);

    // description: 맵 중심 상태 //
    const { mapCenter, setMapCenter } = useMapCenterStore();

    const [mouseFlag, setMouseFlag] = useState<boolean>(false);

    // description: 알림 창 오픈 여부 리스트 상태 //
    const { searchWord } = useSearchWordStore();
    // description: 마커 오버레이 리스트 //
    const { openList, setOpenList } = useOpenListStore();
    // description: 마커 오버레이 오픈 처리 이벤트 함수 //
    const onMarkerOverrayOpenHandler = (type: string, typeNumber: number) => {
        const newOpenList = [...openList, { type, typeNumber }];
        setOpenList(newOpenList);
    };

    const mapRef = useRef<kakao.maps.Map | null>(null);

    const { tourAttractionsListItem, restaurantListItem, setTourAttractionsListItem, setRestaurantListItem } = useTourListStore();
    const { restCheckStatus, tourCheckStatus } = useCheckBoxStore();
    const { path } = usePathStore();

    // description : 음식점 마커 아이콘 //
    const restaurantIcon = {
        src: RestaurantIcon,
        size: {
            width: 64,
            height: 64,
        },
    };

    // description : 관광명소 마커 아이콘 //
    const tourIcon = {
        src: TourIcon,
        size: {
            width: 64,
            height: 64,
        },
    };

    //                     function                     //
    const navigator = useNavigate();

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
        setTourAttractionsListItem(tourAttractionsListItem);
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
        setRestaurantListItem(restaurantListItem);
    };

    const isRestaurantOpen = (item: RestaurantListItem) => {
        return openList.some((open) => open.type === "restaurant" && open.typeNumber === item.restaurantNumber);
    };

    const isTourOpen = (item: TourAttractionsListItem) => {
        return openList.some((open) => open.type === "tour" && open.typeNumber === item.tourAttractionsNumber);
    };

    //                    event handler                      //
    // description: 사이드 버튼 클릭 이벤트 처리 함수 //
    const onSideButtonClickHandler = () => {
        setSideOpen(!sideOpen);
    };

    // description: 지도의 중심 좌표가 변경될 때 실행할 콜백 함수 //
    const onCenterChanged = (map: kakao.maps.Map) => {
        if (mouseFlag) return;
        map.setCenter(new kakao.maps.LatLng(mapCenter.lat, mapCenter.lng));
    };

    // description: 마커 오버레이 레스토랑 클로즈 처리 이벤트 함수 //
    const onMarkerOverrayRestaurantCloseHandler = (typeNumber: number) => {
        const newOpenList = openList.filter((item) => !(item.type === "restaurant" && item.typeNumber === typeNumber));
        setOpenList(newOpenList);
    };

    // description: 마커 오버레이 관광명소 클로즈 처리 이벤트 함수 //
    const onMarkerOverrayTourCloseHandler = (typeNumber: number) => {
        const newOpenList = openList.filter((item) => !(item.type === "tour" && item.typeNumber === typeNumber));
        setOpenList(newOpenList);
    };

    const onMapMouseDownHandler = () => {
        setMouseFlag(true);
        if (mapRef.current) {
            const center = mapRef.current.getCenter();
            const lat = center.getLat();
            const lng = center.getLng();
            const mapCenter = { lat, lng };
            setMapCenter(mapCenter);
        }
    };

    const onMapMouseUpHandler = () => {
        setMouseFlag(false);
    };

    //                    effect                     //
    useEffect(() => {
        if (mouseFlag) return;
        if (searchWord) return;
        const { lat, lng } = mapCenter;
        if (tourCheckStatus) getTourAttractionsListRequest(lat, lng).then(getTourAttractionsListResponse);
        if (restCheckStatus) getRestaurantListRequest(lat, lng).then(getRestaurantListResponse);
    }, [mouseFlag, mapCenter]);

    useEffect(() => {
        if (!mapRef.current) return;
        if (!searchWord) return;
        if (restaurantListItem.length) {
            const mapCenter = {
                lat: restaurantListItem[0].restaurantLat,
                lng: restaurantListItem[0].restaurantLng,
            };
            setMapCenter(mapCenter);
        }
        if (tourAttractionsListItem.length) {
            const mapCenter = {
                lat: tourAttractionsListItem[0].tourAttractionsLat,
                lng: tourAttractionsListItem[0].tourAttractionsLng,
            };
            setMapCenter(mapCenter);
        }
    }, [restaurantListItem, tourAttractionsListItem]);

    //                    render : 메인 화면 컴포넌트                     //
    return (
        <div id="main-wrapper">
            <Map
                ref={mapRef}
                center={mapCenter}
                maxLevel={2}
                minLevel={6}
                style={{ width: "100%", height: "calc(100vh - 64px)" }}
                onCenterChanged={onCenterChanged}
                onMouseDown={onMapMouseDownHandler}
                onMouseUp={onMapMouseUpHandler}
            >
                <MarkerClusterer averageCenter={true} minLevel={4}>
                    {tourCheckStatus &&
                        tourAttractionsListItem.map((item) => (
                            <MapMarker
                                position={{
                                    lat: item.tourAttractionsLat,
                                    lng: item.tourAttractionsLng,
                                }}
                                clickable
                                image={tourIcon}
                                onClick={() => onMarkerOverrayOpenHandler("tour", item.tourAttractionsNumber)}
                            >
                                {isTourOpen(item) && <InfoItem {...item} onClose={onMarkerOverrayTourCloseHandler} />}
                            </MapMarker>
                        ))}
                    {restCheckStatus &&
                        restaurantListItem.map((item) => (
                            <MapMarker
                                position={{ lat: item.restaurantLat, lng: item.restaurantLng }}
                                clickable
                                image={restaurantIcon}
                                onClick={() => onMarkerOverrayOpenHandler("restaurant", item.restaurantNumber)}
                            >
                                {isRestaurantOpen(item) && <InfoItem {...item} onClose={onMarkerOverrayRestaurantCloseHandler} />}
                            </MapMarker>
                        ))}
                    <Polyline path={[path]} strokeWeight={5} strokeColor={"rgba(255, 0, 0, 1)"} strokeOpacity={0.7} strokeStyle={"solid"} />
                </MarkerClusterer>
            </Map>
            <div className="main-side">
                {sideOpen && <Side />}
                <div className="main-side-button-box">
                    <div className="main-side-button" onClick={onSideButtonClickHandler}>
                        {sideOpen ? "◀" : "▶"}
                    </div>
                    <Waypoints />
                </div>
            </div>
        </div>
    );
}
