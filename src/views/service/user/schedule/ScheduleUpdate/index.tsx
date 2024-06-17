import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router";
import DatePicker from "react-datepicker";

import { YYYYMMDD, emptyExpenditure, emptySchedule, numberCommas, timeOptions } from "src/utils";
import { ExpenditureList, ScheduleList, ScheduleListViewItem } from "src/types";
import ResponseDto from "src/apis/response.dto";
import { GetScheduleDetailResponseDto, GetScheduleListResponseDto } from "src/apis/schedule/dto/response";
import { getScheduleDetailRequest, getScheduleListRequest, patchScheduleRequest } from "src/apis/schedule";
import { PatchScheduleRequestDto } from "src/apis/schedule/dto/request";
import { AUTH_ABSOLUTE_PATH, SCHEDULE_ABSOLUTE_PATH } from "src/constant";

import "./style.css";
import "react-datepicker/dist/react-datepicker.css";

//                    interface : Schedule Update Input Box Props                     //
interface ScheduleDateItemProps {
    index: number;
    scheduleDate: string;
    toggleFlag: number;
    changeDate: (date: Date | null, index: number) => void;
    setToggleFlag: (index: number) => void;
}

//                    component : Schedule Calendar View 컴포넌트                     //
function ScheduleDateItem({ index, scheduleDate, toggleFlag, changeDate, setToggleFlag }: ScheduleDateItemProps) {
    //                    state                 //
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

    //                    event handler                 //
    const handleDateChange = (date: Date | null, index: number) => {
        changeDate(date, index);
        setShowDatePicker(false);
    };

    const toggleDatePicker = () => {
        setShowDatePicker(!showDatePicker);
        setToggleFlag(index);
    };

    //                    effect                 //
    useEffect(() => {
        if (toggleFlag !== index) setShowDatePicker(false);
    }, [toggleFlag]);

    //                    render                 //
    return (
        <div className="schedule-calendar-box">
            <input
                className="schedule-date"
                type="text"
                value={YYYYMMDD(new Date(scheduleDate))}
                onClick={toggleDatePicker}
                readOnly
                placeholder="날짜"
            />
            <div className="calendar-button" onClick={toggleDatePicker} />
            {showDatePicker ? (
                <div className="calendar-container">
                    <DatePicker selected={new Date(scheduleDate)} onChange={(date: Date | null) => handleDateChange(date, index)} inline />
                </div>
            ) : null}
        </div>
    );
}

//                    component : Schedule ListItem View 컴포넌트                     //
function ScheduleListView({ travelScheduleName }: ScheduleListViewItem) {
    //                    render                     //
    return <div className="schedule-list">{travelScheduleName}</div>;
}

