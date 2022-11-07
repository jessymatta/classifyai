import { useState } from "react";
import Button from "../button";
import Input from "../input";
import Logo from "../logo";
import "./index.scss";


const LoginForm = () => {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleLogin = () => {
        console.log("login")
    }

    return (
        <section className="form__login">
            <Logo logoType="login__logo"/>
            <h1 className="form__title margin-top">Login</h1>
            <form onSubmit={handleLogin}>
                <>
                    <Input value={email} type="text" label="Email" onChange={(e) => {
                        setEmail(e.target.value);
                    }} />
                </>
                <>
                    <Input value={password} type="password" label="Password" onChange={(e) => {
                        setPassword(e.target.value);
                    }} />
                </>
                <div className="margin-top">
                <Button text={"Login"} classNames={["button--red" , "button--fullwidth"]}/>
                </div>
            </form>
        </section>
    )
}

export default LoginForm