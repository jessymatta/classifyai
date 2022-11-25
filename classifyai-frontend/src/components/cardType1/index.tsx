import "./index.scss";
import { useState } from "react";
import Button from "../button";
import { CardProps } from "./cardType1Props";
import OperatorStatsModal from "../operatorStatsModal";

const Card = ({ title, firstName, lastName, username, emoji, percentage, image, type, id }: CardProps) => {
    const [isOperatorStatsModalActive, setIsOperatorStatsModalActive] = useState(false);
    return (
        <>
            <div className='card'>

                <p className='card__title'>{title}</p>
                <div className="card__container">

                    <div className="card__container--left">
                        <p className='card__subtitle margin-top'>{`${firstName} ${lastName}`}</p>
                        <p className='card__subtitle'>{`@ ${username}`}</p>

                        <div className="card__container--left--percentage">
                            <img className="card__emoji" src={emoji} alt="emoji" />
                            <p className={`card__percentage ${type}`}>{`${percentage}%`}</p>
                        </div>

                        <Button
                            text={"view profile"}
                            classNames={["button--fixedwidth", "button--red"]}
                            onClick={() => setIsOperatorStatsModalActive(true)}
                        />
                    </div>

                    <div className="card__container--right">
                        <img className={`card__image--${type}`} src={image} alt="Trophy" />
                    </div>

                </div>
            </div>

            {isOperatorStatsModalActive &&
                <OperatorStatsModal
                    onClose={() => { setIsOperatorStatsModalActive(false) }}
                    id={id} />
            }

        </>
    )
}

export default Card;