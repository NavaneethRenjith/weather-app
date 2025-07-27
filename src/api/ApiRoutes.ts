import Urls from "../constants/urls"

//TODO: Move API call logic to one place
const ApiRoutes = {
  auth: {
    login: `${Urls.API_BASE_URL}/login`,
    signup: `${Urls.API_BASE_URL}/signup`,
    logout: `${Urls.API_BASE_URL}/logout`,
  },
  weather: {
    get: `${Urls.API_BASE_URL}/weather`,
  },
  favourites: {
    get: `${Urls.API_BASE_URL}/favourites`,
    save: `${Urls.API_BASE_URL}/favourites/save`,
    remove: (id: number) => `${Urls.API_BASE_URL}/favourites/remove/${id}`,
  },
}


export default ApiRoutes