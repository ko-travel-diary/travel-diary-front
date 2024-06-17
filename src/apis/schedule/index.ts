import axios from "axios";

import ResponseDto from "../response.dto";
import { PatchScheduleRequestDto, PostScheduleRequestDto } from "./dto/request";
import { GetScheduleDetailResponseDto, GetScheduleListResponseDto } from "./dto/response";

import { bearerAuthorization, requestErrorHandler, requestHandler } from "..";
import { DELETE_SCHEDULE_REQUEST_URL, GET_SCHEDULE_LIST_REQUEST_URL, GET_SCHEDULE_REQUEST_URL, PATCH_SCHEDULE_REQUEST_URL, POST_SCHEDULE_REQUEST_URL } from "src/constant";

export const postScheduleRequest = async (requestBody: PostScheduleRequestDto, accessToken: string) => {
    const result = await axios
        .post(POST_SCHEDULE_REQUEST_URL, requestBody, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

export const deleteScheduleRequest = async (travelScheduleNumber: string | number, accessToken: string) => {
    const result = await axios
        .delete(DELETE_SCHEDULE_REQUEST_URL(travelScheduleNumber), bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

export const getScheduleListRequest = async (accessToken: string) => {
    const result = await axios
        .get(GET_SCHEDULE_LIST_REQUEST_URL, bearerAuthorization(accessToken))
        .then(requestHandler<GetScheduleListResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

export const getScheduleDetailRequest = async (travelScheduleNumber: string | number, accessToken: string) => {
    const result = await axios
        .get(GET_SCHEDULE_REQUEST_URL(travelScheduleNumber), bearerAuthorization(accessToken))
        .then(requestHandler<GetScheduleDetailResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

export const patchScheduleRequest = async (requestBody: PatchScheduleRequestDto, travelScheduleNumber: string | number, accessToken: string) => {
    const result = await axios
        .patch(PATCH_SCHEDULE_REQUEST_URL(travelScheduleNumber), requestBody, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};
