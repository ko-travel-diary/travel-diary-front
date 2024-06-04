import { expenditureList, scheduleList } from "src/types";

export interface PostScheduleRequestDto {
    travelSchedulePeople: number;
    travelScheduleTotalMoney: number;
    travelScheduleName: string;
    expenditureList: expenditureList[];
    scheduleList: scheduleList[];
}

export interface PatchScheduleRequestDto {
    travelSchedulePeople: number;
    travelScheduleTotalMoney: number;
    travelScheduleName: string;
    expenditureList: expenditureList[];
    scheduleList: scheduleList[];
}
