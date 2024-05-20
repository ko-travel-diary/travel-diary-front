import ResponseDto from "src/apis/response.dto";

export interface GetUserListResponseDto extends ResponseDto {
    userInfoList: string; ///수정해야함 리스트아이템
}

export interface GetUserInfoResponseDto extends ResponseDto {
    profileImage: string;
    userId: string;
    userEmail: string;
}