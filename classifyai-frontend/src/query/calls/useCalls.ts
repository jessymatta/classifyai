import axios, { AxiosError } from 'axios';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import Config from "../../constants/config.json";

export const ALL_CALLS = ["ALL_CALLS"]

//GET ALL CALLS API CALL
const getCalls = async () => {
    try {
        const res = await axios.get(`${Config.BASE_URL}/common/calls`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
        });
        return res;
    } catch (error) {
        const err = error as AxiosError
        throw err;
    }
}

//ADD A CALL API CALL
const addCall = async (data: any) => {
    try {
        const res = await axios.post(`${Config.BASE_URL}/super/calls`, data, {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
        });
        return res;
    } catch (error) {
        const err = error as AxiosError
        throw err;
    }
}

//GET ALL CALLS HOOK
export const useGetAllCalls = () => useQuery(
    {
        queryKey: ALL_CALLS,
        queryFn: () => getCalls(),
    }
)

//ADD A CALL HOOK
export const useAddCall = () => {
    const queryClient = useQueryClient();
    return useMutation(addCall, {
        onSuccess: (res) => {
            console.log(res);
            queryClient.invalidateQueries(ALL_CALLS);
        },
        onError: (err: Error) => {
            return err;
        },
    });
};