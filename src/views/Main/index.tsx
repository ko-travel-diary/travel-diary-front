import React, {
  ChangeEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Map,
  MapMarker,
  MarkerClusterer,
  Polyline,
} from "react-kakao-maps-sdk";
import "./style.css";
import { getTourAttractionsListRequest } from "src/apis/tour_attraction";
import { getRestaurantListRequest } from "src/apis/restaurant";
import { GetTourAttractionsListResponseDto } from "src/apis/tour_attraction/dto/response";
import ResponseDto from "src/apis/response.dto";
import { AUTH_ABSOLUTE_PATH } from "src/constant";
import {
  Destination,
  MarkerOpen,
  Position,
  RestaurantListItem,
  TourAttractionsListItem,
} from "src/types";
import { useNavigate } from "react-router";
import { GetRestaurantListResponseDto } from "src/apis/restaurant/dto/response";
import { useCheckBoxStore } from "src/stores/useCheckBoxStores";
import { useTourListStore } from "src/stores/useTourListStore";

import RestaurantIcon from "src/assets/image/restaurant-icon.png";
import TourIcon from "src/assets/image/tour-attracion-icon.png";
import { useDestinationStore, usePathStore } from "src/stores";
import axios from "axios";

//                    component : 경로 컴포넌트                     //
function Waypoints() {
  const { origin, waypoints, destination, setOrigin, setWaypoints, setDestination } = useDestinationStore();
  const { setPath } = usePathStore();

  const onOriginCancleClickHandler = () => {
    setOrigin(null);
  }

  const onDestinationCancleClickHandler = () => {
    setDestination(null);
  }

  const onWaypointCancleClickHandler = (selectIndex: number) => {
    const newWaypoints = waypoints.filter((waypoint, index) => index !== selectIndex);
    setWaypoints(newWaypoints);
  }

  const onSearchButtonClickHandler = () => {
    if (!origin || !destination || !waypoints.length) return;

    const data = {
      origin: {
          x: String(origin.lng),
          y: String(origin.lat)
      },
      destination: {
        x: String(destination.lng),
        y: String(destination.lat)
      },
      waypoints: waypoints.map(waypoint => ({ name: waypoint.name, x: String(waypoint.lng), y: String(waypoint.lat) }))
    }
    axios.post('https://apis-navi.kakaomobility.com/v1/waypoints/directions', data, {headers: { Authorization: 'KakaoAK cdf3640f786fbe72c3a456c5064a2f7a' }})
      .then(response => {
        // const { roads } = response.data.routes[0].sections[0];
        const path: Position[] = [];
        const { sections } = response.data.routes[0];

        for (const section of sections) {
          for (const road of section.roads) {
            for (let index = 0; index < road.vertexes.length / 2; index ++) {
              path.push({ lng: road.vertexes[index * 2], lat: road.vertexes[index * 2 + 1] })
            }
          }
        }
        setPath(path);

      })
      .catch(error => {
        console.log(error.response);
      })
  }

  return (
    <div className="main-waypoints">
      <div className="main-waypoints-item">
        <div className="main-waypoints-origin-icon"></div>
        <div className="main-waypoints-name">
          {origin ? origin.name : "출발지를 입력하세요."}
        </div>
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
        <div className="main-waypoints-name">
          {destination ? destination.name : "도착지를 입력하세요."}
        </div>
        <div className="main-waypoints-cancle-button" onClick={onDestinationCancleClickHandler}></div>
      </div>
      { origin !== null && destination !== null && waypoints.length !== 0 &&
      <div className="main-waypoints-search-button" onClick={onSearchButtonClickHandler}>경로 검색</div>
      }
    </div>
  );
}

interface InfoItemProps {
  onClose: (typeNumber: number) => void;
}

