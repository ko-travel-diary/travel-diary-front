import { GET_SEARCH_TOURATTRACTIONS_LIST_REQUEST_URL, GET_TOURATTRACTIONS_LIST_REQUEST_URL, GET_TOURATTRACTIONS_REQUEST_URL, POST_TOURATTRACTIONS_REQUEST_URL } from "src/constant";
import { PostTourAttractionsRequestDto } from "./dto/request";
import { bearerAuthorization, requestErrorHandler, requestHandler } from "..";
import axios from "axios";
import ResponseDto from "../response.dto";
import { GetSearchTourAttractionsListResponseDto, GetTourAttractionsListResponseDto, GetTourAttractionsResponseDto } from "./dto/response";

//      function: 관광지 리스트 불러오기 API 함수       //
export const getTourAttractionsListRequest = async () => {
    const result = await axios.get(GET_TOURATTRACTIONS_LIST_REQUEST_URL)
        .then(requestHandler<GetTourAttractionsListResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

//      function: 관광지 검색어 리스트 불러오기 API 함수       //
export const getSearchTourAttractionsListRequest = async (searchWord: string) => {
    const config = {params: {searchWord}};
    const result = await axios.get(GET_SEARCH_TOURATTRACTIONS_LIST_REQUEST_URL, config)
        .then(requestHandler<GetSearchTourAttractionsListResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

//      function: 관광지 상세 정보 불러오기 API 함수       //
export const getTourAttractionsRequest = async (tourattractionsNumber: number | string) => {
    const result = await axios.get(GET_TOURATTRACTIONS_REQUEST_URL(tourattractionsNumber))
        .then(requestHandler<GetTourAttractionsResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

//      function: 관광지 추가 API 함수       //
export const postTourAttractionsRequest = async (requestBody: PostTourAttractionsRequestDto, accessToken: string) => {
    const result = await axios.put(POST_TOURATTRACTIONS_REQUEST_URL, requestBody, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

