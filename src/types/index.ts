export interface QnaListItem{
    receptionNumber: number;
    qnaStatus: string;
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
    joinDate: string;
}

export interface TourAttractionsListItem{
    tourAttractionsImageUrl: string;
    tourAttractionsName: string;
    tourAttractionsLocation: string;
    tourAttractionsTelNumber: string;
    tourAttractionsHours: string;
}

export interface RestaurantListItem{
    restaurantImageUrl: string;
    restaurantName: string;
    restaurantLocation: string;
    restaurantTelNumber: string;
    restaurantHours: string;
}

export interface reviewCommentList{
    commentContent: string;
    reviewCommentNumber: number;
    reviewCommentWriterId: string;
    commentParentsNumber: number;
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