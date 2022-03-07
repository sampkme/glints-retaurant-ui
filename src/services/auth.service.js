import axios from "axios";
const config = require("../config/config");

class AuthService {
    login(email, password) {
        return axios
            .post(config.api_url + "auth/signin", {
                email,
                password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                return response.data;
            });
    }
    logout() {
        localStorage.removeItem("user");
    }
    register(name, email, password) {
        return axios.post(config.api_url + "auth/signup", {
            name,
            email,
            password
        });
    }
    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }
}
export default new AuthService();