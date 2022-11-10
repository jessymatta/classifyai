import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { logIn } from "./AuthApi";

export const USER_LOGGED_IN = ["USER_LOGGED_IN"];

export const useLogin = () => {
    return useMutation(logIn, {
        onSuccess: (res) => {
            console.log(res);
            localStorage.setItem("jwt", res.access_token);
            queryClient.setQueryData(["USER_LOGGED_IN"], res.user);
        },
        onError: (err : Error) => {
            return err;
        },
    });
};

