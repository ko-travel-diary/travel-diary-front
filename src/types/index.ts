export interface QnaListItem {
    receptionNumber: number;
    qnaStatus: string;
    qnaTitle: string;
    qnaContent: string;
    qnaWriterId: string;
    qnaDatetime: string;
}

export interface ExpenditureList {
    travelScheduleExpenditureDetail: string;
    travelScheduleExpenditure: number;
}

export interface ScheduleList {
    scheduleDate: string;
    scheduleContent: string;
    scheduleStartTime: string;
    scheduleEndTime: string;
}

export interface ScheduleListViewItem {
    travelScheduleName: string;
    travelScheduleNumber: number;
}

export interface UserListItem {
    userId: string;
    userEmail: string;
    joinDate: string;
    nickName: string;
}

export interface TourAttractionsListItem {
    tourAttractionsNumber: number;
    tourAttractionsImageUrl: string;
    tourAttractionsName: string;
    tourAttractionsLocation: string;
    tourAttractionsTelNumber: string;
    tourAttractionsHours: string;
    tourAttractionsOutline: string;
    tourAttractionsLat: number;
    tourAttractionsLng: number;
    tourAttractionsRecommendCount: number;
}

export interface RestaurantListItem {
    restaurantNumber: number;
    restaurantImageUrl: string;
    restaurantName: string;
    restaurantLocation: string;
    restaurantTelNumber: string;
    restaurantHours: string;
    restaurantOutline: string;
    restaurantMainMenu: string;
    restaurantServiceMenu: string;
    restaurantLat: number;
    restaurantLng: number;
    restaurantRecommendCount: number;
}

export interface ReviewCommentList {
    commentContent: string;
    reviewCommentNumber: number;
    reviewCommentWriterId: string;
    commentParentsNumber: number;
}

export interface TravelReviewMyList {
    reviewNumber: number;
    reviewTitle: string;
    reviewContent: string;
    writerId: string;
    reviewDatetime: string;
    travelReviewImageUrl: string;
    reviewViewCount: number;
    reviewFavoriteCount: number;
}

export interface ReviewBoardListItem {
    reviewNumber: number;
    reviewTitle: string;
    reviewContent: string;
    writerId: string;
    reviewDatetime: string;
    travelReviewImageUrl: string;
    reviewViewCount: number;
    reviewFavoriteCount: number;
}

export interface Position {
    lat: number;
    lng: number;
}

export interface MarkerOpen {
    type: string;
    typeNumber: number;
}

export interface Destination {
    name: string;
    lat: number;
    lng: number;
}
