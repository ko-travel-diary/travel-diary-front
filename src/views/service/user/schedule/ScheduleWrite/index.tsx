import React, { ChangeEvent, useState } from "react";
import "./style.css";
import { expendList, scheduleList, scheduleListViewItems } from "src/types";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import { useStore } from "zustand";
import { useScheduleNameStore } from "src/stores/useScheduleNameStores";
import useViewListStore from "src/stores/useViewListStores/viewList.store";

//                    Component : SCHEDULE LIST 컴포넌트                     //
function ScheduleListItem({ scheduleDate, scheduleContent, scheduleStartTime, scheduleEndTime }: scheduleList) {
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
//                    Component : SCHEDULE LIST 화면 컴포넌트                     //
export default function ScheduleWrite() {
    //                     state                     //
    const [cookies] = useCookies();

    const [travelScheduleName, setTravelScheduleName] = useState<string>("");
    const [travelSchedulePeople, setTravelSchedulePeople] = useState<number>(1);
    const [travelScheduleTotalMoney, setTravelScheduleTotalMoney] = useState<number>(0);
    const [scheduleListItem, setScheduleListItem] = useState<scheduleList[]>([]);
    const [expenditureListItem, setExpenditureListItem] = useState<expendList[]>([]);

    const [scheduleDate, setScheduleDate] = useState<string>("");
    const [scheduleContent, setScheduleContent] = useState<string>("");
    const [scheduleStartTime, setScheduleStartTime] = useState<string>("");
    const [scheduleEndTime, setScheduleEndTime] = useState<string>("");

    const [travelScheduleExpenditureDetail, setTravelScheduleExpenditureDetail] = useState<string>("");
    const [travelScheduleExpenditure, setTravelScheduleExpenditure] = useState<number>(0);

    const { expenditureViewList, scheduleListItemViewList } = useViewListStore();

    const balnace = travelScheduleTotalMoney - expenditureViewList.reduce((acc, item) => acc + item.travelScheduleExpenditure, 0);
    const duchPay = balnace / travelSchedulePeople;

    //                     function                     //
    const navigator = useNavigate();

    //                     event Handler                     //
    const onScheduleNameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const travelScheduleName = event.target.value;
        setTravelScheduleName(travelScheduleName);
    };

    const onScheduleDateChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const travelSchedulePeople = parseInt(event.target.value);
        setTravelSchedulePeople(travelSchedulePeople);
    };

    const onScheduleContentChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const travelSchedulePeople = parseInt(event.target.value);
        setTravelSchedulePeople(travelSchedulePeople);
    };

    const onScheduleStartTimeChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const travelSchedulePeople = parseInt(event.target.value);
        setTravelSchedulePeople(travelSchedulePeople);
    };

    const onScheduleEndTimeChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const travelSchedulePeople = parseInt(event.target.value);
        setTravelSchedulePeople(travelSchedulePeople);
    };

    const onScheduleTravelScheduleExpenditureDetailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const travelScheduleTotalMoney = parseInt(event.target.value);
        setTravelScheduleTotalMoney(travelScheduleTotalMoney);
    };

    const onScheduleTravelScheduleExpenditureChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const travelScheduleTotalMoney = parseInt(event.target.value);
        setTravelScheduleTotalMoney(travelScheduleTotalMoney);
    };

    const onSchedulePeopleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const travelSchedulePeople = parseInt(event.target.value);
        setTravelSchedulePeople(travelSchedulePeople);
    };

    const onScheduleTotalMoneyChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const travelScheduleTotalMoney = parseInt(event.target.value);
        setTravelScheduleTotalMoney(travelScheduleTotalMoney);
    };

    //                     effect                     //

    //                    render                  //
    return (
        <div id="schedule-wrapper">
            <div className="schedule-list-table"></div>
            <div className="schedule-text-table">
                <div className="schedule-title">
                    <div className="schedule-name">일정명</div>
                    <div className="schedule-devider">{"|"}</div>
                    <input className="schedule-name-input-box" value={travelScheduleName} onChange={onScheduleNameChangeHandler} />
                </div>
                <div className="schedule-add-box">
                    <div className="schedule-calendar-box">
                        <input className="schedule-date" value={scheduleDate} onChange={onScheduleDateChangeHandler} />
                        <div className="calendar-button"></div>
                    </div>
                    <div className="schedule-text-box">
                        <input className="schedule-text" value={scheduleContent} onChange={onScheduleContentChangeHandler} />
                        <input className="schedule-start-hour" value={scheduleStartTime} onChange={onScheduleStartTimeChangeHandler} />
                        <input className="schedule-end-hour" value={scheduleEndTime} onChange={onScheduleEndTimeChangeHandler} />
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
                        />
                        <input
                            className="schedule-text"
                            type="number"
                            value={travelScheduleExpenditure}
                            onChange={onScheduleTravelScheduleExpenditureChangeHandler}
                        />
                        <div className="schedule-add-icon"></div>
                    </div>
                </div>
                <div className="schedule-spend-box">
                    <div className="schedule-household-text">잔액</div>
                    <div className="schedule-balance">{balnace}</div>
                </div>
                <div className="schedule-spend-box">
                    <div className="schedule-household-text">더치페이</div>
                    <div className="schedule-dutchpay">{duchPay}</div>
                </div>
            </div>
        </div>
    );
}
