import axios from "axios";
import { PatchTravelCommentRequestDto, PostTravelReviewCommentRequestDto, PostTravelReviewRequestDto } from "./dto/request";
import { DELETE_REVIEW_COMMENT_REQUEST_URL, DELETE_REVIEW_REQUEST_URL, GET_COMMENT_LIST_REQUEST_URL, GET_REVIEW_LIST_REQUEST_URL, GET_REVIEW_MY_LIST_REQUEST_URL, GET_REVIEW_REQUEST_URL, GET_SEARCH_REVIEW_REQUEST_LIST_URL, PATCH_FAVORITE_COUNT_REQUEST_URL, PATCH_INCREASE_VIEW_COUNT_REQUEST_URL, PATCH_REVIEW_COMMENT_REQUEST_URL, PATCH_REVIEW_REQUEST_URL, POST_REVIEW_COMMENT_REQUEST_URL, POST_REVIEW_REQUEST_URL } from "src/constant";
import { bearerAuthorization, requestErrorHandler, requestHandler } from "..";
import ResponseDto from "../response.dto";
import { GetTravelReviewBoardResponseDto, GetTravelReviewCommentListResponseDto, GetTravelReviewDetailResponseDto, GetTravelReviewMyListResponseDto, GetTravelReviewSearchResponseDto } from "./dto/response";

// function : 리뷰 게시물 작성 API 함수
export const postTravelReviewRequest = async(RequestBody: PostTravelReviewRequestDto, accessToken: string) => {
    const result = await axios.post(POST_REVIEW_REQUEST_URL, RequestBody, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
}

// function : 리뷰 게시물의 댓글 & 답글 작성 API 함수
export const postTravelReviewCommentRequest = async(reviewNumber: number | string, RequestBody: PostTravelReviewCommentRequestDto, accessToken: string) => {
    const result = await axios.post(POST_REVIEW_COMMENT_REQUEST_URL(reviewNumber), RequestBody,
    bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
}

// function : 리뷰 게시물 수정 API 함수
export const patchTravelReviewRequestDto = async(reviewNumber: number | string, RequestBody: PatchTravelCommentRequestDto, accessToken: string) => {
    const result = await axios.patch(PATCH_REVIEW_REQUEST_URL(reviewNumber), RequestBody, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
}

// function : 리뷰 게시물의 댓글 & 답글 수정 API 함수
export const patchTravelCommentRequestDto = async(commentNumber: number | string, RequestBody: PostTravelReviewCommentRequestDto, accessToken: string) => {
    const result = await axios.post(PATCH_REVIEW_COMMENT_REQUEST_URL(commentNumber), RequestBody,
    bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
}

// function : 리뷰 게시물의 전체 댓글 & 답글 불러오기 API 함수
export const getTravelReviewCommentListRequest = async(reviewNumber: number | string) => {
    const result = await axios.get(GET_COMMENT_LIST_REQUEST_URL(reviewNumber))
        .then(requestHandler<GetTravelReviewCommentListResponseDto>)
        .catch(requestErrorHandler);
    return result;
}

// function : 리뷰 게시물 목록 불러오기 API 함수
export const getTravelReviewBoardRequest = async() => {
    const result = await axios.get(GET_REVIEW_LIST_REQUEST_URL)
        .then(requestHandler<GetTravelReviewBoardResponseDto>)
        .catch(requestErrorHandler);
    return result;
}

// function : 리뷰 게시물 검색 목록 불러오기 API 함수
export const getTravelReviewSearchRequest = async(word: string) => {
    const config = {params: {word}}
    const result = await axios.get(GET_SEARCH_REVIEW_REQUEST_LIST_URL, config)
        .then(requestHandler<GetTravelReviewSearchResponseDto>)
        .catch(requestErrorHandler);
    return result;
}

// function : 리뷰 게시물 상세보기 API 함수
export const GetTravelReviewDetailRequest = async(reviewNumber: number | string) => {
    const result = await axios.get(GET_REVIEW_REQUEST_URL(reviewNumber))
        .then(requestHandler<GetTravelReviewDetailResponseDto>)
        .catch(requestErrorHandler);
    return result;
}

// function : 내가 쓴 리뷰 게시물 불러오기 API 함수
export const GetTravelReviewMyListRequest = async(accessToken: string) => {
    const result = await axios.get(GET_REVIEW_MY_LIST_REQUEST_URL, bearerAuthorization(accessToken))
        .then(requestHandler<GetTravelReviewMyListResponseDto>)
        .catch(requestErrorHandler);
    return result;
}

// function : 리뷰 게시물 조회수 증가 API 함수
export const increaseViewCountRequest = async(reviewNumber: number | string, accessToken: string) => {
    const result = await axios.patch(PATCH_INCREASE_VIEW_COUNT_REQUEST_URL(reviewNumber), {}, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
}

// function : 리뷰 게시물 좋아요 API 함수
export const increaseFavoriteCountRequest = async(reviewNumber: number | string, accessToken: string) => {
    const result = await axios.patch(PATCH_FAVORITE_COUNT_REQUEST_URL(reviewNumber), {}, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
}

// function : 리뷰 게시물 삭제 API 함수
export const deleteTravelReviewReqeust = async(reviewNumber : number | string, accessToken: string) => {
    const result = await axios.delete(DELETE_REVIEW_REQUEST_URL(reviewNumber), bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
}

// function : 리뷰 게시물의 댓글 & 답글 삭제 API 함수
export const deleteTravelReviewCommentRequest = async(commentNumber: number | string, accessToken: string) => {
    const result = await axios.delete(DELETE_REVIEW_COMMENT_REQUEST_URL(commentNumber), bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
}
