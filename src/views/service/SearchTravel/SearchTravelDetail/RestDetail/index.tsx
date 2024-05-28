import React, { useEffect, useState } from 'react'
import './style.css';
import { getRestaurantRequest } from 'src/apis/restaurant';
import ResponseDto from 'src/apis/response.dto';
import { GetRestaurantResponseDto } from 'src/apis/restaurant/dto/response';
import { useNavigate, useParams } from 'react-router';
import { AUTH_ABSOLUTE_PATH } from 'src/constant';

//                    Component : Qna 화면 컴포넌트                     //
export default function RestDetail() {

    //                    State : Qna 화면 컴포넌트                     //
    const { restaurantNumber } = useParams();

    const [restaurantImageUrl, setRestaurantImageUrl] = useState<string[]>([]);
    const [restaurantName, setRestaurantName] = useState<string>('');
    const [restaurantLocation, setRestaurantLocation] = useState<string>('');
    const [restaurantTelNumber, setRestaurantTelNumber] = useState<string>('');
    const [restaurantHours, setRestaurantHours] = useState<string>('');
    const [restaurantOutline, setRestaurantOutline] = useState<string>('');
    const [restaurantMainMenu, setRestaurantMainMenu] = useState<string>('');
    const [restaurantServiceMenu, setrestaurantServiceMenu] = useState<string>('');

    

    //                    Function : Qna 화면 컴포넌트                     //
    const navigator = useNavigate();

    //                    Event Handler : Qna 화면 컴포넌트                     //
    const getRestaurantResponse = (result: GetRestaurantResponseDto | ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'ND' ? '리스트가 존재하지 않습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if(!result || result.code !== 'SU') {
            alert(message);
            if(result?.code === 'AF') navigator(AUTH_ABSOLUTE_PATH);
            return result;
        }

        const { restaurantImageUrl, restaurantName, restaurantLocation, restaurantTelNumber, restaurantHours, restaurantOutline, restaurantMainMenu, restaurantServiceMenu } = result as GetRestaurantResponseDto;
        setRestaurantImageUrl(restaurantImageUrl);
        setRestaurantName(restaurantName);
        setRestaurantLocation(restaurantLocation);
        setRestaurantTelNumber(restaurantTelNumber);
        setRestaurantHours(restaurantHours);
        setRestaurantOutline(restaurantOutline);
        setRestaurantMainMenu(restaurantMainMenu);
        setrestaurantServiceMenu(restaurantServiceMenu);
    };

    //                    Effect : Qna 화면 컴포넌트                     //
    useEffect(() => {
        if(!restaurantNumber) return;
        getRestaurantRequest(restaurantNumber).then(getRestaurantResponse);
    }, [])

    //                    Render : Qna 화면 컴포넌트                     //
    return (
        <div id='travel-detail-wrapper'>
            <div className='travel-detail-image-table'>
            <div>
                    <img title='travel' width='300px' src={`${restaurantImageUrl[0]}`}/>
                </div>
                <div className='travel-detail-image-list'>
                    <div className='travel-image-list-left'></div>
                    {restaurantImageUrl.map(url => (
                        <div className='travel-lmage-list' key={url} style={{
                            backgroundImage: `url(${url})`,
                            width: '150px',
                            height: '100px',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}></div>
                    ))}
                    <div className='travel-image-list-right'></div>
                </div>
            </div>
            <div className='travel-detail-table'>
                <div className='travel-name'>
                    <div className='travel-title'>이름</div>
                    <div className='travel-detail-info-devider'>{'\|'}</div>
                    <div className='travel-detail-info'>{restaurantName}</div>
                </div>
                <div className='travel-telNumber'>
                    <div className='travel-title'>연락처</div>
                    <div className='travel-detail-info-devider'>{'\|'}</div>
                    <div className='travel-detail-info'>{restaurantTelNumber}</div>
                </div>
                <div className='travel-location'>
                    <div className='travel-title'>지역</div>
                    <div className='travel-detail-info-devider'>{'\|'}</div>
                    <div className='travel-detail-info'>{restaurantLocation}</div>
                </div>
                <div className='travel-hours'>
                    <div className='travel-title'>운영시간</div>
                    <div className='travel-detail-info-devider'>{'\|'}</div>
                    <div className='travel-detail-info'>{restaurantHours}</div>
                </div>
                <div className='travel-main-menu'>
                    <div className='travel-title'>대표메뉴</div>
                    <div className='travel-detail-info-devider'>{'\|'}</div>
                    <div className='travel-detail-info'>{restaurantMainMenu}</div>
                </div>
                <div className='travel-service-menu'>
                    <div className='travel-title'>취급메뉴</div>
                    <div className='travel-detail-info-devider'>{'\|'}</div>
                    <div className='travel-detail-info'>{restaurantServiceMenu}</div>
                </div>
                <div className='travel-list-table-outline'>
                    <div className='travel-outline-text'>
                        <div className='travel-title'>개요</div>
                        <div className='travel-detail-info'>{restaurantOutline}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}