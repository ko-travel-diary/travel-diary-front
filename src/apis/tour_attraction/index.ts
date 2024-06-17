import axios from "axios";

import ResponseDto from "../response.dto";
import { PatchTourAttractionsRequestDto, PostTourAttractionsRequestDto } from "./dto/request";
import { GetSearchTourAttractionsListResponseDto, GetTourAttractionsListResponseDto, GetTourAttractionsRecommendResponseDto, GetTourAttractionsResponseDto } from "./dto/response";

import { bearerAuthorization, requestErrorHandler, requestHandler } from "..";
import { DELETE_TOURATTRACTIONS_REQUEST_URL, GET_SEARCH_TOURATTRACTIONS_LIST_REQUEST_URL, GET_TOURATTRACTIONS_LIST_REQUEST_URL, GET_TOURATTRACTIONS_RECOMMEND_URL, GET_TOURATTRACTIONS_REQUEST_URL, PATCH_TOURATTRACTIONS_RECOMMEND_URL, PATCH_TOURATTRACTIONS_REQUEST_URL, POST_TOURATTRACTIONS_REQUEST_URL } from "src/constant";

export const postTourAttractionsRequest = async (
    requestBody: PostTourAttractionsRequestDto,
    accessToken: string
) => {
    const result = await axios
        .post(
            POST_TOURATTRACTIONS_REQUEST_URL,
            requestBody,
            bearerAuthorization(accessToken)
        )
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

export const getTourAttractionsListRequest = async (
    lat?: number,
    lng?: number
) => {
    const header = lat && lng ? { params: { lat, lng } } : {};
    const result = await axios
        .get(GET_TOURATTRACTIONS_LIST_REQUEST_URL, header)
        .then(requestHandler<GetTourAttractionsListResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

export const getSearchTourAttractionsListRequest = async (
    searchWord: string
) => {
    const config = { params: { searchWord } };
    const result = await axios
        .get(GET_SEARCH_TOURATTRACTIONS_LIST_REQUEST_URL, config)
        .then(requestHandler<GetSearchTourAttractionsListResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

export const getTourAttractionsRequest = async (
    tourAttractionsNumber: number | string
) => {
    const result = await axios
        .get(GET_TOURATTRACTIONS_REQUEST_URL(tourAttractionsNumber))
        .then(requestHandler<GetTourAttractionsResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

export const getTourAttractionRecommendStatusRequest =  async (tourAttractionsNumber: number | string, accessToken: string) => {
    const result = await axios.get(GET_TOURATTRACTIONS_RECOMMEND_URL(tourAttractionsNumber), bearerAuthorization(accessToken))
        .then(requestHandler<GetTourAttractionsRecommendResponseDto>)
        .catch(requestErrorHandler);
    return result;
}

export const patchTourAttractionsRequest = async (
    requestBody: PatchTourAttractionsRequestDto,
    tourAttractionsNumber: number | string,
    accessToken: string
) => {
    const result = await axios
        .patch(
            PATCH_TOURATTRACTIONS_REQUEST_URL(tourAttractionsNumber),
            requestBody,
            bearerAuthorization(accessToken)
        )
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

export const deleteTourAttractionsRequest = async (tourAttractionsNumber: number | string, accessToken: string) => {
    const result = await axios.delete(DELETE_TOURATTRACTIONS_REQUEST_URL(tourAttractionsNumber), bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

export const patchTourRecommendRequest = async (tourAttractionsNumber: number | string, accessToken: string) => {
    const result = await axios
        .patch(PATCH_TOURATTRACTIONS_RECOMMEND_URL(tourAttractionsNumber), {}, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};