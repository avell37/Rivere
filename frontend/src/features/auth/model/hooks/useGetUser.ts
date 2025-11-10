import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/authApi";

export const useGetUser = () => {
    const { data, status, error } = useQuery({
        queryKey: ["user"],
        queryFn: getUser,
    });

    return {
        data,
        status,
        error,
    };
};
