import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import Config from "../../constants/config.json"

export const ALL_SUPERVISORS = ["ALL_SUPERVISORS"]

//GET ALL SUPERVISORS API CALL
const getAllSupervisors = async () => {
    try {
        const res = await axios.get(`${Config.BASE_URL}/super/supervisors`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
        });
        return res;
    } catch (error) {
        const err = error as AxiosError
        throw err;
    }
}

//ADD SUPERVISOR API CALL
const addSupervisor = async (data: FormData|object) => {
    try {
        const res = await axios.post(`${Config.BASE_URL}/super/supervisors`, data, {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
        });
        return res;
    } catch (error) {
        const err = error as AxiosError
        throw err;
    }
}

//GET ALL SUPERVISORS HOOK
export const useGetAllSupervisors = () => useQuery(
    {
        queryKey: ALL_SUPERVISORS,
        queryFn: () => getAllSupervisors(),
    }
)

//ADD SUPERVISOR HOOK
export const useAddSupervisor = () => {
    const queryClient = useQueryClient();
    return useMutation(addSupervisor, {
        onSuccess: (res) => {
            console.log(res);
            queryClient.invalidateQueries(ALL_SUPERVISORS);
        },
        onError: (err: Error) => {
            return err;
        },
    });
};