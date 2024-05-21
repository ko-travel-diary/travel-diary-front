import ResponseDto from "src/apis/response.dto";
import { TourAttractionsListItem } from "src/types";

export interface GetSearchTourAttractionsListResponseDto extends ResponseDto {
    tourattractionsListItem: TourAttractionsListItem[];
}

export interface GetTourAttractionsListResponseDto extends ResponseDto {
    tourattractionsListItem: TourAttractionsListItem[];
}

export interface GetTourAttractionsResponseDto extends ResponseDto {
    tourattractionsReviewImageUrl: string[];
    tourattractionsName: string;
    tourattractionslocation: string;
    tourattractionsTelNumber: string;
    tourattractionsHours: string;
    tourattractionsOutline: string;
}