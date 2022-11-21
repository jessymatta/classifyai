import axios, { AxiosError } from "axios"
import { useMutation } from "@tanstack/react-query"
import Config from "../../constants/config.json";

//UPLOAD A SCRIPT API CALL
const uploadScript = async (data: any) => {
    try {
        const res = await axios.post(`${Config.BASE_URL}/common/script`, data, {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
        });
        return res;
    } catch (error) {
        const err = error as AxiosError
        throw err;
    }
}

//UPLOAD A SCRIPT HOOK
export const useUploadScript = () => {
    return useMutation(uploadScript, {
        onSuccess: (res) => {
            console.log(res);
        },
        onError: (err: Error) => {
            return err;
        },
    });
};