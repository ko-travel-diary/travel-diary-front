import React, { ChangeEvent, useEffect, useState } from "react";
import "./style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { expenditureList, scheduleList } from "src/types";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import { PostScheduleRequestDto } from "src/apis/schedule/dto/request";
import { postScheduleRequest } from "src/apis/schedule";
import ResponseDto from "src/apis/response.dto";
import { SCHEDULE_ABSOLUTE_PATH } from "src/constant";

const YYYYMMDD = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    //check zero padding
    return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
};

const emptySchedule = {
    scheduleDate: YYYYMMDD(new Date()),
    scheduleContent: "",
    scheduleStartTime: "",
    scheduleEndTime: "",
};

const emptyExpenditure = {
    travelScheduleExpenditureDetail: "",
    travelScheduleExpenditure: 0,
};

//                    Component : SCHEDULE LIST 화면 컴포넌트                     //
export default function ScheduleWrite() {
    //                     state                     //
    const [cookies] = useCookies();

    const [travelScheduleName, setTravelScheduleName] = useState<string>("");
    const [travelSchedulePeople, setTravelSchedulePeople] = useState<number>(1);
    const [travelScheduleTotalMoney, setTravelScheduleTotalMoney] = useState<number>(0);

    const [scheduleList, setScheduleList] = useState<scheduleList[]>([emptySchedule]);
    const [expenditureList, setExpenditureList] = useState<expenditureList[]>([emptyExpenditure]);

    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

    const balnace = Array.isArray(expenditureList)
        ? travelScheduleTotalMoney - expenditureList.reduce((acc, item) => acc + item.travelScheduleExpenditure, 0)
        : 0;
    const duchPay = travelSchedulePeople > 0 ? balnace / travelSchedulePeople : 0;

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

        alert("작성이 완료되었습니다.");
        navigator(SCHEDULE_ABSOLUTE_PATH);
    };

    //                     event Handler                     //
    const onAddScheduleList = () => {
        const newSchedule = [...scheduleList, emptySchedule];
        setScheduleList(newSchedule);
    };

    const onAddExpenditureList = () => {
        const newExpenditure = [...expenditureList, emptyExpenditure];
        setExpenditureList(newExpenditure);
    };

    const onScheduleNameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const travelScheduleName = event.target.value;
        setTravelScheduleName(travelScheduleName);
    };

    const onScheduleContentChangeHandler = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        scheduleList[index] = { ...scheduleList[index], scheduleContent: event.target.value };
        const newScheduleList = [...scheduleList];
        setScheduleList(newScheduleList);
    };

    const onScheduleStartTimeChangeHandler = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        scheduleList[index] = { ...scheduleList[index], scheduleStartTime: event.target.value };
        const newScheduleList = [...scheduleList];
        setScheduleList(newScheduleList);
    };

    const onScheduleEndTimeChangeHandler = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        scheduleList[index] = { ...scheduleList[index], scheduleEndTime: event.target.value };
        const newExpenditureList = [...expenditureList];
        setExpenditureList(newExpenditureList);
    };

    const onScheduleTravelScheduleExpenditureDetailChangeHandler = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        expenditureList[index] = { ...expenditureList[index], travelScheduleExpenditureDetail: event.target.value };
        const newExpenditureList = [...expenditureList];
        setExpenditureList(newExpenditureList);
    };

    const onScheduleTravelScheduleExpenditureChangeHandler = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        expenditureList[index] = { ...expenditureList[index], travelScheduleExpenditure: Number(event.target.value) };
        const newExpenditureList = [...expenditureList];
        setExpenditureList(newExpenditureList);
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
            expenditureList,
            scheduleList,
        };
        postScheduleRequest(requestBody, cookies.accessToken).then(postScheduleResponse);
    };

    const toggleDatePicker = () => {
        setShowDatePicker(!showDatePicker);
    };

    const handleDateChange = (date: Date | null, index: number) => {
        if (date) {
            scheduleList[index] = { ...scheduleList[index], scheduleDate: YYYYMMDD(date) };
            const newScheduleList = [...scheduleList];
            setScheduleList(newScheduleList);
        }

        setShowDatePicker(false); // 달력이 닫히도록 설정
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
                {scheduleList.map((schedule, index) => (
                    <div className="schedule-add-box">
                        <div className="schedule-calendar-box">
                            <input
                                className="schedule-date"
                                type="text"
                                value={YYYYMMDD(new Date(schedule.scheduleDate))}
                                onClick={toggleDatePicker}
                                readOnly
                                placeholder="날짜"
                            />
                            <div className="calendar-button" onClick={toggleDatePicker} />
                            {showDatePicker ? (
                                <div className="calendar-container">
                                    <DatePicker
                                        selected={new Date(schedule.scheduleDate)}
                                        onChange={(date: Date | null) => handleDateChange(date, index)}
                                        inline
                                    />
                                </div>
                            ) : null}
                        </div>
                        <div className="schedule-text-box">
                            <input
                                className="schedule-text"
                                value={schedule.scheduleContent}
                                onChange={(e) => onScheduleContentChangeHandler(e, index)}
                                placeholder="내용을 입력해주세요."
                            />
                            <input
                                className="schedule-start-hour"
                                value={schedule.scheduleStartTime}
                                onChange={(e) => onScheduleStartTimeChangeHandler(e, index)}
                                placeholder="출발 시간"
                            />
                            <input
                                className="schedule-end-hour"
                                value={schedule.scheduleEndTime}
                                onChange={(e) => onScheduleEndTimeChangeHandler(e, index)}
                                placeholder="도착 시간"
                            />
                            {index === scheduleList.length - 1 ? <div className="schedule-add-icon" onClick={onAddScheduleList} /> : null}
                        </div>
                    </div>
                ))}
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
                    {expenditureList.map((expenditure, index) => (
                        <div className="schedule-text-box">
                            <input
                                className="schedule-text"
                                type="text"
                                value={expenditure.travelScheduleExpenditureDetail}
                                onChange={(e) => onScheduleTravelScheduleExpenditureDetailChangeHandler(e, index)}
                                placeholder="내용을 입력해주세요."
                            />
                            <input
                                className="schedule-text-money"
                                type="number"
                                value={Number(expenditure.travelScheduleExpenditure).toString()}
                                onChange={(e) => onScheduleTravelScheduleExpenditureChangeHandler(e, index)}
                            />
                            {index === expenditureList.length - 1 ? <div className="schedule-add-icon" onClick={onAddExpenditureList} /> : null}
                        </div>
                    ))}
                </div>
                <div className="schedule-spend-box-bottom">
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
        </div>
    );
}
