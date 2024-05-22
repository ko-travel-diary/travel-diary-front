import axios from "axios";
import { DeleteAdminUserRequestDto, DeleteUserRequestDto, PatchUserInfoRequestDto, PostUserNickNameRequestDto } from "./dto/request";
import { bearerAuthorization, requestErrorHandler, requestHandler } from "..";
import { DELETE_ADMIN_USER_REQUEST_URL, DELETE_USER_REQUEST_URL, GET_SEARCH_USER_LIST_REQUEST_URL, GET_USER_LIST_REQUEST_URL, PATCH_USER_INFO_REQUEST_URL, POST_USER_NICKNAME_REQUEST_URL } from "src/constant";
import ResponseDto from "../response.dto";
import { GetSearchUserListResponseDto, GetUserInfoResponseDto, GetUserListResponseDto, PostUserNickNameResponseDto } from "./dto/response";

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

//      function: 유저 닉네임 불러오기 API 함수       //
export const postUserNickNameRequest = async (requestBody: PostUserNickNameRequestDto) => {
    const result = await axios.post(POST_USER_NICKNAME_REQUEST_URL, requestBody)
    .then(requestHandler<PostUserNickNameResponseDto>)
    .catch(requestErrorHandler);
return result;
}

//      function: 키워드 포함 유저 리스트 검색 API 함수       //
export const getSearchUserListRequest = async (word: string, accessToken: string) => {
    const config = {...bearerAuthorization(accessToken), params: {word}};
    const result = await axios.get(GET_SEARCH_USER_LIST_REQUEST_URL, config)
        .then(requestHandler<GetSearchUserListResponseDto>)
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