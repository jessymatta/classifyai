import axios, { AxiosError } from 'axios';
import { BASE_URL } from "../../constants/urls"
import { useQuery } from "@tanstack/react-query"

export const ALL_CALLS = ["ALL_CALLS"]

export const getCalls = async () => {
    console.log("jwt", localStorage.getItem("jwt"))
    try {
        const res = await axios.get(`${BASE_URL}/super/calls`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
        });
        return res;
    } catch (error) {
        const err = error as AxiosError
        throw err;
    }
}

export const useGetAllCalls = () => useQuery(
    {
        queryKey: ALL_CALLS,
        queryFn: () => getCalls(),
    }
)
