import ResponseDto from "src/apis/response.dto";
import { expenditureListItem, scheduleListItem, scheduleListViewItem } from "src/types";

export interface GetScheduleListResponseDto extends ResponseDto {
    scheduleListViewItems: scheduleListViewItem[];
}

export interface GetScheduleDetailResponseDto extends ResponseDto {
    travelSchedulePeople: number;
    travelScheduleTotalMoney: number;
    expenditureListItem: expenditureListItem[];
    scheduleListItem: scheduleListItem[];
}
