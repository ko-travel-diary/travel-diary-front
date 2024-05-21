import React, { useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';
import './style.css';

  //                    component : 사이드 컴포넌트                     //
function Side () {

  //                    render : 사이드 컴포넌트                     //
  return (
    <div className='main-side-container'>
      <div className='main-side-top'>
        <div className='main-side-top-title-box'>
          <div className='main-side-top-title'>지도</div>
          <div className='main-side-top-title-divider'></div>
          <div className='main-side-top-title'>길찾기</div>
        </div>
        <div className='main-side-top-search-box'>
          <input className='main-side-top-search-input' />
          <div className='main-side-top-search-button'></div>
        </div>
      </div>
      <div></div>
      <div></div>
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
