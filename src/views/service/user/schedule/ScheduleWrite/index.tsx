import React, { ChangeEvent, useEffect, useState } from "react";
import "./style.css";
import { expenditureListItem, scheduleListItem } from "src/types";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import useViewListStore from "src/stores/useViewListStores/viewList.store";
import { PostScheduleRequestDto } from "src/apis/schedule/dto/request";
import { postScheduleRequest } from "src/apis/schedule";
import ResponseDto from "src/apis/response.dto";
import { SCHEDULE_ABSOLUTE_PATH } from "src/constant";
import { GetScheduleDetailResponseDto } from "src/apis/schedule/dto/response";

//                    Component : SCHEDULE LIST 화면 컴포넌트                     //
export default function ScheduleWrite() {
    //                     state                     //
    const [cookies] = useCookies();

    const [travelScheduleName, setTravelScheduleName] = useState<string>("");
    const [travelSchedulePeople, setTravelSchedulePeople] = useState<number>(1);
    const [travelScheduleTotalMoney, setTravelScheduleTotalMoney] = useState<number>(0);
    const [scheduleListItem, setScheduleListItem] = useState<scheduleListItem[]>([]);
    const [expenditureListItem, setExpenditureListItem] = useState<expenditureListItem[]>([]);

    const [scheduleDate, setScheduleDate] = useState<string>("");
    const [scheduleContent, setScheduleContent] = useState<string>("");
    const [scheduleStartTime, setScheduleStartTime] = useState<string>("");
    const [scheduleEndTime, setScheduleEndTime] = useState<string>("");

    const [travelScheduleExpenditureDetail, setTravelScheduleExpenditureDetail] = useState<string>("");
    const [travelScheduleExpenditure, setTravelScheduleExpenditure] = useState<number>(0);

    const { expenditureViewList } = useViewListStore();

    const balnace = travelScheduleTotalMoney - expenditureViewList.reduce((acc, item) => acc + item.travelScheduleExpenditure, 0);
    const duchPay = balnace / travelSchedulePeople;

    //                     function                     //
    const navigator = useNavigate();

    const postScheduleResponse = (result: ResponseDto | null) => {
        const message = !result
            ? "서버에 문제가 있습니다."
            : result.code === "VF"
            ? "내용을 모두 입력해주세요."
            : result.code === "AF"
            ? "권한이 없습니다."
            : result.code === "DBE"
            ? "서버에 문제가 있습니다."
            : "";

        if (!result || result.code !== "SU") {
            alert(message);
            return result;
        }

        const { travelSchedulePeople, travelScheduleTotalMoney, expenditureListItem, scheduleListItem } = result as GetScheduleDetailResponseDto;
        setTravelSchedulePeople(travelSchedulePeople);
        setTravelScheduleTotalMoney(travelScheduleTotalMoney);
        setExpenditureListItem(expenditureListItem);
        setScheduleListItem(scheduleListItem);

        alert("작성이 완료되었습니다.");
        navigator(SCHEDULE_ABSOLUTE_PATH);
    };

    //                     event Handler                     //
    const onScheduleNameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const travelScheduleName = event.target.value;
        setTravelScheduleName(travelScheduleName);
    };

    const onScheduleDateChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const scheduleDate = event.target.value;
        setScheduleDate(scheduleDate);
    };

    const onScheduleContentChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const scheduleContent = event.target.value;
        setScheduleContent(scheduleContent);
    };

    const onScheduleStartTimeChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const scheduleStartTime = event.target.value;
        setScheduleStartTime(scheduleStartTime);
    };

    const onScheduleEndTimeChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const scheduleEndTime = event.target.value;
        setScheduleEndTime(scheduleEndTime);
    };

    const onScheduleTravelScheduleExpenditureDetailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const travelScheduleExpenditureDetail = event.target.value;
        setTravelScheduleExpenditureDetail(travelScheduleExpenditureDetail);
    };

    const onScheduleTravelScheduleExpenditureChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const travelScheduleExpenditure = parseInt(event.target.value);
        setTravelScheduleExpenditure(travelScheduleExpenditure);
    };

    const onSchedulePeopleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const travelSchedulePeople = parseInt(event.target.value);
        setTravelSchedulePeople(travelSchedulePeople);
    };

    const onScheduleTotalMoneyChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const travelScheduleTotalMoney = parseInt(event.target.value);
        setTravelScheduleTotalMoney(travelScheduleTotalMoney);
    };

    const onScheduleButtonClickHandler = () => {
        if (!cookies.accessToken) return;

        const requestBody: PostScheduleRequestDto = {
            travelSchedulePeople,
            travelScheduleTotalMoney,
            travelScheduleName,
            expenditureListItem,
            scheduleListItem,
        };

        postScheduleRequest(requestBody, cookies.accessToken).then(postScheduleResponse);
    };

    //                    render                  //
    return (
        <div id="schedule-wrapper">
            <div className="schedule-list-table">
                <div className="schedule-add-table">
                    <div style={{ width: "10px" }}></div>
                    <div className="schedule-add" onClick={onScheduleButtonClickHandler}>
                        올리기
                    </div>
                </div>
                <div className="schedule-lists-box"></div>
            </div>
            <div className="schedule-list-table"></div>
            <div className="schedule-text-table">
                <div className="schedule-title">
                    <div className="schedule-name">일정명</div>
                    <div className="schedule-devider">{"|"}</div>
                    <input
                        className="schedule-name-input-box"
                        value={travelScheduleName}
                        onChange={onScheduleNameChangeHandler}
                        placeholder="일정 이름을 입력해주세요."
                    />
                </div>
                <div className="schedule-add-box">
                    <div className="schedule-calendar-box">
                        <input className="schedule-date" value={scheduleDate} onChange={onScheduleDateChangeHandler} placeholder="날짜" />
                        <div className="calendar-button"></div>
                    </div>
                    <div className="schedule-text-box">
                        <input
                            className="schedule-text"
                            value={scheduleContent}
                            onChange={onScheduleContentChangeHandler}
                            placeholder="내용을 입력해주세요."
                        />
                        <input
                            className="schedule-start-hour"
                            value={scheduleStartTime}
                            onChange={onScheduleStartTimeChangeHandler}
                            placeholder="출발 시간"
                        />
                        <input
                            className="schedule-end-hour"
                            value={scheduleEndTime}
                            onChange={onScheduleEndTimeChangeHandler}
                            placeholder="도착 시간"
                        />
                        <div className="schedule-add-icon"></div>
                    </div>
                </div>
            </div>
            <div className="schedule-household-table">
                <div className="schedule-household-box">
                    <div className="schedule-household-text">가계부</div>
                    <div className="schedule-select-box">
                        <div className="schedule-select">
                            <div className="schedule-select-name">인원수</div>
                            <div className="schedule-devider">{"|"}</div>
                            <input className="select-input-box" type="number" value={travelSchedulePeople} onChange={onSchedulePeopleChangeHandler} />
                        </div>
                        <div className="schedule-select">
                            <div className="schedule-select-name">총금액</div>
                            <div className="schedule-devider">{"|"}</div>
                            <input
                                className="select-input-box"
                                type="number"
                                value={travelScheduleTotalMoney}
                                onChange={onScheduleTotalMoneyChangeHandler}
                            />
                        </div>
                    </div>
                </div>
                <div className="schedule-household-text-box">
                    <div className="schedule-household-text">지출내역</div>
                    <div className="schedule-text-box">
                        <input
                            className="schedule-text"
                            type="text"
                            value={travelScheduleExpenditureDetail}
                            onChange={onScheduleTravelScheduleExpenditureDetailChangeHandler}
                            placeholder="내용을 입력해주세요."
                        />
                        <input
                            className="schedule-text-money"
                            type="number"
                            value={travelScheduleExpenditure}
                            onChange={onScheduleTravelScheduleExpenditureChangeHandler}
                        />
                        <div className="schedule-add-icon"></div>
                    </div>
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
