import type { FavouritesProps } from "../interfaces/Props";
import WeatherCard from "./WeatherCard";

export default function Favourites({ favourites }: FavouritesProps) {
  return (
    <>
      <h2>Favourites</h2>
      {favourites.length == 0 && <p>No favourites to show</p>}
      {favourites.map((item) => {
        return <WeatherCard {...item} />; //TODO: Add unique key
      })}
    </>
  );
}
