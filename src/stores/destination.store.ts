import { Destination } from "src/types";
import { create } from "zustand";

interface DestinationStore {
    origin: Destination | null;
    destination: Destination | null;
    waypoints: Destination[];
    setOrigin: (origin: Destination | null) => void;
    setDestination: (destination: Destination | null) => void;
    setWaypoints: (waypoints: Destination[]) => void;
}

const useDestinationStore = create<DestinationStore>((set) => ({
    origin: null,
    destination: null,
    waypoints: [],
    setOrigin: (origin: Destination | null) => set((state) => ({ ...state, origin })),
    setDestination: (destination: Destination | null) => set((state) => ({ ...state, destination })),
    setWaypoints: (waypoints: Destination[]) => set((state) => ({ ...state, waypoints })),
}));

export default useDestinationStore;
