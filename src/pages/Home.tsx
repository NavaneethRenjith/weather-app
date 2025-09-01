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
import ApiRoutes from "../api/ApiRoutes";

export default function Home() {
  const [newLocation, setNewLocation] = useState<WeatherResponse | null>(null);
  const [favourites, setFavourites] = useState<FavouritesListResponse>([]);

  // On page load/reload fetch favourites
  useEffect(() => {
    getFavourites();
  }, []);

  // Function to fetch weather data for city
  async function searchWeatherForCity(city: string): Promise<void> {
    try {
      const response = await axios.get<ApiResponse<WeatherResponse>>(
        ApiRoutes.weather.get,
        {
          params: { city: city },
        }
      );
      const result = response.data;

      if (result.data === null) {
        //TODO: Show alert
        console.log(result.message);
        return;
      }

      setNewLocation(result.data);
    } catch (error) {
      alert("Could not find weather for this city");
      console.log(error);
    }
  }

  // Function to fetch weather data for geocoordinates
  async function searchWeatherForLatLng(lat: number, lon: number) {
    try {
      const response = await axios.get<ApiResponse<WeatherResponse>>(
        ApiRoutes.weather.get,
        {
          params: {
            lat: lat,
            long: lon,
          },
        }
      );
      const result = response.data;

      if (response.data === null) {
        //TODO: Show alert
        console.log(result.message);
        return;
      }

      setNewLocation(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getFavourites(): Promise<void> {
    try {
      const response = await axios.get<ApiResponse<FavouritesListResponse>>(
        ApiRoutes.favourites.get,
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
        ApiRoutes.favourites.save,
        weatherData,
        { withCredentials: true }
      );
      const result = response.data;

      if (!result.data) {
        //TODO: Show alert
        console.log(result.message);
        return;
      }

      setFavourites([result.data, ...favourites]);
      setNewLocation(null);
    } catch (error) {
      console.log(error);
    }
  }

  async function removeFromFavourites(id: number) {
    try {
      const response = await axios.delete(ApiRoutes.favourites.remove(id), {
        withCredentials: true,
      });

      if (response.status === 200) {
        setFavourites((currentFavourites) => {
          return currentFavourites.filter((item) => item.id != id);
        });
      } else {
        //TODO: Show alert
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <NavBar />
      <div className="home-container">
        <SearchBar
          onSubmit={searchWeatherForCity}
          onLocationSubmit={searchWeatherForLatLng}
        />

        {newLocation != null && (
          <WeatherCard
            {...newLocation}
            ctaIcon="/icons/heart.png"
            ctaAction={() => addToFavourites(newLocation)}
          />
        )}

        <Favourites
          favourites={favourites.map((item) => ({
            ...item,
            ctaIcon: "/icons/delete.png",
            ctaAction: () => removeFromFavourites(item.id),
          }))}
        />
      </div>
    </>
  );
}
