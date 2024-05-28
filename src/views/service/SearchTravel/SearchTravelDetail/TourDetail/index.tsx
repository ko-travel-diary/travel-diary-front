import React, { useEffect, useState } from "react";
import "./style.css";
import { useNavigate, useParams } from "react-router";
import { GetTourAttractionsResponseDto } from "src/apis/tour_attraction/dto/response";
import { getTourAttractionsRequest } from "src/apis/tour_attraction";
import ResponseDto from "src/apis/response.dto";
import { AUTH_ABSOLUTE_PATH, COUNT_PER_SECTION } from "src/constant";

//                    Component : Qna 화면 컴포넌트                     //
export default function TourDetail() {
    //                    State : Qna 화면 컴포넌트                     //
    const { tourAttractionsNumber } = useParams();

    const [tourAttractionsImageUrl, setTourAttractionsImageUrl] = useState<
        string[]
    >([]);
    const [tourAttractionsName, setTourAttractionsName] = useState<string>("");
    const [tourAttractionsLocation, setTourAttractionsLocation] =
        useState<string>("");
    const [tourAttractionsTelNumber, setTourAttractionsTelNumber] =
        useState<string>("");
    const [tourAttractionsHours, setTourAttractionsHours] =
        useState<string>("");
    const [tourAttractionsOutline, setTourAttractionsOutline] =
        useState<string>("");

    const [imageList, setImageList] = useState<string[]>([]);
    const [viewList, setViewList] = useState<string[]>([]);
    const [totalLength, setTotalLength] = useState<number>(0);
    const [totalPage, setTotalPage] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageList, setPageList] = useState<number[]>([1]);
    const [totalSection, setTotalSection] = useState<number>(1);
    const [currentSection, setCurrentSection] = useState<number>(1);

    //                    Function : Qna 화면 컴포넌트                     //
    const navigator = useNavigate();

    //                    Event Handler : Qna 화면 컴포넌트                     //
    const getTourAttractionsResponse = (
        result: GetTourAttractionsResponseDto | ResponseDto | null
    ) => {
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

    const changeImagePage = (imageList: string[], totalLength: number) => {
        if (!currentPage) return;
        const startIndex = (currentPage - 1) * 1;
        let endIndex = currentPage * 1;
        if (endIndex > totalLength - 1) endIndex = totalLength;
        const viewList = imageList.slice(startIndex, endIndex);
        setViewList(viewList);
    };

    const changeImageSection = (totalPage: number) => {
        if (!currentSection) return;
        const startPage =
            currentSection * COUNT_PER_SECTION - (COUNT_PER_SECTION - 1);
        let endPage = currentSection * COUNT_PER_SECTION;
        if (endPage > totalPage) endPage = totalPage;
        const pageList: number[] = [];
        for (let page = startPage; page <= endPage; page++) pageList.push(page);
        setPageList(pageList);
    };

    const changeImageList = (imageList: string[]) => {
        setImageList(imageList);

        const totalLength = imageList.length;
        setTotalLength(totalLength);

        const totalPage = Math.floor((totalLength - 1) / 1) + 1;
        setTotalPage(totalPage);

        changeImagePage(imageList, totalLength);
        changeImageSection(totalPage);
    };

    const onPreImageClickHandler = () => {
        if (currentSection <= 1) return;
        setCurrentSection(currentSection - 1);
        setCurrentPage((currentSection - 1) * COUNT_PER_SECTION);
    };

    const onNextImageClickHandler = () => {
        if (currentSection === totalSection) return;
        setCurrentSection(currentSection + 1);
        setCurrentPage(currentSection * COUNT_PER_SECTION + 1);
    };

    //                    Effect : Qna 화면 컴포넌트                     //
    useEffect(() => {
        if (!tourAttractionsNumber) return;
        getTourAttractionsRequest(tourAttractionsNumber).then(
            getTourAttractionsResponse
        );
    }, [tourAttractionsNumber]);

    //                    Render : Qna 화면 컴포넌트                     //
    return (
        <div id="travel-detail-wrapper">
            <div className="travel-detail-image-table">
                <div>
                    <img
                        title="travel"
                        width="300px"
                        src={`${tourAttractionsImageUrl[0]}`}
                    />
                </div>
                <div className="travel-detail-image-list">
                    <div
                        className="travel-image-list-left"
                        onClick={onPreImageClickHandler}
                    ></div>
                    {tourAttractionsImageUrl.map((url) => (
                        <div
                            className="travel-lmage-list"
                            key={url}
                            style={{
                                backgroundImage: `url(${url})`,
                                width: "150px",
                                height: "100px",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        ></div>
                    ))}
                    <div
                        className="travel-image-list-right"
                        onClick={onNextImageClickHandler}
                    ></div>
                </div>
            </div>
            <div className="travel-detail-table">
                <div className="travel-name">
                    <div className="travel-title">이름</div>
                    <div className="travel-detail-info-devider">{"|"}</div>
                    <div className="travel-detail-info">
                        {tourAttractionsName}
                    </div>
                </div>
                <div className="travel-telNumber">
                    <div className="travel-title">연락처</div>
                    <div className="travel-detail-info-devider">{"|"}</div>
                    <div className="travel-detail-info">
                        {tourAttractionsTelNumber}
                    </div>
                </div>
                <div className="travel-location">
                    <div className="travel-title">지역</div>
                    <div className="travel-detail-info-devider">{"|"}</div>
                    <div className="travel-detail-info">
                        {tourAttractionsLocation}
                    </div>
                </div>
                <div className="travel-hours">
                    <div className="travel-title">운영시간</div>
                    <div className="travel-detail-info-devider">{"|"}</div>
                    <div className="travel-detail-info">
                        {tourAttractionsHours}
                    </div>
                </div>
                <div className="travel-list-table-outline">
                    <div className="travel-outline-text">
                        <div className="travel-title">개요</div>
                        <div className="travel-detail-info">
                            {tourAttractionsOutline}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
