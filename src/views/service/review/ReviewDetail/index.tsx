import { useNavigate, useParams } from "react-router";
import "./style.css";
import { useCookies } from "react-cookie";
import { useReviewNumberStore, useScheduleButtonStore, useScheduleNumberStore, useScheduleStore, useUserStore, useViewListStore } from "src/stores";
import { ChangeEvent, useEffect, useState } from "react";
import { REVIEW_ABSOULUTE_PATH, REVIEW_UPDATE_ABSOLUTE_PATH } from "src/constant";
import {
    GetTravelReviewCommentListResponseDto,
    GetTravelReviewDetailResponseDto,
    GetTravelReviewFavoriteStatusResponseDto,
} from "src/apis/review/dto/response";
import ResponseDto from "src/apis/response.dto";
import { postUserNickNameRequest } from "src/apis/user";
import { PostUserNickNameRequestDto } from "src/apis/user/dto/request";
import {
    deleteTravelReviewCommentRequest,
    deleteTravelReviewReqeust,
    patchFavoriteRequest,
    getTravelReviewCommentListRequest,
    getTravelReviewDetailRequest,
    getTravelReviewFavoriteStatusRequest,
    increaseViewCountRequest,
    postTravelReviewCommentRequest,
} from "src/apis/review";
import { PostUserNickNameResponseDto } from "src/apis/user/dto/response";
import { ExpenditureList, ReviewCommentList, ScheduleList } from "src/types";
import { PostTravelReviewCommentRequestDto } from "src/apis/review/dto/request";
import { getScheduleDetailRequest } from "src/apis/schedule";
import { GetScheduleDetailResponseDto } from "src/apis/schedule/dto/response";
import { YYYYMMDD, numberCommas } from "src/utils";

