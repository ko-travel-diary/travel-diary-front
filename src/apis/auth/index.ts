import axios from "axios";

import ResponseDto from "../response.dto";
import { SignInResponseDto } from "./dto/response";
import { EmailAuthCheckRequestDto, EmailAuthRequestDto, IdCheckRequestDto, NickNameCheckRequestDto, SignInRequestDto, SignUpRequestDto } from "./dto/request";

import { requestErrorHandler, requestHandler } from "..";
import { EMAIL_AUTH_CHECK_REQUEST_URL, EMAIL_AUTH_REQUEST_URL, ID_CHECK_REQUEST_URL, NICKNAME_CHECK_REQUEST_URL, SIGN_IN_REQUEST_URL, SIGN_UP_REQUEST_URL } from "src/constant";

export const signInRequest = async (requestBody: SignInRequestDto) => {
    const result = await axios.post(SIGN_IN_REQUEST_URL, requestBody)
        .then(requestHandler<SignInResponseDto>)
        .catch(requestErrorHandler);

    return result;
};

export const idCheckRequest = async (requestBody: IdCheckRequestDto) => {
    const result = await axios.post(ID_CHECK_REQUEST_URL, requestBody)
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);

    return result;
};

export const nickNameCheckRequest = async (requestBody: NickNameCheckRequestDto) => {
    const result = await axios.post(NICKNAME_CHECK_REQUEST_URL, requestBody)
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);

    return result;
}

export const emailAuthRequest = async (requestBody: EmailAuthRequestDto) => {
    const result = await axios.post(EMAIL_AUTH_REQUEST_URL, requestBody)
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    
        return result;
};

export const emailAuthCheckRequest = async (requestBody: EmailAuthCheckRequestDto) => {
    const result = await axios.post(EMAIL_AUTH_CHECK_REQUEST_URL, requestBody)
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler)
    
    return result;
};

export const singUpRequest = async(requestBody: SignUpRequestDto) => {
    const result = await axios.post(SIGN_UP_REQUEST_URL, requestBody)
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler)
    return result;
};
