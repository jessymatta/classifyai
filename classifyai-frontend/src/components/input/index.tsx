import React from 'react';
import "./index.scss";
import { InputProps } from "./input";

const Input = ({ type, label, required, value, onChange }: InputProps) => {
    return (
        <div className="form">
            <input type={type} value={value} className="form__input" id="input" required={required} autoComplete="off" placeholder=" " onChange={onChange} />
            <label htmlFor="input" className="form__label">{label}</label>
        </div>
    )
}

export default Input