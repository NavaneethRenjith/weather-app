import type { WeatherResponse } from "./WeatherResponse"

interface WeatherCardProps extends WeatherResponse {
    ctaIcon: string | ""
    ctaAction: () => void
}

interface FavouritesProps {
    favourites: WeatherCardProps[]
}

interface AuthFormProps {
    title: string
    primaryButtonTitle: string
    secondaryText: string
    secondaryButtonTitle: string
    secondaryButtonDestination: string
    onSubmit: (userName: string, password: string) => void 
}

export type { WeatherCardProps, FavouritesProps, AuthFormProps }