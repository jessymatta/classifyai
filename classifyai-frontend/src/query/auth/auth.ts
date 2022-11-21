import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { logIn } from "./AuthApi";
import { getRoleNameByValue } from '../../helpers/getRoleTitle'
import { ROLES } from "../../constants/roles"

export const USER_LOGGED_IN = ["USER_LOGGED_IN"];
export const USER_LOGGED_IN_ROLE = ["USER_LOGGED_IN_ROLE"];

export const useLogin = () => {
    return useMutation(logIn, {
        onSuccess: (res) => {
            console.log(res);
            localStorage.setItem("jwt", res.access_token);
            queryClient.setQueryData(["USER_LOGGED_IN"], res.user);
            queryClient.setQueryData(["USER_LOGGED_IN_ROLE"],
                getRoleNameByValue(ROLES, res.user.role_id));
        },
        onError: (err: Error) => {
            return err;
        },
    });
};

