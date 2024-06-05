import { ExpenditureList, ScheduleList } from "src/types";

export interface PostScheduleRequestDto {
    travelSchedulePeople: number;
    travelScheduleTotalMoney: number;
    travelScheduleName: string;
    expenditureList: ExpenditureList[];
    scheduleList: ScheduleList[];
}

export interface PatchScheduleRequestDto {
    travelSchedulePeople: number;
    travelScheduleTotalMoney: number;
    travelScheduleName: string;
    expenditureList: ExpenditureList[];
    scheduleList: ScheduleList[];
}
