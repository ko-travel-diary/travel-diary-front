export interface PostTravelReviewRequestDto {
    reviewTitle : string;
    reviewContent : string;
    travelReviewImageUrl : string[];
    travelScheduleNumber : number;
}

export interface PostTravelReviewCommentRequestDto {
    commentContent : string;
    commentParentsNumber : number | null;
}

export interface PatchTravelReviewRequestDto {
    reviewTitle : string;
    reviewContent : string;
    travelReviewImageUrl : string[];
    travelScheduleNumber : number;
}

export interface PatchTravelCommentRequestDto {
    commentContent : string;
}
