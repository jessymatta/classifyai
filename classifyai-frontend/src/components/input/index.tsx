import { useState } from "react";
import "./index.scss";
import { InputProps } from "./input";

const Input = ({ type, label, required, defaultValue, name, onChange, errorMessage, pattern }: InputProps) => {
    const [focused, setFocused] = useState(false);
    const handleFocus = () => {
        setFocused(true);
    }

    return (
        <div className="form">

            <input
                pattern={pattern}
                type={type}
                name={name}
                defaultValue={defaultValue}
                className="form__input"
                id="input"
                required={required}
                autoComplete="off"
                placeholder=" "
                onChange={onChange}
                onBlur={handleFocus}
                //@ts-ignore
                focused={focused.toString()}
                //@ts-ignore
                onFocus={() => name === 'confirmPass' && setFocused(true)}
            />

            <label htmlFor="input" className="form__label">{label}</label>
            <span>{errorMessage}</span><br />
        </div>
    )
}

export default Input