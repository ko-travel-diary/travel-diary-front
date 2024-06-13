import ResponseDto from "src/apis/response.dto";
import { ReviewBoardListItem, ReviewCommentList, TravelReviewMyList } from "src/types";

// description : 리뷰 게시물의 전체 댓글 & 답글 불러오기 Response Body DTO
export interface GetTravelReviewCommentListResponseDto extends ResponseDto {
    reviewCommentList: ReviewCommentList[];
}

// description : 리뷰 게시물 목록 불러오기 Response Body DTO
export interface GetTravelReviewBoardResponseDto extends ResponseDto {
    reviewBoardList: ReviewBoardListItem[];
}

// description : 리뷰 게시물 검색 목록 불러오기 Response Body DTO
export interface GetReviewSearchRequestDto extends ResponseDto {
    reviewSearchList: ReviewBoardListItem[];
}

// description : 리뷰 게시물 상세보기 Response Body DTO
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

// description : 내가 쓴 리뷰 게시물 불러오기 Response Body DTO
export interface GetTravelReviewMyListResponseDto extends ResponseDto {
    travelReviewMyList: TravelReviewMyList[];
}

// description : 내가 쓴 리뷰 게시물 검색 목록 불러오기 Response Body DTO
export interface GetTravelReviewMyListSearchResponseDto extends ResponseDto {
    reviewSearchList: TravelReviewMyList[];
}

// description : 해당 게시물에 내가 좋아요 누른 상태 불러오기 Response Body DTO
export interface GetTravelReviewFavoriteStatusResponseDto extends ResponseDto {
    favoriteStatus: boolean;
}

// description : 내가 쓴 리뷰 게시물 불러오기 Response Body DTO
export interface PostTravelReviewResponseDto extends ResponseDto {
    reviewNumber: number;
}
