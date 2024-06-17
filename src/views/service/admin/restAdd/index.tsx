import React, { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";

import { useUserStore } from "src/stores";
import useButtonStatusStore from "src/stores/search-button.store";
import useSearchAddressStore from "src/stores/search-address.store";

import ResponseDto from "src/apis/response.dto";
import { imageUploadRequest } from "src/apis/image";
import { postRestaurantRequest } from "src/apis/restaurant";
import { PostRestaurantRequestDto } from "src/apis/restaurant/dto/request";
import { getAddressRequest, getCoordinateRequest } from "src/apis/address";
import { GetSearchAddressResponseDto, GetSearchCoordinateResponseDto } from "src/apis/address/dto/response";

import { ADMINPAGE_REST_LIST_ABSOLUTE_PATH, AUTH_ABSOLUTE_PATH } from "src/constant";

import "./style.css";

//                  Component                   //
export function SearchAddress() {
    //                  State                   //
    const [cookies] = useCookies();

    const { setSearchAddress } = useSearchAddressStore();
    const { buttonStatus, setButtonStatus } = useButtonStatusStore();

    const [searchWord, setSearchWord] = useState<string>("");
    const [addresses, setAddresses] = useState<string[]>([]);

    //                  Function                    //
    const navigator = useNavigate();

    const getAddressResponse = (result: GetSearchAddressResponseDto | ResponseDto | null) => {
        const message = !result
            ? "서버에 문제가 있습니다."
            : result.code === "VF"
            ? "데이터 유효성 에러."
            : result.code === "AF"
            ? "권한이 없습니다."
            : result.code === "DBE"
            ? "서버에 문제가 있습니다."
            : "";

        if (!result || result.code !== "SU") {
            alert(message);
            if (result?.code === "AF") navigator(AUTH_ABSOLUTE_PATH);
            return;
        }

        const { addresses } = result as GetSearchAddressResponseDto;
        setAddresses(addresses);
    };

    //                  Event Handler                   //
    const onSearchWordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const word = event.target.value;
        setSearchWord(word);
    };

    const onSearchButtonClickHandler = () => {
        const query = searchWord;
        const page = 1;
        const size = 10;

        getAddressRequest(query, page, size, cookies.accessToken).then(getAddressResponse);
    };

    const onElementClickHandler = (selectAddress: string) => {
        setSearchAddress(selectAddress);
        setButtonStatus(!buttonStatus);
    };

    const onEnterKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") return onSearchButtonClickHandler();
    };

    //                  Render                  //
    return (
        <div className="search-console">
            <div className="search-console-box">
                <div className="search-console-title">주소 찾기</div>
                <div className="search-console-input-box">
                    <div className="search-console-input-wrapper">
                        <input
                            className="search-input-element"
                            placeholder="주소를 입력하세요"
                            onChange={onSearchWordChangeHandler}
                            onKeyDown={onEnterKeyDownHandler}
                        />
                    </div>
                    <div className="search-button" onClick={onSearchButtonClickHandler}>
                        검색
                    </div>
                </div>
                <div className="search-address-list">
                    {addresses.map((index) => (
                        <div className="address-element" key={index} onClick={() => onElementClickHandler(index)}>
                            {index}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

//                  Component                   //
export default function RestAdd() {
    //                  State                   //
    const [cookies] = useCookies();
    const imageSeq = useRef<HTMLInputElement | null>(null);

    const { loginUserRole } = useUserStore();
    const { buttonStatus, setButtonStatus } = useButtonStatusStore();
    const { searchAddress, setSearchAddress } = useSearchAddressStore();

    const [restaurantImage, setRestaurantImage] = useState<File[]>([]);
    const [restaurantImageUrl, setRestaurantImageUrl] = useState<string[]>([]);

    const [restaurantLat, setRestaurantLat] = useState<number>(0.0);
    const [restaurantLng, setRestaurantLng] = useState<number>(0.0);
    const [restaurantName, setRestaurantName] = useState<string>("");
    const [restaurantHours, setRestaurantHours] = useState<string>("");
    const [updateWhether, setUpdateWhether] = useState<boolean>(false);
    const [restaurantOutline, setRestaurantOutline] = useState<string>("");
    const [restaurantLocation, setRestaurantLocation] = useState<string>("");
    const [restaurantMainMenu, setRestaurantMainMenu] = useState<string>("");
    const [restaurantTelNumber, setRestaurantTelNumber] = useState<string>("");
    const [restaurantServiceMenu, setRestaurantServiceMenu] = useState<string>("");

    //                  Function                    //
    const navigator = useNavigate();

    const postRestaurantResponse = (result: ResponseDto | null) => {
        const message = !result
            ? "서버에 문제가 있습니다."
            : result.code === "VF"
            ? "데이터 유효성 에러."
            : result.code === "AF"
            ? "권한이 없습니다."
            : result.code === "DBE"
            ? "서버에 문제가 있습니다."
            : "";

        if (!result || result.code !== "SU") {
            alert(message);
            if (result?.code === "AF") navigator(AUTH_ABSOLUTE_PATH);
            return;
        }
    };

    const getCoordinateResponse = async (result: GetSearchCoordinateResponseDto | ResponseDto | null) => {
        const message = !result
            ? "서버에 문제가 있습니다."
            : result.code === "VF"
            ? "데이터 유효성 에러."
            : result.code === "AF"
            ? "권한이 없습니다."
            : result.code === "DBE"
            ? "서버에 문제가 있습니다."
            : "";

        if (!result || result.code !== "SU") {
            alert(message);
            if (result?.code === "AF") navigator(AUTH_ABSOLUTE_PATH);
            return;
        }

        const { x, y } = result as GetSearchCoordinateResponseDto;

        setRestaurantLat(y);
        setRestaurantLng(x);

        if (x !== 0 || y !== 0) setUpdateWhether(true);
    };

    //                  Event Handler                   //
    const onRestaurantNameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const name = event.target.value;
        setRestaurantName(name);
    };

    const onRestaurantLocationChangeHandler = async (event: ChangeEvent<HTMLInputElement>) => {
        const location = event.target.value;
        setSearchAddress(location);
    };

    const onRestaurantTelNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const telNumber = event.target.value;
        setRestaurantTelNumber(telNumber);
    };

    const onRestaurantHoursChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const hours = event.target.value;
        setRestaurantHours(hours);
    };

    const onRestaurantOutlineChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const outLine = event.target.value;
        setRestaurantOutline(outLine);
    };

    const onRestaurantImgFileChangeHandler = async (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || !event.target.files.length) return;
        const file = event.target.files[0];
        const data = new FormData();
        data.append("file", file);
        const url: string | null = await imageUploadRequest(data, cookies.accessToken);

        if (url) setRestaurantImageUrl([...restaurantImageUrl, url]);
    };

    const onRestaurantMainMenuChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const mainMenu = event.target.value;
        setRestaurantMainMenu(mainMenu);
    };

    const onRestauranServiceMenuChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const serviceMenu = event.target.value;
        setRestaurantServiceMenu(serviceMenu);
    };

    const onRegisterButtonClickHandler = async () => {
        if (
            !restaurantName.trim() ||
            !restaurantLocation.trim() ||
            !restaurantTelNumber.trim() ||
            !restaurantHours.trim() ||
            !restaurantOutline.trim() ||
            !restaurantMainMenu.trim() ||
            !restaurantServiceMenu.trim()
        )
            return;

        if (!cookies.accessToken) return;

        const query = restaurantLocation;

        getCoordinateRequest(query, cookies.accessToken).then(getCoordinateResponse);
    };

    const onImageDeleteButtonClickHandler = (deleteIndex: number) => {
        const newTourAttractionsImages = restaurantImage.filter((image, index) => index !== deleteIndex);
        setRestaurantImage(newTourAttractionsImages);

        const newTourAttractionsImageUrls = restaurantImageUrl.filter((imageUrl, index) => index !== deleteIndex);
        setRestaurantImageUrl(newTourAttractionsImageUrls);
    };

    const onSearchButtonClickHandler = () => {
        setButtonStatus(!buttonStatus);
    };

    //                  Effect                  //
    useEffect(() => {
        if (loginUserRole === "ROLE_USER") {
            navigator(AUTH_ABSOLUTE_PATH);
            return;
        }

        setButtonStatus(false);
        setSearchAddress("");
    }, []);

    useEffect(() => {
        setRestaurantLocation(searchAddress);
    }, [searchAddress]);

    useEffect(() => {
        if (updateWhether) {
            if (restaurantLat === 0.0 || restaurantLng === 0.0) {
                alert("주소를 정확히 입력해주세요.");
                return;
            }

            const requestBody: PostRestaurantRequestDto = {
                restaurantName,
                restaurantLocation,
                restaurantTelNumber,
                restaurantHours,
                restaurantOutline,
                restaurantImageUrl,
                restaurantMainMenu,
                restaurantServiceMenu,
                restaurantLat,
                restaurantLng,
            };

            postRestaurantRequest(requestBody, cookies.accessToken).then(postRestaurantResponse);

            navigator(ADMINPAGE_REST_LIST_ABSOLUTE_PATH);
        }
    }, [restaurantLat, restaurantLng]);

    //                  Render                   //
    return (
        <div id="rest-register-wrapper">
            <div className="rest-register-top">
                <div className="rest-register-top-element-box">
                    <div className="rest-register-top-title">▣ 음식점 이름</div>
                    <div className="rest-register-element">
                        <input className="rest-register-input-element" placeholder="이름을 입력해주세요." onChange={onRestaurantNameChangeHandler} />
                    </div>
                </div>
                <div className="rest-register-top-element-box">
                    <div className="rest-register-top-title">▣ 음식점 주소</div>
                    <div className="rest-register-top-element">
                        <div className="rest-register-element-search">
                            <input
                                className="rest-register-input-element"
                                placeholder="주소를 입력해주세요."
                                value={searchAddress}
                                onChange={onRestaurantLocationChangeHandler}
                            />
                        </div>
                        <div className="search-button" onClick={onSearchButtonClickHandler}>
                            검색
                        </div>
                    </div>
                </div>
                <div className="rest-register-top-element-box">
                    <div className="rest-register-top-title">▣ 음식점 연락처</div>
                    <div className="rest-register-element">
                        <input
                            className="rest-register-input-element"
                            placeholder="연락처를 입력해주세요."
                            onChange={onRestaurantTelNumberChangeHandler}
                        />
                    </div>
                </div>
                <div className="rest-register-top-element-box">
                    <div className="rest-register-top-title">▣ 음식점 영업시간</div>
                    <div className="rest-register-element">
                        <input
                            className="rest-register-input-element"
                            placeholder="영업시간 입력해주세요."
                            onChange={onRestaurantHoursChangeHandler}
                        />
                    </div>
                </div>
                <div className="rest-register-top-element-box">
                    <div className="rest-register-top-title">▣ 음식점 메인메뉴</div>
                    <div className="rest-register-element">
                        <input
                            className="rest-register-input-element"
                            placeholder="메인메뉴를 입력해주세요."
                            onChange={onRestaurantMainMenuChangeHandler}
                        />
                    </div>
                </div>
                <div className="rest-register-top-element-box">
                    <div className="rest-register-top-title">▣ 음식점 취급메뉴</div>
                    <div className="rest-register-element">
                        <input
                            className="rest-register-input-element"
                            placeholder="제목을 입력해주세요."
                            onChange={onRestauranServiceMenuChangeHandler}
                        />
                    </div>
                </div>
                <div className="rest-register-top-element-box">
                    <div className="rest-register-top-title">▣ 음식점 개요</div>
                    <div className="rest-register-element">
                        <textarea
                            className="rest-register-textarea-element"
                            placeholder="내용을 입력해주세요. / 1000자"
                            maxLength={1000}
                            onChange={onRestaurantOutlineChangeHandler}
                        />
                    </div>
                </div>
                <div className="rest-register-top-element-box">
                    <div className="rest-register-top-title">▣ 음식점 사진</div>
                    <div className="rest-register-element">
                        <input
                            className="rest-register-input-element"
                            type="file"
                            multiple
                            ref={imageSeq}
                            accept=".png, .jpg, .jpeg"
                            onChange={onRestaurantImgFileChangeHandler}
                        />
                    </div>
                    <div className="photo-view-element">
                        <div className="photo-view">
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
                                    <div
                                        className="delete-image-buttons"
                                        onClick={() => {
                                            onImageDeleteButtonClickHandler(index);
                                        }}
                                    ></div>
                                </>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="rest-register-bottom">
                <div className="primary-button" onClick={onRegisterButtonClickHandler}>
                    등록
                </div>
            </div>
            {buttonStatus && <SearchAddress />}
        </div>
    );
}
