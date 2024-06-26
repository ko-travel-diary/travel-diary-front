import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";

import { ScheduleListViewItem } from "src/types";
import ResponseDto from "src/apis/response.dto";
import { GetScheduleListResponseDto } from "src/apis/schedule/dto/response";
import { getScheduleListRequest } from "src/apis/schedule";
import { AUTH_ABSOLUTE_PATH, SCHEDULE_DETAIL_ABSOLUTE_PATH, SCHEDULE_WRITE_ABSOLUTE_PATH } from "src/constant";

import "./style.css";

//                    component : Schedule ListItem View 컴포넌트                     //
function ScheduleListView({ travelScheduleName, travelScheduleNumber }: ScheduleListViewItem) {
    //                     function                     //
    const navigator = useNavigate();

    //                     event handler                     //
    const onClickHandler = () => navigator(SCHEDULE_DETAIL_ABSOLUTE_PATH(travelScheduleNumber));

    //                    render                     //
    return (
        <div className="schedule-list" onClick={onClickHandler}>
            {travelScheduleName}
        </div>
    );
}

//                    component : Schedule List 화면 컴포넌트                     //
export default function ScheduleList() {
    //                     state                     //
    const [cookies] = useCookies();

    const [viewList, setViewList] = useState<ScheduleListViewItem[]>([]);
    const [scheduleViewList, setScheduleViewList] = useState<ScheduleListViewItem[]>([]);

    //                     function                     //
    const navigator = useNavigate();

    //                     event Handler                     //
    const onScheduleAddClickHandler = () => {
        navigator(SCHEDULE_WRITE_ABSOLUTE_PATH);
    };

    const changeScheduleList = (scheduleViewList: ScheduleListViewItem[]) => {
        setScheduleViewList(scheduleViewList);
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
        changeScheduleList(scheduleListViewItems);
    };

    //                     effect                     //
    useEffect(() => {
        if (!cookies.accessToken) return;
        getScheduleListRequest(cookies.accessToken).then(getScheduleListResponse);
    }, []);

    useEffect(() => {
        setViewList(scheduleViewList);
    }, [scheduleViewList]);

    //                    render                  //
    return (
        <div id="schedule-wrapper">
            <div className="schedule-list-table">
                <div className="schedule-add-table">
                    <div className="schedule-add" onClick={onScheduleAddClickHandler}>
                        새 일정
                    </div>
                </div>
                <div className="schedule-lists-box">
                    {viewList.map((item) => (
                        <ScheduleListView {...item} />
                    ))}
                </div>
            </div>
        </div>
    );
}
