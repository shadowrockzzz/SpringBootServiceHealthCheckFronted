import axios from "axios";
import propertiesCofig from "../properties.cofig";

const authService = {
  baseAPIURI: propertiesCofig.baseAPIURI,

  async register(username, email, password) {
    try {
      const result = await axios.post(this.baseAPIURI + "/createUser", {
        username,
        email,
        password,
      });
      return result;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },

  async login(email, password) {
    try {
      const result = await axios.post(this.baseAPIURI + "/login", {
        email,
        password,
      });
      return result;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },

  async logout() {
    localStorage.removeItem("token");
  },

  async testAPI() {
    let data = {};
    try {
      data = await axios.get(this.baseAPIURI + "/actuator/health");
    } catch (error) {
      console.log(error);
    }
    return data;
  },

  async getCurrentUser() {
    try {
      const response = await axios.get("/api/auth/whoami", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },

  async getServices() {
    try {
      const response = await axios.get(this.baseAPIURI + "/services");
      return response;
    } catch (error) {
      console.log(error);
    }
  },
};

export default authService;
