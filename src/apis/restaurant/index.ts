import axios from "axios";

import ResponseDto from "../response.dto";
import { PatchRestaurantRequestDto, PostRestaurantRequestDto } from "./dto/request";
import { GetRestaurantListResponseDto, GetRestaurantRecommendStatusResponseDto, GetRestaurantResponseDto, GetSearchRestaurantListResponseDto } from "./dto/response";

import { bearerAuthorization, requestErrorHandler, requestHandler } from "..";
import { DELETE_RESTAURANT_REQUEST_URL, GET_RESTAURANT_LIST_REQUEST_URL, GET_RESTAURANT_RECOMMEND_URL, GET_RESTAURANT_REQUEST_URL, GET_SEARCH_RESTAURANT_LIST_REQUEST_URL, PATCH_RESTAURANT_RECOMMEND_URL, PATCH_RESTAURANT_REQUEST_URL, POST_RESTAURANT_REQUEST_URL } from "src/constant";

export const postRestaurantRequest = async (requestBody: PostRestaurantRequestDto, accessToken: string) => {
    const result = await axios.post(POST_RESTAURANT_REQUEST_URL, requestBody, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

export const getRestaurantListRequest = async (lat?: number, lng?: number) => {
    const header = (lat && lng) ? {params: { lat, lng }} : {};
    const result = await axios.get(GET_RESTAURANT_LIST_REQUEST_URL, header)
        .then(requestHandler<GetRestaurantListResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

export const getSearchRestaurantListRequest = async (searchWord: string) => {
    const config = {params: {searchWord}}
    const result = await axios.get(GET_SEARCH_RESTAURANT_LIST_REQUEST_URL, config)
        .then(requestHandler<GetSearchRestaurantListResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

export const getRestaurantRequest = async (restaurantNumber: number | string) => {
    const result = await axios.get(GET_RESTAURANT_REQUEST_URL(restaurantNumber))
        .then(requestHandler<GetRestaurantResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

export const getRestaurantRecommendStatusRequest =  async (restaurantNumber: number | string, accessToken: string) => {
    const result = await axios.get(GET_RESTAURANT_RECOMMEND_URL(restaurantNumber), bearerAuthorization(accessToken))
        .then(requestHandler<GetRestaurantRecommendStatusResponseDto>)
        .catch(requestErrorHandler);
    return result;
}

export const patchRestaurantRequest = async (requestBody: PatchRestaurantRequestDto, restaurantNumber: number | string, accessToken: string) => {
    const result = await axios.patch(PATCH_RESTAURANT_REQUEST_URL(restaurantNumber), requestBody, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result
}

export const patchRestRecommendRequest = async (restaurantNumber: number | string, accessToken: string) => {
    const result = await axios
        .patch(PATCH_RESTAURANT_RECOMMEND_URL(restaurantNumber), {}, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

export const deleteRestaurantRequest = async (restaurantNumber: number | string, accessToken: string) => {
    const result = await axios.delete(DELETE_RESTAURANT_REQUEST_URL(restaurantNumber), bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};