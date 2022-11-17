import "./index.scss";
import { ButtonProps } from "./button";

const Button = ({ text, classNames, onClick, disabled }: ButtonProps) => {
    return (
        <button className={"button " + classNames?.join(" ")}
            onClick={onClick}
            disabled={disabled}>
            {text.toUpperCase()}
        </button>
    )
}

export default Button
