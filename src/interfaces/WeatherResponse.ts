interface ApiResponse<T> {
    message: string
    data: T
}

interface WeatherResponse {
    temp?: string | null
    humidity?: number | null
    description?: string | null,
    image?: string | null,
    lat?: number | null,
    lon?: number | null,
    city?: string | null
}

interface FavouritesResponse extends WeatherResponse {
    id: number
}

interface FavouritesListResponse extends Array<FavouritesResponse> {}

export type { ApiResponse, WeatherResponse, FavouritesResponse, FavouritesListResponse}