import ResponseDto from "src/apis/response.dto";
import { expendList, scheduleList, scheduleListViewItems } from "src/types";

export interface GetScheduleListResponseDto extends ResponseDto{
    scheduleListViewItems: scheduleListViewItems[];
}

export interface GetScheduleDetailResponseDto extends ResponseDto{
    travelSchedulePeople: number;
    travelScheduleTotalMoney: number;
    expendList: expendList[];
    scheduleList: scheduleList[];
}
