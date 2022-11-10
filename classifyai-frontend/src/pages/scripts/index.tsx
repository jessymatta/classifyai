import React from 'react'
import Footer from '../../components/footer'
import Header from '../../components/header'
import Sidebar from '../../components/sidebar'
import DashboardHOC from '../../layout/DashboardHOC'


const Scripts = () => {
    return (
        <DashboardHOC>
            <Sidebar />
            <Header /><div>Scripts Content here</div> 
            <Footer />
        </DashboardHOC>
    )
}

export default Scripts