import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { ALL_SUPERVISORS } from "../supervisors/useSupervisors"
import { ALL_OPERATORS } from "../operators/useOperators"
import Config from "../../constants/config.json"

//DELETE EMPLOYEE API CALL
const deleteEmployee = async (id: number) => {
    try {
        const res = await axios.delete(`${Config.BASE_URL}/super/employees/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
        });
        return res;
    } catch (error) {
        const err = error as AxiosError
        throw err;
    }
}

//DELETE EMPLOYEE HOOK
export const useDeleteEmployee = () => {
    const queryClient = useQueryClient();
    return useMutation(deleteEmployee, {
        onSuccess: (res) => {
            console.log(res);
            queryClient.invalidateQueries(ALL_SUPERVISORS);
            queryClient.invalidateQueries(ALL_OPERATORS);
        },
        onError: (err: Error) => {
            return err;
        },
    });
};

//EDIT EMPLOYEE API CALL ARGUMENTS INTERFACE
interface EditEmployeeProfile {
    id: number;
    data: FormData;
}

//EDIT EMPLOYEE PROFILE API CALL
const editEmployee = async ({ id, data }: EditEmployeeProfile) => {
    try {
        const res = await axios.put(`${Config.BASE_URL}/super/employees/${id}`, data, {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
        });
        return res;
    } catch (error) {
        const err = error as AxiosError
        throw err;
    }
}

//EDIT EMPLOYEE PROFILE HOOK
export const useEditEmployee = () => {
    const queryClient = useQueryClient();
    return useMutation(editEmployee, {
        onSuccess: (res) => {
            console.log(res);
            queryClient.invalidateQueries(ALL_SUPERVISORS);
            queryClient.invalidateQueries(ALL_OPERATORS);
        },
        onError: (err: Error) => {
            return err;
        },
    });
};