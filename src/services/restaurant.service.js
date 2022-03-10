import axios from 'axios';
import authHeader from './auth-header';
const config = require("../config/config");

class RestaurantService {
  getRetaurants(params) {
    return axios.get(config.api_url + 'restaurants', { headers: authHeader(), params: { ...params } });
  }
}
export default new RestaurantService();