//                    component : 마커 정보 컴포넌트                     //
function InfoItem(
  props: (RestaurantListItem | TourAttractionsListItem) & InfoItemProps
) {
  //                    state                     //
  const { waypoints, setOrigin, setDestination, setWaypoints } =
    useDestinationStore();

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
  };

  const onStopoverButtonClickHandler = (event: MouseEvent<HTMLDivElement>) => {
    if (waypoints.length === 5) {
      alert('경유지는 최대 5개까지만 추가 가능합니다.');
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
  };

  if ("restaurantNumber" in props)
    return (
      <div style={{ position: "relative" }}>
        <div className="info-box">
          <div className="info-box-toolbar">
            <div className="info-box-exit-button" onClick={onClose}></div>
          </div>
          <div className="info-box-top">
            <div
              className="info-box-image"
              style={{ backgroundImage: `url(${props.restaurantImageUrl})` }}
            ></div>
            <div className="info-box-main">
              <div className="info-box-main-title-box">
                <div className="info-box-main-title">
                  {props.restaurantName}
                </div>
                <div className="info-box-main-type">음식점</div>
              </div>
              <div className="info-box-main-address">
                주소 | {props.restaurantLocation}
              </div>
              <div className="info-box-main-hours">
                운영시간 | {props.restaurantHours}
              </div>
              <div className="info-box-main-tel">
                연락처 | {props.restaurantTelNumber}
              </div>
            </div>
          </div>
          <div className="info-box-bottom">
            <div className="info-box-bottom-left">
              <div className="favorite-icon-button"></div>
            </div>
            <div className="info-box-bottom-right">
              <div
                className="side-list-item-button start"
                onClick={onStartButtonClickHandler}
              >
                출발
              </div>
              <div
                className="side-list-item-button stopover"
                onClick={onStopoverButtonClickHandler}
              >
                경유
              </div>
              <div
                className="side-list-item-button end"
                onClick={onEndButtonClickHandler}
              >
                도착
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div style={{ position: "relative" }}>
      <div className="info-box">
        <div className="info-box-toolbar">
          <div className="info-box-exit-button" onClick={onClose}></div>
        </div>
        <div className="info-box-top">
          <div
            className="info-box-image"
            style={{ backgroundImage: `url(${props.tourAttractionsImageUrl})` }}
          ></div>
          <div className="info-box-main">
            <div className="info-box-main-title-box">
              <div className="info-box-main-title">
                {props.tourAttractionsName}
              </div>
              <div className="info-box-main-type">관광명소</div>
            </div>
            <div className="info-box-main-address">
              주소 | {props.tourAttractionsLocation}
            </div>
            <div className="info-box-main-hours">
              운영시간 | {props.tourAttractionsHours}
            </div>
            <div className="info-box-main-tel">
              연락처 | {props.tourAttractionsTelNumber}
            </div>
          </div>
        </div>
        <div className="info-box-bottom">
          <div className="info-box-bottom-left">
            <div className="favorite-icon-button"></div>
          </div>
          <div className="info-box-bottom-right">
            <div className="side-list-item-button start" onClick={onStartButtonClickHandler}>출발</div>
            <div className="side-list-item-button stopover" onClick={onStopoverButtonClickHandler}>경유</div>
            <div className="side-list-item-button end" onClick={onEndButtonClickHandler}>도착</div>
          </div>
        </div>
      </div>
    </div>
  );
}

//                    component : 사이드 리스트 컴포넌트                     //
function SideListItem(props: RestaurantListItem | TourAttractionsListItem) {
  //                    state                     //
  const { waypoints, setOrigin, setDestination, setWaypoints } =
    useDestinationStore();

  //                    event handler                     //
  const onItemClickHandler = () => {};

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
        <div
          className="side-list-item-image"
          style={{ backgroundImage: `url(${props.restaurantImageUrl})` }}
        ></div>
        <div className="side-list-item-info-box">
          <div className="side-list-item-info-title-box">
            <div className="side-list-item-info-title">
              {props.restaurantName}
            </div>
            <div className="side-list-item-info-type">음식점</div>
          </div>
          <div className="side-list-item-info-location">
            내 위치로 부터 {"10.0"}km
          </div>
          <div>
            <div className="side-list-item-recommendation-box">
              <div className="side-list-item-recommendation">추천수</div>
              <div className="side-list-item-recommendation">{"|"}</div>
              <div className="side-list-item-recommendation">
                {props.restaurantRecommendCount}
              </div>
            </div>
          </div>
          <div className="side-list-item-button-box">
            <div
              className="side-list-item-button start"
              onClick={onStartButtonClickHandler}
            >
              출발
            </div>
            <div
              className="side-list-item-button stopover"
              onClick={onStopoverButtonClickHandler}
            >
              경유
            </div>
            <div
              className="side-list-item-button end"
              onClick={onEndButtonClickHandler}
            >
              도착
            </div>
          </div>
        </div>
      </div>
    );

  //                    render : 사이드 컴포넌트                     //
  return (
    <div className="side-list-item" onClick={onItemClickHandler}>
      <div
        className="side-list-item-image"
        style={{ backgroundImage: `url(${props.tourAttractionsImageUrl})` }}
      ></div>
      <div className="side-list-item-info-box">
        <div className="side-list-item-info-title-box">
          <div className="side-list-item-info-title">
            {props.tourAttractionsName}
          </div>
          <div className="side-list-item-info-type">관광 명소</div>
        </div>
        <div className="side-list-item-info-location">
          내 위치로 부터 {"10.0"}km
        </div>
        <div>
          <div className="side-list-item-recommendation-box">
            <div className="side-list-item-recommendation">추천수</div>
            <div className="side-list-item-recommendation">{"|"}</div>
            <div className="side-list-item-recommendation">
              {props.tourAttractionsRecommendCount}
            </div>
          </div>
        </div>
        <div className="side-list-item-button-box">
          <div
            className="side-list-item-button start"
            onClick={onStartButtonClickHandler}
          >
            출발
          </div>
          <div
            className="side-list-item-button stopover"
            onClick={onStopoverButtonClickHandler}
          >
            경유
          </div>
          <div
            className="side-list-item-button end"
            onClick={onEndButtonClickHandler}
          >
            도착
          </div>
        </div>
      </div>
    </div>
  );
}

