import axios from "axios";

import ResponseDto from "../response.dto";
import { PatchTravelReviewRequestDto, PostTravelReviewCommentRequestDto, PostTravelReviewRequestDto } from "./dto/request";
import { GetTravelReviewBoardResponseDto, GetTravelReviewCommentListResponseDto, GetTravelReviewDetailResponseDto, GetTravelReviewMyListResponseDto, GetTravelReviewFavoriteStatusResponseDto, GetTravelReviewMyListSearchResponseDto, GetReviewSearchRequestDto } from "./dto/response";

import { bearerAuthorization, requestErrorHandler, requestHandler } from "..";
import { DELETE_REVIEW_COMMENT_REQUEST_URL, DELETE_REVIEW_REQUEST_URL, GET_COMMENT_LIST_REQUEST_URL, GET_REVIEW_FAVORITE_STATUS_REQUEST_URL, GET_REVIEW_LIST_REQUEST_URL, GET_REVIEW_MY_LIST_REQUEST_URL, GET_SEARCH_REVIEW_REQUEST_LIST_URL, GET_REVIEW_MY_LIST_SEARCH_REQUEST_URL, GET_REVIEW_REQUEST_URL, PATCH_FAVORITE_COUNT_REQUEST_URL, PATCH_INCREASE_VIEW_COUNT_REQUEST_URL, PATCH_REVIEW_COMMENT_REQUEST_URL, PATCH_REVIEW_REQUEST_URL, POST_REVIEW_COMMENT_REQUEST_URL, POST_REVIEW_REQUEST_URL } from "src/constant";

export const postTravelReviewRequest = async (RequestBody: PostTravelReviewRequestDto, accessToken: string) => {
    const result = await axios
        .post(POST_REVIEW_REQUEST_URL, RequestBody, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

export const postTravelReviewCommentRequest = async (
    reviewNumber: number | string,
    RequestBody: PostTravelReviewCommentRequestDto,
    accessToken: string
) => {
    const result = await axios
        .post(POST_REVIEW_COMMENT_REQUEST_URL(reviewNumber), RequestBody, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

export const getTravelReviewCommentListRequest = async (reviewNumber: number | string) => {
    const result = await axios
        .get(GET_COMMENT_LIST_REQUEST_URL(reviewNumber))
        .then(requestHandler<GetTravelReviewCommentListResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

export const getTravelReviewBoardRequest = async () => {
    const result = await axios
        .get(GET_REVIEW_LIST_REQUEST_URL)
        .then(requestHandler<GetTravelReviewBoardResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

export const getTravelReviewSearchRequest = async (titleAndContent?: string, writer?: string, writedate?: string) => {
    const config = { params: { titleAndContent, writer, writedate } };
    const result = await axios
        .get(GET_SEARCH_REVIEW_REQUEST_LIST_URL, config)
        .then(requestHandler<GetReviewSearchRequestDto>)
        .catch(requestErrorHandler);
    return result;
};

export const getTravelReviewDetailRequest = async (reviewNumber: number | string) => {
    const result = await axios
        .get(GET_REVIEW_REQUEST_URL(reviewNumber))
        .then(requestHandler<GetTravelReviewDetailResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

export const getTravelReviewMyListRequest = async (accessToken: string) => {
    const result = await axios
        .get(GET_REVIEW_MY_LIST_REQUEST_URL, bearerAuthorization(accessToken))
        .then(requestHandler<GetTravelReviewMyListResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

export const getTravelReviewMyListSearchRequest = async (searchWord: string, accessToken: string) => {
    const config = { params: { searchWord }, ...bearerAuthorization(accessToken) };
    const result = await axios
        .get(GET_REVIEW_MY_LIST_SEARCH_REQUEST_URL, config)
        .then(requestHandler<GetTravelReviewMyListSearchResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

export const getTravelReviewFavoriteStatusRequest = async (reviewNumber: number | string, accessToken: string) => {
    const result = await axios
        .get(GET_REVIEW_FAVORITE_STATUS_REQUEST_URL(reviewNumber), bearerAuthorization(accessToken))
        .then(requestHandler<GetTravelReviewFavoriteStatusResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

export const increaseViewCountRequest = async (reviewNumber: number | string) => {
    const result = await axios
        .patch(PATCH_INCREASE_VIEW_COUNT_REQUEST_URL(reviewNumber))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

export const patchTravelReviewRequestDto = async (reviewNumber: number | string, RequestBody: PatchTravelReviewRequestDto, accessToken: string) => {
    const result = await axios
        .patch(PATCH_REVIEW_REQUEST_URL(reviewNumber), RequestBody, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

export const patchTravelCommentRequestDto = async (
    commentNumber: number | string,
    RequestBody: PostTravelReviewCommentRequestDto,
    accessToken: string
) => {
    const result = await axios
        .post(PATCH_REVIEW_COMMENT_REQUEST_URL(commentNumber), RequestBody, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

export const patchFavoriteRequest = async (reviewNumber: number | string, accessToken: string) => {
    const result = await axios
        .patch(PATCH_FAVORITE_COUNT_REQUEST_URL(reviewNumber), {}, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

export const deleteTravelReviewReqeust = async (reviewNumber: number | string, accessToken: string) => {
    const result = await axios
        .delete(DELETE_REVIEW_REQUEST_URL(reviewNumber), bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

export const deleteTravelReviewCommentRequest = async (commentNumber: number | string, reviewNumber: number | string, accessToken: string) => {
    const result = await axios
        .delete(DELETE_REVIEW_COMMENT_REQUEST_URL(reviewNumber, commentNumber), bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};
