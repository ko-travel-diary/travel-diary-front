import axios from "axios"
import { PostQnaRequestDto } from "./dto/request"
import { POST_QNA_REQUEST_URL } from "src/constant";
import { bearerAuthorization, requestErrorHandler, requestHandler } from "..";

export const postQna = async (requestBody: PostQnaRequestDto, accessToken: string) => {
    const result = axios.post(POST_QNA_REQUEST_URL, requestBody, bearerAuthorization(accessToken))
        .then(requestHandler())
        .catch(requestErrorHandler)
}