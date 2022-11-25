import "./index.scss";
import { LogoProps } from "./logo";

const Logo = ({ logoType }: LogoProps) => {
    return (
        <div className={"logo " + logoType}></div>
    )
}

export default Logo;