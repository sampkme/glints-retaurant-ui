import axios from 'axios';
const config = require("../config/config");

class RestaurantService {
  getRetaurants(params) {
    return axios.get(config.api_url + 'restaurants', { params: { ...params } });
  }
}
export default new RestaurantService();