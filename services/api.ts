import axios from "axios";

import { config } from "../config";

export const baseApi = axios.create({
  baseURL: config.SERVER_URL,
  headers: {
    "ngrok-skip-browser-warning": "any",
    "Content-Type": "application/json",
  },
});
