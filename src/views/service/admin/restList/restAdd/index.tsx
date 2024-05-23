import React, { ChangeEvent, useState } from 'react'
import './style.css'
import { useCookies } from 'react-cookie'
import { PostRestaurantRequestDto } from 'src/apis/restaurant/dto/request';
import ResponseDto from 'src/apis/response.dto';
import { useNavigate } from 'react-router';
import { ADMINPAGE_REST_LIST_ABSOLUTE_PATH, AUTH_ABSOLUTE_PATH } from 'src/constant';
import { postRestaurantRequest } from 'src/apis/restaurant';

//                  Component                   //
export default function RestAdd() {

    //                  State                   //
    const [cookies] = useCookies();

    const [restaurantName, setRestaurantName] = useState<string>('');
    const [restaurantLocation, setRestaurantLocation] = useState<string>('');
    const [restaurantTelNumber, setRestaurantTelNumber] = useState<string>('');
    const [restaurantHours, setRestaurantHours] = useState<string>('');
    const [restaurantOutline, setRestaurantOutline] = useState<string>('');
    const [restaurantImageUrl, setRestaurantImageUrl] = useState<string>('');
    const [restaurantMainMenu, setRestaurantMainMenu] = useState<string>('');
    const [restaurantServiceMenu, setRestaurantServiceMenu] = useState<string>('');
    const [restaurantLat, setRestaurantLat] = useState<string>('1');
    const [restaurantLng, setRestaurantLng] = useState<string>('1');
    
    //                  Function                    //
    const navigator = useNavigate();

    const changePostElement = () => {
        
    }

    const postRestaurantResponse = (result: ResponseDto | null ) => {
        const message =
            !result ? "서버에 문제가 있습니다.." : 
            result.code === 'VF' ? '데이터 유효성 에러.' : 
            result.code === 'AF' ? '권한이 없습니다.' : 
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message)
            if (result?.code === 'AF') navigator(AUTH_ABSOLUTE_PATH);
            return;
        }

        navigator(ADMINPAGE_REST_LIST_ABSOLUTE_PATH);
    }

    //                  Event Handler                   //
    const onRestaurantNameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const name = event.target.value;
        setRestaurantName(name);
    }

    const onRestaurantLocationChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const location = event.target.value;        
        setRestaurantLocation(location);
    }

    const onRestaurantTelNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const telNumber = event.target.value;
        setRestaurantTelNumber(telNumber);
    }

    const onRestaurantHoursChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const hours = event.target.value;
        setRestaurantHours(hours);
    }

    const onRestaurantOutlineChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const outLine = event.target.value;
        setRestaurantOutline(outLine);
    }

    const onRestaurantImageUrlChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const imageUrl = event.target.value;
        setRestaurantImageUrl(imageUrl);
    }

    const onRestaurantMainMenuChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const mainMenu = event.target.value;
        setRestaurantMainMenu(mainMenu);
    }

    const onRestauranServiceMenuChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const serviceMenu = event.target.value;
        setRestaurantServiceMenu(serviceMenu);
    }

    const onRegisterButtonClickHandler = () =>{
        if (!restaurantName.trim() || !restaurantLocation.trim() || !restaurantTelNumber.trim() || !restaurantHours.trim() || 
        !restaurantOutline.trim() || !restaurantImageUrl.trim() || !restaurantMainMenu.trim() || !restaurantServiceMenu.trim()) return;

        if (!cookies.accessToken) return;

        // const requestBody: PostRestaurantRequestDto = {
        //     restaurantName, restaurantLocation, restaurantTelNumber, restaurantHours, restaurantOutline, 
        //     restaurantImageUrl[...], 
        //     restaurantMainMenu, restaurantServiceMenu, restaurantLat, restaurantLng
        // }

        // postRestaurantRequest(requestBody, cookies.accessToken).then(postRestaurantResponse);
    }

    //                  Render                   //
    return (
        <div id='rest-register-wrapper'>
            <div className='rest-register-top'>
                <div className='rest-register-top-element-box'>
                    <div className='rest-register-top-name'>▣ 음식점 이름</div>
                    <div className='rest-register-name-box rest-register-element'>
                        <input className='rest-register-name-input rest-register-input-element' placeholder='제목을 입력해주세요.'/>
                    </div>
                </div>
                <div className='rest-register-top-element-box'>
                    <div className='rest-register-top-address'>▣ 음식점 주소</div>
                    <div className='rest-register-address-box rest-register-element'>
                        <input className='rest-register-address-input rest-register-input-element' placeholder='제목을 입력해주세요.'/>
                    </div>
                </div>
                <div className='rest-register-top-element-box'>
                    <div className='rest-register-top-tel'>▣ 음식점 연락처</div>
                    <div className='rest-register-tel-box rest-register-element'>
                        <input className='rest-register-tel-input rest-register-input-element' placeholder='제목을 입력해주세요.'/>
                    </div>
                </div>
                <div className='rest-register-top-element-box'>
                    <div className='rest-register-top-hour'>▣ 음식점 영업시간</div>
                    <div className='rest-register-hour-box rest-register-element'>
                        <input className='rest-register-hour-input rest-register-input-element' placeholder='제목을 입력해주세요.'/>
                    </div>
                </div>
                <div className='rest-register-top-element-box'>
                    <div className='rest-register-top-main'>▣ 음식점 메인메뉴</div>
                    <div className='rest-register-main-box rest-register-element'>
                        <input className='rest-register-main-input rest-register-input-element' placeholder='제목을 입력해주세요.'/>
                    </div>
                </div>
                <div className='rest-register-top-element-box'>
                    <div className='rest-register-top-service'>▣ 음식점 취급메뉴</div>
                    <div className='rest-register-service-box rest-register-element'>
                        <input className='rest-register-service-input rest-register-input-element' placeholder='제목을 입력해주세요.'/>
                    </div>
                </div>
                <div className='rest-register-top-element-box'>
                    <div className='rest-register-top-outline'>▣ 음식점 개요</div>
                    <div className='rest-register-name-box rest-register-element'>
                        <textarea className='rest-register-outline-textarea' placeholder='내용을 입력해주세요. / 1000자' maxLength={1000} />
                    </div>
                </div>
                <div className='rest-register-top-element-box'>
                    <div className='rest-register-top-image'>▣ 음식점 사진</div>
                    <div className='rest-register-image-box rest-register-element'>
                        <input className='rest-register-image-input rest-register-input-element' placeholder='제목을 입력해주세요.'/>
                    </div>
                </div>
            </div>
            <div className='rest-register-bottom'>
                <div className='primary-button'>등록</div>
            </div>
        </div>
    )
}
