import { AddUserFormErrors, AddUserFormProps } from "../components/employeeModal/ModalAddUsers";
const today = Date.now();

export function validateAddUserForm({
    firstName, lastName, username, email, dob, password, confirmPass }: AddUserFormProps) {
    const errors: AddUserFormErrors = {};

    if (password && password.length < 7) {
        errors.password = "Password must be at least 7 characters long ";
    }

    if (password && confirmPass && (password === confirmPass) === false) {
        errors.confirmPass = "The passwords do not match"
    }

    if (dob && Date.parse(dob) > today) {
        errors.dob = `Yo! Employee cannot be born in the future`
    }
    return errors;
}