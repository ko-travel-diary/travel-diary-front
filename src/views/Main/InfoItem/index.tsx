import { MouseEvent, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";

import { useDestinationStore } from "src/stores";
import { Destination, RestaurantListItem, TourAttractionsListItem } from "src/types";
import ResponseDto from "src/apis/response.dto";
import { GetRestaurantRecommendStatusResponseDto } from "src/apis/restaurant/dto/response";
import { GetTourAttractionsRecommendResponseDto } from "src/apis/tour_attraction/dto/response";
import { getRestaurantRecommendStatusRequest, patchRestRecommendRequest } from "src/apis/restaurant";
import { getTourAttractionRecommendStatusRequest, patchTourRecommendRequest } from "src/apis/tour_attraction";
import { RESTAURANT_DETAIL_ABSOLUTE_PATH, TOURATTRACTIONS_DETAIL_ABSOLUTE_PATH } from "src/constant";

import "./style.css";

//                    interface                     //
interface InfoItemProps {
    onClose: (typeNumber: number) => void;
}

//                    component : 마커 정보 컴포넌트                     //
export default function InfoItem(props: (RestaurantListItem | TourAttractionsListItem) & InfoItemProps) {
    //                    state                     //
    const [cookies] = useCookies();

    const { waypoints, setOrigin, setDestination, setWaypoints } = useDestinationStore();

    const [restRecommendStatus, setRestRecommendStatus] = useState<boolean>(false);
    const [tourRecommendStatus, setTourRecommendStatus] = useState<boolean>(false);

    //                    function                     //
    const navigator = useNavigate();

    const getRestaurantRecommendStatusResponse = (result: ResponseDto | GetRestaurantRecommendStatusResponseDto | null) => {
        const message = !result
            ? "서버에 문제가 있습니다."
            : result.code === "NB"
            ? "존재하지 않는 음식점입니다."
            : result.code === "AF"
            ? "로그인후 이용해주세요."
            : result.code === "DBE"
            ? "서버에 문제가 있습니다."
            : "";

        if (!result || result.code !== "SU") {
            alert(message);
            return;
        }

        const { restRecommendStatus } = result as GetRestaurantRecommendStatusResponseDto;
        setRestRecommendStatus(restRecommendStatus);
    };

    const getTourAttractionRecommendStatusResponse = (result: ResponseDto | GetTourAttractionsRecommendResponseDto | null) => {
        const message = !result
            ? "서버에 문제가 있습니다."
            : result.code === "NB"
            ? "존재하지 않는 관광지입니다."
            : result.code === "AF"
            ? "로그인후 이용해주세요."
            : result.code === "DBE"
            ? "서버에 문제가 있습니다."
            : "";

        if (!result || result.code !== "SU") {
            alert(message);
            return;
        }
    };

    const patchRestRecommendResponse = (result: ResponseDto | null) => {
        const message = !result
            ? "서버에 문제가 있습니다."
            : result.code === "NB"
            ? "존재하지 않는 게시글입니다."
            : result.code === "DBE"
            ? "서버에 문제가 있습니다."
            : "";

        if (!result || result.code !== "SU") {
            alert(message);
            return;
        }
    };

    const patchTourRecommendResponse = (result: ResponseDto | null) => {
        const message = !result
            ? "서버에 문제가 있습니다."
            : result.code === "NB"
            ? "존재하지 않는 게시글입니다."
            : result.code === "DBE"
            ? "서버에 문제가 있습니다."
            : "";

        if (!result || result.code !== "SU") {
            alert(message);
            return;
        }
    };

    //                    event handler                     //
    const onClose = () => {
        if ("restaurantNumber" in props) props.onClose(props.restaurantNumber);
        else props.onClose(props.tourAttractionsNumber);
    };

    const onStartButtonClickHandler = (event: MouseEvent<HTMLDivElement>) => {
        let origin: Destination = { name: "", lat: 0, lng: 0 };
        if ("restaurantNumber" in props)
            origin = {
                name: props.restaurantName,
                lat: props.restaurantLat,
                lng: props.restaurantLng,
            };
        else
            origin = {
                name: props.tourAttractionsName,
                lat: props.tourAttractionsLat,
                lng: props.tourAttractionsLng,
            };
        setOrigin(origin);
        if ("restaurantNumber" in props) props.onClose(props.restaurantNumber);
        else props.onClose(props.tourAttractionsNumber);
    };

    const onStopoverButtonClickHandler = (event: MouseEvent<HTMLDivElement>) => {
        if (waypoints.length === 5) {
            alert("경유지는 최대 5개까지만 추가 가능합니다.");
            return;
        }
        let waypoint: Destination = { name: "", lat: 0, lng: 0 };
        if ("restaurantNumber" in props)
            waypoint = {
                name: props.restaurantName,
                lat: props.restaurantLat,
                lng: props.restaurantLng,
            };
        else
            waypoint = {
                name: props.tourAttractionsName,
                lat: props.tourAttractionsLat,
                lng: props.tourAttractionsLng,
            };
        const newWaypoints = [...waypoints, waypoint];
        setWaypoints(newWaypoints);
        if ("restaurantNumber" in props) props.onClose(props.restaurantNumber);
        else props.onClose(props.tourAttractionsNumber);
    };

    const onEndButtonClickHandler = (event: MouseEvent<HTMLDivElement>) => {
        let destination: Destination = { name: "", lat: 0, lng: 0 };
        if ("restaurantNumber" in props)
            destination = {
                name: props.restaurantName,
                lat: props.restaurantLat,
                lng: props.restaurantLng,
            };
        else
            destination = {
                name: props.tourAttractionsName,
                lat: props.tourAttractionsLat,
                lng: props.tourAttractionsLng,
            };
        setDestination(destination);
        if ("restaurantNumber" in props) props.onClose(props.restaurantNumber);
        else props.onClose(props.tourAttractionsNumber);
    };

    const onRestRecommendButtonClickHandler = () => {
        if (!cookies.accessToken) {
            alert("로그인 후 이용해 주세요.");
            return;
        }

        if ("restaurantNumber" in props) {
            const restaurantNumber = props.restaurantNumber;
            patchRestRecommendRequest(restaurantNumber, cookies.accessToken).then(patchRestRecommendResponse);
            setRestRecommendStatus(!restRecommendStatus);
        }
    };

    const onTourRecommendButtonClickHandler = () => {
        if (!cookies.accessToken) {
            alert("로그인 후 이용해 주세요.");
            return;
        }

        if ("tourAttractionsNumber" in props) {
            const tourAttractionsNumber = props.tourAttractionsNumber;
            patchTourRecommendRequest(tourAttractionsNumber, cookies.accessToken).then(patchTourRecommendResponse);
            setTourRecommendStatus(!tourRecommendStatus);
        }
    };

    const onTitleClickHandler = () => {
        if ("restaurantNumber" in props) {
            navigator(RESTAURANT_DETAIL_ABSOLUTE_PATH(props.restaurantNumber));
        } else {
            navigator(TOURATTRACTIONS_DETAIL_ABSOLUTE_PATH(props.tourAttractionsNumber));
        }
    };

    //               effect              //
    useEffect(() => {
        if (!cookies.accessToken) return;
        if ("restaurantNumber" in props) {
            const restaurantNumber = props.restaurantNumber;
            getRestaurantRecommendStatusRequest(restaurantNumber, cookies.accessToken).then(getRestaurantRecommendStatusResponse);
        }
        if ("tourAttractionsNumber" in props) {
            const tourAttractionsNumber = props.tourAttractionsNumber;
            getTourAttractionRecommendStatusRequest(tourAttractionsNumber, cookies.accessToken).then(getTourAttractionRecommendStatusResponse);
        }
    }, [props]);

    //               render               //

    if ("restaurantNumber" in props)
        return (
            <div style={{ position: "relative" }}>
                <div className="info-box">
                    <div className="info-box-toolbar">
                        <div className="info-box-exit-button" onClick={onClose}></div>
                    </div>
                    <div className="info-box-top">
                        <div className="info-box-image" style={{ backgroundImage: `url(${props.restaurantImageUrl})` }}></div>
                        <div className="info-box-main">
                            <div className="info-box-main-title-box">
                                <div className="info-box-main-title" onClick={onTitleClickHandler}>
                                    {props.restaurantName}
                                </div>
                                <div className="info-box-main-type">음식점</div>
                            </div>
                            <div className="info-box-main-address">주소 | {props.restaurantLocation}</div>
                            <div className="info-box-main-hours">운영시간 | {props.restaurantHours}</div>
                            <div className="info-box-main-tel">연락처 | {props.restaurantTelNumber}</div>
                        </div>
                    </div>
                    <div className="info-box-bottom">
                        <div className="info-box-bottom-left">
                            {restRecommendStatus ? (
                                <div className="favorite-icon-button-clicked" onClick={onRestRecommendButtonClickHandler}></div>
                            ) : (
                                <div className="favorite-icon-button" onClick={onRestRecommendButtonClickHandler}></div>
                            )}
                        </div>
                        <div className="info-box-bottom-right">
                            <div className="side-list-item-button start" onClick={onStartButtonClickHandler}>
                                출발
                            </div>
                            <div className="side-list-item-button stopover" onClick={onStopoverButtonClickHandler}>
                                경유
                            </div>
                            <div className="side-list-item-button end" onClick={onEndButtonClickHandler}>
                                도착
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    //                 render                   //

    return (
        <div style={{ position: "relative" }}>
            <div className="info-box">
                <div className="info-box-toolbar">
                    <div className="info-box-exit-button" onClick={onClose}></div>
                </div>
                <div className="info-box-top">
                    <div className="info-box-image" style={{ backgroundImage: `url(${props.tourAttractionsImageUrl})` }}></div>
                    <div className="info-box-main">
                        <div className="info-box-main-title-box">
                            <div className="info-box-main-title" onClick={onTitleClickHandler}>
                                {props.tourAttractionsName}
                            </div>
                            <div className="info-box-main-type">관광명소</div>
                        </div>
                        <div className="info-box-main-address">주소 | {props.tourAttractionsLocation}</div>
                        <div className="info-box-main-hours">운영시간 | {props.tourAttractionsHours}</div>
                        <div className="info-box-main-tel">연락처 | {props.tourAttractionsTelNumber}</div>
                    </div>
                </div>
                <div className="info-box-bottom">
                    <div className="info-box-bottom-left">
                        {tourRecommendStatus ? (
                            <div className="favorite-icon-button-clicked" onClick={onTourRecommendButtonClickHandler}></div>
                        ) : (
                            <div className="favorite-icon-button" onClick={onTourRecommendButtonClickHandler}></div>
                        )}
                    </div>
                    <div className="info-box-bottom-right">
                        <div className="side-list-item-button start" onClick={onStartButtonClickHandler}>
                            출발
                        </div>
                        <div className="side-list-item-button stopover" onClick={onStopoverButtonClickHandler}>
                            경유
                        </div>
                        <div className="side-list-item-button end" onClick={onEndButtonClickHandler}>
                            도착
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}