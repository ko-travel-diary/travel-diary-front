import React, { useEffect, useState } from "react";
import "./style.css";
import { getScheduleDetailRequest, getScheduleListRequest } from "src/apis/schedule";
import { GetScheduleDetailResponseDto, GetScheduleListResponseDto } from "src/apis/schedule/dto/response";
import { AUTH_ABSOLUTE_PATH, SCHEDULE_ABSOLUTE_PATH, SCHEDULE_DETAIL_ABSOLUTE_PATH, SCHEDULE_WRITE_ABSOLUTE_PATH } from "src/constant";
import { expenditureListItem, scheduleListItem, scheduleListViewItem } from "src/types";
import ResponseDto from "src/apis/response.dto";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router";
import { useScheduleNameStore } from "src/stores/useScheduleNameStores";

//                    Component : SCHEDULE LIST VIEW 컴포넌트                     //
function ScheduleListViewItem({ travelScheduleName, travelScheduleNumber }: scheduleListViewItem) {
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
function ScheduleListItem({ scheduleDate, scheduleContent, scheduleStartTime, scheduleEndTime }: scheduleListItem) {
    //                    render : QnA 화면 컴포넌트                     //
    return (
        <div className="schedule-add-box">
            <div className="schedule-calendar-box">
                <div className="schedule-date">{scheduleDate}</div>
                <div className="calendar-button"></div>
            </div>
            <div className="schedule-text-box">
                <div className="schedule-text">{scheduleContent}</div>
                <div className="schedule-start-hour">{scheduleStartTime}</div>
                <div className="schedule-end-hour">{scheduleEndTime}</div>
                <div className="schedule-add-icon"></div>
            </div>
        </div>
    );
}

//                    Component : SCHEDULE LIST 컴포넌트                     //
function ExpendListItem({ travelScheduleExpenditureDetail, travelScheduleExpenditure }: expenditureListItem) {
    //                    render : QnA 화면 컴포넌트                     //
    return (
        <div className="schedule-household-add-box">
            <div className="schedule-text">{travelScheduleExpenditureDetail}</div>
            <div className="schedule-text-money">{travelScheduleExpenditure}</div>
            <div className="schedule-add-icon"></div>
        </div>
    );
}

//                    Component : SCHEDULE LIST 화면 컴포넌트                     //
export default function ScheduleDetail() {
    //                     state                     //
    const [cookies] = useCookies();
    const { travelScheduleNumber } = useParams();

    const [scheduleView, setScheduleView] = useState<scheduleListViewItem[]>([]);
    const [scheduleList, setScheduleList] = useState<scheduleListItem[]>([]);
    const [expendList, setExpendList] = useState<expenditureListItem[]>([]);

    const [scheduleViewList, setScheduleViewList] = useState<scheduleListViewItem[]>([]);
    const [scheduleListViewList, setScheduleListViewList] = useState<scheduleListItem[]>([]);
    const [expendListViewList, setExpendListViewList] = useState<expenditureListItem[]>([]);

    const [scheduleName, setScheduleName] = useState<string>("");
    const [schedulePeople, setSchedulePeople] = useState<number>(0);
    const [scheduleTotalMoney, setScheduleTotalMoney] = useState<number>(0);
    const { travelScheduleName } = useScheduleNameStore();

    const balnace = scheduleTotalMoney - expendListViewList.reduce((acc, item) => acc + item.travelScheduleExpenditure, 0);
    const duchPay = balnace / schedulePeople;

    //                     function                     //
    const navigator = useNavigate();

    //                     event Handler                     //
    const onScheduleAddClickHandler = () => {
        navigator(SCHEDULE_WRITE_ABSOLUTE_PATH);
    };

    const changeScheduleViewList = (scheduleView: scheduleListViewItem[]) => {
        setScheduleViewList(scheduleView);
    };

    const changeScheduleListViewList = (scheduleList: scheduleListItem[]) => {
        setScheduleListViewList(scheduleList);
    };

    const changeExpendListViewList = (expendList: expenditureListItem[]) => {
        setExpendListViewList(expendList);
    };

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

        const { travelSchedulePeople, travelScheduleTotalMoney, expenditureListItem, scheduleListItem } = result as GetScheduleDetailResponseDto;
        setSchedulePeople(travelSchedulePeople);
        setScheduleTotalMoney(travelScheduleTotalMoney);
        setScheduleListViewList(scheduleListItem);
        setExpendListViewList(expenditureListItem);
        changeScheduleListViewList(scheduleListItem);
        changeExpendListViewList(expenditureListItem);
    };

    //                     effect                     //
    useEffect(() => {
        getScheduleListRequest(cookies.accessToken).then(getScheduleListResponse);

        if (!travelScheduleNumber) return;
        getScheduleDetailRequest(travelScheduleNumber, cookies.accessToken).then(getScheduleDetailResponse);

        setScheduleViewList([]);
        setScheduleListViewList([]);
        setExpendListViewList([]);
    }, []);

    //                    render                  //
    return (
        <div id="schedule-wrapper">
            <div className="schedule-list-table">
                <div className="schedule-add-table">
                    <div style={{ width: "10px" }}></div>
                    <div className="schedule-add" onClick={onScheduleAddClickHandler}>
                        일정 추가
                    </div>
                </div>
                <div className="schedule-lists-box">
                    {scheduleViewList.map((item) => (
                        <ScheduleListViewItem {...item} />
                    ))}
                </div>
            </div>
            <div className="schedule-text-table">
                <div className="schedule-title">
                    <div className="schedule-name">일정명</div>
                    <div className="schedule-devider">{"|"}</div>
                    <div className="schedule-name">{travelScheduleName}</div>
                </div>
                {scheduleListViewList.map((item) => (
                    <ScheduleListItem {...item} />
                ))}
            </div>
            <div className="schedule-household-table">
                <div className="schedule-household-box">
                    <div className="schedule-household-text">가계부</div>
                    <div className="schedule-select-box">
                        <div className="schedule-select">
                            <div className="schedule-select-name">인원수</div>
                            <div className="schedule-devider">{"|"}</div>
                            <div className="select-input-box">{schedulePeople}</div>
                        </div>
                        <div className="schedule-select">
                            <div className="schedule-select-name">총금액</div>
                            <div className="schedule-devider">{"|"}</div>
                            <div className="select-input-box">{scheduleTotalMoney}</div>
                        </div>
                    </div>
                </div>
                <div className="schedule-household-text-box">
                    <div className="schedule-household-text">지출내역</div>
                    {expendListViewList.map((item) => (
                        <ExpendListItem {...item} />
                    ))}
                </div>
                <div className="schedule-spend-box">
                    <div className="schedule-spend-text">잔액</div>
                    <div className="schedule-balance">{balnace}</div>
                </div>
                <div className="schedule-spend-box">
                    <div className="schedule-spend-text">더치페이</div>
                    <div className="schedule-dutchpay">{duchPay}</div>
                </div>
            </div>
        </div>
    );
}
