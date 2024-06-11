import React, { useCallback, useEffect, useState } from "react";
import "./style.css";
import { getRestaurantRequest } from "src/apis/restaurant";
import ResponseDto from "src/apis/response.dto";
import { GetRestaurantResponseDto } from "src/apis/restaurant/dto/response";
import { useNavigate, useParams } from "react-router";
import { AUTH_ABSOLUTE_PATH } from "src/constant";

const SHOW_IMAGE_BUTTON_LIMIT = 7;

//                    component : Restaurant Detail 화면 컴포넌트                     //
export default function RestDetail() {
    //                    state                     //
    const { restaurantNumber } = useParams();

    const [restaurantImageUrl, setRestaurantImageUrl] = useState<string[]>([]);
    const [restaurantName, setRestaurantName] = useState<string>("");
    const [restaurantLocation, setRestaurantLocation] = useState<string>("");
    const [restaurantTelNumber, setRestaurantTelNumber] = useState<string>("");
    const [restaurantHours, setRestaurantHours] = useState<string>("");
    const [restaurantOutline, setRestaurantOutline] = useState<string>("");
    const [restaurantMainMenu, setRestaurantMainMenu] = useState<string>("");
    const [restaurantServiceMenu, setrestaurantServiceMenu] = useState<string>("");

    const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
    const [page, setPage] = useState<{ start: number; end: number }>({
        start: 0,
        end: 7,
    });

    const telNumber = restaurantTelNumber ? restaurantTelNumber.split("<br>").join("") : "";
    const hours = restaurantHours ? restaurantHours.split("<br>").join("") : "";
    const outline = restaurantOutline ? restaurantOutline.split("<br>").join("") : "";

    //                    function                     //
    const navigator = useNavigate();

    //                    event Handler                     //
    const getRestaurantResponse = (result: GetRestaurantResponseDto | ResponseDto | null) => {
        const message = !result
            ? "서버에 문제가 있습니다."
            : result.code === "ND"
            ? "리스트가 존재하지 않습니다."
            : result.code === "DBE"
            ? "서버에 문제가 있습니다."
            : "";

        if (!result || result.code !== "SU") {
            alert(message);
            if (result?.code === "AF") navigator(AUTH_ABSOLUTE_PATH);
            return result;
        }

        const {
            restaurantImageUrl,
            restaurantName,
            restaurantLocation,
            restaurantTelNumber,
            restaurantHours,
            restaurantOutline,
            restaurantMainMenu,
            restaurantServiceMenu,
        } = result as GetRestaurantResponseDto;
        setRestaurantImageUrl(restaurantImageUrl);
        setRestaurantName(restaurantName);
        setRestaurantLocation(restaurantLocation);
        setRestaurantTelNumber(restaurantTelNumber);
        setRestaurantHours(restaurantHours);
        setRestaurantOutline(restaurantOutline);
        setRestaurantMainMenu(restaurantMainMenu);
        setrestaurantServiceMenu(restaurantServiceMenu);
    };

    //                    effect                     //
    useEffect(() => {
        if (!restaurantNumber) return;
        getRestaurantRequest(restaurantNumber).then(getRestaurantResponse);
    }, []);

    useEffect(() => {
        setSelectedImageUrl(restaurantImageUrl[0]);
    }, []);

    const onUpdateImageUrl = useCallback((selectedUrl: string) => {
        setSelectedImageUrl(selectedUrl);
    }, []);

    const onClickImageButton = (isLeft: boolean) => {
        if (isLeft) {
            if (page.start === 0) return;
            const newPage = { start: page.start - 7, end: page.start };
            setPage(newPage);
        } else {
            if (page.end === restaurantImageUrl.length) return;
            const end = restaurantImageUrl.length > page.end + 7 ? page.end + 7 : restaurantImageUrl.length;
            const newPage = { start: page.start + 7, end };
            setPage(newPage);
        }
    };

    //                    render                     //
    return (
        <div id="travel-detail-wrapper">
            {restaurantImageUrl === null || restaurantImageUrl.length ? (
                <>
                    <div className="travel-detail-image-table">
                        <div>
                            <img title="travel" width="300px" src={selectedImageUrl ? selectedImageUrl : restaurantImageUrl[0]} />
                        </div>
                        <div className="travel-detail-image-list">
                            {restaurantImageUrl.length > SHOW_IMAGE_BUTTON_LIMIT ? (
                                <div className="travel-image-list-left" onClick={() => onClickImageButton(true)} />
                            ) : null}
                            {restaurantImageUrl.slice(page.start, page.end).map((url) => (
                                <div
                                    className="travel-lmage-list"
                                    key={url}
                                    style={{
                                        backgroundImage: `url(${url})`,
                                        minWidth: "150px",
                                        height: "100px",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => onUpdateImageUrl(url)}
                                />
                            ))}
                            {restaurantImageUrl.length > SHOW_IMAGE_BUTTON_LIMIT ? (
                                <div className="travel-image-list-right" onClick={() => onClickImageButton(false)} />
                            ) : null}
                        </div>
                    </div>
                </>
            ) : (
                <div className="travel-empty-image-box">
                    <div className="travel-empty-image"></div>
                </div>
            )}
            <div className="travel-detail-table">
                <div className="travel-name">
                    <div className="travel-title">이름</div>
                    <div className="travel-detail-info-devider">{"|"}</div>
                    <div className="travel-detail-info">{restaurantName}</div>
                </div>
                <div className="travel-telNumber">
                    <div className="travel-title">연락처</div>
                    <div className="travel-detail-info-devider">{"|"}</div>
                    <div className="travel-detail-info">{telNumber}</div>
                </div>
                <div className="travel-location">
                    <div className="travel-title">지역</div>
                    <div className="travel-detail-info-devider">{"|"}</div>
                    <div className="travel-detail-info">{restaurantLocation}</div>
                </div>
                <div className="travel-hours">
                    <div className="travel-title">운영시간</div>
                    <div className="travel-detail-info-devider">{"|"}</div>
                    <div className="travel-detail-info">{hours}</div>
                </div>
                <div className="travel-main-menu">
                    <div className="travel-title">대표메뉴</div>
                    <div className="travel-detail-info-devider">{"|"}</div>
                    <div className="travel-detail-info">{restaurantMainMenu}</div>
                </div>
                <div className="travel-service-menu">
                    <div className="travel-title">취급메뉴</div>
                    <div className="travel-detail-info-devider">{"|"}</div>
                    <div className="travel-detail-info">{restaurantServiceMenu}</div>
                </div>
                <div className="travel-list-table-outline">
                    <div className="travel-outline-text">
                        <div className="travel-title">개요</div>
                        <div className="travel-detail-info">{outline}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
