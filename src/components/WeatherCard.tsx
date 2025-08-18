import type { WeatherCardProps } from "../interfaces/Props";
import { capitalize } from "../helper/StringHelper";

//TODO: Trailing icon
export default function WeatherCard({
  city,
  lat,
  lon,
  temp,
  description,
  image,
  humidity,
  ctaIcon,
  ctaAction,
}: WeatherCardProps) {
  const location = city?.trim() ? city : `${lat}, ${lon}`;

  return (
    <>
      <div className="weather-card shadow p-3 mb-2 bg-body-tertiary rounded">
        <img src={image ?? ""} alt="Add" />
        <div className="weather-info">
          {location && <h3 className="weather-city">{capitalize(location)}</h3>}
          <h5 className="">{temp}</h5>
          {description && (
            <h5 className="card-text">{capitalize(description)}</h5>
          )}
          {humidity && <p className="">Humidity {humidity}%</p>}
        </div>
        <button onClick={ctaAction} className="card-cta-button">
          <img src={ctaIcon} alt="Add" className="card-cta-icon" />
        </button>
      </div>
    </>
  );
}
