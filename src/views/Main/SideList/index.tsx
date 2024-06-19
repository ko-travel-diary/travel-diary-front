import { MouseEvent } from "react";

import { useDestinationStore, useMapCenterStore, useOpenListStore } from "src/stores";
import { Destination, RestaurantListItem, TourAttractionsListItem } from "src/types";

import "./style.css";

//                    component : 사이드 리스트 컴포넌트                     //
export default function SideListItem(props: RestaurantListItem | TourAttractionsListItem) {
    //                    state                     //
    const { setMapCenter } = useMapCenterStore();
    const { waypoints, setOrigin, setDestination, setWaypoints } = useDestinationStore();
    const { openList, setOpenList } = useOpenListStore();

    const onMarkerOverrayOpenHandler = (type: string, typeNumber: number) => {
        const newOpenList = [...openList, { type, typeNumber }];
        setTimeout(() => setOpenList(newOpenList), 250);
    };

    //                    event handler                     //
    const onItemClickHandler = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        if ("restaurantNumber" in props) {
            const mapCenter = {
                lat: props.restaurantLat,
                lng: props.restaurantLng,
            };
            setMapCenter(mapCenter);

            onMarkerOverrayOpenHandler("restaurant", props.restaurantNumber);
        } else {
            const mapCenter = {
                lat: props.tourAttractionsLat,
                lng: props.tourAttractionsLng,
            };
            setMapCenter(mapCenter);
            onMarkerOverrayOpenHandler("tour", props.tourAttractionsNumber);
        }
    };

    const onStartButtonClickHandler = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
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
    };

    const onStopoverButtonClickHandler = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();

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
    };

    const onEndButtonClickHandler = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();

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
    };

    if ("restaurantNumber" in props)
        return (
            <div className="side-list-item" onClick={onItemClickHandler}>
                <div className="side-list-item-image" style={{ backgroundImage: `url(${props.restaurantImageUrl})` }}></div>
                <div className="side-list-item-info-box">
                    <div className="side-list-item-info-title-box">
                        <div className="side-list-item-info-title">{props.restaurantName}</div>
                        <div className="side-list-item-info-type">음식점</div>
                    </div>
                    <div>
                        <div className="side-list-item-recommendation-box">
                            <div className="side-list-item-recommendation">추천수</div>
                            <div className="side-list-item-recommendation">{"|"}</div>
                            <div className="side-list-item-recommendation">{props.restaurantRecommendCount}</div>
                        </div>
                    </div>
                    <div className="side-list-item-button-box">
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
        );

    //                    render : 사이드 컴포넌트                     //
    return (
        <div className="side-list-item" onClick={onItemClickHandler}>
            <div className="side-list-item-image" style={{ backgroundImage: `url(${props.tourAttractionsImageUrl})` }}></div>
            <div className="side-list-item-info-box">
                <div className="side-list-item-info-title-box">
                    <div className="side-list-item-info-title">{props.tourAttractionsName}</div>
                    <div className="side-list-item-info-type">관광 명소</div>
                </div>
                <div className="side-list-item-info-location">내 위치로 부터 {"10.0"}km</div>
                <div>
                    <div className="side-list-item-recommendation-box">
                        <div className="side-list-item-recommendation">추천수</div>
                        <div className="side-list-item-recommendation">{"|"}</div>
                        <div className="side-list-item-recommendation">{props.tourAttractionsRecommendCount}</div>
                    </div>
                </div>
                <div className="side-list-item-button-box">
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
    );
}