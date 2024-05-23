import ResponseDto from "src/apis/response.dto";
import { ReviewBoardListItem, reviewCommentList } from "src/types";

// description : 리뷰 게시물의 전체 댓글 & 답글 불러오기 Response Body DTO
export interface GetTravelReviewCommentListResponseDto extends ResponseDto {
    reviewCommentList : reviewCommentList[];
}

// description : 리뷰 게시물 목록 불러오기 Response Body DTO
export interface GetTravelReviewBoardResponseDto extends ResponseDto {
    reviewBoardList : ReviewBoardListItem[];
}

// description : 리뷰 게시물  제목+내용 검색 목록 불러오기 Response Body DTO
export interface GetReviewTitleAndContentSearchRequestDto extends ResponseDto {
    reviewSearchList : ReviewBoardListItem[];
}

// description : 리뷰 게시물 작성일 검색 목록 불러오기 Response Body DTO
export interface GetReviewWriteDateSearchRequestDto extends ResponseDto {
    reviewSearchList : ReviewBoardListItem[];
}

// description : 리뷰 게시물 작성자 검색 목록 불러오기 Response Body DTO
export interface GetReviewWriterSearchRequestDto extends ResponseDto {
    reviewSearchList : ReviewBoardListItem[];
}

// description : 리뷰 게시물 상세보기 Response Body DTO
export interface GetTravelReviewDetailResponseDto extends ResponseDto {
    reviewNumber : number;
    reviewTitle : string;
    reviewContent : string;
    writerId : string;
    reviewDatetime : string;
    travelReviewImageUrl : string[];
    reviewViewCount : number;
    reviewFavoriteCount : number;
    commentContent : string;
}


// description : 내가 쓴 리뷰 게시물 불러오기 Response Body DTO
export interface GetTravelReviewMyListResponseDto extends ResponseDto {
    reviewBoardList : ReviewBoardListItem[];
}

// description : 해당 게시물에 내가 좋아요 누른 상태 불러오기 Response Body DTO
export interface GetTravelReviewFavoriteStatusResponseDto extends ResponseDto {
    favoriteStatus : boolean;
}

// description : 내가 쓴 리뷰 게시물 불러오기 Response Body DTO
export interface PostTravelReviewResponseDto extends ResponseDto {
    reviewNumber : number;
}