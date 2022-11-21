import "./index.scss"
import Button from "../button"
import { TitleProps } from "./TitleProps"
import { queryClient } from '../../App';

const TitleComponent = ({ title, btnText, onClick, modal }: TitleProps) => {
    const userRole = queryClient.getQueryCache().find(['USER_LOGGED_IN_ROLE'])?.state.data
    return (

        <div className={modal ? 'modal_title' : "title_container"}>
            <p>{title}</p>

            {modal &&
                <p className='arrow' onClick={onClick}>X</p>}

            {(userRole === "Super Supervisor") && btnText &&
                <Button
                    text={btnText}
                    classNames={["button--title"]}
                    onClick={onClick}
                />}
        </div>

    )
}

export default TitleComponent