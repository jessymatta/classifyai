import React from 'react'
import Footer from '../../components/footer'
import Header from '../../components/header'
import Sidebar from '../../components/sidebar'
import DashboardHOC from '../../layout/DashboardHOC'

const Dashboard = () => {
    return (
        <DashboardHOC>
            <Sidebar />
            <Header /><div>Dashboard Content here</div>
            <Footer />
        </DashboardHOC>
    )
}

export default Dashboard