import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { BASE_URL } from "../../constants/urls"



export const ALL_OPERATORS = ["ALL_OPERATORS"]

const getAllOperators = async () => axios.get(`${BASE_URL}/super/operators`,
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`
        }
    }
).then((res) => res).catch((err) => err)


export const useGetAllOperators = () => useQuery(
    {
        queryKey: ALL_OPERATORS,
        queryFn: () => getAllOperators(),
    }
)

