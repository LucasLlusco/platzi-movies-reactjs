import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: import.meta.env.VITE_APP_apiKey
  },
});

export default apiClient;