import React from 'react';
import "./index.scss";
import { InputProps } from "./input";

const Input = ({ type, label, required, defaultValue, name, onChange }: InputProps) => {
    return (
        <div className="form">
            <input type={type} name={name} defaultValue={defaultValue} className="form__input" id="input" required={required} autoComplete="off" placeholder=" " onChange={onChange} />
            <label htmlFor="input" className="form__label">{label}</label>
        </div>
    )
}

export default Input