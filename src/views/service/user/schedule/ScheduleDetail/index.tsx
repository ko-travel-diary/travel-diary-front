import React, { useEffect, useState } from "react";
import "./style.css";
import { deleteScheduleRequest, getScheduleDetailRequest, getScheduleListRequest } from "src/apis/schedule";
import { GetScheduleDetailResponseDto, GetScheduleListResponseDto } from "src/apis/schedule/dto/response";
import {
    AUTH_ABSOLUTE_PATH,
    SCHEDULE_ABSOLUTE_PATH,
    SCHEDULE_DETAIL_ABSOLUTE_PATH,
    SCHEDULE_UPDATE_ABSOLUTE_PATH,
    SCHEDULE_WRITE_ABSOLUTE_PATH,
} from "src/constant";
import { ExpenditureList, ScheduleList, ScheduleListViewItem } from "src/types";
import ResponseDto from "src/apis/response.dto";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router";
import { useScheduleNameStore } from "src/stores/useScheduleNameStores";

const YYYYMMDD = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    //check zero padding
    return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
};

const numberCommas = (number: Number) => {
    return number.toLocaleString();
};

//                    Component : SCHEDULE LIST VIEW 컴포넌트                     //
function ScheduleListView({ travelScheduleName, travelScheduleNumber }: ScheduleListViewItem) {
    const { setTravelScheduleName } = useScheduleNameStore();
    //                     function                     //
    const navigator = useNavigate();

    //                     event handler                     //
    const onClickHandler = () => {
        navigator(SCHEDULE_DETAIL_ABSOLUTE_PATH(travelScheduleNumber));
        setTravelScheduleName(travelScheduleName);
    };

    //                    render : QnA 화면 컴포넌트                     //
    return (
        <div className="schedule-list" onClick={onClickHandler}>
            {travelScheduleName}
        </div>
    );
}

//                    Component : SCHEDULE LIST 컴포넌트                     //
function ScheduleListItem({ scheduleDate, scheduleContent, scheduleStartTime, scheduleEndTime }: ScheduleList) {
    //                    render : QnA 화면 컴포넌트                     //
    return (
        <div className="schedule-add-box">
            <div className="schedule-calendar-box">
                <div className="schedule-select-name">날짜</div>
                <div className="schedule-devider">{"|"}</div>
                <div className="schedule-date">{YYYYMMDD(new Date(scheduleDate))}</div>
            </div>
            <div className="schedule-text-box">
                <div className="schedule-select-name">내용</div>
                <div className="schedule-devider">{"|"}</div>
                <div className="schedule-text">{scheduleContent}</div>
                <div className="schedule-start-hour">{scheduleStartTime}</div>
                <div className="schedule-devider">{"~"}</div>
                <div className="schedule-end-hour">{scheduleEndTime}</div>
            </div>
        </div>
    );
}

//                    Component : SCHEDULE LIST 컴포넌트                     //
function ExpendListItem({ travelScheduleExpenditureDetail, travelScheduleExpenditure }: ExpenditureList) {
    //                    render : QnA 화면 컴포넌트                     //
    return (
        <div className="schedule-household-add-box">
            <div className="schedule-text">{travelScheduleExpenditureDetail}</div>
            <div className="schedule-text-money">{numberCommas(Number(travelScheduleExpenditure))}</div>
            <div className="schedule-select-devider-name">원</div>
        </div>
    );
}

