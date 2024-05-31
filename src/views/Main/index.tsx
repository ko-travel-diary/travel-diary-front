import React, { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';
import './style.css';
import { getTourAttractionsListRequest } from 'src/apis/tour_attraction';
import { getRestaurantListRequest } from 'src/apis/restaurant';
import { GetTourAttractionsListResponseDto } from 'src/apis/tour_attraction/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { AUTH_ABSOLUTE_PATH } from 'src/constant';
import { RestaurantListItem, TourAttractionsListItem } from 'src/types';
import { useNavigate } from 'react-router';
import { GetRestaurantListResponseDto } from 'src/apis/restaurant/dto/response';
import { useCheckBoxStore } from 'src/stores/useCheckBoxStores';
import { useTourListStore } from 'src/stores/useTourListStore';

//                    component : 사이드 리스트 컴포넌트                     //
function SideListItem (props: RestaurantListItem | TourAttractionsListItem) {

  //                    event handler                     //
  const onItemClickHandler = () => {
    
  }

  const onStartButtonClickHandler = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const onStopoverButtonClickHandler = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const onEndButtonClickHandler = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  if ('restaurantNumber' in props) 
  return (
    <div className='side-list-item' onClick={onItemClickHandler}>
      <div className='side-list-item-image' style={{ backgroundImage: `url(${props.restaurantImageUrl})` }}></div>
      <div className='side-list-item-info-box'>
        <div className='side-list-item-info-title-box'>
          <div className='side-list-item-info-title'>{props.restaurantName}</div>
          <div className='side-list-item-info-type'>음식점</div>
        </div>
        <div className='side-list-item-info-location'>내 위치로 부터 {'10.0'}km</div>
        <div>
          <div className='side-list-item-recommendation-box'>
            <div className='side-list-item-recommendation'>추천수</div>
            <div className='side-list-item-recommendation'>{'\|'}</div>
            <div className='side-list-item-recommendation'>{props.restaurantRecommendCount}</div>
          </div>
        </div>
        <div className='side-list-item-button-box'>
          <div className='side-list-item-button start' onClick={onStartButtonClickHandler}>출발</div>
          <div className='side-list-item-button stopover' onClick={onStopoverButtonClickHandler}>경유</div>
          <div className='side-list-item-button end' onClick={onEndButtonClickHandler}>도착</div>
        </div>
      </div>
    </div>
  )

  //                    render : 사이드 컴포넌트                     //
  return (
    <div className='side-list-item' onClick={onItemClickHandler}>
      <div className='side-list-item-image' style={{ backgroundImage: `url(${props.tourAttractionsImageUrl})` }}></div>
      <div className='side-list-item-info-box'>
        <div className='side-list-item-info-title-box'>
          <div className='side-list-item-info-title'>{props.tourAttractionsName}</div>
          <div className='side-list-item-info-type'>관광 명소</div>
        </div>
        <div className='side-list-item-info-location'>내 위치로 부터 {'10.0'}km</div>
        <div>
          <div className='side-list-item-recommendation-box'>
            <div className='side-list-item-recommendation'>추천수</div>
            <div className='side-list-item-recommendation'>{'\|'}</div>
            <div className='side-list-item-recommendation'>{props.tourAttractionsRecommendCount}</div>
          </div>
        </div>
        <div className='side-list-item-button-box'>
          <div className='side-list-item-button start' onClick={onStartButtonClickHandler}>출발</div>
          <div className='side-list-item-button stopover' onClick={onStopoverButtonClickHandler}>경유</div>
          <div className='side-list-item-button end' onClick={onEndButtonClickHandler}>도착</div>
        </div>
      </div>
    </div>
  )

}

//                    component : 사이드 컴포넌트                     //
function Side () {
  //                    state                     //
  const [searchWord, setSearchWord] = useState<string>('');

  const {restCheckStatus, tourCheckStatus, setRestCheckStatus, setTourCheckStatus} = useCheckBoxStore();
  const {tourAttractionsListItem, restaurantListItem} = useTourListStore();

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
    <div className='main-side-container'>
      <div className='main-side-top'>
        <div className='main-side-top-title-box'>
          <div className='main-side-top-title'>지도</div>
          <div className='main-side-top-title-divider'>{'\|'}</div>
          <div className='main-side-top-title'>길찾기</div>
        </div>
        <div className='main-side-top-search-box'>
          <input className='main-side-top-search-input' value={searchWord} onChange={onSearchWordChangeHanlder}/>
          <div className='main-side-top-search-button' onClick={onSaerchButtonClickHandler}></div>
        </div>
      </div>
      <div className='main-side-sort'>
        <div className='main-side-check-container'>
          <div className='main-side-check-box'>
            <input type='checkbox' onClick={onTourCheckBoxClickHandler} checked={tourCheckStatus}/>
            <div className='main-side-check-label' >관광 명소</div>
          </div>
          <div className='main-side-check-box'>
            <input type='checkbox' onClick={onRestCheckBoxClickHandler} checked={restCheckStatus}/>
            <div className='main-side-check-label'>음식점</div>
          </div>
        </div>
        <div className='main-side-sort-container'>
          <div className='main-side-sort-link active'>거리순</div>
          <div className='main-side-sort-divider'>{'\|'}</div>
          <div className='main-side-sort-link'>추천순</div>
        </div>
      </div>
      <div className='main-side-item-container'>
        {tourCheckStatus && tourAttractionsListItem.map(item => <SideListItem key={item.tourAttractionsNumber} {...item} />)}
        {restCheckStatus && restaurantListItem.map(item => <SideListItem key={item.restaurantNumber} {...item} />)} 
      </div>
      <div className='main-side-more-button'>더보기</div>
    </div>
  );
}

  //                    component : 메인 화면 컴포넌트                     //
