import ResponseDto from "src/apis/response.dto";
import { tourAttractionsListItem } from "src/types";

export interface GetSearchTourAttractionsListResponseDto extends ResponseDto {
    tourAttractionsListItem: tourAttractionsListItem[];
}

export interface GetTourAttractionsListResponseDto extends ResponseDto {
    tourAttractionsListItem: tourAttractionsListItem[];
}

export interface GetTourAttractionsResponseDto extends ResponseDto {
    tourattractionsImageUrl: string[];
    tourattractionsName: string;
    tourattractionsLocation: string;
    tourattractionsTelNumber: string;
    tourattractionsHours: string;
    tourattractionsOutline: string;
}
