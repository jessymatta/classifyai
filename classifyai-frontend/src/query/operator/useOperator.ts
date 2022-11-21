import axios, { AxiosError } from "axios"
import { useQuery } from "@tanstack/react-query"
import Config from "../../constants/config.json"

export const LOGGED_IN_OPERATOR_STATS = ["LOGGED_IN_OPERATOR_STATS"]

//GET THE LOGGED IN OPERATOR STATS API CALL
const getLoggedInOperatorStats = async () => {
    try {
        const res = await axios.get(`${Config.BASE_URL}/operator/operator/stats/`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
        });
        return res;
    } catch (error) {
        const err = error as AxiosError
        throw err;
    }
}

//GET THE LOGGED IN OPERATOR STATS HOOK
export const useGetOperatorStats = () => useQuery(
    {
        queryKey: LOGGED_IN_OPERATOR_STATS,
        queryFn: () => getLoggedInOperatorStats()
    }
)