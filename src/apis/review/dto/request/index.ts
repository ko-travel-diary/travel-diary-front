// description: 리뷰 게시글 작성 Request Body DTO //

export interface PostTravelReviewRequestDto {
    reviewTitle : string;
    reviewContent : string;
    travelReviewImageUrl : string[];
    travelScheduleNumber : number;
}

// description: 리뷰 게시글의 댓글 & 답글 작성 Request Body DTO //
export interface PostTravelReviewCommentRequestDto {
    commentContent : string;
    commentParentsNumber : number | null;
}

// description: 리뷰 게시글 수정 Request Body DTO //
export interface PatchTravelReviewRequestDto {
    reviewTitle : string;
    reviewContent : string;
    travelReviewImageUrl : string[];
}

// description: 리뷰 게시글의 댓글 & 답글 수정 Request Body DTO //
export interface PatchTravelCommentRequestDto {
    commentContent : string;
}
