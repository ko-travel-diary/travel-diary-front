import React, { MouseEvent, useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';
import './style.css';

//                    component : 사이드 리스트 컴포넌트                     //
function SideListItem () {

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

  //                    render : 사이드 컴포넌트                     //
  return (
    <div className='side-list-item' onClick={onItemClickHandler}>
      <div className='side-list-item-image' style={{ backgroundImage: `url(https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Seoul_City_Hall_01.jpg/290px-Seoul_City_Hall_01.jpg)` }}></div>
      <div className='side-list-item-info-box'>
        <div className='side-list-item-info-title-box'>
          <div className='side-list-item-info-title'>서울 도서관</div>
          <div className='side-list-item-info-type'>관광 명소</div>
        </div>
        <div className='side-list-item-info-location'>내 위치로 부터 {'10.0'}km</div>
        <div>
          <div className='side-list-item-recommendation-box'>
            <div className='side-list-item-recommendation'>추천수</div>
            <div className='side-list-item-recommendation'>{'\|'}</div>
            <div className='side-list-item-recommendation'>0</div>
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
          <input className='main-side-top-search-input' />
          <div className='main-side-top-search-button'></div>
        </div>
      </div>
      <div className='main-side-sort'>
        <div className='main-side-check-container'>
          <div className='main-side-check-box'>
            <input type='checkbox' />
            <div className='main-side-check-label'>관광 명소</div>
          </div>
          <div className='main-side-check-box'>
            <input type='checkbox' />
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
        <SideListItem />
        <SideListItem />
        <SideListItem />
        <SideListItem />
        <SideListItem />
        <SideListItem />
        <SideListItem />
        <SideListItem />
        <SideListItem />
        <SideListItem />
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

  //                    event handler                      //
  // description: 사이드 버튼 클릭 이벤트 처리 함수 //
  const onSideButtonClickHandler = () => {
    setSideOpen(!sideOpen);
  }

  //                    render : 메인 화면 컴포넌트                     //
  return (
    <div id="main-wrapper">
        <Map center={{ lat: 37.5664056, lng: 126.9778222 }} style={{ width: "100%", height: "calc(100vh - 64px)" }}>
            
        </Map>
        <div className='main-side'>
          {sideOpen && <Side />}
          <div className='main-side-button' onClick={onSideButtonClickHandler}>{sideOpen ? '◀' : '▶'}</div>
        </div>
    </div>
  )
}
