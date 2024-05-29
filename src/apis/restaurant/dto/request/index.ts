export interface PostRestaurantRequestDto {
    restaurantName: string;
    restaurantLocation: string;
    restaurantTelNumber: string;
    restaurantHours: string;
    restaurantOutline: string;
    restaurantImageUrl: string[];
    restaurantMainMenu: string;
    restaurantServiceMenu: string;
    restaurantLat: number;
    restaurantLng: number;
}

export interface PatchRestaurantRequestDto {
    restaurantName: string;
    restaurantLocation: string;
    restaurantTelNumber: string;
    restaurantHours: string;
    restaurantOutline: string;
    restaurantImageUrl: string[];
    restaurantMainMenu: string;
    restaurantServiceMenu: string;
}