//                    component: 스케쥴 일정 리스트 컴포넌트                     //
function ScheduleListItems({ scheduleDate, scheduleContent, scheduleStartTime, scheduleEndTime }: ScheduleList) {
    //                    render                     //
    return (
        <div className="schedule-list-box">
            <div>{YYYYMMDD(new Date(scheduleDate))}</div>
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

//                    Component : 리뷰 게시판 상세보기 화면 컴포넌트                     //
export default function ReviewDetail() {
    //                    state                    //
    const { reviewNumber } = useParams();
    const [cookies] = useCookies();

    const [reviewWriterId, setReviewWriterId] = useState<string>("");
    const [reviewWriterNickName, setReviewWriterNickName] = useState<string>("");
    const [reviewDatetime, setReviewDatetime] = useState<string>("");
    const [reviewViewCount, setReviewViewCount] = useState<number>(0);
    const [reviewFavoriteCount, setReviewFavoriteCount] = useState<number>(0);
    const [reviewTitle, setReviewTitle] = useState<string>("");
    const [reviewContents, setReviewContents] = useState<string>("");
    const [travelReviewImageUrl, setTravelReviewImageUrl] = useState<string[]>([]);
    const [commentContent, setCommentContent] = useState<string>("");
    const [commentList, setCommentList] = useState<ReviewCommentList[]>([]);
    const [recommendStatus, setRecommendstate] = useState<boolean>(false);

    const { scheduleRenderStatus, setScheduleRenderStatus } = useScheduleButtonStore();
    const { scheduleListItemViewList, expenditureViewList, setExpenditureViewList, setScheduleListItemViewList } = useViewListStore();
    const { travelSchedulePeople, travelScheduleTotalMoney, setTravelSchedulePeople, setTravelScheduleTotalMoney } = useScheduleStore();
    const { travelScheduleNumber, setTravelScheduleNumber } = useScheduleNumberStore();
    const { loginUserId, loginUserRole } = useUserStore();
    const { setUpdateReviewNumber } = useReviewNumberStore();

    const balnace = travelScheduleTotalMoney - expenditureViewList.reduce((acc, item) => acc + item.travelScheduleExpenditure, 0);
    const duchPay = balnace / travelSchedulePeople;

    //                    function                    //
    const navigator = useNavigate();

    const increaseViewCountResponse = (result: ResponseDto | null) => {
        const message = !result
            ? "서버에 문제가 있습니다."
            : result.code === "NB"
            ? "존재하지 않는 게시글입니다."
            : result.code === "DBE"
            ? "서버에 문제가 있습니다."
            : "";

        if (!result || result.code !== "SU") {
            alert(message);
            return;
        }

        if (!reviewNumber) return;

        getTravelReviewDetailRequest(reviewNumber).then(getTravelReviewDetailResponse);
    };

    const postUserNickNameResponse = (result: ResponseDto | PostUserNickNameResponseDto | null) => {
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

        const { nickName } = result as PostUserNickNameResponseDto;

        setReviewWriterNickName(nickName);
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

        const {
            reviewTitle,
            reviewContent,
            writerId,
            reviewDatetime,
            travelReviewImageUrl,
            reviewViewCount,
            reviewFavoriteCount,
            commentContent,
            travelScheduleNumber,
        } = result as GetTravelReviewDetailResponseDto;

        const requestBody: PostUserNickNameRequestDto = { userId: writerId };
        postUserNickNameRequest(requestBody).then(postUserNickNameResponse);

        setReviewTitle(reviewTitle);
        setReviewContents(reviewContent);
        setReviewWriterId(writerId);
        const datetime = reviewDatetime.slice(0, 10);
        setReviewDatetime(datetime);
        setTravelReviewImageUrl(travelReviewImageUrl);
        setReviewViewCount(reviewViewCount);
        setReviewFavoriteCount(reviewFavoriteCount);
        setTravelScheduleNumber(travelScheduleNumber);
        if (!travelScheduleNumber) {
            setScheduleRenderStatus(false);
            return;
        }
        getScheduleDetailRequest(travelScheduleNumber, cookies.accessToken).then(getScheduleDetailResponse);
    };

    const getScheduleDetailResponse = (result: ResponseDto | GetScheduleDetailResponseDto | null) => {
        const message = !result
            ? "서버에 문제가 있습니다."
            : result.code === "VF"
            ? "잘못된 게시글번호입니다."
            : result.code === "AF"
            ? "인증에 실패했습니다."
            : result.code === "DBE"
            ? "서버에 문제가 있습니다."
            : "";

        if (!result || result.code !== "SU") {
            alert(message);
            navigator(REVIEW_ABSOULUTE_PATH);
            return;
        }

        const { expenditureList, scheduleList, travelSchedulePeople, travelScheduleTotalMoney } = result as GetScheduleDetailResponseDto;
        setExpenditureViewList(expenditureList);
        setScheduleListItemViewList(scheduleList);
        setTravelSchedulePeople(travelSchedulePeople);
        setTravelScheduleTotalMoney(travelScheduleTotalMoney);
        setScheduleRenderStatus(true);
    };

    const deleteTravelReviewResponse = (result: ResponseDto | null) => {
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

        navigator(REVIEW_ABSOULUTE_PATH);
    };

    const getTravelReviewCommentListResponse = (result: ResponseDto | GetTravelReviewCommentListResponseDto | null) => {
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

        const { reviewCommentList } = result as GetTravelReviewCommentListResponseDto;
        setCommentList(reviewCommentList);
    };

    const postTravelReviewCommentResponse = (result: ResponseDto | null) => {
        const message = !result
            ? "서버에 문제가 있습니다."
            : result.code === "VF"
            ? "댓글을 입력해 주세요."
            : result.code === "AF"
            ? "인증에 실패했습니다."
            : result.code === "NB"
            ? "존재하지 않는 댓글입니다."
            : result.code === "DBE"
            ? "서버에 문제가 있습니다."
            : "";

        if (!result || result.code !== "SU") {
            alert(message);
            return;
        }

        alert("댓글 작성에 성공하셨습니다.");
        window.location.href = window.location.href;
    };

    const patchFavoriteResponse = (result: ResponseDto | null) => {
        const message = !result
            ? "서버에 문제가 있습니다."
            : result.code === "NB"
            ? "존재하지 않는 게시글입니다."
            : result.code === "DBE"
            ? "서버에 문제가 있습니다."
            : "";

        if (!result || result.code !== "SU") {
            alert(message);
            return;
        }

        if (!reviewNumber) return;

        getTravelReviewDetailRequest(reviewNumber).then(getTravelReviewDetailResponse);
    };

    const getTravelReviewFavoriteStatusResponse = (result: ResponseDto | GetTravelReviewFavoriteStatusResponseDto | null) => {
        const message = !result
            ? "서버에 문제가 있습니다."
            : result.code === "NB"
            ? "존재하지 않는 게시글입니다."
            : result.code === "AF"
            ? "로그인후 이용해주세요."
            : result.code === "DBE"
            ? "서버에 문제가 있습니다."
            : "";
        if (!cookies.accessToken) return;

        if (!result || result.code !== "SU") {
            alert(message);
            return;
        }

        const { favoriteStatus } = result as GetTravelReviewFavoriteStatusResponseDto;

        setRecommendstate(favoriteStatus);
    };

    //                    event handler                    //
    const onListButtonClickHandler = () => {
        navigator(REVIEW_ABSOULUTE_PATH);
    };

    const onUpdateButtonClickHandler = () => {
        if (loginUserId !== reviewWriterId) {
            alert("권한이 없습니다.");
            navigator(REVIEW_ABSOULUTE_PATH);
            return;
        }
        if (!reviewNumber) {
            alert("존재하지 않는 게시글 입니니다.");
            navigator(REVIEW_ABSOULUTE_PATH);
            return;
        }
        setUpdateReviewNumber(reviewNumber);
        navigator(REVIEW_UPDATE_ABSOLUTE_PATH(reviewNumber));
    };

    const onDeleteButtonClickHandler = () => {
        if (loginUserId !== reviewWriterId && loginUserRole !== "ROLE_ADMIN") {
            alert("권한이 없습니다.");
            return;
        }
        if (!reviewNumber) {
            alert("존재하지 않는 게시글 입니니다.");
            return;
        }
        deleteTravelReviewReqeust(reviewNumber, cookies.accessToken).then(deleteTravelReviewResponse);
    };

    const onWriteCommentButtonClickHandler = () => {
        if (!cookies.accessToken) {
            alert("로그인후 이용해주세요");
            return;
        }
        if (!reviewNumber) {
            alert("존재하지 않는 게시글 입니다.");
            return;
        }
        const requestBody: PostTravelReviewCommentRequestDto = { commentContent, commentParentsNumber: null };
        postTravelReviewCommentRequest(reviewNumber, requestBody, cookies.accessToken).then(postTravelReviewCommentResponse);
    };

    const onCommentContentChageHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const commentContent = event.target.value;
        setCommentContent(commentContent);
    };

    const onRecommendButtonClickHandler = () => {
        if (!cookies.accessToken) {
            alert("로그인후 이용해주세요");
            return;
        }
        if (!reviewNumber) {
            alert("존재하지 않는 게시글 입니다.");
            return;
        }
        setRecommendstate(!recommendStatus);
        patchFavoriteRequest(reviewNumber, cookies.accessToken).then(patchFavoriteResponse);
    };

    //                    Component : 리뷰 게시판 댓글 리스트 화면 컴포넌트                     //
    function ReviewCommentLists({ reviewCommentNumber, reviewCommentWriterId, commentContent, commentParentsNumber }: ReviewCommentList) {
        //                    state                    //
        const { reviewNumber } = useParams();
        const [cookies] = useCookies();
        const [recommentContent, setRecommendContent] = useState<string>("");
        const [childList, setChildList] = useState<ReviewCommentList[]>([]);
        const [commentWriterNickName, setCommentWriterNickName] = useState<string>("");

        const { loginUserId } = useUserStore();

        //                    function                    //
        const postTravelReviewCommentResponse = (result: ResponseDto | null) => {
            const message = !result
                ? "서버에 문제가 있습니다."
                : result.code === "VF"
                ? "댓글을 입력해 주세요."
                : result.code === "AF"
                ? "인증에 실패했습니다."
                : result.code === "NB"
                ? "존재하지 않는 댓글입니다."
                : result.code === "DBE"
                ? "서버에 문제가 있습니다."
                : "";

            if (!result || result.code !== "SU") {
                alert(message);
                return;
            }

            alert("댓글 작성에 성공하셨습니다.");
            setRecommendstate(!recommendstate);
            window.location.href = window.location.href;
        };

        const postCommentUserNickNameResponse = (result: ResponseDto | PostUserNickNameResponseDto | null) => {
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

            const { nickName } = result as PostUserNickNameResponseDto;

            setCommentWriterNickName(nickName);
        };

        const requestBody: PostUserNickNameRequestDto = { userId: reviewCommentWriterId };
        postUserNickNameRequest(requestBody).then(postCommentUserNickNameResponse);

        const deleteTravelReviewCommentResponse = (result: ResponseDto | null) => {
            const message = !result
                ? "서버에 문제가 있습니다."
                : result.code === "VF"
                ? "존재하지 않는 댓글입니다."
                : result.code === "AF"
                ? "인증에 실패했습니다."
                : result.code === "NB"
                ? "존재하지 않는 댓글입니다."
                : result.code === "DBE"
                ? "서버에 문제가 있습니다."
                : "";

            if (!result || result.code !== "SU") {
                alert(message);
                return;
            }

            alert("댓글 삭제에 성공하셨습니다.");
            setRecommendstate(!recommendstate);
            window.location.href = window.location.href;
        };

        //                    event handler                    //
        const onRecommendWriteClickHandler = () => {
            if (!reviewNumber || !reviewCommentNumber) return;
            const requestBody: PostTravelReviewCommentRequestDto = { commentContent: recommentContent, commentParentsNumber: reviewCommentNumber };
            postTravelReviewCommentRequest(reviewNumber, requestBody, cookies.accessToken).then(postTravelReviewCommentResponse);
        };

        const onRecommendButtonClickHandler = () => {
            setRecommendstate(!recommendstate);
        };

        const onRecommendCotentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
            const recommentContent = event.target.value;
            setRecommendContent(recommentContent);
        };

        const onCommentDeleteButtonClickHandler = () => {
            if (!reviewNumber || !reviewCommentNumber) return;
            deleteTravelReviewCommentRequest(reviewCommentNumber, reviewNumber, cookies.accessToken).then(deleteTravelReviewCommentResponse);
        };

        //                    effect                    //
        useEffect(() => {
            const childList = commentList.filter((item) => item.commentParentsNumber === reviewCommentNumber);
            setChildList(childList);
        }, [reviewCommentNumber]);

        //                    render                    //
        const [recommendstate, setRecommendstate] = useState<boolean>(true);
        return (
            <div>
                <div className="comments-nick-name">{commentWriterNickName}</div>
                {recommendstate ? (
                    <div className="comments-content-box">
                        <div className="comments-content">{commentContent}</div>
                        <div className="comments-button-box"></div>
                        <div className="comments-recommend" onClick={onRecommendButtonClickHandler}>
                            답글달기
                        </div>
                        {loginUserId === reviewCommentWriterId && (
                            <div className="comment-delete-button" onClick={onCommentDeleteButtonClickHandler}>
                                삭제
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="comments-content-box">
                        <div className="comments-content">
                            {commentContent}
                            <div className="comments-recommend-box">
                                <textarea
                                    className="recomment-textarea"
                                    placeholder="댓글을 입력해주세요."
                                    value={recommentContent}
                                    onChange={onRecommendCotentChangeHandler}
                                />
                                <div className="comments-recommend-button" onClick={onRecommendWriteClickHandler}>
                                    댓글작성
                                </div>
                            </div>
                        </div>
                        {loginUserId === reviewCommentWriterId && (
                            <div className="comment-delete-button" onClick={onCommentDeleteButtonClickHandler}>
                                삭제
                            </div>
                        )}
                    </div>
                )}
                <div style={{ paddingLeft: "40px" }}>
                    {childList.map((item) => (
                        <ReviewCommentLists {...item} />
                    ))}
                </div>
            </div>
        );
    }

    //                    effect                    //
    useEffect(() => {
        if (!reviewNumber) {
            alert("서버에 문제가 있습니다.");
            navigator(REVIEW_ABSOULUTE_PATH);
            return;
        }
        increaseViewCountRequest(reviewNumber).then(increaseViewCountResponse);
        getTravelReviewCommentListRequest(reviewNumber).then(getTravelReviewCommentListResponse);
        if (!cookies.accessToken) return;
        getTravelReviewFavoriteStatusRequest(reviewNumber, cookies.accessToken).then(getTravelReviewFavoriteStatusResponse);
    }, []);

    //                    render                    //
    const userStatus =
        loginUserId !== reviewWriterId ? (
            loginUserRole !== "ROLE_ADMIN" ? (
                <></>
            ) : (
                <div className="review-detail-user-role">
                    <div className="primary-button review-middle-button" onClick={onDeleteButtonClickHandler}>
                        삭제
                    </div>
                </div>
            )
        ) : (
            <div className="review-detail-user-role">
                <div className="primary-button review-middle-button" onClick={onUpdateButtonClickHandler}>
                    수정
                </div>
                <div className="primary-button review-middle-button" onClick={onDeleteButtonClickHandler}>
                    삭제
                </div>
            </div>
        );
    return (
        <div id="reivew-detail-wrapper">
            <div className="review-detail-top-info">
                <div>작성자</div>
                <div>{reviewWriterNickName}</div>
                <div>|</div>
                <div>작성일</div>
                <div>{reviewDatetime}</div>
                <div>|</div>
                <div>조회수</div>
                <div>{reviewViewCount}</div>
                <div>|</div>
                <div>추천수</div>
                <div>{reviewFavoriteCount}</div>
            </div>

            {scheduleRenderStatus && (
                <div id="schedule-wrapper">
                    {scheduleListItemViewList.length !== 0 && expenditureViewList.length !== 0 && (
                        <>
                            <div id="schedule-list-item-wrapper">
                                {scheduleListItemViewList.map((item) => (
                                    <ScheduleListItems {...item} />
                                ))}
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
                                {expenditureViewList.map((item) => (
                                    <ExpenditureListItems {...item} />
                                ))}
                                <div className="balance-duchPay">
                                    <div>잔액</div>
                                    <div>{numberCommas(Number(balnace))} 원</div>
                                    <div>|</div>
                                    <div>더치페이</div>
                                    <div>{numberCommas(Number(duchPay))} 원</div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}

            <div className="review-detail-content-wrapper">
                <div className="review-detail-title-box">
                    <div className="review-detail-title">{reviewTitle}</div>
                    {recommendStatus ? (
                        <div className="recommend-button-clicked" onClick={onRecommendButtonClickHandler}></div>
                    ) : (
                        <div className="recommend-button" onClick={onRecommendButtonClickHandler}></div>
                    )}
                </div>
                {travelReviewImageUrl === null ? (
                    <div className="travel-list-picture">
                        <img title="travel" width="200px" height="135px" src={`${"https://cdn-icons-png.flaticon.com/128/11423/11423562.png"}`} />
                    </div>
                ) : (
                    travelReviewImageUrl.map((url) => (
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
                    ))
                )}
                <div className="review-detail-content">{reviewContents}</div>
            </div>

            <div className="review-detail-middle">
                <div className="list-page-box under-line-text">
                    <div className="list-page-navi" onClick={onListButtonClickHandler}>
                        목록보기
                    </div>
                </div>
                {userStatus}
            </div>

            <div className="review-detail-bottom">
                {commentList === null || commentList.length === 0 ? (
                    <></>
                ) : (
                    <div className="review-detail-comments-box">
                        {commentList
                            .filter((item) => !item.commentParentsNumber)
                            .map((item) => (
                                <>
                                    <ReviewCommentLists {...item} />
                                </>
                            ))}
                    </div>
                )}
                <div className="review-detail-comment-textarea-box">
                    <textarea
                        className="comment-textarea"
                        placeholder="댓글을 입력해주세요."
                        value={commentContent}
                        onChange={onCommentContentChageHandler}
                    />
                    <div className="primary-button comment-button" onClick={onWriteCommentButtonClickHandler}>
                        댓글달기
                    </div>
                </div>
            </div>
        </div>
    );
}
