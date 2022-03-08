import axios from 'axios';
const config = require("../config/config");

class RestaurantService {
  getRetaurants() {
    return axios.get(config.api_url + 'restaurants');
  }
}
export default new RestaurantService();