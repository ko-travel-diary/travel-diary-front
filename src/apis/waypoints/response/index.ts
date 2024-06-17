import ResponseDto from "src/apis/response.dto";

export interface PostWaypointsResponseDto extends ResponseDto {
    routes: Object[];
}