export default function Main() {

  //                    state                     //
  // description: 사이드 상태 //
  const [sideOpen, setSideOpen] = useState<boolean>(false);
  // description: 맵 중심 상태 //
  const [mapCenter, setMapCenter] = useState<{lat: number, lng: number}>({ lat: 37.5664056, lng: 126.9778222 });

  const mapRef = useRef<kakao.maps.Map | null>(null); 
  const clusterRef = useRef<kakao.maps.MarkerClusterer | null>(null); 
  const [markeres] = useState<kakao.maps.Marker[]>([]);

  const [mouseFlag, setMouseFlag] = useState<boolean>(false);

  const {tourAttractionsListItem, restaurantListItem, setTourAttractionsListItem, setRestaurantListItem} = useTourListStore();

  
  const {restCheckStatus, tourCheckStatus} = useCheckBoxStore();

  //                     function                     //
  const navigator = useNavigate();

  const setTourMarker = (lat: number, lng: number) => {
    
    const map = mapRef.current;
    if (!map) return;
    const latLng = new kakao.maps.LatLng(lat, lng);
    const marker = new kakao.maps.Marker({ position: latLng });

    // 마커를 클릭했을 때 마커 위에 표시할 인포윈도우를 생성합니다
    const iwContent = '<div style="padding:5px;">Hello World!</div>', iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

    // 인포윈도우를 생성합니다
    const infowindow = new kakao.maps.InfoWindow({
    content : iwContent,
    removable : iwRemoveable
    });

    // 마커에 클릭이벤트를 등록합니다
    kakao.maps.event.addListener(marker, 'click', function() {
      // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
        infowindow.open(map, marker);
    });
    
    marker.setMap(map);
    return marker;
  };

  const getTourAttractionsListResponse = (result: GetTourAttractionsListResponseDto | ResponseDto | null) => {
    const message =
      !result ? '서버에 문제가 있습니다.' :
      result.code === 'AF' ? '인증에 실패했습니다.' :
      result.code === 'DBE' ? '서버에 문제가 있습니다.' : "";

    if(!result || result.code !== 'SU') {
        alert(message);
        if(result?.code === 'AF') navigator(AUTH_ABSOLUTE_PATH);
        return result;
    }

    const { tourAttractionsListItem } = result as GetTourAttractionsListResponseDto;
    setTourAttractionsListItem(tourAttractionsListItem);
  };

  const getRestaurantListResponse = (result: GetRestaurantListResponseDto | ResponseDto | null) => {
    const message =
      !result ? '서버에 문제가 있습니다.' :
      result.code === 'AF' ? '인증에 실패했습니다.' :
      result.code === 'DBE' ? '서버에 문제가 있습니다.' : "";

    if(!result || result.code !== 'SU') {
        alert(message);
        if(result?.code === 'AF') navigator(AUTH_ABSOLUTE_PATH);
        return result;
    }

    const { restaurantListItem } = result as GetRestaurantListResponseDto;
    setRestaurantListItem(restaurantListItem);
  };

  const removeMarkers = () => {
    // 모든 마커를 지도에서 제거
    for (const marker of markeres) {
      marker.setMap(null);
    }
  };

  const setMarkers = () => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    removeMarkers();

    if(tourCheckStatus){
      for (const item of tourAttractionsListItem) {
        const lat = item.tourAttractionsLat, lng = item.tourAttractionsLng;
        const marker = setTourMarker(lat, lng);
      if (marker) markeres.push(marker);
      }
    }

    if(restCheckStatus){
      for (const item of restaurantListItem) {
        const lat = item.restaurantLat;
        const lng = item.restaurantLng;
        const marker = setTourMarker(lat, lng);
      if (marker) markeres.push(marker);
      }
    }

    // const clusterer = new kakao.maps.MarkerClusterer({
    //   map, // 마커들을 클러스터로 관리하고 표시할 지도 객체 
    //   averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정 
    //   minLevel: 4 // 클러스터 할 최소 지도 레벨 
    // });

    // clusterer.addMarkers(markeres);

    
  }



  //                    event handler                      //
  // description: 사이드 버튼 클릭 이벤트 처리 함수 //
  const onSideButtonClickHandler = () => {
    setSideOpen(!sideOpen);
  }
  
  // description: 지도의 중심 좌표가 변경될 때 실행할 콜백 함수 //
  const onCenterChanged = (map: kakao.maps.Map) => {
    // 지도의 중심 좌표를 가져옴
    const newCenter = map.getCenter();
    // 새로운 중심 좌표를 상태로 업데이트
    setMapCenter({ lat: newCenter.getLat(), lng: newCenter.getLng() });
    // 여기서 서버에 새로운 중심 좌표를 전송하고 필요한 작업을 수행할 수 있음
  };

  const onMapMouseDownHandler = () => {
    setMouseFlag(true);
  }
  
  const onMapMouseUpHandler = () => {
    setMouseFlag(false);
  }

  //                    effect                     //
  useEffect(() => {
    if (mouseFlag) return;
    const { lat, lng } = mapCenter;
    getTourAttractionsListRequest(lat, lng).then(getTourAttractionsListResponse);
    getRestaurantListRequest(lat, lng).then(getRestaurantListResponse);
  }, [mouseFlag, mapCenter])

  useEffect(() => {
    if (mouseFlag) return;
    setMarkers();
  }, [mouseFlag, restaurantListItem, tourAttractionsListItem]);

  //                    render : 메인 화면 컴포넌트                     //
  return (
    <div id="main-wrapper">
        <Map ref={mapRef} center={mapCenter} maxLevel={2} minLevel={5} style={{ width: "100%", height: "calc(100vh - 64px)" }} onCenterChanged={onCenterChanged} onMouseDown={onMapMouseDownHandler} onMouseUp={onMapMouseUpHandler}> 
        {/*onCenterChanged={onCenterChanged}*/}
            
        </Map>
        <div className='main-side'>
          {sideOpen && <Side />}
          <div className='main-side-button' onClick={onSideButtonClickHandler}>{sideOpen ? '◀' : '▶'}</div>
        </div>
    </div>
  )
}
