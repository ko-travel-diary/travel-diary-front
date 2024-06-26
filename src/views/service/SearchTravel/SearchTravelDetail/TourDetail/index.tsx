import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { changeText } from "src/utils";
import ResponseDto from "src/apis/response.dto";
import { GetTourAttractionsResponseDto } from "src/apis/tour_attraction/dto/response";
import { getTourAttractionsRequest } from "src/apis/tour_attraction";
import { AUTH_ABSOLUTE_PATH, SHOW_IMAGE_BUTTON_LIMIT } from "src/constant";

import "./style.css";

//                    component : TourAttractions Detail 화면 컴포넌트                     //
export default function TourDetail() {
    //                    state                     //
    const { tourAttractionsNumber } = useParams();

    const [tourAttractionsName, setTourAttractionsName] = useState<string>("");
    const [tourAttractionsHours, setTourAttractionsHours] = useState<string>("");
    const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
    const [tourAttractionsOutline, setTourAttractionsOutline] = useState<string>("");
    const [tourAttractionsLocation, setTourAttractionsLocation] = useState<string>("");
    const [tourAttractionsTelNumber, setTourAttractionsTelNumber] = useState<string>("");
    const [tourAttractionsImageUrl, setTourAttractionsImageUrl] = useState<string[]>([]);

    const [page, setPage] = useState<{ start: number; end: number }>({
        start: 0,
        end: 7,
    });

    //                    function                     //
    const navigator = useNavigate();

    //                    event Handler                     //
    const getTourAttractionsResponse = (result: GetTourAttractionsResponseDto | ResponseDto | null) => {
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
            tourAttractionsImageUrl,
            tourAttractionsName,
            tourAttractionsLocation,
            tourAttractionsTelNumber,
            tourAttractionsHours,
            tourAttractionsOutline,
        } = result as GetTourAttractionsResponseDto;
        setTourAttractionsImageUrl(tourAttractionsImageUrl);
        setTourAttractionsName(tourAttractionsName);
        setTourAttractionsLocation(tourAttractionsLocation);
        setTourAttractionsTelNumber(tourAttractionsTelNumber);
        setTourAttractionsHours(tourAttractionsHours);
        setTourAttractionsOutline(tourAttractionsOutline);
    };

    //                    effect                     //
    useEffect(() => {
        if (!tourAttractionsNumber) return;
        getTourAttractionsRequest(tourAttractionsNumber).then(getTourAttractionsResponse);
    }, [tourAttractionsNumber]);

    useEffect(() => {
        setSelectedImageUrl(tourAttractionsImageUrl[0]);
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
            if (page.end === tourAttractionsImageUrl.length) return;
            const end = tourAttractionsImageUrl.length > page.end + 7 ? page.end + 7 : tourAttractionsImageUrl.length;
            const newPage = { start: page.start + 7, end };
            setPage(newPage);
        }
    };

    //                    render                     //
    return (
        <div id="travel-detail-wrapper">
            {tourAttractionsImageUrl === null || tourAttractionsImageUrl.length ? (
                <div className="travel-detail-image-table">
                    <div>
                        <img title="travel" width="300px" src={selectedImageUrl ? selectedImageUrl : tourAttractionsImageUrl[0]} />
                    </div>
                    <div className="travel-detail-image-list">
                        {tourAttractionsImageUrl.length > SHOW_IMAGE_BUTTON_LIMIT ? (
                            <div className="travel-image-list-left" onClick={() => onClickImageButton(true)} />
                        ) : null}
                        {tourAttractionsImageUrl.slice(page.start, page.end).map((url) => (
                            <div
                                className="travel-image-list"
                                key={url}
                                style={{
                                    backgroundImage: `url(${url})`,
                                    width: "150px",
                                    height: "100px",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                                onClick={() => onUpdateImageUrl(url)}
                            />
                        ))}
                        {tourAttractionsImageUrl.length > SHOW_IMAGE_BUTTON_LIMIT ? (
                            <div className="travel-image-list-right" onClick={() => onClickImageButton(false)} />
                        ) : null}
                    </div>
                </div>
            ) : (
                <div className="travel-empty-image-box">
                    <div className="travel-empty-image"></div>
                </div>
            )}
            <div className="travel-detail-table">
                <div className="travel-name">
                    <div className="travel-title">이름</div>
                    <div className="travel-detail-info-devider">{"|"}</div>
                    <div className="travel-detail-information">{tourAttractionsName}</div>
                </div>
                <div className="travel-telNumber">
                    <div className="travel-title">연락처</div>
                    <div className="travel-detail-info-devider">{"|"}</div>
                    <div className="travel-detail-information">{changeText(tourAttractionsTelNumber)}</div>
                </div>
                <div className="travel-location">
                    <div className="travel-title">지역</div>
                    <div className="travel-detail-info-devider">{"|"}</div>
                    <div className="travel-detail-information">{tourAttractionsLocation}</div>
                </div>
                <div className="travel-hours">
                    <div className="travel-title">운영시간</div>
                    <div className="travel-detail-info-devider">{"|"}</div>
                    <div className="travel-detail-information">{changeText(tourAttractionsHours)}</div>
                </div>
                <div className="travel-list-table-outline">
                    <div className="travel-outline-text">
                        <div className="travel-title">개요</div>
                        <div className="travel-detail-information">{changeText(tourAttractionsOutline)}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
