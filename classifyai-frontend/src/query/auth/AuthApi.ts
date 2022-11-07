import { LoginFormProps } from "../../components/loginForm/loginForm";
import { instanceAxios } from "../axios";
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
        console.log(err.response?.data)
        return err.response?.data;
    }

};