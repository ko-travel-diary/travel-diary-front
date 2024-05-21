export interface QnaListItem{
    receptionNumber: number;
    status: string;
    qnaTitle: string;
    qnaContent: string;
    qnaWriterId: string;
    qnaDatetime: string;
}

export interface ExpenditureListItem{
    travelScheduleExpenditureDetail: string;
    travelScheduleExpenditure: number;
}

export interface ScheduleListItem{
    scheduleDate: string;
    scheduleContent: string;
    scheduleStartTime: string;
    scheduleEndTime: string;
}

export interface UserListItem{
    userId: string;
    userEmail: string;
}

export interface TourAttractionsListItem{
    tourAttractionsImageUrl: string;
    tourAttractionsName: string;
    tourAttractionsLocation: string;
    tourAttractionsTelNumber: string;
    tourAttractionsHours: string;
}

export interface RestaurantListItem{
    restaurantReviewImageUrl: string;
    restaurantName: string;
    restaurantLocation: string;
    restaurantTelNumber: string;
    restaurantHours: string;
}

export interface ReviewCommentListItem{
    reviewCommentNumber: number;
    reviewCommentWriterId: string;
    commentContent: string;
}

export interface ReviewBoardListItem{
    reviewNumber: number;
    reviewTitle: string;
    reviewContent: string;
    writerId: string;
    reviewDatetime: string;
    travelReviewImageUrl: string;
    reviewViewCount: number;
    reviewFavoriteCount: number;
}