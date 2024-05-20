import ResponseDto from "src/apis/response.dto";

export interface SignInResponseDto extends ResponseDto {
    accessToken: string;
    expires: number;
}