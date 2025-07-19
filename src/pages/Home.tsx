import WeatherCard from "../components/WeatherCard";
import Favourites from "../components/Favourites";
import SearchBar from "../components/SearchBar";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";

import type {
  ApiResponse,
  FavouritesResponse,
  WeatherResponse,
  FavouritesListResponse,
} from "../interfaces/WeatherResponse";

export default function Home() {
  const [newLocation, setNewLocation] = useState<WeatherResponse | null>(null);
  const [favourites, setFavourites] = useState<FavouritesListResponse>([]);

  // On page load/reload fetch favourites
  useEffect(() => {
    getFavourites();
  }, []);

  async function searchWeatherForCity(city: string): Promise<void> {
    try {
      const response = await axios.get<ApiResponse<WeatherResponse>>(
        "http://localhost:5000/weather",
        {
          params: { city: city },
        }
      );
      const result = response.data;

      if (result.data === null) {
        console.log(result.message);
        return;
      }

      setNewLocation(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  //TODO
  async function searchWeatherForLatLng(lat: string, lng: string) {
    try {
      const response = await axios.get<ApiResponse<WeatherResponse>>(
        "http://localhost:5000/weather",
        {
          params: {
            lat: lat,
            lon: lng,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function getFavourites(): Promise<void> {
    try {
      const response = await axios.get<ApiResponse<FavouritesListResponse>>(
        "http://localhost:5000/favourites",
        { withCredentials: true }
      );

      setFavourites(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function addToFavourites(weatherData: WeatherResponse) {
    try {
      const response = await axios.post<ApiResponse<FavouritesResponse>>(
        "http://localhost:5000/favourites/save",
        weatherData,
        { withCredentials: true }
      );
      const result = response.data;

      if (!result.data) {
        console.log(result.message);
        return;
      }

      console.log(result.data);
      //TODO: Getting undefined while saving, actual data is saving but ui not getting it
      setFavourites([result.data, ...favourites]);
      setNewLocation(null);
    } catch (error) {
      console.log(error);
    }
  }

  async function removeFromFavourites(id: number) {
    try {
      console.log("id", id);
      const response = await axios.delete(
        `http://localhost:5000/favourites/remove/${id}`,
        { withCredentials: true }
      );

      if (response.status === 200) {
        setFavourites((currentFavourites) => {
          return currentFavourites.filter((item) => item.id != id);
        });
      }
    } catch (error) {
      console.log(error);
    }
    console.log("Remove from favourite");
  }

  return (
    <>
      <NavBar />
      <SearchBar onSubmit={searchWeatherForCity} />

      {newLocation != null && (
        <WeatherCard
          {...newLocation}
          ctaIcon=""
          ctaAction={() => addToFavourites(newLocation)}
        />
      )}

      <Favourites
        favourites={favourites.map((item) => ({
          ...item,
          ctaIcon: "",
          ctaAction: () => removeFromFavourites(item.id),
        }))}
      />
    </>
  );
}
