import axios from "axios";
import { EmailAuthCheckRequestDto, EmailAuthRequestDto, IdCheckRequestDto, NickNameCheckRequestDto, SignInRequestDto, SignUpRequestDto } from "./dto/request";
import { EMAIL_AUTH_CHECK_REQUEST_URL, EMAIL_AUTH_REQUEST_URL, ID_CHECK_REQUEST_URL, NICKNAME_CHECK_REQUEST_URL, SIGN_IN_REQUEST_URL, SIGN_UP_REQUEST_URL } from "src/constant";
import { SignInResponseDto } from "./dto/response";
import { requestErrorHandler, requestHandler } from "..";
import ResponseDto from "../response.dto";

//      function: 로그인 API 함수       //
export const signInRequest = async (requestBody: SignInRequestDto) => {
    const result = await axios.post(SIGN_IN_REQUEST_URL, requestBody)
        .then(requestHandler<SignInResponseDto>)
        .catch(requestErrorHandler);

    return result;
};

//      function: 아이디 중복 검사 API 함수       //
export const idCheckRequest = async (requestBody: IdCheckRequestDto) => {
    const result = await axios.post(ID_CHECK_REQUEST_URL, requestBody)
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);

    return result;
};

//      function: 닉네임 중복 검사 API 함수       //
export const nickNameCheckRequest = async (requestBody: NickNameCheckRequestDto) => {
    const result = await axios.post(NICKNAME_CHECK_REQUEST_URL, requestBody)
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);

    return result;
}

//      function: 이메일 인증 API 함수       //
export const emailAuthRequest = async (requestBody: EmailAuthRequestDto) => {
    const result = await axios.post(EMAIL_AUTH_REQUEST_URL, requestBody)
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    
        return result;
};

//      function: 이메일 인증 확인 API 함수       //
export const emailAuthCheckRequest = async (requestBody: EmailAuthCheckRequestDto) => {
    const result = await axios.post(EMAIL_AUTH_CHECK_REQUEST_URL, requestBody)
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler)
    
    return result;
};

//      function: 회원가입 API 함수       //
export const singUpRequest = async(requestBody: SignUpRequestDto) => {
    const result = await axios.post(SIGN_UP_REQUEST_URL, requestBody)
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler)
    return result;
};
