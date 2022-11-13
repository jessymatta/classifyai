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
                <div className="home__sidebar">
                    {sidebar}
                </div>
                <div className="home__container">
                    {header}
                    <div className="home__content">
                        {content}
                    </div>
                    {footer}
                </div>
            </div>
        </>
    )
}

export default DashboardHOC