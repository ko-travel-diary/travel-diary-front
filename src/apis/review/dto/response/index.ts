import ResponseDto from "src/apis/response.dto";
import { ReviewBoardListItem, ReviewCommentList, TravelReviewMyList } from "src/types";

export interface GetTravelReviewCommentListResponseDto extends ResponseDto {
    reviewCommentList: ReviewCommentList[];
}

export interface GetTravelReviewBoardResponseDto extends ResponseDto {
    reviewBoardList: ReviewBoardListItem[];
}

export interface GetReviewSearchRequestDto extends ResponseDto {
    reviewSearchList: ReviewBoardListItem[];
}
export interface GetTravelReviewDetailResponseDto extends ResponseDto {
    reviewNumber: number;
    reviewTitle: string;
    reviewContent: string;
    writerId: string;
    reviewDatetime: string;
    travelReviewImageUrl: string[];
    reviewViewCount: number;
    reviewFavoriteCount: number;
    commentContent: string;
    travelScheduleNumber: number;
}

export interface GetTravelReviewMyListResponseDto extends ResponseDto {
    travelReviewMyList: TravelReviewMyList[];
}

export interface GetTravelReviewMyListSearchResponseDto extends ResponseDto {
    reviewSearchList: TravelReviewMyList[];
}
export interface GetTravelReviewFavoriteStatusResponseDto extends ResponseDto {
    favoriteStatus: boolean;
}

export interface PostTravelReviewResponseDto extends ResponseDto {
    reviewNumber: number;
}
