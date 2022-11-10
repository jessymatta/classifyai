import React from 'react'
import "./index.scss"
import { CardType2Props } from './CardType2Props'

const SmallCard = ({ stats, title, image, subtitle }: CardType2Props) => {
    return (
        <div className='smallcard'>

            <div className="smallcard__left">
                <img className='smallcard__left--img' src={image} alt="phone" />
            </div>

            <div className="smallcard__right">
                <h4>{stats}</h4>
                <p>{title}</p>
                {subtitle ? <p className='small'>{subtitle}</p> : ""}
            </div>

        </div>
    )
}

export default SmallCard