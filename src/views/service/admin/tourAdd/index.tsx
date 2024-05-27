import React, { ChangeEvent, useState } from 'react'
import './style.css'
import { useNavigate } from 'react-router';
import { AUTH_ABSOLUTE_PATH, IMAGE_UPLOAD_URL } from 'src/constant';
import ResponseDto from 'src/apis/response.dto';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { PostTourAttractionsRequestDto } from 'src/apis/tour_attraction/dto/request';

//                  Component                   //
export default function TourAdd() {

    
    //                  State                   //
    const [cookies] = useCookies();

    const [tourAttractionsImage, setTourAtrracntionImage] = useState<File[]>([]);
    const [tourAttractionsImageUrl, setTourAttractionsImageUrl] = useState<string[]>([]);

    const [tourAttractionsName, setTourAttractionsName] = useState<string>('');
    const [tourAttractionsLocation, settourAtrractionLocation] = useState<string>('');
    const [tourAttractionsTelNumber, setTourAttractionsTelNumber] = useState<string>('');
    const [tourAttractionsHours, setTourAttractionsHours] = useState<string>('');
    const [tourAttractionsOutline, setTourAttractionsOutline] = useState<string>('');
    const [tourAtrracntionLat, settourAtrracntionLat] = useState<string>('');
    const [tourAtrracntionLng, settourAtrracntionLng] = useState<string>('');
    
    //                  Function                    //
    const navigator = useNavigate();

    const postTourAttractionResponse = (result: ResponseDto | null ) => {
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
    const ontourAtrracntionNameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const name = event.target.value;
        setTourAttractionsName(name);
    }

    const ontourAtrracntionLocationChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const location = event.target.value;        
        settourAtrractionLocation(location);
    }

    const ontourAtrracntionTelNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const telNumber = event.target.value;
        setTourAttractionsTelNumber(telNumber);
    }

    const ontourAtrracntionHoursChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const hours = event.target.value;
        setTourAttractionsHours(hours);
    }

    const ontourAtrracntionOutlineChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const outLine = event.target.value;
        setTourAttractionsOutline(outLine);
    }

    const onTourAttractionImgFileChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || !event.target.files.length) return;
        const file = event.target.files[0];
        setTourAtrracntionImage([...tourAttractionsImage, file]);
        const url = URL.createObjectURL(file);
        setTourAttractionsImageUrl([...tourAttractionsImageUrl, url]);
    }

    // const onRegisterButtonClickHandler = async () =>{
    //     if (!tourAttractionsName.trim() || !tourAttractionsLocation.trim() || !tourAttractionsHours.trim() || !tourAttractionsTelNumber.trim() || 
    //     !tourAttractionsOutline.trim()) return;

    //     if (!cookies.accessToken) return;

    //     for (const image of tourAttractionsImage) {
    //         const data = new FormData();
    //         data.append('file', image);
    //         const url = await axios.post(IMAGE_UPLOAD_URL, data, { headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${cookies.accessToken}` } })
    //             .then(response => response.data as string)
    //             .catch(error => null);
            
    //         if (!url) continue;
    //         console.log(url);
    //         tourAttractionsImageUrl.push(url);
    //     }

    //     settourAtrracntionLat("1");
    //     settourAtrracntionLng("1");

    //     const requestBody: PostTourAttractionsRequestDto = {
    //         tourAttractionsName, tourAttractionsLocation, tourAttractionsTelNumber, tourAttractionsHours, tourAttractionsOutline, 
    //         tourAtrracntionImageUrl, tourAtrracntionLat, tourAtrracntionLng
    //     }

    //     posttourAtrracntionRequest(requestBody, cookies.accessToken).then(posttourAtrracntionResponse);

    //     navigator(ADMINPAGE_REST_LIST_ABSOLUTE_PATH);
    // }

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
                        <input className='tour-register-image-input tour-register-input-element' type='file' multiple placeholder='제목을 입력해주세요.'/>
                    </div>
                </div>
            </div>
            <div className='tour-register-bottom'>
                <div className='primary-button'>등록</div>
            </div>
        </div>
    )
}
