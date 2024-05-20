export interface PatchUserInfoRequestDto {
    nickName: string;
    profileImage: string;
}

export interface DeleteUserRequestDto {
    userPassword: string;
}

export interface DeleteAdminUserRequestDto {
    deleteToUserId: string;
}