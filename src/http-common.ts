import axios from "axios";
import { ApiKey } from "./core/constants/api-key";

export default axios.create({
  baseURL: "https://kinopoiskapiunofficial.tech",
  headers: {
    "X-API-KEY": ApiKey,
    "Content-Type": "application/json",
  },
});
