import { useDestinationStore, usePathStore } from "src/stores";
import { Position } from "src/types";
import { postWaypointsRequest } from "src/apis/waypoints";

import "./style.css";

//                    component : 경로 컴포넌트                     //
export default function Waypoints() {
    //                  state                    //
    const { origin, waypoints, destination, setOrigin, setWaypoints, setDestination } = useDestinationStore();
    const { setPath } = usePathStore();

    //                  event handler                    //
    const onOriginCancleClickHandler = () => {
        setOrigin(null);
    };

    const onDestinationCancleClickHandler = () => {
        setDestination(null);
    };

    const onWaypointCancleClickHandler = (selectIndex: number) => {
        const newWaypoints = waypoints.filter((waypoint, index) => index !== selectIndex);
        setWaypoints(newWaypoints);
    };

    const onSearchButtonClickHandler = () => {
        if (!origin || !destination) return;

        const data = {
            origin: {
                x: String(origin.lng),
                y: String(origin.lat),
            },
            destination: {
                x: String(destination.lng),
                y: String(destination.lat),
            },
            waypoints: waypoints.map((waypoint) => ({ name: waypoint.name, x: String(waypoint.lng), y: String(waypoint.lat) })),
        };

        const kakaoAppKey = process.env.REACT_APP_KAKAO_MAP_API_KEY;
        if (!kakaoAppKey) return;

        postWaypointsRequest(data, kakaoAppKey).then(waypiontResponse);
    };

    //                  function                    //
    const waypiontResponse = (result: any | null) => {
        if (!result) return;
        const path: Position[] = [];
        const { sections } = result.routes[0];

        for (const section of sections) {
            for (const road of section.roads) {
                for (let index = 0; index < road.vertexes.length / 2; index++) {
                    path.push({ lng: road.vertexes[index * 2], lat: road.vertexes[index * 2 + 1] });
                }
            }
        }
        setPath(path);
    };

    //                   render                 //
    return (
        <div className="main-waypoints">
            <div className="main-waypoints-item">
                <div className="main-waypoints-origin-icon"></div>
                <div className="main-waypoints-name">{origin ? origin.name : "출발지를 입력하세요."}</div>
                <div className="main-waypoints-cancle-button" onClick={onOriginCancleClickHandler}></div>
            </div>

            {waypoints.map((waypoint, index) => (
                <div className="main-waypoints-item">
                    <div className="main-waypoints-waypoint-icon"></div>
                    <div className="main-waypoints-name">{waypoint.name}</div>
                    <div className="main-waypoints-cancle-button" onClick={() => onWaypointCancleClickHandler(index)}></div>
                </div>
            ))}

            <div className="main-waypoints-item">
                <div className="main-waypoints-destination-icon"></div>
                <div className="main-waypoints-name">{destination ? destination.name : "도착지를 입력하세요."}</div>
                <div className="main-waypoints-cancle-button" onClick={onDestinationCancleClickHandler}></div>
            </div>
            {origin !== null && destination !== null && (
                <div className="main-waypoints-search-button" onClick={onSearchButtonClickHandler}>
                    경로 검색
                </div>
            )}
        </div>
    );
}