//                    component : 사이드 컴포넌트                     //
function Side() {
  //                    state                     //
  const [searchWord, setSearchWord] = useState<string>("");

  const {
    restCheckStatus,
    tourCheckStatus,
    setRestCheckStatus,
    setTourCheckStatus,
  } = useCheckBoxStore();
  const { tourAttractionsListItem, restaurantListItem } = useTourListStore();

  // const { PlacesSearchResult, Status, Pagination } = kakao.maps;

  //                    function                     //
  const onTourCheckBoxClickHandler = () => {
    setTourCheckStatus(!tourCheckStatus);
  };

  const onRestCheckBoxClickHandler = () => {
    setRestCheckStatus(!restCheckStatus);
  };

  // const placesSearchCB = ( result: PlacesSearchResult, status: Status, pagination: Pagination) => {
  // };

  //                    event handler                     //
  const onSearchWordChangeHanlder = (event: ChangeEvent<HTMLInputElement>) => {
    const searchWord = event.target.value;
    setSearchWord(searchWord);
  };

  const onSaerchButtonClickHandler = () => {
    // 장소 검색 객체를 생성합니다
    const places = new kakao.maps.services.Places();
    // places.keywordSearch(searchWord, placesSearchCB);
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
          />
          <div
            className="main-side-top-search-button"
            onClick={onSaerchButtonClickHandler}
          ></div>
        </div>
      </div>
      <div className="main-side-sort">
        <div className="main-side-check-container">
          <div className="main-side-check-box">
            <input
              type="checkbox"
              onClick={onTourCheckBoxClickHandler}
              checked={tourCheckStatus}
            />
            <div className="main-side-check-label">관광 명소</div>
          </div>
          <div className="main-side-check-box">
            <input
              type="checkbox"
              onClick={onRestCheckBoxClickHandler}
              checked={restCheckStatus}
            />
            <div className="main-side-check-label">음식점</div>
          </div>
        </div>
        <div className="main-side-sort-container">
          <div className="main-side-sort-link active">거리순</div>
          <div className="main-side-sort-divider">{"|"}</div>
          <div className="main-side-sort-link">추천순</div>
        </div>
      </div>
      <div className="main-side-item-container">
        {tourCheckStatus &&
          tourAttractionsListItem.map((item) => (
            <SideListItem key={item.tourAttractionsNumber} {...item} />
          ))}
        {restCheckStatus &&
          restaurantListItem.map((item) => (
            <SideListItem key={item.restaurantNumber} {...item} />
          ))}
      </div>
      <div className="main-side-more-button">더보기</div>
    </div>
  );
}

