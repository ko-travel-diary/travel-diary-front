import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import './style.css'
import { useCookies } from 'react-cookie'
import { PatchRestaurantRequestDto } from 'src/apis/restaurant/dto/request';
import ResponseDto from 'src/apis/response.dto';
import { useNavigate, useParams } from 'react-router';
import { ADDRESS_URL, ADMINPAGE_REST_LIST_ABSOLUTE_PATH, AUTH_ABSOLUTE_PATH, IMAGE_UPLOAD_URL, SEARCH_URL } from 'src/constant';
import { deleteRestaurantRequest, getRestaurantRequest, patchRestaurantRequest } from 'src/apis/restaurant';
import axios from 'axios';
import { GetRestaurantResponseDto } from 'src/apis/restaurant/dto/response';
import { useUserStore } from 'src/stores';
import useButtonStatusStore from 'src/stores/search-button.store';
import useSearchAddressStore from 'src/stores/search-address.store';

//                  Component                   //
export function SearchAddress() {

    //                  State                   //
    const { buttonStatus, setButtonStatus } = useButtonStatusStore();
    const { searchAddress, setSearchAddress } = useSearchAddressStore();

    const [ cookies ] = useCookies();

    const [searchWord, setSearchWord] = useState<string>('');
    const [address, setAddress] = useState<string[]>([]);

    //                  Event Handler                   //
    const onSearchWordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const word = event.target.value;
        setSearchWord(word);
    }

    const onSearchButtonClickHandler = async () => {

        const query = searchWord;
        const page = 1;
        const size = 10;
        const data = await axios.get(SEARCH_URL, {
            params: { query, page, size },
            headers: { Authorization: `Bearer ${cookies.accessToken}` }
            })
            .then(response => response.data)
            .catch(error => null)

        if (!data) return;


        await setAddress(data.addresses);

    }

    const onElementClickHandler = (selectAddress: string) => {

        setSearchAddress(selectAddress);
        setButtonStatus(!buttonStatus)

    }
    
    //                  Render                  //
    return (
        <div className='search-console'>
            <div className='search-console-box'>
                <div className='search-console-title'>주소 찾기</div>
                <div className='search-console-input-box'>
                    <div className='search-console-input-wrapper'>
                        <input className='search-input-element' placeholder='주소를 입력하세요' onChange={onSearchWordChangeHandler} />
                    </div>
                    <div className='search-button' onClick={onSearchButtonClickHandler}>검색</div>
                </div>
                <div className='search-address-list'>
                    {address.map((index) =>
                        <div className="address-element" key={index} onClick={() => onElementClickHandler(index)}>{index}</div>
                    )}
                </div>
            </div>
        </div>
    )
}

