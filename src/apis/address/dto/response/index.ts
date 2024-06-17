import ResponseDto from "src/apis/response.dto";

export interface GetSearchCoordinateResponseDto extends ResponseDto {
    x: number;
    y: number;
}

export interface GetSearchAddressResponseDto extends ResponseDto {
    addresses: string[];
}