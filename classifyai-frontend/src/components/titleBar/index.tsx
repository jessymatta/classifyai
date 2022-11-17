import "./index.scss"
import Button from "../button"
import { TitleProps } from "./TitleProps"

const TitleComponent = ({ title, btnText, onClick, modal }: TitleProps) => {
    return (

        <div className={modal ? 'modal_title' : "title_container"}>
            <p>{title}</p>

            {modal &&
                <p className='arrow' onClick={onClick}>X</p>}

            {btnText &&
                <Button
                    text={btnText}
                    classNames={["button--title"]}
                    onClick={onClick}
                />}
        </div>

    )
}

export default TitleComponent