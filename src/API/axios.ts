import axios from "axios";

const BASE_URL: string | undefined = process.env.REACT_APP_API_BASE_URL;

export default axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

