export interface PostTourAttractionsRequestDto {
    tourAttractionsName: String;
    tourAttractionsLocation: String;
    tourAttractionsTelNumber: String;
    tourAttractionsHours: String;
    tourAttractionsOutline: String;
    tourAttractionsLat: string;
    tourAttractionsLng: string;
    tourAttractionsImageUrl: String[];
}

export interface PatchTourAttractionsRequestDto {
    tourAttractionsName: String;
    tourAttractionsLocation: String;
    tourAttractionsTelNumber: String;
    tourAttractionsHours: String;
    tourAttractionsOutline: String;
    tourAttractionsLat: string;
    tourAttractionsLng: string;
    tourAttractionsImageUrl: String[];
}
