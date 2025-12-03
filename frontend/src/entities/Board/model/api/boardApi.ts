import { CreateBoardRequest } from "@/features/manage-board/create/model/validation/create.z.validation";
import { baseAxios } from "@/shared/api/interceptors";
import { API_URL } from "@/shared/libs/constants/api.config";

export const fetchUserBoards = async () => {
    const response = await baseAxios.get(`${API_URL.boards()}userBoards`);
    return response.data;
};

export const createBoard = async (data: CreateBoardRequest) => {
    const response = await baseAxios.post(`${API_URL.boards()}create`, data);
    return response.data;
};

export const fetchBoardById = async (id: string) => {
    const response = await baseAxios.get(`${API_URL.boards()}${id}`);
    return response.data;
};
