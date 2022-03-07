import axios from 'axios';
import authHeader from './auth-header';
const config = require("../config/config");

class UserService {
  getUser() {
    return axios.get(config.api_url + 'user', { headers: authHeader() });
  }
}
export default new UserService();