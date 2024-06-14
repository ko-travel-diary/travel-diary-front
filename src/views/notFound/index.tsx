import React from 'react'
import "./style.css";

export default function NotFound() {
    return (
        <div id='not-found-wrapper'>           
            <div className='not-found-404'></div>
            <h1 className='not-found-title'>찾을 수 없는 페이지 입니다!</h1>
            <div className='not-found-text'>
                페이지가 존재하지 않거나 사용할 수 없는 페이지 입니다.<br/>
                입력하신 주소가 정확한지 다시 한 번 확인해주세요.
            </div>
        </div>
    )
}