//                    Component : SCHEDULE LIST 화면 컴포넌트                     //
export default function ScheduleDetail() {
    //                     state                     //
    const [cookies] = useCookies();
    const { travelScheduleNumber } = useParams();

    const [travelSchedulePeople, setTravelSchedulePeople] = useState<number>(1);
    const [travelScheduleTotalMoney, setTravelScheduleTotalMoney] = useState<number>(0);
    const [scheduleView, setScheduleView] = useState<ScheduleListViewItem[]>([]);
    const [scheduleList, setScheduleListItem] = useState<ScheduleList[]>([]);
    const [expenditureList, setExpenditureListItem] = useState<ExpenditureList[]>([]);

    const [scheduleViewList, setScheduleViewList] = useState<ScheduleListViewItem[]>([]);
    const [scheduleListViewList, setScheduleListViewList] = useState<ScheduleList[]>([]);
    const [expendListViewList, setExpendListViewList] = useState<ExpenditureList[]>([]);

    const { travelScheduleName } = useScheduleNameStore();

    const balnace = Array.isArray(expenditureList)
        ? travelScheduleTotalMoney - expenditureList.reduce((acc, item) => acc + item.travelScheduleExpenditure, 0)
        : 0;
    const duchPay = travelSchedulePeople > 0 ? Math.floor(balnace / travelSchedulePeople) : 0;

    //                     function                     //
    const navigator = useNavigate();

    const getScheduleListResponse = (result: GetScheduleListResponseDto | ResponseDto | null) => {
        const message = !result
            ? "서버에 문제가 있습니다."
            : result.code === "AF"
            ? "인증에 실패했습니다."
            : result.code === "DBE"
            ? "서버에 문제가 있습니다."
            : "";

        if (!result || result.code !== "SU") {
            alert(message);
            if (result?.code === "AF") navigator(AUTH_ABSOLUTE_PATH);
            return result;
        }

        const { scheduleListViewItems } = result as GetScheduleListResponseDto;
        changeScheduleViewList(scheduleListViewItems);
    };

    const getScheduleDetailResponse = (result: GetScheduleDetailResponseDto | ResponseDto | null) => {
        const message = !result
            ? "서버에 문제가 있습니다"
            : result.code === "VF"
            ? "잘못된 접수번호입니다."
            : result.code === "AF"
            ? "인증에 실패했습니다."
            : result.code === "NB"
            ? "존재하지 않는 접수번호입니다."
            : result.code === "DBE"
            ? "서버에 문제가 있습니다"
            : "";

        if (!result || result.code !== "SU") {
            alert(message);
            if (result?.code === "AF") {
                navigator(AUTH_ABSOLUTE_PATH);
                return result;
            }
            navigator(SCHEDULE_ABSOLUTE_PATH);
        }

        const { travelSchedulePeople, travelScheduleTotalMoney, expenditureList, scheduleList } = result as GetScheduleDetailResponseDto;
        setTravelSchedulePeople(travelSchedulePeople);
        setTravelScheduleTotalMoney(travelScheduleTotalMoney);
        setScheduleListItem(scheduleList);
        setExpenditureListItem(expenditureList);
        changeScheduleListViewList(scheduleList);
        changeExpendListViewList(expenditureList);
    };

    const deleteScheduleResponse = (result: ResponseDto | null) => {
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
            navigator(SCHEDULE_ABSOLUTE_PATH);
            return;
        }

        navigator(SCHEDULE_ABSOLUTE_PATH);
    };

    //                     event Handler                     //
    const changeScheduleViewList = (scheduleView: ScheduleListViewItem[]) => {
        setScheduleViewList(scheduleView);
    };

    const changeScheduleListViewList = (scheduleList: ScheduleList[]) => {
        setScheduleListViewList(scheduleList);
    };

    const changeExpendListViewList = (expenditureList: ExpenditureList[]) => {
        setExpendListViewList(expenditureList);
    };

    const onScheduleAddClickHandler = () => {
        navigator(SCHEDULE_WRITE_ABSOLUTE_PATH);
    };

    const onScheduleUpdateClickHandler = () => {
        if (!travelScheduleNumber) return;
        navigator(SCHEDULE_UPDATE_ABSOLUTE_PATH(travelScheduleNumber));
    };

    const onScheduleDeleteClickHandler = () => {
        if (!travelScheduleNumber || !cookies.accessToken) return;
        const isScheduleConfirm = window.confirm("정말로 삭제하시겠습니까?");
        if (!isScheduleConfirm) return;

        deleteScheduleRequest(travelScheduleNumber, cookies.accessToken).then(deleteScheduleResponse);
    };

    //                     effect                     //
    useEffect(() => {
        if (!cookies.accessToken) return;
        getScheduleListRequest(cookies.accessToken).then(getScheduleListResponse);

        if (!travelScheduleNumber) return;
        getScheduleDetailRequest(travelScheduleNumber, cookies.accessToken).then(getScheduleDetailResponse);
    }, [travelScheduleNumber, ScheduleListItem, ExpendListItem]);

    //                    render                  //
    return (
        <div id="schedule-wrapper">
            <div className="schedule-list-table">
                <div className="schedule-add-table">
                    <div style={{ width: "10px" }}></div>
                    <div className="schedule-add" onClick={onScheduleAddClickHandler}>
                        새 일정
                    </div>
                </div>
                <div className="schedule-lists-box">
                    {scheduleViewList.map((item, index) => (
                        <ScheduleListView key={index} {...item} />
                    ))}
                </div>
            </div>
            <div className="schedule-text-table">
                <div className="schedule-title">
                    <div className="schedule-name">일정명</div>
                    <div className="schedule-devider">{"|"}</div>
                    <div className="schedule-name">{travelScheduleName}</div>
                </div>
                {scheduleListViewList.map((item, index) => (
                    <ScheduleListItem key={index} {...item} />
                ))}
            </div>
            <div className="schedule-household-table">
                <div className="schedule-household-box">
                    <div className="schedule-household-text">가계부</div>
                    <div className="schedule-select-box">
                        <div className="schedule-select">
                            <div className="schedule-select-name">인원수</div>
                            <div className="schedule-devider">{"|"}</div>
                            <div className="select-people-input-box">{numberCommas(Number(travelSchedulePeople))}</div>
                            <div className="schedule-select-devider-name">명</div>
                        </div>
                        <div className="schedule-select">
                            <div className="schedule-select-name">총금액</div>
                            <div className="schedule-devider">{"|"}</div>
                            <div className="select-money-input-box">{numberCommas(Number(travelScheduleTotalMoney))}</div>
                            <div className="schedule-select-devider-name">원</div>
                        </div>
                    </div>
                </div>
                <div className="schedule-household-text-box">
                    <div className="schedule-household-text">지출내역</div>
                    {expendListViewList.map((item, index) => (
                        <ExpendListItem key={index} {...item} />
                    ))}
                </div>
                <div className="schedule-spend-box-bottom">
                    <div className="schedule-spend-box">
                        <div className="schedule-spend-text">잔액</div>
                        <div className="schedule-balance">{numberCommas(Number(balnace))}</div>
                        <div className="schedule-select-devider-name">원</div>
                    </div>
                    <div className="schedule-spend-box">
                        <div className="schedule-spend-text">더치페이</div>
                        <div className="schedule-dutchpay">{numberCommas(Number(duchPay))}</div>
                        <div className="schedule-select-devider-name">원</div>
                    </div>
                    <div className="schedule-write-table">
                        <div style={{ width: "10px" }}></div>
                        <div className="schedule-bottom-right-box">
                            <div className="schedule-add error" onClick={onScheduleDeleteClickHandler}>
                                삭제
                            </div>
                            <div className="schedule-add primary" onClick={onScheduleUpdateClickHandler}>
                                수정
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
