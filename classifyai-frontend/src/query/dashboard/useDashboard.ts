import axios, { AxiosError } from 'axios'
import { useQuery } from "@tanstack/react-query"
import Config from "../../constants/config.json";

export const DASHBOARD_STATS = ["DASHBOARD_STATS"]

//GET ALL DASHBOARD STATS API CALL
const getDashboardStats = async () => {
    try {
        const res = await axios.get(`${Config.BASE_URL}/common/dashboard`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
        });
        return res;
    } catch (error) {
        const err = error as AxiosError
        throw err;
    }
}

//GET ALL DASHBOARD STATS HOOK
export const useDashboardStats = () => useQuery(
    {
        queryKey: DASHBOARD_STATS,
        queryFn: () => getDashboardStats()
    }
)