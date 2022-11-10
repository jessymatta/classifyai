import React from 'react'
import Footer from '../../components/footer'
import Header from '../../components/header'
import Sidebar from '../../components/sidebar'
import DashboardHOC from '../../hoc/DashboardHOC'


const Operators = () => {
    return (
        <DashboardHOC>
            <Sidebar />
            <Header /><div>Operators Content here</div> 
            <Footer />
        </DashboardHOC>
    )
}

export default Operators