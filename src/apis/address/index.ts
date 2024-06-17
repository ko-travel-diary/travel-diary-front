import axios from "axios";

import { GetSearchAddressResponseDto, GetSearchCoordinateResponseDto } from "./dto/response";

import { requestErrorHandler, requestHandler } from "..";
import { GET_ADDRESS_URL, GET_COORDINATE_URL } from "src/constant";

//      function: 주소로 좌표값 받기 API 함수      //
export const getCoordinateRequest = async (query: string, accessToken: string) => {
    const config = {params: { query }, headers: { Authorization: `Bearer ${accessToken}` }};
    const result = await axios.get(GET_COORDINATE_URL, config)
        .then(requestHandler<GetSearchCoordinateResponseDto>)
        .catch(requestErrorHandler);
    return result
}

//      function: 키워드로 주소 겁사 API 함수       //
export const getAddressRequest = async (query: string, page: number, size: number, accessToken: string) => {
    const config = {params: { query, page, size }, headers: { Authorization: `Bearer ${accessToken}` }};
    const result = await axios.get(GET_ADDRESS_URL, config)
        .then(requestHandler<GetSearchAddressResponseDto>)
        .catch(requestErrorHandler);
    return result
}