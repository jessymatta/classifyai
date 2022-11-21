import { useState, useEffect } from 'react'
import Footer from '../../components/footer'
import Header from '../../components/header'
import Sidebar from '../../components/sidebar'
import Table from '../../components/table'
import TitleComponent from '../../components/titleBar'
import DashboardHOC from '../../hoc/DashboardHOC'
import Modal from '../../components/employeeModal'
import Pagination from '../../components/pagination'
import AddInfoModalHOC from '../../hoc/addInfoModalHOC'
import { useGetAllSupervisors } from '../../query/supervisors/useSupervisors'
import { queryClient } from '../../App';

const Supervisors = () => {
    const [supervisors, setSupervisors] = useState([])
    const { data: allSupervisors, isSuccess: allSupervisorsSuccess } = useGetAllSupervisors()
    const [currentPage, setCurrentPage] = useState(1)
    const [usersPerPage] = useState(7)
    const [openAddUserModal, setOpenAddUserModal] = useState(false)
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = supervisors.slice(indexOfFirstUser, indexOfLastUser)
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)
    const userRole = queryClient.getQueryCache().find(['USER_LOGGED_IN_ROLE'])?.state.data

    useEffect(() => {
        if (allSupervisorsSuccess) {
            setSupervisors(allSupervisors.data)
        }
    }, [allSupervisors])
    return (
        <DashboardHOC>
            <Sidebar />
            <Header />
            <div>
                <TitleComponent
                    title={"Supervisors"}
                    btnText={"add supervisor"}
                    onClick={() => setOpenAddUserModal(true)}
                />

                <Table
                    headers={["Supervisor", "Email", "Joining Date", "Actions"]}
                    rowsData={currentUsers}
                    supervisor={true}
                    isSuperSupervisor={userRole === "Super Supervisor"}
                />

                <Pagination
                    usersPerPage={usersPerPage}
                    totalUsers={supervisors.length}
                    paginate={paginate}
                />

                <AddInfoModalHOC
                    open={openAddUserModal}
                    onClose={() => setOpenAddUserModal(false)}
                    modalTitle={"Add Supervisor"} >
                    <Modal
                        onSuccess={() => setOpenAddUserModal(false)}
                        supervisor={true}
                    />
                </AddInfoModalHOC>


            </div>
            <Footer />
        </DashboardHOC>
    )
}

export default Supervisors