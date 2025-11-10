import { baseAxios } from "@/shared/api/interceptors";
import { API_URL } from "@/shared/libs/constants/api.config";
import { SignUpRequest } from "../validation/register.z.validation";
import { SignInRequest } from "../validation/login.z.validation";

export const login = async (data: SignInRequest) => {
    const response = await baseAxios.post(`${API_URL.session()}login`, data);
    return response.data;
};

export const register = async (data: SignUpRequest) => {
    const response = await baseAxios.post(`${API_URL.auth()}create`, data);
    return response.data;
};

export const getUser = async () => {
    const response = await baseAxios.get(`${API_URL.account()}`);
    return response.data;
};
