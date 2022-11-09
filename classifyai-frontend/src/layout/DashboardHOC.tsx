import React from 'react'
import "./index.scss";

interface DashboardHOCProps {
    children: React.ReactNode[]
}

const DashboardHOC = ({ children }: DashboardHOCProps) => {
    const [sidebar, header, content, footer] = children;
    return (
        <>
            <div className='home'>
                {sidebar}
                <div className="home__container">
                    {header}
                    <div className="home__content">
                        {content}
                    </div>
                </div>
                {footer}
            </div>
        </>
    )
}

export default DashboardHOC