import ResponseDto from "src/apis/response.dto";

export interface GetSearchRestaurantListResponseDto extends ResponseDto {
    restaurantList: string //RestaurantListItem[]	;
}

export interface GetRestaurantListResponseDto extends ResponseDto {
    restaurantList: string //RestaurantListItem[]	;
}

export interface GetRestaurantResponseDto extends ResponseDto {
    restaurantImageUrl: string[];
    restaurantName: string;
    restaurantlocation: string;
    restaurantrTelNumber: string;
    restaurantHours: string;
}