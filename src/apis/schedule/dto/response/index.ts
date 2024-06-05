import ResponseDto from "src/apis/response.dto";
import { ExpenditureList, ScheduleList, ScheduleListViewItem } from "src/types";

export interface GetScheduleListResponseDto extends ResponseDto {
    scheduleListViewItems: ScheduleListViewItem[];
}

export interface GetScheduleDetailResponseDto extends ResponseDto {
    travelSchedulePeople: number;
    travelScheduleTotalMoney: number;
    expenditureList: ExpenditureList[];
    scheduleList: ScheduleList[];
}
