export interface PostTourAttractionsRequestDto {
    tourAttractionsName: String;
    tourAttractionsLocation: String;
    tourAttractionsTelNumber: String;
    tourAttractionsHours: String;
    tourAttractionsOutline: String;
    tourAttractionsLat: number;
    tourAttractionsLng: number;
    tourAttractionsImageUrl: String[];
}

export interface PatchTourAttractionsRequestDto {
    tourAttractionsName: String;
    tourAttractionsLocation: String;
    tourAttractionsTelNumber: String;
    tourAttractionsHours: String;
    tourAttractionsOutline: String;
    tourAttractionsImageUrl: String[];
    tourAttractionsLat: number;
    tourAttractionsLng: number;
}
