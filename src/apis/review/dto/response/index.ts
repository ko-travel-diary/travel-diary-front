import ResponseDto from "src/apis/response.dto";

// description : 리뷰 게시물의 전체 댓글 & 답글 불러오기 Response Body DTO
export interface GetTravelReviewCommentListResponseDto extends ResponseDto {
    reviewCommentList : ReviewCommentListItem[];
}

// description : 리뷰 게시물 목록 불러오기 Response Body DTO
export interface GetTravelReviewBoardResponseDto extends ResponseDto {
    reviewBoardList : ReviewBoardListItem[];
}

// description : 리뷰 게시물 검색 목록 불러오기 Response Body DTO
export interface GetTravelReviewSearchResponseDto extends ResponseDto {
    reviewBoardList : ReviewBoardListItem[];
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