import axios from "axios"

import ResponseDto from "../response.dto";
import { GetQnaListResponseDto, GetQnaResponseDto, GetQnaSearchListResponseDto } from "./dto/response";
import { PatchQnaCommentRequestDto, PatchQnaRequestDto, PostQnaCommentRequestDto, PostQnaRequestDto } from "./dto/request"

import { bearerAuthorization, requestErrorHandler, requestHandler } from "..";
import { DELETE_QNA_COMMENT_REQUEST_URL, DELETE_QNA_REQUEST_URL, GET_QNA_LIST_REQUEST_URL, GET_QNA_REQUEST_URL, GET_SEARCH_QNA_LIST_REQUEST_URL, PATCH_QNA_COMMENT_REQUEST_URL, PATCH_QNA_REQUEST_URL, POST_QNA_COMMENT_REQUEST_URL, POST_QNA_REQUEST_URL } from "src/constant";

export const postQnaRequest = async (requestBody: PostQnaRequestDto, accessToken: string) => {
    const result = await axios.post(POST_QNA_REQUEST_URL, requestBody, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
}

export const postQnaCommentRequest = async (requestBody: PostQnaCommentRequestDto, receptionNumber: number | string, accessToken: string) => {
    const result = await axios.post(POST_QNA_COMMENT_REQUEST_URL(receptionNumber), requestBody, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler)
    return result;
}

export const getQnaListRequest = async () => {
    const result = await axios.get(GET_QNA_LIST_REQUEST_URL)
        .then(requestHandler<GetQnaListResponseDto>)
        .catch(requestErrorHandler);
    return result;
}

export const getQnaSearchListRequest = async (word: string, accessToken: string ) => {
    const config = {...bearerAuthorization(accessToken), params: {word}}
    const result = await axios.get(GET_SEARCH_QNA_LIST_REQUEST_URL, config)
        .then(requestHandler<GetQnaSearchListResponseDto>)
        .catch(requestErrorHandler);
    return result;
}

export const getQnaRequest = async (receptionNumber: number | string, accessToken: string) => {
    const result = await axios.get(GET_QNA_REQUEST_URL(receptionNumber), bearerAuthorization(accessToken))
        .then(requestHandler<GetQnaResponseDto>)
        .catch(requestErrorHandler);
    return result;
}

export const patchQnaRequest = async (receptionNumber: number | string, requestBody: PatchQnaRequestDto, accessToken: string) => {
    const result = await axios.patch(PATCH_QNA_REQUEST_URL(receptionNumber), requestBody, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
}

export const patchQnaCommentRequest = async (receptionNumber: number | string, requestBody: PatchQnaCommentRequestDto, accessToken: string) => {
    const result = await axios.patch(PATCH_QNA_COMMENT_REQUEST_URL(receptionNumber), requestBody, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
}   

export const deleteQnaRequest = async (receptionNumber: number | string, accessToken: string) => {
    const result = await axios.delete(DELETE_QNA_REQUEST_URL(receptionNumber), bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
}

export const deleteQnaCommentRequest = async (receptionNumber: number | string, accessToken: string) => {
    const result = await axios.delete(DELETE_QNA_COMMENT_REQUEST_URL(receptionNumber), bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler)
    return result;
}