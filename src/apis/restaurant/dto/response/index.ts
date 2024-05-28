import ResponseDto from "src/apis/response.dto";
import { RestaurantListItem } from "src/types";

export interface GetSearchRestaurantListResponseDto extends ResponseDto {
    restaurantListItem: RestaurantListItem[];
}

export interface GetRestaurantListResponseDto extends ResponseDto {
    restaurantListItem: RestaurantListItem[];
}

export interface GetRestaurantResponseDto extends ResponseDto {
    restaurantNumber: number;
    restaurantImageUrl: string[];
    restaurantName: string;
    restaurantLocation: string;
    restaurantTelNumber: string;
    restaurantHours: string;
    restaurantOutline: string;
    restaurantMainMenu: string;
    restaurantServiceMenu: string;

}