import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import Config from "../../constants/config.json"

export const ALL_OPERATORS = ["ALL_OPERATORS"]
export const OPERATOR_STATS = ["OPERATOR_STATS"]


//GET ALL OPERATORS API CALL
const getAllOperators = async () => {
    try {
        const res = await axios.get(`${Config.BASE_URL}/common/operators`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
        });
        return res;
    } catch (error) {
        const err = error as AxiosError
        throw err;
    }
}
//GET AN OPERATOR STATS API CALL
const getOperatorsStats = async (id: number) => {
    try {
        const res = await axios.get(`${Config.BASE_URL}/common/operator/stats/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
        });
        return res;
    } catch (error) {
        const err = error as AxiosError
        throw err;
    }
}

//ADD AN OPERATOR API CALL
const addOperator = async (data: FormData) => {
    try {
        const res = await axios.post(`${Config.BASE_URL}/super/operators`, data, {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
        });
        return res;
    } catch (error) {
        const err = error as AxiosError
        throw err;
    }
}

//GET ALL OPERATORS HOOK
export const useGetAllOperators = () => useQuery(
    {
        queryKey: ALL_OPERATORS,
        queryFn: () => getAllOperators(),
    }
)

//GET AN OPERATOR STATS BY ID HOOK
export const useOperatorStats = (id: number) => useQuery(
    {
        queryKey: OPERATOR_STATS,
        queryFn: () => getOperatorsStats(id),
    }
)

//ADD AN OPERATOR HOOK
export const useAddOperator = () => {
    const queryClient = useQueryClient();
    return useMutation(addOperator, {
        onSuccess: (res) => {
            console.log(res);
            queryClient.invalidateQueries(ALL_OPERATORS);
        },
        onError: (err: Error) => {
            return err;
        },
    });
};