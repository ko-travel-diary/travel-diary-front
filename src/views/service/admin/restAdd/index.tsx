import React, { ChangeEvent, useEffect, useState } from 'react'
import './style.css'
import { useCookies } from 'react-cookie'
import { PostRestaurantRequestDto } from 'src/apis/restaurant/dto/request';
import ResponseDto from 'src/apis/response.dto';
import { useNavigate } from 'react-router';
import { ADDRESS_URL, ADMINPAGE_REST_LIST_ABSOLUTE_PATH, AUTH_ABSOLUTE_PATH, IMAGE_UPLOAD_URL } from 'src/constant';
import { postRestaurantRequest } from 'src/apis/restaurant';
import axios from 'axios';
import { useUserStore } from 'src/stores';


//                  Component                   //
export default function RestAdd() {

    //                  State                   //
    const { loginUserRole } = useUserStore();
    const [cookies] = useCookies();

    const [restaurantImage, setRestaurantImage] = useState<File[]>([]);
    const [restaurantImageUrl, setRestaurantImageUrl] = useState<string[]>([]);

    const [restaurantName, setRestaurantName] = useState<string>('');
    const [restaurantLocation, setRestaurantLocation] = useState<string>('');
    const [restaurantTelNumber, setRestaurantTelNumber] = useState<string>('');
    const [restaurantHours, setRestaurantHours] = useState<string>('');
    const [restaurantOutline, setRestaurantOutline] = useState<string>('');
    const [restaurantMainMenu, setRestaurantMainMenu] = useState<string>('');
    const [restaurantServiceMenu, setRestaurantServiceMenu] = useState<string>('');
    const [restaurantLat, setRestaurantLat] = useState<number>(0.0);
    const [restaurantLng, setRestaurantLng] = useState<number>(0.0);

    const [filename, setFilename] = useState<string[]>([]);
    
    //                  Function                    //
    const navigator = useNavigate();

    const postRestaurantResponse = (result: ResponseDto | null ) => {
        const message =
            !result ? "서버에 문제가 있습니다." : 
            result.code === 'VF' ? '데이터 유효성 에러.' : 
            result.code === 'AF' ? '권한이 없습니다.' : 
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message)
            if (result?.code === 'AF') navigator(AUTH_ABSOLUTE_PATH);
            return;
        }

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

    const onRestaurantOutlineChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const outLine = event.target.value;
        setRestaurantOutline(outLine);
    }

    const onRestaurantImgFileChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || !event.target.files.length) return;
        const file = event.target.files[0];
        setRestaurantImage([...restaurantImage, file]);
        const url = URL.createObjectURL(file);
        setRestaurantImageUrl([...restaurantImageUrl, url]);

    }

    const onRestaurantMainMenuChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const mainMenu = event.target.value;
        setRestaurantMainMenu(mainMenu);
    }

    const onRestauranServiceMenuChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const serviceMenu = event.target.value;
        setRestaurantServiceMenu(serviceMenu);
    }

    const onRegisterButtonClickHandler = async () =>{
        if (!restaurantName.trim() || !restaurantLocation.trim() || !restaurantTelNumber.trim() || !restaurantHours.trim() || 
        !restaurantOutline.trim() || !restaurantMainMenu.trim() || !restaurantServiceMenu.trim()) return;

        if (!cookies.accessToken) return;
        
        for (const image of restaurantImage) {
            const data = new FormData();
            // data.append('file', image);
            data.append('originalFileName', image.name);
            const url = await axios.post(IMAGE_UPLOAD_URL, data, { headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${cookies.accessToken}` } })
                .then(response => response.data as string)
                .catch(error => null);
            
            if (!url) continue;
            console.log(url);
            restaurantImageUrl.push(url);
        }

        const query = restaurantLocation;
        const data = await axios.get(ADDRESS_URL, {params: {query}})
            .then(response => response.data)
            .catch(error => null)

        if (!data) {
            alert("주소를 정확히 입력해주세요.");
            return;
        }

        const restaurantLat = data.documents[0].y as number;
        const restaurantLng = data.documents[0].x as number;


        const requestBody: PostRestaurantRequestDto = {
            restaurantName, restaurantLocation, restaurantTelNumber, restaurantHours, restaurantOutline, 
            restaurantImageUrl,
            restaurantMainMenu, restaurantServiceMenu, restaurantLat, restaurantLng
        }

        postRestaurantRequest(requestBody, cookies.accessToken).then(postRestaurantResponse);

        navigator(ADMINPAGE_REST_LIST_ABSOLUTE_PATH);
    }

    //                  Effect                  //
    useEffect(() => {
        if (loginUserRole === 'ROLE_USER') {
            navigator(AUTH_ABSOLUTE_PATH);
            return;
        }
        
    }, [])

    //                  Render                   //
    return (
        <div id='rest-register-wrapper'>
            <div className='rest-register-top'>
                <div className='rest-register-top-element-box'>
                    <div className='rest-register-top-title'>▣ 음식점 이름</div>
                    <div className='rest-register-element'>
                        <input className='rest-register-input-element' placeholder='이름을 입력해주세요.' onChange={onRestaurantNameChangeHandler}/>
                    </div>
                </div>
                <div className='rest-register-top-element-box'>
                    <div className='rest-register-top-title'>▣ 음식점 주소</div>
                    <div className='rest-register-element'>
                        <input className='rest-register-input-element' placeholder='주소를 입력해주세요.' onChange={onRestaurantLocationChangeHandler}/>
                    </div>
                </div>
                <div className='rest-register-top-element-box'>
                    <div className='rest-register-top-title'>▣ 음식점 연락처</div>
                    <div className='rest-register-element'>
                        <input className='rest-register-input-element' placeholder='연락처를 입력해주세요.' onChange={onRestaurantTelNumberChangeHandler}/>
                    </div>
                </div>
                <div className='rest-register-top-element-box'>
                    <div className='rest-register-top-title'>▣ 음식점 영업시간</div>
                    <div className='rest-register-element'>
                        <input className='rest-register-input-element' placeholder='영업시간 입력해주세요.' onChange={onRestaurantHoursChangeHandler}/>
                    </div>
                </div>
                <div className='rest-register-top-element-box'>
                    <div className='rest-register-top-title'>▣ 음식점 메인메뉴</div>
                    <div className='rest-register-element'>
                        <input className='rest-register-input-element' placeholder='메인메뉴를 입력해주세요.' onChange={onRestaurantMainMenuChangeHandler}/>
                    </div>
                </div>
                <div className='rest-register-top-element-box'>
                    <div className='rest-register-top-title'>▣ 음식점 취급메뉴</div>
                    <div className='rest-register-element'>
                        <input className='rest-register-input-element' placeholder='제목을 입력해주세요.' onChange={onRestauranServiceMenuChangeHandler}/>
                    </div>
                </div>
                <div className='rest-register-top-element-box'>
                    <div className='rest-register-top-title'>▣ 음식점 개요</div>
                    <div className='rest-register-element'>
                        <textarea className='rest-register-textarea-element' placeholder='내용을 입력해주세요. / 1000자' maxLength={1000} onChange={onRestaurantOutlineChangeHandler} />
                    </div>
                </div>
                <div className='rest-register-top-element-box'>
                    <div className='rest-register-top-title'>▣ 음식점 사진</div>
                    <div className='rest-register-element'>
                        <input className='rest-register-input-element' type='file' multiple onChange={onRestaurantImgFileChangeHandler}/>          
                    </div>
                    <div className='photo-view-element'>
                        <div className='photo-view'>
                            {restaurantImageUrl.map((url) => (
                            <div
                                className="photo-view-content"
                                key={url}
                                style={{
                                    backgroundImage: `url(${url})`,
                                    width: "150px",
                                    height: "200px",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            ></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className='rest-register-bottom'>
                <div className='primary-button' onClick={onRegisterButtonClickHandler}>등록</div>
            </div>
        </div>
    )
}
