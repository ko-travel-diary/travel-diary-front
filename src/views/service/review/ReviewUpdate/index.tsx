import { ChangeEvent, useEffect, useRef, useState } from "react";
import "./style.css";
import { useCookies } from "react-cookie";
import { getTravelReviewDetailRequest, patchTravelReviewRequestDto } from "src/apis/review";
import { PatchTravelReviewRequestDto } from "src/apis/review/dto/request";
import { GetTravelReviewDetailResponseDto } from "src/apis/review/dto/response";
import ResponseDto from "src/apis/response.dto";
import { useNavigate } from "react-router";
import { IMAGE_UPLOAD_URL, REVIEW_ABSOULUTE_PATH, REVIEW_DETAIL_ABSOLUTE_PATH } from "src/constant";
import { useReviewNumberStore, useScheduleButtonStore, useScheduleNumberStore, useScheduleStore, useUserStore, useViewListStore } from "src/stores";
import axios from "axios";
import { ExpenditureList, ScheduleList, ScheduleListViewItem } from "src/types";
import { getScheduleDetailRequest, getScheduleListRequest } from "src/apis/schedule";
import { GetScheduleDetailResponseDto, GetScheduleListResponseDto } from "src/apis/schedule/dto/response";
import { numberCommas } from "src/utils";

//                    component: 스케쥴 리스트 컴포넌트                     //
function ScheduleListView({ travelScheduleNumber, travelScheduleName }: ScheduleListViewItem) {
    //                    state                     //
    const [cookies] = useCookies();
    const { setTravelSchedulePeople, setTravelScheduleTotalMoney } = useScheduleStore();
    const { scheduleButtonStatus, setScheduleButtonStatus, scheduleRenderStatus, setScheduleRenderStatus } = useScheduleButtonStore();
    const { setExpenditureViewList, setScheduleListItemViewList } = useViewListStore();
    const { setTravelScheduleNumber } = useScheduleNumberStore();

    //                    function                     //
    const getScheduleDetailResponse = (result: GetScheduleDetailResponseDto | ResponseDto | null) => {
        const message = !result
            ? "서버에 문제가 있습니다."
            : result.code === "VF"
            ? "제목과 내용을 모두 입력해주세요."
            : result.code === "AF"
            ? "권한이 없습니다."
            : result.code === "DBE"
            ? "서버에 문제가 있습니다."
            : "";

        if (!result || result.code !== "SU") {
            alert(message);
            return;
        }

        const { travelSchedulePeople, travelScheduleTotalMoney, expenditureList, scheduleList } = result as GetScheduleDetailResponseDto;
        setTravelSchedulePeople(travelSchedulePeople);
        setTravelScheduleTotalMoney(travelScheduleTotalMoney);
        setExpenditureViewList(expenditureList);
        setScheduleListItemViewList(scheduleList);
    };

    //                    event handler                     //
    const onTravelScheduleNameClickHandler = () => {
        if (!cookies.accessToken) {
            alert("로그인 후 이용해주세요.");
            return;
        }
        getScheduleDetailRequest(travelScheduleNumber, cookies.accessToken).then(getScheduleDetailResponse);
        setTravelScheduleNumber(travelScheduleNumber);
        setScheduleButtonStatus(!scheduleButtonStatus);
        const renderStatus = scheduleRenderStatus ? !scheduleRenderStatus : scheduleRenderStatus;
        setScheduleRenderStatus(!renderStatus);
    };

    //                    render                     //
    return (
        <div className="my-travel-diary-content" style={{ color: "black" }} onClick={onTravelScheduleNameClickHandler}>
            {travelScheduleName}
        </div>
    );
}
//                    component: 스케쥴 일정 리스트 컴포넌트                     //
function ScheduleListItems({ scheduleDate, scheduleContent, scheduleStartTime, scheduleEndTime }: ScheduleList) {
    //                    render                     //
    return (
        <div className="schedule-list-box">
            <div>{scheduleDate}</div>
            <div className="schedule-item">
                <div>{scheduleContent}</div>
                <div>{scheduleStartTime}</div>
                <div>{scheduleEndTime}</div>
            </div>
        </div>
    );
}
//                    component: 스케쥴 금액 리스트 컴포넌트                     //
function ExpenditureListItems({ travelScheduleExpenditureDetail, travelScheduleExpenditure }: ExpenditureList) {
    //                    render                     //
    return (
        <div className="expenditure-item">
            <div>{travelScheduleExpenditureDetail}</div>
            <div>{numberCommas(Number(travelScheduleExpenditure))} 원</div>
        </div>
    );
}

