import { useState } from "react";

interface SearchBarProps {
  onSubmit: (city: string) => Promise<void>;
  onLocationSubmit: (lat: number, lon: number) => Promise<void>;
}

const cities = ["Bangalore", "Kochi", "Mumbai", "Delhi", "Kolkata"];

export default function SearchBar({
  onSubmit,
  onLocationSubmit,
}: SearchBarProps) {
  const [city, setCity] = useState("");
  const [isExpanded, toggleDropdown] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await onSubmit(city);
    // Reset searchbar
    setCity("");
    toggleDropdown(false);
  }

  // For use current location
  function handleUseLocation() {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        // Round of coordinates to 2 decimal points
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        await onLocationSubmit(lat, lon);
      },
      (err) => {
        switch (err.code) {
          case err.PERMISSION_DENIED:
            alert("Please allow location access to use this feature.");
            break;
          case err.POSITION_UNAVAILABLE:
            alert("Location unavailable. Try again later.");
            break;
        }
      }
    );
  }

  // For city selection
  async function handleCitySelection(city: string) {
    toggleDropdown(false);
    await onSubmit(city);
  }

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} autoComplete="off">
        <input
          type="text"
          className="search-bar"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onFocus={() => toggleDropdown(true)} // open on focus
          onBlur={() => setTimeout(() => toggleDropdown(false), 150)} // close after leaving
          required
        />
        <button type="submit" className="search-button">
          Search
        </button>

        {isExpanded && (
          <ul className="city-dropdown">
            <li onMouseDown={handleUseLocation}>📍 Use Current Location</li>
            {cities.map((c) => (
              <li key={c} onMouseDown={() => handleCitySelection(c)}>
                {c}
              </li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
}
