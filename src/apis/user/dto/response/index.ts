import ResponseDto from "src/apis/response.dto";
import { UserListItem } from "src/types";

export interface GetUserListResponseDto extends ResponseDto {
    userListItem: UserListItem[];
}

export interface GetUserInfoResponseDto extends ResponseDto {
    profileImage: string;
    userId: string;
    userEmail: string;
}