//                    component: 리뷰 수정 컴포넌트                     //
export default function ReviewUpdate() {
    //                    state                     //
    const { updateReviewNumber } = useReviewNumberStore();
    const { loginUserId } = useUserStore();
    const [cookies] = useCookies();

    const contentsRef = useRef<HTMLTextAreaElement | null>(null);
    const photoInput = useRef<HTMLInputElement | null>(null);

    const [reviewWriterId, setReviewWriterId] = useState<string>("");
    const [reviewContent, setReivewContent] = useState<string>("");
    const [reviewTitle, setReviewTitle] = useState<string>("");
    const [travelReviewImages, setTravelReviewImages] = useState<File[]>([]);
    const [travelReviewImageUrl, setTravelReviewImageUrl] = useState<string[]>([]);
    const [viewList, setViewList] = useState<ScheduleListViewItem[]>([]);
    const { scheduleButtonStatus, setScheduleButtonStatus, scheduleRenderStatus, setScheduleRenderStatus } = useScheduleButtonStore();
    const { expenditureViewList, scheduleListItemViewList } = useViewListStore();

    const { travelSchedulePeople, travelScheduleTotalMoney, setTravelSchedulePeople, setTravelScheduleTotalMoney } = useScheduleStore();
    const { setExpenditureViewList, setScheduleListItemViewList } = useViewListStore();
    const { travelScheduleNumber, setTravelScheduleNumber } = useScheduleNumberStore();

    const balnace = travelScheduleTotalMoney - expenditureViewList.reduce((acc, item) => acc + item.travelScheduleExpenditure, 0);
    const duchPay = balnace / travelSchedulePeople;

    //                    function                    //
    const navigator = useNavigate();

    const getScheduleListResponse = (result: ResponseDto | GetScheduleListResponseDto | null) => {
        const message = !result
            ? "서버에 문제가 있습니다."
            : result.code === "AF"
            ? "권한이 없습니다."
            : result.code === "DBE"
            ? "서버에 문제가 있습니다."
            : "";

        if (!result || result.code !== "SU") {
            alert(message);
            return;
        }

        const { scheduleListViewItems } = result as GetScheduleListResponseDto;
        setViewList(scheduleListViewItems);
    };
    
    const getScheduleDetailResponse = (result: GetScheduleDetailResponseDto | ResponseDto | null) => {
        const message = !result
            ? "서버에 문제가 있습니다."
            : result.code === "VF"
            ? "제목과 내용을 모두 입력해주세요."
            : result.code === "AF"
            ? "권한이 없습니다."
            : result.code === "DBE"
            ? "서버에 문제가 있습니다."
            : "";

        if (!result || result.code !== "SU") {
            alert(message);
            return;
        }

        const { travelSchedulePeople, travelScheduleTotalMoney, expenditureList, scheduleList } = result as GetScheduleDetailResponseDto;
        setTravelSchedulePeople(travelSchedulePeople);
        setTravelScheduleTotalMoney(travelScheduleTotalMoney);
        setExpenditureViewList(expenditureList);
        setScheduleListItemViewList(scheduleList);
        setTravelScheduleNumber(travelScheduleNumber);
    };

    const getTravelReviewDetailResponse = (result: GetTravelReviewDetailResponseDto | ResponseDto | null) => {
        const message = !result
            ? "서버에 문제가 있습니다."
            : result.code === "VF"
            ? "잘못된 게시글번호입니다."
            : result.code === "AF"
            ? "인증에 실패했습니다."
            : result.code === "NB"
            ? "존재하지 않는 게시글번호입니다."
            : result.code === "DBE"
            ? "서버에 문제가 있습니다."
            : "";

        if (!result || result.code !== "SU") {
            alert(message);
            navigator(REVIEW_ABSOULUTE_PATH);
            return;
        }

        const { reviewTitle, reviewContent, writerId, travelReviewImageUrl, travelScheduleNumber } = result as GetTravelReviewDetailResponseDto;

        setReviewTitle(reviewTitle);
        setReivewContent(reviewContent);
        setReviewWriterId(writerId);
        setTravelReviewImageUrl(travelReviewImageUrl);
        setTravelScheduleNumber(travelScheduleNumber);
        if (travelScheduleNumber === 0) return;
        getScheduleDetailRequest(travelScheduleNumber, cookies.accessToken).then(getScheduleDetailResponse);
    };

    const patchTravelReviewResponseDto = (result: ResponseDto | null) => {
        const message = !result
            ? "서버에 문제가 있습니다."
            : result.code === "VF"
            ? "제목과 내용을 모두 입력해주세요."
            : result.code === "AF"
            ? "권한이 없습니다."
            : result.code === "DBE"
            ? "서버에 문제가 있습니다."
            : "";

        if (!result || result.code !== "SU" || reviewWriterId !== loginUserId) {
            alert(message);
            navigator(REVIEW_ABSOULUTE_PATH);
            return;
        }

        navigator(REVIEW_DETAIL_ABSOLUTE_PATH(updateReviewNumber));
    };

    //                     event handler                     //
    const onReviewContentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const reivewContent = event.target.value;
        setReivewContent(reivewContent);

        if (!contentsRef.current) return;
        contentsRef.current.style.height = "auto";
        contentsRef.current.style.height = `${contentsRef.current.scrollHeight}px`;
    };

    const onReviewTitleChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const reviewTitle = event.target.value;
        setReviewTitle(reviewTitle);
    };

    const imageInputOnChange = async (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || !event.target.files.length) return;
        const file = event.target.files[0];
        const data = new FormData();
        data.append("file", file);
        const url = await axios
            .post(IMAGE_UPLOAD_URL, data, { headers: { "Content-Type": "multipart/form-data", 'Authorization': `Bearer ${cookies.accessToken}` } })
            .then((response) => response.data as string)
            .catch((error) => null);

        if (url)setTravelReviewImageUrl([...travelReviewImageUrl, url]);
    };

    const onPachReviewButtonClickHandler = () => {
        if (!reviewTitle.trim() || !reviewContent.trim()) return;
        if (!cookies.accessToken) return;

        const requestBody: PatchTravelReviewRequestDto = { reviewTitle, reviewContent, travelReviewImageUrl, travelScheduleNumber };
        patchTravelReviewRequestDto(updateReviewNumber, requestBody, cookies.accessToken).then(patchTravelReviewResponseDto);
    };

    const onImageUploadButtonClickHandler = () => {
        if (!photoInput.current) return;
        photoInput.current.click();
    };

    const onMyTravelDiaryLoadButtonClickHandler = () => {
        if (!cookies.accessToken) {
            alert("로그인 후 이용해주세요.");
            return;
        }
        setScheduleButtonStatus(!scheduleButtonStatus);
        getScheduleListRequest(cookies.accessToken).then(getScheduleListResponse);
    };

    const onImageDeleteButtonClickHandler = (deleteIndex: number) => {
        if (!photoInput.current) return;
        photoInput.current.value = "";

        const newTravelReviewImageUrls = travelReviewImageUrl.filter((url, index) => index !== deleteIndex);
        setTravelReviewImageUrl(newTravelReviewImageUrls);

        const newTravelReviewImages = travelReviewImages.filter((file, index) => index !== deleteIndex);
        setTravelReviewImages(newTravelReviewImages);
    };

    const onScheduleRenderDeleteButton = () => {
        setScheduleRenderStatus(!scheduleRenderStatus);
    };

    //                     effect                     //
    useEffect(() => {
        if (!cookies.accessToken) return;
        getTravelReviewDetailRequest(updateReviewNumber).then(getTravelReviewDetailResponse);
    }, []);

    useEffect(() => {
        if (scheduleButtonStatus) getScheduleListRequest(cookies.accessToken).then(getScheduleListResponse);
    }, [scheduleButtonStatus]);

    //                    render : review 수정 화면 컴포넌트                     //
    return (
        <div id="review-write-wrapper">
            {scheduleRenderStatus ? (
                <div className="schedule-delete-button-box">
                    <div className="schedule-delete-button" onClick={onScheduleRenderDeleteButton}></div>
                </div>
            ) : (
                <></>
            )}
            {scheduleRenderStatus && (
                <div id="schedule-wrapper">
                    <div id="schedule-list-item-wrapper">
                        {scheduleListItemViewList && scheduleListItemViewList.map((item) => <ScheduleListItems {...item} />)}
                    </div>
                    <div id="expenditure-list-item-wrapper">
                        <div> 가계부</div>
                        <div className="total-people-money-box">
                            <div>인원수</div>
                            <div className="total-people">{travelSchedulePeople} 명</div>
                            <div>|</div>
                            <div>총 금액</div>
                            <div className="total-money">{numberCommas(Number(travelScheduleTotalMoney))} 원</div>
                        </div>
                        {expenditureViewList && expenditureViewList.map((item) => <ExpenditureListItems {...item} />)}
                        <div className="balance-duchPay">
                            <div>잔액</div>
                            <div>{numberCommas(Number(balnace))} 원</div>
                            <div>|</div>
                            <div>더치페이</div>
                            <div>{numberCommas(Number(duchPay))} 원</div>
                        </div>
                    </div>
                </div>
            )}
            <div className="write-button-wrapper">
                <input
                    type="file"
                    accept="image/jpg, image/png"
                    multiple
                    ref={photoInput}
                    onChange={imageInputOnChange}
                    style={{ display: "none" }}
                />
                <div className="update-image-button primary-button" onClick={onImageUploadButtonClickHandler}>
                    사진 추가
                </div>
                {scheduleButtonStatus ? (
                    <div style={{ position: "relative" }}>
                        <div className="primary-button" onClick={onMyTravelDiaryLoadButtonClickHandler}>
                            나의 여행일정 불러오기
                        </div>
                        <div className="my-travel-diary-list-box">
                            {viewList.map((item) => (
                                <ScheduleListView {...item} />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="primary-button" onClick={onMyTravelDiaryLoadButtonClickHandler}>
                        나의 여행일정 불러오기
                    </div>
                )}
            </div>
            <div className="write-contents-box">
                <div className="write-title-box">
                    <textarea
                        placeholder="제목을 입력해주세요"
                        className="write-title-textarea"
                        onChange={onReviewTitleChangeHandler}
                        value={reviewTitle}
                    />
                </div>
                <div className="write-content-box">
                    {travelReviewImageUrl.map((url, index) => (
                        <div
                            className="review-detail-content"
                            key={url}
                            style={{
                                backgroundImage: `url(${url})`,
                                width: "200px",
                                height: "200px",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        >
                            <div className="delete-image-button" onClick={() => onImageDeleteButtonClickHandler(index)}></div>
                        </div>
                    ))}
                    <textarea
                        ref={contentsRef}
                        rows={10}
                        placeholder="내용을 입력해주세요"
                        maxLength={1000}
                        className="write-content-textarea"
                        onChange={onReviewContentChangeHandler}
                        value={reviewContent}
                    />
                </div>
            </div>
            <div className="write-update-button">
                <div className="primary-button" onClick={onPachReviewButtonClickHandler}>
                    올리기
                </div>
            </div>
        </div>
    );
}
