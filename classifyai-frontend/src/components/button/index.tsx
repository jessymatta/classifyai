import "./index.scss";
import { ButtonProps } from "./button";


const Button = ({text, classNames, onClick}:ButtonProps) => {
    return (
        <button className={"button "+classNames?.join(" ")} onClick={onClick}>{text.toUpperCase()}</button>
    )
}

export default Button