//                    component : Schedule Update 화면 컴포넌트                     //
export default function ScheduleWrite() {
    //                     state                     //
    const [cookies] = useCookies();

    const { travelScheduleNumber } = useParams();

    const [toggleFlag, setToggleFlag] = useState<number>(0);
    const [travelScheduleName, setTravelScheduleName] = useState<string>("");
    const [travelSchedulePeople, setTravelSchedulePeople] = useState<number>(1);
    const [scheduleList, setScheduleList] = useState<ScheduleList[]>([emptySchedule]);
    const [travelScheduleTotalMoney, setTravelScheduleTotalMoney] = useState<number>(0);
    const [scheduleViewList, setScheduleViewList] = useState<ScheduleListViewItem[]>([]);
    const [expenditureList, setExpenditureList] = useState<ExpenditureList[]>([emptyExpenditure]);

    const balnace = Array.isArray(expenditureList)
        ? travelScheduleTotalMoney - expenditureList.reduce((acc, item) => acc + item.travelScheduleExpenditure, 0)
        : 0;
    const duchPay = travelSchedulePeople > 0 ? Math.floor(balnace / travelSchedulePeople) : 0;

    //                     function                     //
    const navigator = useNavigate();

    const changeScheduleViewList = (scheduleView: ScheduleListViewItem[]) => {
        setScheduleViewList(scheduleView);
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
            ? "서버에 문제가 있습니다."
            : result.code === "VF"
            ? "잘못된 게시글번호입니다."
            : result.code === "AF"
            ? "인증에 실패했습니다."
            : result.code === "NB"
            ? "존재하지 않는 게시물입니다."
            : result.code === "DBE"
            ? "서버에 문제가 있습니다."
            : "";

        if (!result || result.code !== "SU") {
            alert(message);
            navigator(SCHEDULE_ABSOLUTE_PATH);
            return;
        }

        const { travelScheduleName, travelSchedulePeople, travelScheduleTotalMoney, expenditureList, scheduleList } =
            result as GetScheduleDetailResponseDto;
        setTravelScheduleName(travelScheduleName);
        setTravelSchedulePeople(travelSchedulePeople);
        setTravelScheduleTotalMoney(travelScheduleTotalMoney);
        setExpenditureList(expenditureList);
        setScheduleList(scheduleList);
    };

    const patchScheduleResponse = (result: ResponseDto | null) => {
        const message = !result
            ? "서버에 문제가 있습니다."
            : result.code === "VF"
            ? "내용을 모두 입력해주세요."
            : result.code === "NB"
            ? "존재하지 않는 게시글입니다."
            : result.code === "AF"
            ? "권한이 없습니다."
            : result.code === "DBE"
            ? "서버에 문제가 있습니다."
            : "";

        if (!result || result.code !== "SU") {
            alert(message);
            return result;
        }

        alert("수정이 완료되었습니다.");
        navigator(SCHEDULE_ABSOLUTE_PATH);
        return result;
    };

    //                     event Handler                     //

    const onAddScheduleList = () => {
        const empty = {
            scheduleDate: YYYYMMDD(new Date()),
            scheduleContent: "",
            scheduleStartTime: "",
            scheduleEndTime: "",
        };
        const newSchedule = [...scheduleList, empty];
        setScheduleList(newSchedule);
    };

    const onMinusScheduleList = (indexToRemove: number) => {
        const deleteSchedule = scheduleList.filter((_, index) => index !== indexToRemove);
        setScheduleList(deleteSchedule);
    };

    const onAddExpenditureList = () => {
        const newExpenditure = [...expenditureList, emptyExpenditure];
        setExpenditureList(newExpenditure);
    };

    const onMinusExpenditureList = (indexToRemove: number) => {
        const deleteExpenditure = expenditureList.filter((_, index) => index !== indexToRemove);
        setExpenditureList(deleteExpenditure);
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

    const onScheduleStartTimeChangeHandler = (event: ChangeEvent<HTMLSelectElement>, index: number) => {
        scheduleList[index] = { ...scheduleList[index], scheduleStartTime: event.target.value };
        const newScheduleList = [...scheduleList];
        setScheduleList(newScheduleList);
    };

    const onScheduleEndTimeChangeHandler = (event: ChangeEvent<HTMLSelectElement>, index: number) => {
        scheduleList[index] = { ...scheduleList[index], scheduleEndTime: event.target.value };
        const newScheduleList = [...scheduleList];
        setScheduleList(newScheduleList);
    };

    const onSchedulePeopleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const travelSchedulePeople = parseInt(event.target.value);
        setTravelSchedulePeople(travelSchedulePeople);
    };

    const onScheduleTotalMoneyChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const travelScheduleTotalMoney = parseInt(event.target.value);
        setTravelScheduleTotalMoney(travelScheduleTotalMoney);
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

    const onScheduleUpdateButtonClickHandler = () => {
        if (!travelScheduleNumber || !cookies.accessToken) return;
        if (isNaN(travelSchedulePeople) || isNaN(travelScheduleTotalMoney) || !travelScheduleName.trim()) return;

        const requestBody: PatchScheduleRequestDto = {
            travelSchedulePeople,
            travelScheduleTotalMoney,
            travelScheduleName,
            expenditureList,
            scheduleList,
        };

        patchScheduleRequest(requestBody, travelScheduleNumber, cookies.accessToken).then(patchScheduleResponse);
    };

    const handleDateChange = (date: Date | null, selectIndex: number) => {
        if (date !== null) {
            const newScheduleList = scheduleList.map((item, index) => {
                if (index === selectIndex) item.scheduleDate = YYYYMMDD(date);
                return item;
            });
            setScheduleList(newScheduleList);
        }
    };

    const onToggleFlagHandler = (index: number) => {
        setToggleFlag(index);
    };

    //                     effect                     //
    useEffect(() => {
        if (!cookies.accessToken) return;
        if (!travelScheduleNumber) return;
        getScheduleListRequest(cookies.accessToken).then(getScheduleListResponse);
        getScheduleDetailRequest(travelScheduleNumber, cookies.accessToken).then(getScheduleDetailResponse);
    }, []);

    //                    render                  //
    return (
        <div id="schedule-wrapper">
            <div className="schedule-list-table">
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
                    <input
                        className="schedule-name-input-box"
                        value={travelScheduleName}
                        onChange={onScheduleNameChangeHandler}
                        placeholder="일정 이름을 입력해주세요."
                    />
                </div>
                {scheduleList.map((schedule, index) => (
                    <div className="schedule-add-box" style={{ zIndex: index === toggleFlag ? 9999 : 0 }}>
                        <ScheduleDateItem
                            index={index}
                            scheduleDate={schedule.scheduleDate}
                            changeDate={handleDateChange}
                            toggleFlag={toggleFlag}
                            setToggleFlag={onToggleFlagHandler}
                        />
                        <div className="schedule-text-box">
                            <input
                                className="schedule-text"
                                value={schedule.scheduleContent}
                                onChange={(e) => onScheduleContentChangeHandler(e, index)}
                                placeholder="내용을 입력해주세요."
                            />
                            <select
                                title="start-hour"
                                className="schedule-start-hour"
                                value={schedule.scheduleStartTime}
                                onChange={(event) => onScheduleStartTimeChangeHandler(event, index)}
                            >
                                <option value="">출발시간</option>
                                {timeOptions.map((time) => (
                                    <option key={time} value={time}>
                                        {time}
                                    </option>
                                ))}
                            </select>
                            <div className="schedule-devider">{"~"}</div>
                            <select
                                title="end-hour"
                                className="schedule-end-hour"
                                value={schedule.scheduleEndTime}
                                onChange={(event) => onScheduleEndTimeChangeHandler(event, index)}
                            >
                                <option value="">도착시간</option>
                                {timeOptions.map((time) => (
                                    <option key={time} value={time}>
                                        {time}
                                    </option>
                                ))}
                            </select>
                            {index === scheduleList.length - 1 ? (
                                <div className="schedule-add-icon" onClick={onAddScheduleList} />
                            ) : (
                                <div className="schedule-minus-icon" onClick={() => onMinusScheduleList(index)} />
                            )}
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
                            <input
                                title="people"
                                className="select-people-input-box"
                                type="number"
                                value={travelSchedulePeople}
                                onChange={onSchedulePeopleChangeHandler}
                            />
                            <div className="schedule-select-devider-name">명</div>
                        </div>
                        <div className="schedule-select">
                            <div className="schedule-select-name">총금액</div>
                            <div className="schedule-devider">{"|"}</div>
                            <input
                                title="money"
                                className="select-money-input-box"
                                type="number"
                                value={travelScheduleTotalMoney}
                                onChange={onScheduleTotalMoneyChangeHandler}
                            />
                            <div className="schedule-select-devider-name">원</div>
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
                                title="money"
                                className="schedule-text-money"
                                type="number"
                                value={Number(expenditure.travelScheduleExpenditure).toString()}
                                onChange={(e) => onScheduleTravelScheduleExpenditureChangeHandler(e, index)}
                            />
                            {index === expenditureList.length - 1 ? (
                                <div className="schedule-add-icon" onClick={onAddExpenditureList} />
                            ) : (
                                <div className="schedule-minus-icon" onClick={() => onMinusExpenditureList(index)} />
                            )}
                        </div>
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
                        <div className="schedule-add primary" onClick={onScheduleUpdateButtonClickHandler}>
                            수정
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
