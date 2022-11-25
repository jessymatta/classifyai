import { LoginFormProps } from "../pages/login/loginForm";
import { ErrorsLogin } from "../pages/login/loginForm";

export function validateLoginForm({ email, password }: LoginFormProps) {
    const errors: ErrorsLogin = {};
    if (!email) {
        errors.email = "Email is required";
    }
    //TODO: add email validation
    // } else if (!/\S+@\S+\.\S+/.test(email)) {
    //     errors.email = "Email is invalid";
    // }

    if (!password) {
        errors.password = "Password is required";
    }

    return errors;
}