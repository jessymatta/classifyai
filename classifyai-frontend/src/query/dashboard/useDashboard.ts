import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../../constants/urls"


export const DASHBOARD_STATS = ["DASHBOARD_STATS"]

const getDashboardStats = async () => axios.get(`${BASE_URL}/super/dashboard`,
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`
        }
    }
).then((res) => res).catch((err) => err)

export const useDashboardStats = () => useQuery(
    {
        queryKey: DASHBOARD_STATS,
        queryFn: () => getDashboardStats()
    }
)