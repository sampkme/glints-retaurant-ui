import axios from 'axios';
import authHeader from './auth-header';
const config = require("../config/config");

class FavouriteService {
  getFavourites() {
    return axios.get(config.api_url + 'favourites', { headers: authHeader() });
  }
}
export default new FavouriteService();