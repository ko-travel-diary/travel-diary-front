import ResponseDto from "src/apis/response.dto";

export interface GetSearchTourAttractionsListResponseDto extends ResponseDto {
    tourattractionsList: string //TourAttractionsListItem[]	;
}

export interface GetTourAttractionsListResponseDto extends ResponseDto {
    tourattractionsList: string //TourAttractionsListItem[]	;
}

export interface GetTourAttractionsResponseDto extends ResponseDto {
    tourattractionsReviewImageUrl: string[];
    tourattractionsName: string;
    tourattractionslocation: string;
    tourattractionsTelNumber: string;
    tourattractionsHours: string;
    tourattractionsOutline: string;
}