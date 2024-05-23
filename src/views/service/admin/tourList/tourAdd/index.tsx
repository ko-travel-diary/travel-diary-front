import React from 'react'
import './style.css'

//                  Component                   //
export default function TourAdd() {

    //                  Render                   //
    return (
        <div id='tour-register-wrapper'>
            <div className='tour-register-top'>
                <div className='tour-register-top-element-box'>
                    <div className='tour-register-top-name'>▣  이름</div>
                    <div className='tour-register-name-box tour-register-element'>
                        <input className='tour-register-name-input tour-register-input-element' placeholder='제목을 입력해주세요.'/>
                    </div>
                </div>
                <div className='tour-register-top-element-box'>
                    <div className='tour-register-top-address'>▣ 관광지 주소</div>
                    <div className='tour-register-address-box tour-register-element'>
                        <input className='tour-register-address-input tour-register-input-element' placeholder='제목을 입력해주세요.'/>
                    </div>
                </div>
                <div className='tour-register-top-element-box'>
                    <div className='tour-register-top-tel'>▣ 관광지 연락처</div>
                    <div className='tour-register-tel-box tour-register-element'>
                        <input className='tour-register-tel-input tour-register-input-element' placeholder='제목을 입력해주세요.'/>
                    </div>
                </div>
                <div className='tour-register-top-element-box'>
                    <div className='tour-register-top-hour'>▣ 관광지 영업시간</div>
                    <div className='tour-register-hour-box tour-register-element'>
                        <input className='tour-register-hour-input tour-register-input-element' placeholder='제목을 입력해주세요.'/>
                    </div>
                </div>
                <div className='tour-register-top-element-box'>
                    <div className='tour-register-top-outline'>▣ 관광지 개요</div>
                    <div className='tour-register-name-box tour-register-element'>
                        <textarea className='tour-register-outline-textarea' placeholder='내용을 입력해주세요. / 1000자' maxLength={1000} />
                    </div>
                </div>
                <div className='tour-register-top-element-box'>
                    <div className='tour-register-top-image'>▣ 관광지 사진</div>
                    <div className='tour-register-image-box tour-register-element'>
                        <input className='tour-register-image-input tour-register-input-element' placeholder='제목을 입력해주세요.'/>
                    </div>
                </div>
            </div>
            <div className='tour-register-bottom'>
                <div className='primary-button'>등록</div>
            </div>
        </div>
    )
}
