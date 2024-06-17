import axios from "axios";

import ResponseDto from "../response.dto";
import { DeleteAdminUserRequestDto, DeleteUserRequestDto, PatchUserInfoRequestDto, PostUserNickNameRequestDto } from "./dto/request";
import { GetSearchUserListResponseDto, GetUserInfoResponseDto, GetUserListResponseDto, PostUserNickNameResponseDto } from "./dto/response";

import { bearerAuthorization, requestErrorHandler, requestHandler } from "..";
import { DELETE_ADMIN_USER_REQUEST_URL, DELETE_USER_REQUEST_URL, GET_SEARCH_USER_LIST_REQUEST_URL, GET_USER_LIST_REQUEST_URL, GET_USER_REQUEST_URL, PATCH_USER_INFO_REQUEST_URL, POST_USER_NICKNAME_REQUEST_URL } from "src/constant";

export const postUserNickNameRequest = async (requestBody: PostUserNickNameRequestDto) => {
    const result = await axios
        .post(POST_USER_NICKNAME_REQUEST_URL, requestBody)
        .then(requestHandler<PostUserNickNameResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

export const getUserListRequest = async (accessToken: string) => {
    const result = await axios
        .get(GET_USER_LIST_REQUEST_URL, bearerAuthorization(accessToken))
        .then(requestHandler<GetUserListResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

export const getUserInfoRequest = async (accessToken: string) => {
    const result = await axios
        .get(GET_USER_REQUEST_URL, bearerAuthorization(accessToken))
        .then(requestHandler<GetUserInfoResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

export const getSearchUserListRequest = async (word: string, accessToken: string) => {
    const config = { ...bearerAuthorization(accessToken), params: { word } };
    const result = await axios
        .get(GET_SEARCH_USER_LIST_REQUEST_URL, config)
        .then(requestHandler<GetSearchUserListResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

export const patchUserInfoRequest = async (requestBody: PatchUserInfoRequestDto, accessToken: string) => {
    const result = await axios
        .patch(PATCH_USER_INFO_REQUEST_URL, requestBody, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

export const deleteUserRequest = async (requestBody: DeleteUserRequestDto, accessToken: string) => {
    const result = await axios
        .put(DELETE_USER_REQUEST_URL, requestBody, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

export const deleteAdminUserRequest = async (requestBody: DeleteAdminUserRequestDto, accessToken: string) => {
    const result = await axios
        .put(DELETE_ADMIN_USER_REQUEST_URL, requestBody, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};
