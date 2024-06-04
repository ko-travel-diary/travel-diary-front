import { ChangeEvent, useEffect, useRef, useState } from "react";
import "./style.css";
import { useCookies } from "react-cookie";
import { getTravelReviewDetailRequest, patchTravelReviewRequestDto } from "src/apis/review";
import { PatchTravelReviewRequestDto } from "src/apis/review/dto/request";
import { useReviewNumberStore } from "src/stores/useReviewNumberStores";
import { GetTravelReviewDetailResponseDto } from "src/apis/review/dto/response";
import ResponseDto from "src/apis/response.dto";
import { useNavigate } from "react-router";
import { PostUserNickNameRequestDto } from "src/apis/user/dto/request";
import { IMAGE_UPLOAD_URL, REVIEW_ABSOULUTE_PATH, REVIEW_DETAIL_ABSOLUTE_PATH } from "src/constant";
import { useUserStore } from "src/stores";
import axios from "axios";
import { expenditureList, scheduleList, scheduleListViewItem } from "src/types";
import { getScheduleDetailRequest, getScheduleListRequest } from "src/apis/schedule";
import { GetScheduleDetailResponseDto, GetScheduleListResponseDto } from "src/apis/schedule/dto/response";
import { useScheduleStore } from "src/stores/useScheduleStores";
import { useScheduleButtonStore } from "src/stores/useScheduleButtonStores";
import useViewListStore from "src/stores/useViewListStores/viewList.store";

//                    component: 스케쥴 리스트 컴포넌트                     //
function ScheduleList({ travelScheduleNumber, travelScheduleName }: scheduleListViewItem) {
    //                    state                     //
    const [cookies] = useCookies();
    const { setTravelSchedulePeople, setTravelScheduleTotalMoney } = useScheduleStore();
    const { scheduleButtonStatus, setScheduleButtonStatus, scheduleRenderStatus, setScheduleRenderStatus } = useScheduleButtonStore();
    const { setExpenditureViewList, setScheduleListItemViewList } = useViewListStore();
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
    const onTravelScheduleNameButtonClickHandler = () => {
        if (!cookies.accessToken) {
            alert("로그인 후 이용해주세요.");
            return;
        }
        getScheduleDetailRequest(travelScheduleNumber, cookies.accessToken).then(getScheduleDetailResponse);
        setScheduleButtonStatus(!scheduleButtonStatus);
        setScheduleRenderStatus(!scheduleRenderStatus);
    };

    //                    render                     //
    return (
        <div className="my-travel-diary-content" style={{ color: "black" }} onClick={onTravelScheduleNameButtonClickHandler}>
            {travelScheduleName}
        </div>
    );
}
//                    component: 스케쥴 일정 리스트 컴포넌트                     //
function ScheduleListItems({ scheduleDate, scheduleContent, scheduleStartTime, scheduleEndTime }: scheduleList) {
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
function ExpenditureListItems({ travelScheduleExpenditureDetail, travelScheduleExpenditure }: expenditureList) {
    //                    render                     //
    return (
        <div className="expenditure-item">
            <div>{travelScheduleExpenditureDetail}</div>
            <div>{travelScheduleExpenditure}</div>
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
    const [reviewWriterId, setReviewWriterId] = useState<string>("");

    const [reviewContent, setReivewContent] = useState<string>("");
    const [reviewTitle, setReviewTitle] = useState<string>("");
    const [travelReviewImage, setTravelReviewImage] = useState<File[]>([]);
    const [travelReviewImageUrl, setTravelReviewImageUrl] = useState<string[]>([]);
    const photoInput = useRef<HTMLInputElement | null>(null);
    const [viewList, setViewList] = useState<scheduleListViewItem[]>([]);
    const [myTravelDiaryLoadButtonStatus, setMyTravelDiaryLoadButtonStatus] = useState<boolean>(false);
    const { scheduleButtonStatus, setScheduleButtonStatus, scheduleRenderStatus } = useScheduleButtonStore();
    const { expenditureViewList, scheduleListItemViewList } = useViewListStore();

    const { travelSchedulePeople, travelScheduleTotalMoney } = useScheduleStore();

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

        console.log(result);

        if (!result || result.code !== "SU") {
            alert(message);
            return;
        }

        const { scheduleListViewItems } = result as GetScheduleListResponseDto;
        setViewList(scheduleListViewItems);
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

        const { reviewTitle, reviewContent, writerId } = result as GetTravelReviewDetailResponseDto;

        setReviewTitle(reviewTitle);
        setReivewContent(reviewContent);
        setReviewWriterId(writerId);
        setTravelReviewImageUrl(travelReviewImageUrl);
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

    const imageInputOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || !event.target.files.length) return;
        const file = event.target.files[0];
        setTravelReviewImage([...travelReviewImage, file]);
        const url = URL.createObjectURL(file);
        setTravelReviewImageUrl([...travelReviewImageUrl, url]);
    };

    const onPostReviewButtonClickHandler = async () => {
        if (!reviewTitle.trim() || !reviewContent.trim()) return;
        if (!cookies.accessToken) return;

        const travelReviewImageUrl: string[] = [];

        // travelReviewImage upload 반복작업
        for (const image of travelReviewImage) {
            const data = new FormData();
            data.append("file", image);
            const url = await axios
                .post(IMAGE_UPLOAD_URL, data, { headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${cookies.accessToken}` } })
                .then((response) => response.data as string)
                .catch((error) => null);
            if (!url) continue;
            console.log(url);
            travelReviewImageUrl.push(url);
        }

        const requestBody: PatchTravelReviewRequestDto = { reviewTitle, reviewContent, travelReviewImageUrl };
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
        setMyTravelDiaryLoadButtonStatus(!myTravelDiaryLoadButtonStatus);
        setScheduleButtonStatus(!scheduleButtonStatus);
        getScheduleListRequest(cookies.accessToken).then(getScheduleListResponse);
    };

    //                     effect                     //
    useEffect(() => {
        if (!cookies.accessToken) return;

        getTravelReviewDetailRequest(updateReviewNumber).then(getTravelReviewDetailResponse);
    }, []);

    useEffect(() => {
        if (myTravelDiaryLoadButtonStatus) getScheduleListRequest(cookies.accessToken).then(getScheduleListResponse);
    }, [myTravelDiaryLoadButtonStatus]);

    //                    render : review 수정 화면 컴포넌트                     //
    return (
        <div id="review-write-wrapper">
            <div className="null-box"></div>
            {scheduleRenderStatus && (
                <div id="schedule-wrapper">
                    <div id="schedule-list-item-wrapper">
                        {scheduleListItemViewList && scheduleListItemViewList.map((item) => <ScheduleListItems {...item} />)}
                    </div>
                    <div id="expenditure-list-item-wrapper">
                        <div> 가계부</div>
                        <div className="total-people-money-box">
                            <div>인원수</div>
                            <div>|</div>
                            <div className="total-people">{travelSchedulePeople}</div>
                            <div>총 금액</div>
                            <div>|</div>
                            <div className="total-money">{travelScheduleTotalMoney}</div>
                        </div>
                        {expenditureViewList && expenditureViewList.map((item) => <ExpenditureListItems {...item} />)}
                        <div className="balance-duchPay">
                            <div>잔액</div>
                            <div>{balnace}</div>
                            <div>|</div>
                            <div>더치페이</div>
                            <div>{duchPay}</div>
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
                                <ScheduleList {...item} />
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
                    {travelReviewImageUrl.map((url) => (
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
                        ></div>
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
                <div className="primary-button" onClick={onPostReviewButtonClickHandler}>
                    올리기
                </div>
            </div>
        </div>
    );
}
