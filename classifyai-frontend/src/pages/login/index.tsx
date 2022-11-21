import React from 'react'
import { useState } from "react";
import LoginImage from '../../assets/images/login_pic.svg';
import "./index.scss";
import Button from "../../components/button";
import Input from "../../components/input";
import Logo from "../../components/logo";
import { LoginFormProps } from "./loginForm";
import { ErrorsLogin } from "./loginForm";
import { validateLoginForm } from "../../helpers/validateLogin";
import { useLogin } from "../../query/auth/auth";
import { useNavigate } from "react-router-dom";
import { queryClient } from '../../App';

const LoginPage = () => {
    const initialValues = { email: "", password: "" };
    const [formValues, setFormValues] = useState<LoginFormProps>(initialValues);
    const [formErrors, setFormErrors] = useState<ErrorsLogin>({});
    const [msg, setMsg] = useState("");
    const { mutateAsync } = useLogin();
    const nagivate = useNavigate();


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const errors = validateLoginForm(formValues);
        setFormErrors(errors);

        if (Object.keys(formErrors).length === 0) {
            try {
                await mutateAsync(formValues);
                const userRole = queryClient.getQueryCache().find(['USER_LOGGED_IN_ROLE'])?.state.data

                userRole == "Operator"?
                nagivate("/dashboardoperator"):
                nagivate("/dashboard");

            } catch (err) {
                console.log(err)
                if (err === 401) setMsg("Invalid Credentials");
            }
        }
    }
    return (
        <div className='loginPage__container'>
            <img className="loginPage__image" src={LoginImage} alt="login-hero" />
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
        </div>

    )
}

export default LoginPage