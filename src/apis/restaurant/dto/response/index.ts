import ResponseDto from "src/apis/response.dto";
import { RestaurantListItem } from "src/types";

export interface GetSearchRestaurantListResponseDto extends ResponseDto {
    restaurantListItem: RestaurantListItem[];
}

export interface GetRestaurantListResponseDto extends ResponseDto {
    restaurantListItem: RestaurantListItem[];
}

export interface GetRestaurantResponseDto extends ResponseDto {
    restaurantImageUrl: string[];
    restaurantName: string;
    restaurantLocation: string;
    restaurantTelNumber: string;
    restaurantHours: string;
}