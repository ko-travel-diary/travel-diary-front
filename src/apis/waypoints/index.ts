import axios from "axios";
import { PostWaypointsRequestDto } from "./request";
import { POST_WAYPOINTS_URL } from "src/constant";
import { kakaoAuthorization, requestErrorHandler, requestHandler } from "..";

export const postWaypointsRequest = async (requestBody: PostWaypointsRequestDto, kakaoAppKey: string) => {
    const result = await axios
        .post(POST_WAYPOINTS_URL, requestBody, kakaoAuthorization(kakaoAppKey))
        .then(requestHandler<any>)
        .catch(() => {
            return null;
        })
    return result;
};