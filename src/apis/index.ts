import { AxiosResponse } from "axios";
import ResponseDto from "./response.dto";

export const requestHandler = <T>(response: AxiosResponse<T, any>) => {
    const responseBody = response.data;
    return responseBody;
}

export const requestErrorHandler = (error: any) => {
    const responseBody = error.response?.data;
    if (!responseBody) return null;
    return responseBody as ResponseDto;
}

export const bearerAuthorization = (accessToken: string) => ({ headers: { 'Authorization': `Bearer ${accessToken}`}});

export const kakaoAuthorization = (kakaoAppKey: string) => ({ headers: { 'Authorization': `KakaoAK ${kakaoAppKey}` }})