import React from 'react'
import Footer from '../../components/footer'
import Header from '../../components/header'
import Sidebar from '../../components/sidebar'
import DashboardHOC from '../../layout/DashboardHOC'


const Supervisors = () => {
    return (
        <DashboardHOC>
            <Sidebar />
            <Header /><div>Supervisors Content here</div>
            <Footer />
        </DashboardHOC>
    )
}

export default Supervisors