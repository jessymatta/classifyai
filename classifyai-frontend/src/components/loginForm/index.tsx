import { useState, useEffect } from "react";
import "./index.scss";
import Button from "../button";
import Input from "../input";
import Logo from "../logo";
import { LoginFormProps } from "./loginForm";
import { ErrorsLogin } from "./loginForm";
import { validateLoginForm } from "../../helpers/validateLogin";
import { useLogin } from "../../query/auth/auth";


const LoginForm = () => {

    const initialValues = { email: "", password: "" };
    const [formValues, setFormValues] = useState<LoginFormProps>(initialValues);
    const [formErrors, setFormErrors] = useState<ErrorsLogin>({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [msg, setMsg] = useState("");
    const { mutateAsync, isError: loginError, error, isSuccess } = useLogin();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setMsg("");
        setFormErrors(validateLoginForm(formValues));
        setIsSubmit(true);
    }

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            mutateAsync(formValues); 
            isSuccess ? setMsg("Login Success") : setMsg("Invalid Credentials");  
        }
    }, [formErrors])

    return (
        <section className="form__login">
            <Logo logoType="login__logo" />
            <h1 className="form__title margin-top">Login</h1>
            <form onSubmit={handleLogin}>
                <p className="form__login--response">{msg}</p>

                <p className="error">{formErrors?.email}</p>

                <Input name={"email"} defaultValue={formValues.email} type="text" label="Email" onChange={handleChange} />

                <p className="error">{formErrors?.password}</p>

                <Input name={"password"} defaultValue={formValues.password} type="password" label="Password" onChange={handleChange} />

                <div className="margin-top">
                    <Button text={"Login"} classNames={["button--red", "button--fullwidth"]} />
                </div>
            </form>
        </section>
    )
}

export default LoginForm