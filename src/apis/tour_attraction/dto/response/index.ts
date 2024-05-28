import ResponseDto from "src/apis/response.dto";
import { TourAttractionsListItem } from "src/types";

export interface GetSearchTourAttractionsListResponseDto extends ResponseDto {
    tourAttractionsListItem: TourAttractionsListItem[];
}

export interface GetTourAttractionsListResponseDto extends ResponseDto {
    tourAttractionsListItem: TourAttractionsListItem[];
}

export interface GetTourAttractionsResponseDto extends ResponseDto {
    tourAttractionsNumber: number;
    tourAttractionsImageUrl: string[];
    tourAttractionsName: string;
    tourAttractionsLocation: string;
    tourAttractionsTelNumber: string;
    tourAttractionsHours: string;
    tourAttractionsOutline: string;
}
