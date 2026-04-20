import axios from "axios";

// const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

export const apiClient = axios.create({
  baseURL: "/",
  headers: {
    "x-api-key": API_KEY,
  },
});