//                  Component                   //
export default function RestControl() {

    //                  State                   //
    const {restaurantNumber} = useParams();
    const {loginUserRole} = useUserStore();
    const { searchAddress, setSearchAddress } = useSearchAddressStore();
    const { buttonStatus, setButtonStatus } = useButtonStatusStore();
    const imageSeq = useRef<HTMLInputElement | null>(null);
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
    
    //                  Function                    //
    const navigator = useNavigate();

    const getRestaurantResponse = (result: GetRestaurantResponseDto | ResponseDto | null) => {
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

        const { restaurantImageUrl, restaurantName, restaurantLocation, restaurantTelNumber, restaurantHours, restaurantOutline, restaurantMainMenu, restaurantServiceMenu, restaurantLat, restaurantLng } = result as GetRestaurantResponseDto;
        setRestaurantImageUrl(restaurantImageUrl);
        setRestaurantName(restaurantName);
        setRestaurantLocation(restaurantLocation);
        setRestaurantTelNumber(restaurantTelNumber);
        setRestaurantHours(restaurantHours);
        setRestaurantOutline(restaurantOutline);
        setRestaurantMainMenu(restaurantMainMenu);
        setRestaurantServiceMenu(restaurantServiceMenu);
        setRestaurantLat(restaurantLat);
        setRestaurantLng(restaurantLng);
    }

    const patchRestaurantResponse = (result: ResponseDto | null ) => {
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

    const deleteRestaurantResponse = (result: ResponseDto | null) => {
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
    const onRestaurantNameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const name = event.target.value;
        setRestaurantName(name);
    }

    const onRestaurantLocationChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const location = event.target.value;        
        setSearchAddress(location);
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

    const onRestaurantImgFileChangeHandler = async (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || !event.target.files.length) return;
        const file = event.target.files[0];
        const data = new FormData();
        data.append('file', file);
        const url = await axios.post(IMAGE_UPLOAD_URL, data, { headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${cookies.accessToken}` } })
            .then(response => response.data as string)
            .catch(error => null);

        if (url) setRestaurantImageUrl([...restaurantImageUrl, url]);
    }

    const onRestaurantMainMenuChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const mainMenu = event.target.value;
        setRestaurantMainMenu(mainMenu);
    }

    const onRestauranServiceMenuChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const serviceMenu = event.target.value;
        setRestaurantServiceMenu(serviceMenu);
    }

    const onPatchButtonClickHandler = async () => {
        if (!restaurantName.trim() || !restaurantLocation.trim() || !restaurantOutline.trim() || !restaurantMainMenu.trim() ) return;

        if (!restaurantNumber || !cookies.accessToken || loginUserRole !== "ROLE_ADMIN") return;

        const query = restaurantLocation;
        const data = await axios.get(ADDRESS_URL, { 
            params: { query },
            headers: { Authorization: `Bearer ${cookies.accessToken}` }
            })
            .then(response => response.data)
            .catch(error => null)

            if (!(data)) {
                alert("주소를 정확히 입력해주세요.")
                return;
            }

        const restaurantLat = data.y as number;
        const restaurantLng = data.x as number;

        const requestBody: PatchRestaurantRequestDto = {
            restaurantName, restaurantLocation, restaurantTelNumber, restaurantHours, restaurantOutline, 
            restaurantImageUrl, restaurantMainMenu, restaurantServiceMenu, restaurantLat, restaurantLng
        }

        patchRestaurantRequest(requestBody, restaurantNumber, cookies.accessToken).then(patchRestaurantResponse);

        navigator(ADMINPAGE_REST_LIST_ABSOLUTE_PATH);
    }

    const onDeleteButtonClickHandler = () => {
        if (!restaurantNumber || !cookies.accessToken || loginUserRole !== "ROLE_ADMIN") return;
        deleteRestaurantRequest(restaurantNumber, cookies.accessToken).then(deleteRestaurantResponse)

        const confirm = window.confirm("정말 삭제하시겠습니까?");
        if (!confirm) return;

        navigator(ADMINPAGE_REST_LIST_ABSOLUTE_PATH);
    }

    const onImageDeleteButtonClickHandler = (deleteIndex: number) => {
        const newTourAttractionsImages = restaurantImage.filter((image, index) => index !== deleteIndex);
        setRestaurantImage(newTourAttractionsImages);

        const newTourAttractionsImageUrls = restaurantImageUrl.filter((imageUrl, index) => index !== deleteIndex);
        setRestaurantImageUrl(newTourAttractionsImageUrls);
    }

    const onSearchButtonClickHandler = () => {
        setButtonStatus(!buttonStatus);
    }

    //                  Effect                  //
    useEffect(() => {
        if (loginUserRole === 'ROLE_USER') {
            navigator(AUTH_ABSOLUTE_PATH);
            return;
        }

        setSearchAddress('');

    }, [])
    
    useEffect(() => {
        if (!restaurantNumber || !cookies.accessToken || loginUserRole !== "ROLE_ADMIN") return;
        getRestaurantRequest(restaurantNumber).then(getRestaurantResponse);

    }, [loginUserRole])

    useEffect(() => {
        setRestaurantLocation(searchAddress);
    }, [searchAddress])

    //                  Render                   //
    return (
        <div id='rest-register-wrapper'>
            <div className='rest-register-top'>
                <div className='rest-register-top-element-box'>
                    <div className='rest-register-top-title'>▣ 음식점 이름</div>
                    <div className='rest-register-element'>
                        <input className='rest-register-input-element' placeholder='이름을 입력해주세요.' value={restaurantName} onChange={onRestaurantNameChangeHandler}/>
                    </div>
                </div>
                <div className='rest-register-top-element-box'>
                    <div className='rest-register-top-title'>▣ 음식점 주소</div>
                    <div className='rest-register-top-element'>
                        <div className='rest-register-element-search'>
                            <input className='rest-register-input-element' placeholder='주소를 입력해주세요.' value={restaurantLocation} onChange={onRestaurantLocationChangeHandler}/>
                        </div>
                        <div className='search-button' onClick={onSearchButtonClickHandler}>검색</div>
                    </div>
                </div>
                <div className='rest-register-top-element-box'>
                    <div className='rest-register-top-title'>▣ 음식점 연락처</div>
                    <div className='rest-register-element'>
                        <input className='rest-register-input-element' placeholder='연락처를 입력해주세요.' value={restaurantTelNumber} onChange={onRestaurantTelNumberChangeHandler}/>
                    </div>
                </div>
                <div className='rest-register-top-element-box'>
                    <div className='rest-register-top-title'>▣ 음식점 영업시간</div>
                    <div className='rest-register-element'>
                        <input className='rest-register-input-element' placeholder='영업시간 입력해주세요.' value={restaurantHours} onChange={onRestaurantHoursChangeHandler}/>
                    </div>
                </div>
                <div className='rest-register-top-element-box'>
                    <div className='rest-register-top-title'>▣ 음식점 메인메뉴</div>
                    <div className='rest-register-element'>
                        <input className='rest-register-input-element' placeholder='메인메뉴를 입력해주세요.' value={restaurantMainMenu} onChange={onRestaurantMainMenuChangeHandler}/>
                    </div>
                </div>
                <div className='rest-register-top-element-box'>
                    <div className='rest-register-top-title'>▣ 음식점 취급메뉴</div>
                    <div className='rest-register-element'>
                        <input className='rest-register-input-element' placeholder='제목을 입력해주세요.' value={restaurantServiceMenu} onChange={onRestauranServiceMenuChangeHandler}/>
                    </div>
                </div>
                <div className='rest-register-top-element-box'>
                    <div className='rest-register-top-title'>▣ 음식점 개요</div>
                    <div className='rest-register-element'>
                        <textarea className='rest-register-textarea-element' placeholder='내용을 입력해주세요. / 1000자' maxLength={1000} value={restaurantOutline
                            
                        } onChange={onRestaurantOutlineChangeHandler} />
                    </div>
                </div>
                <div className='rest-register-top-element-box'>
                    <div className='rest-register-top-title'>▣ 음식점 사진</div>
                    <div className='rest-register-element'>
                        <input className='rest-register-input-element' type='file' multiple ref={imageSeq}
                        accept=".png, .jpg, .jpeg" onChange={onRestaurantImgFileChangeHandler}/>       
                    </div>
                    <div className='photo-view-element'>
                        <div className='photo-view'>
                            {restaurantImageUrl.map((url, index) => (
                            <>
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
                            <div className='delete-image-buttons' onClick={() => {onImageDeleteButtonClickHandler(index)}}></div>   
                            </>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className='rest-register-bottom'>
                <div className='primary-button' onClick={onPatchButtonClickHandler}>수정</div>
                <div className='error-button' onClick={onDeleteButtonClickHandler}>삭제</div>
            </div>
            {buttonStatus &&
                <SearchAddress/>
            }
        </div>
    )
}
