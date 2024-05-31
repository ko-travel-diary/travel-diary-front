import React, { ChangeEvent, useEffect, useState } from 'react'
import './style.css'
import { useCookies } from 'react-cookie'
import { PatchRestaurantRequestDto } from 'src/apis/restaurant/dto/request';
import ResponseDto from 'src/apis/response.dto';
import { useNavigate, useParams } from 'react-router';
import { ADMINPAGE_REST_LIST_ABSOLUTE_PATH, ADMINPAGE_TOUR_LIST_ABSOLUTE_PATH, AUTH_ABSOLUTE_PATH, IMAGE_UPLOAD_URL } from 'src/constant';
import { deleteRestaurantRequest, getRestaurantRequest, patchRestaurantRequest } from 'src/apis/restaurant';
import axios from 'axios';
import { GetRestaurantResponseDto } from 'src/apis/restaurant/dto/response';
import { useUserStore } from 'src/stores';
import { GetTourAttractionsResponseDto } from 'src/apis/tour_attraction/dto/response';
import { PatchTourAttractionsRequestDto } from 'src/apis/tour_attraction/dto/request';
import { deleteTourAttractionsRequest, getTourAttractionsRequest, patchTourAttractionsRequest } from 'src/apis/tour_attraction';

//                  Component                   //
export default function TourControl() {

    //                  State                   //
    const {tourAttractionsNumber} = useParams();
    const {loginUserRole} = useUserStore();

    const [cookies] = useCookies();

    const [tourAttractionsImage, setTourAtrracntionImage] = useState<File[]>([]);
    const [tourAttractionsImageUrl, setTourAttractionsImageUrl] = useState<string[]>([]);

    const [tourAttractionsName, setTourAttractionsName] = useState<string>('');
    const [tourAttractionsLocation, setTourAtrractionLocation] = useState<string>('');
    const [tourAttractionsTelNumber, setTourAttractionsTelNumber] = useState<string>('');
    const [tourAttractionsHours, setTourAttractionsHours] = useState<string>('');
    const [tourAttractionsOutline, setTourAttractionsOutline] = useState<string>('');
    
    //                  Function                    //
    const navigator = useNavigate();

    const getTourAttractionResponse = (result: GetTourAttractionsResponseDto | ResponseDto | null) => {
        const message =
            !result ? "서버에 문제가 있습니다." : 
            result.code === 'VF' ? '데이터 유효성 에러.' : 
            result.code === 'AF' ? '권한이 없습니다.' : 
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            if (result?.code === 'AF') navigator(AUTH_ABSOLUTE_PATH);
            return
        }

        const { tourAttractionsName, tourAttractionsLocation, tourAttractionsTelNumber, tourAttractionsHours, tourAttractionsOutline } = result as GetTourAttractionsResponseDto;
        setTourAttractionsName(tourAttractionsName);
        setTourAtrractionLocation(tourAttractionsLocation);
        setTourAttractionsTelNumber(tourAttractionsTelNumber);
        setTourAttractionsHours(tourAttractionsHours);
        setTourAttractionsOutline(tourAttractionsOutline);
    }

    const patchTourAttractionResponse = (result: ResponseDto | null ) => {
        const message =
            !result ? "서버에 문제가 있습니다." : 
            result.code === 'VF' ? '데이터 유효성 에러.' : 
            result.code === 'AF' ? '권한이 없습니다.' : 
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            if (result?.code === 'AF') navigator(AUTH_ABSOLUTE_PATH);
            return;
        }

    }

    const deleteTourAttractionResponse = (result: ResponseDto | null) => {
        const message =
            !result ? "서버에 문제가 있습니다." : 
            result.code === 'VF' ? '데이터 유효성 에러.' : 
            result.code === 'AF' ? '권한이 없습니다.' : 
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            if (result?.code === 'AF') navigator(AUTH_ABSOLUTE_PATH);
            return;
        }
    }

    //                  Event Handler                   //
    const onTourAtrracntionNameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const name = event.target.value;
        setTourAttractionsName(name);
    }

    const onTourAtrracntionLocationChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const location = event.target.value;        
        setTourAtrractionLocation(location);
    }

    const onTourAtrracntionTelNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const telNumber = event.target.value;
        setTourAttractionsTelNumber(telNumber);
    }

    const onTourAtrracntionHoursChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const hours = event.target.value;
        setTourAttractionsHours(hours);
    }

    const onTourAtrracntionOutlineChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const outLine = event.target.value;
        setTourAttractionsOutline(outLine);
    }

    const onTourAtrracntionImgFileChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || !event.target.files.length) return;
        const file = event.target.files[0];
        setTourAtrracntionImage([...tourAttractionsImage, file]);
        // const url = URL.createObjectURL(file);
        // setTourAttractionsImageUrl([...restaurantImageUrl, url]);
    }

    const onPatchButtonClickHandler = async () => {
        if (!tourAttractionsName.trim() || !tourAttractionsLocation.trim() || !tourAttractionsOutline.trim()) return;

        if (!tourAttractionsNumber || !cookies.accessToken || loginUserRole !== "ROLE_ADMIN") return;

        for (const image of tourAttractionsImage) {
            const data = new FormData();
            data.append('file', image);
            const url = await axios.post(IMAGE_UPLOAD_URL, data, { headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${cookies.accessToken}` } })
                .then(response => response.data as string)
                .catch(error => null);
            
            if (!url) continue;
            console.log(url);
            tourAttractionsImageUrl.push(url);
        }

        const requestBody: PatchTourAttractionsRequestDto = {
            tourAttractionsName, tourAttractionsLocation, tourAttractionsTelNumber, tourAttractionsHours, tourAttractionsOutline, 
            tourAttractionsImageUrl
        }

        patchTourAttractionsRequest(requestBody, tourAttractionsNumber, cookies.accessToken).then(patchTourAttractionResponse);

        navigator(ADMINPAGE_REST_LIST_ABSOLUTE_PATH);
    }

    const onDeleteButtonClickHandler = () => {
        if (!tourAttractionsNumber || !cookies.accessToken || loginUserRole !== "ROLE_ADMIN") return;
        deleteTourAttractionsRequest(tourAttractionsNumber, cookies.accessToken).then(deleteTourAttractionResponse)

        const confirm = window.confirm("정말 삭제하시겠습니까?");
        if (!confirm) return;

        navigator(ADMINPAGE_TOUR_LIST_ABSOLUTE_PATH);
    }

    //                  Effect                  //
    useEffect(() => {
        if (!tourAttractionsNumber || !cookies.accessToken || loginUserRole !== "ROLE_ADMIN") return;
        getTourAttractionsRequest(tourAttractionsNumber).then(getTourAttractionResponse);

    }, [loginUserRole])

    //                  Render                   //
    return (
        <div id='tour-register-wrapper'>
            <div className='tour-control-top'>
                <div className='tour-control-top-element-box'>
                    <div className='tour-control-top-name'>▣  이름</div>
                    <div className='tour-control-element'>
                        <input className='tour-control-input-element' value={tourAttractionsName} onChange={onTourAtrracntionNameChangeHandler}/>
                    </div>
                </div>
                <div className='tour-control-top-element-box'>
                    <div className='tour-control-top-address'>▣ 관광지 주소</div>
                    <div className='tour-control-element'>
                        <input className='tour-control-input-element' value={tourAttractionsLocation} onChange={onTourAtrracntionLocationChangeHandler}/>
                    </div>
                </div>
                <div className='tour-control-top-element-box'>
                    <div className='tour-control-top-tel'>▣ 관광지 연락처</div>
                    <div className='tour-control-element'>
                        <input className='tour-control-input-element' value={tourAttractionsTelNumber} onChange={onTourAtrracntionTelNumberChangeHandler}/>
                    </div>
                </div>
                <div className='tour-control-top-element-box'>
                    <div className='tour-control-top-hour'>▣ 관광지 영업시간</div>
                    <div className='tour-control-element'>
                        <input className='tour-control-input-element' value={tourAttractionsHours} onChange={onTourAtrracntionHoursChangeHandler}/>
                    </div>
                </div>
                <div className='tour-control-top-element-box'>
                    <div className='tour-control-top-outline'>▣ 관광지 개요</div>
                    <div className='tour-control-element'>
                        <textarea className='tour-control-textarea-element' value={tourAttractionsOutline} maxLength={1000} onChange={onTourAtrracntionOutlineChangeHandler}/>
                    </div>
                </div>
                <div className='tour-control-top-element-box'>
                    <div className='tour-control-top-image'>▣ 관광지 사진</div>
                    <div className='tour-control-element'>
                        <input className='tour-control-input-element' type='file' multiple value={tourAttractionsImageUrl} onChange={onTourAtrracntionImgFileChangeHandler}/>
                    </div>
                </div>
            </div>
            <div className='tour-control-bottom'>
                <div className='primary-button' onClick={onPatchButtonClickHandler}>수정</div>
                <div className='error-button' onClick={onDeleteButtonClickHandler}>삭제</div>
            </div>
        </div>
    )
}
