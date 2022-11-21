import { LoginFormProps } from "../../pages/login/loginForm";
import instanceAxios from "../axios/index"
import { AxiosError } from 'axios';

export const logIn = async (user: LoginFormProps) => {

    try {
        let res = await instanceAxios({
            method: 'post',
            url: '/login',
            data: user
        });

        let data = res.data;
        return data;
    } catch (error) {
        const err = error as AxiosError
        throw err.response?.status;
    }

};