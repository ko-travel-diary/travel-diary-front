import axios from "axios";
import { DeleteAdminUserRequestDto, DeleteUserRequestDto, PatchUserInfoRequestDto } from "./dto/request";
import { bearerAuthorization, requestErrorHandler, requestHandler } from "..";
import { DELETE_ADMIN_USER_REQUEST_URL, DELETE_USER_REQUEST_URL, GET_USER_LIST_REQUEST_URL, PATCH_USER_INFO_REQUEST_URL } from "src/constant";
import ResponseDto from "../response.dto";
import { GetUserInfoResponseDto, GetUserListResponseDto } from "./dto/response";

//      function: 유저 정보 리스트 불러오기 API 함수       //
export const getUserListRequest = async (accessToken: string) => {
    const result = await axios.get(GET_USER_LIST_REQUEST_URL, bearerAuthorization(accessToken))
        .then(requestHandler<GetUserListResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

//      function: 로그인 유저 정보 불러오기 API 함수       //
export const getUserInfoRequest = async (accessToken: string) => {
    const result = await axios.get(GET_USER_LIST_REQUEST_URL, bearerAuthorization(accessToken))
    .then(requestHandler<GetUserInfoResponseDto>)
    .catch(requestErrorHandler);
return result;
}

//      function: 로그인 유저 프로필 정보 수정 API 함수       //
export const patchUserInfoRequest = async (requestBody: PatchUserInfoRequestDto) => {
    const result = await axios.patch(PATCH_USER_INFO_REQUEST_URL, requestBody)
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

//      function: 로그인 유저 회원탈퇴 API 함수       //
export const deleteUserRequest = async (requestBody: DeleteUserRequestDto, accessToken: string) => {
    const result = await axios.put(DELETE_USER_REQUEST_URL, requestBody, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

//      function: 회원 탈퇴시키기 API 함수       //
export const deleteAdminUserRequest = async (requestBody: DeleteAdminUserRequestDto, accessToken: string) => {
    const result = await axios.put(DELETE_ADMIN_USER_REQUEST_URL, requestBody, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};