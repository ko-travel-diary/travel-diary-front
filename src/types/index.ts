export interface QnaListItem{
    receptionNumber: number;
    qnaStatus: string;
    qnaTitle: string;
    qnaContent: string;
    qnaWriterId: string;
    qnaDatetime: string;
}

export interface expendList{
    travelScheduleExpenditureDetail: string;
    travelScheduleExpenditure: number;
}

export interface scheduleList{
    scheduleDate: string;
    scheduleContent: string;
    scheduleStartTime: string;
    scheduleEndTime: string;
}

export interface scheduleListViewItems{
    travelScheduleName: string;
    travelScheduleNumber: number;
}

export interface UserListItem{
    userId: string;
    userEmail: string;
    joinDate: string;
}

export interface TourAttractionsListItem{
    tourAttractionsNumber: number;
    tourAttractionsImageUrl: string;
    tourAttractionsName: string;
    tourAttractionsLocation: string;
    tourAttractionsTelNumber: string;
    tourAttractionsHours: string;
    tourAttractionsOutline: string;
    tourAttractionsLat:	number;
    tourAttractionsLng:	number;
}

export interface RestaurantListItem{
    restaurantNumber: number;
    restaurantImageUrl: string;
    restaurantName: string;
    restaurantLocation: string;
    restaurantTelNumber: string;
    restaurantHours: string;
    restaurantOutline: string;
    restaurantMainMenu: string;
    restaurantServiceMenu: string;
    restaurantLat:	number;
    restaurantLng:	number;
}

export interface reviewCommentList{
    commentContent: string;
    reviewCommentNumber: number;
    reviewCommentWriterId: string;
    commentParentsNumber: number;
}

export interface travelReviewMyList{
    reviewNumber: number;
    reviewTitle: string;
    reviewContent: string;
    writerId: string;
    reviewDatetime: string;
    travelReviewImageUrl: string;
    reviewViewCount: number;
    reviewFavoriteCount: number;
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