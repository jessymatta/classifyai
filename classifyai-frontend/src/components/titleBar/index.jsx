import React from 'react'
import Button from '../button'
import "./index.scss"

const TitleComponent = ({ title, btnText, onClick }) => {
    return (
        <div className='title_container'>
            <p>{title}</p>
            <Button text={btnText} classNames={["button--title"]} onClick={onClick} />
        </div>
    )
}

export default TitleComponent