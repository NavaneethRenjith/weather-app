import { useState } from "react";

interface SearchBarProps {
  onSubmit: (city: string) => Promise<void>;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const [city, setCity] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await onSubmit(city);
    // Reset searchbar
    setCity("");
  }

  return (
    <div className="search-container">
      <form action="" method="POST" onSubmit={handleSubmit}>
        <input
          type="text"
          className="search-bar"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
    </div>
  );
}
