import { useState } from "react"
import Input from "../input";


const LoginForm = () => {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleLogin = () => {
        console.log("login")
    }

    return (
        <section className="form__login">
            <h1 className="margin">Login</h1>
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
                {/*Login button */}
            </form>
        </section>
    )
}

export default LoginForm