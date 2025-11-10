import axios, { type CreateAxiosDefaults } from "axios";
import { SERVER_URL } from "../libs/constants/api.config";

const options: CreateAxiosDefaults = {
    baseURL: SERVER_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
};

export const baseAxios = axios.create(options);
baseAxios.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response?.status === 401) {
            console.error("Unauthorized");
        }
        throw new Error();
    }
);
