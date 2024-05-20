export interface SignUpRequestDto {
    userId: string;
    userPassword: string;
    nickName: string;
    userEmail: string;
    authNumber: string;
}

export interface IdCheckRequestDto {
    userId: string;
}

export interface EmailAuthRequestDto {
    userEmail: string;
}

export interface NickNameCheckRequestDto {
    nickName: string;
}

export interface EmailAuthCheckRequestDto {
    userEmail: string;
    authNumber: string;
}

export interface SignInRequestDto {
    userId: string;
    userPassword: string;
}