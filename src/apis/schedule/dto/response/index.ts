import ResponseDto from "src/apis/response.dto";
import { expenditureList, scheduleList, scheduleListViewItem } from "src/types";

export interface GetScheduleListResponseDto extends ResponseDto {
    scheduleListViewItems: scheduleListViewItem[];
}

export interface GetScheduleDetailResponseDto extends ResponseDto {
    travelSchedulePeople: number;
    travelScheduleTotalMoney: number;
    expenditureList: expenditureList[];
    scheduleList: scheduleList[];
}
