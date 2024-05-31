import { RestaurantListItem, TourAttractionsListItem } from "src/types";
import { create } from "zustand";

interface TourListStore {
    tourAttractionsListItem: TourAttractionsListItem[],
    setTourAttractionsListItem: (tourAttractionsListItem: TourAttractionsListItem[]) => void,
    restaurantListItem: RestaurantListItem[],
    setRestaurantListItem: (restaurantListItem: RestaurantListItem[]) => void
}

const useTourListStore = create<TourListStore>(set => ({
    tourAttractionsListItem: [],
    setTourAttractionsListItem: (tourAttractionsListItem: TourAttractionsListItem[]) => set(state => ({...state, tourAttractionsListItem})),
    restaurantListItem: [],
    setRestaurantListItem: (restaurantListItem: RestaurantListItem[]) => set(state => ({...state, restaurantListItem}))
}));

export default useTourListStore;