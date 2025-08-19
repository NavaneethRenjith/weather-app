import type { FavouritesProps } from "../interfaces/Props";
import WeatherCard from "./WeatherCard";
import { useAuthStore } from "../store/auth";

export default function Favourites({ favourites }: FavouritesProps) {
  const { isLoggedIn } = useAuthStore();
  return (
    <>
      <h2>Favourites</h2>

      {isLoggedIn ? (
        favourites.length > 0 ? (
          favourites.map((item) => <WeatherCard {...item} />)
        ) : (
          <p>No favourites to show</p>
        )
      ) : (
        <p>Log in to add favourites</p>
      )}
    </>
  );
}
