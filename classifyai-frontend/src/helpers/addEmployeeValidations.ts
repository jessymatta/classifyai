import { AddUserFormErrors, AddUserFormProps } from "../components/employeeModal/ModalAddUsers";

export function validateAddUserForm({
    firstName, lastName, username, email, dob, password, confirmPass }: AddUserFormProps) {
    const errors: AddUserFormErrors = {};

    if (password && password.length < 7) {
        errors.password = "Password must be at least 7 characters long ";
    }

    if (password && confirmPass && (password === confirmPass) == false) {
        errors.confirmPass = "The passwords do not match"
    }

    return errors;
}