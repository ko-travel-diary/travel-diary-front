import ResponseDto from "src/apis/response.dto";
import { UserListItem } from "src/types";

export interface GetUserListResponseDto extends ResponseDto {
    userListItem: UserListItem[];
}

export interface GetUserInfoResponseDto extends ResponseDto {
    profileImage: string;
    userId: string;
    nickName: string;
    userEmail: string;
    userRole: string;
}

export interface GetSearchUserListResponseDto extends ResponseDto {
    searchUserListItem: UserListItem[];
}

export interface PostUserNickNameResponseDto extends ResponseDto {
    nickName: string;
}