//                    component : 메인 화면 컴포넌트                     //
export default function Main() {
  //                    state                     //
  // description: 사이드 상태 //
  const [sideOpen, setSideOpen] = useState<boolean>(false);
  // description: 맵 중심 상태 //
  const [mapCenter, setMapCenter] = useState<Position>({
    lat: 37.5664056,
    lng: 126.9778222,
  });

  // description: 알림 창 오픈 여부 리스트 상태 //
  const [openList, setOpenList] = useState<MarkerOpen[]>([]);

  const mapRef = useRef<kakao.maps.Map | null>(null);
  const clusterRef = useRef<kakao.maps.MarkerClusterer | null>(null);
  const [markeres] = useState<kakao.maps.Marker[]>([]);

  const [mouseFlag, setMouseFlag] = useState<boolean>(false);

  const {
    tourAttractionsListItem,
    restaurantListItem,
    setTourAttractionsListItem,
    setRestaurantListItem,
  } = useTourListStore();

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

  const getTourAttractionsListResponse = (
    result: GetTourAttractionsListResponseDto | ResponseDto | null
  ) => {
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

    const { tourAttractionsListItem } =
      result as GetTourAttractionsListResponseDto;
    setTourAttractionsListItem(tourAttractionsListItem);
  };

  const getRestaurantListResponse = (
    result: GetRestaurantListResponseDto | ResponseDto | null
  ) => {
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
    return openList.some(
      (open) =>
        open.type === "restaurant" && open.typeNumber === item.restaurantNumber
    );
  };

  const isTourOpen = (item: TourAttractionsListItem) => {
    return openList.some(
      (open) =>
        open.type === "tour" && open.typeNumber === item.tourAttractionsNumber
    );
  };

  //                    event handler                      //
  // description: 사이드 버튼 클릭 이벤트 처리 함수 //
  const onSideButtonClickHandler = () => {
    setSideOpen(!sideOpen);
  };

  // description: 지도의 중심 좌표가 변경될 때 실행할 콜백 함수 //
  const onCenterChanged = (map: kakao.maps.Map) => {
    // 지도의 중심 좌표를 가져옴
    const newCenter = map.getCenter();
    // 새로운 중심 좌표를 상태로 업데이트
    setMapCenter({ lat: newCenter.getLat(), lng: newCenter.getLng() });
    // 여기서 서버에 새로운 중심 좌표를 전송하고 필요한 작업을 수행할 수 있음
  };

  // description: 마커 오버레이 오픈 처리 이벤트 함수 //
  const onMarkerOverrayOpenHandler = (type: string, typeNumber: number) => {
    const newOpenList = [...openList, { type, typeNumber }];
    setOpenList(newOpenList);
  };

  // description: 마커 오버레이 레스토랑 클로즈 처리 이벤트 함수 //
  const onMarkerOverrayRestaurantCloseHandler = (typeNumber: number) => {
    const newOpenList = openList.filter(
      (item) => !(item.type === "restaurant" && item.typeNumber === typeNumber)
    );
    setOpenList(newOpenList);
  };

  // description: 마커 오버레이 관광명소 클로즈 처리 이벤트 함수 //
  const onMarkerOverrayTourCloseHandler = (typeNumber: number) => {
    const newOpenList = openList.filter(
      (item) => !(item.type === "tour" && item.typeNumber === typeNumber)
    );
    setOpenList(newOpenList);
  };

  const onClusterClick = (
    target: kakao.maps.MarkerClusterer,
    cluster: kakao.maps.Cluster
  ) => {
    const map = mapRef.current;
    if (!map) return;
    map.setLevel(4, { anchor: cluster.getCenter() });
  };

  const onMapMouseDownHandler = () => {
    setMouseFlag(true);
  };

  const onMapMouseUpHandler = () => {
    setMouseFlag(false);
  };

  //                    effect                     //
  useEffect(() => {
    if (mouseFlag) return;
    const { lat, lng } = mapCenter;
    getTourAttractionsListRequest(lat, lng).then(
      getTourAttractionsListResponse
    );
    getRestaurantListRequest(lat, lng).then(getRestaurantListResponse);
  }, [mouseFlag, mapCenter]);

  useEffect(() => {
    if (mouseFlag) return;
    // setMarkers();
  }, [mouseFlag, restaurantListItem, tourAttractionsListItem]);

  //                    render : 메인 화면 컴포넌트                     //
  return (
    <div id="main-wrapper">
      <Map
        ref={mapRef}
        center={mapCenter}
        maxLevel={2}
        minLevel={8}
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
                onClick={() =>
                  onMarkerOverrayOpenHandler("tour", item.tourAttractionsNumber)
                }
              >
                {isTourOpen(item) && (
                  <InfoItem
                    {...item}
                    onClose={onMarkerOverrayTourCloseHandler}
                  />
                )}
              </MapMarker>
            ))}
          {restCheckStatus &&
            restaurantListItem.map((item) => (
              <MapMarker
                position={{ lat: item.restaurantLat, lng: item.restaurantLng }}
                clickable
                image={restaurantIcon}
                onClick={() =>
                  onMarkerOverrayOpenHandler(
                    "restaurant",
                    item.restaurantNumber
                  )
                }
              >
                {isRestaurantOpen(item) && (
                  <InfoItem
                    {...item}
                    onClose={onMarkerOverrayRestaurantCloseHandler}
                  />
                )}
              </MapMarker>
            ))}
            <Polyline
            path={[path]}
            strokeWeight={5}
            strokeColor={"rgba(255, 0, 0, 1)"}
            strokeOpacity={0.7}
            strokeStyle={"solid"}
          />
        </MarkerClusterer>
      </Map>
      <div className="main-side">
        {sideOpen && <Side />}
        <div className="main-side-button" onClick={onSideButtonClickHandler}>
          {sideOpen ? "◀" : "▶"}
        </div>
        <Waypoints />
      </div>
    </div>
  );
}
