export interface PostWaypointsRequestDto {
    origin: {
        x: string,
        y: string
    },
    destination: {
        x: string,
        y: string
    },
    waypoints: {
        name: string;
        x: string;
        y: string;
    }[]
}