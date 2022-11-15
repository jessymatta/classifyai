import axios, { AxiosError } from 'axios';
import { BASE_URL } from "../../constants/urls"


// const options = {
//     headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}`}
// };

export const addUser = async (data: any) => {
    try {
        // const res = await axios.post(`${BASE_URL}/super/operators`, data, options);
        const res = await axios.post(`${BASE_URL}/super/operators`, data, {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
        });
        return res;
    } catch (error) {
        const err = error as AxiosError
        throw err;
    }
}