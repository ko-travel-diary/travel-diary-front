import { Position } from "src/types";
import { create } from "zustand";

interface MapCenterStore {
    mapCenter: Position;
    setMapCenter: (mapCenter: Position) => void;
}

const useMapCenterStore = create<MapCenterStore>(set => ({
    mapCenter: {
        lat: 35.179665,
        lng: 129.0747635,
    },
    setMapCenter: (mapCenter: Position) => set(state => ({ ...state, mapCenter })),
}));

export default useMapCenterStore;