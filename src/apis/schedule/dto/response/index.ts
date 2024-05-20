import ResponseDto from "src/apis/response.dto";
import { ExpenditureListItem, ScheduleListItem } from "src/types";

export interface GetScheduleListResponseDto extends ResponseDto{
    travelScheduleName: string[];
}

export interface GetScheduleDetailResponseDto extends ResponseDto{
    travelSchedulePeople: number;
    travelScheduleTotalMoney: number;
    expenditureListItem: ExpenditureListItem[];
    scheduleListItem: ScheduleListItem[];
}
