import { useState, useEffect } from "react";
import Footer from '../../components/footer';
import Header from '../../components/header';
import Modal from '../../components/employeeModal';
import Pagination from '../../components/pagination';
import Sidebar from '../../components/sidebar';
import Table from '../../components/table';
import TitleComponent from '../../components/titleBar';
import AddInfoModalHOC from '../../hoc/addInfoModalHOC';
import DashboardHOC from '../../hoc/dashboardHOC/DashboardHOC';
import { useGetAllOperators } from '../../query/operators/useOperators';
import { queryClient } from '../../App';

const Operators = () => {
    const [operators, setOperators] = useState([]);
    const { data: allOperators, isSuccess: allOperatorsSuccess } = useGetAllOperators();
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(7);
    const [openAddUserModal, setOpenAddUserModal] = useState(false);
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = operators.slice(indexOfFirstUser, indexOfLastUser);
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    const userRole = queryClient.getQueryCache().find(['USER_LOGGED_IN_ROLE'])?.state.data;

    useEffect(() => {
        if (allOperatorsSuccess) {
            setOperators(allOperators.data);
        }
    }, [allOperators])

    return (
        <DashboardHOC>
            <Sidebar />
            <Header />
            <div>
                <TitleComponent
                    title={"Operators"}
                    btnText={"add operator"}
                    onClick={() => setOpenAddUserModal(true)}
                />

                <Table
                    headers={["Operator", "Email", "Joining Date", "Actions"]}
                    rowsData={currentUsers}
                    isSuperSupervisor={userRole === "Super Supervisor"}
                />

                <Pagination
                    usersPerPage={usersPerPage}
                    totalUsers={operators.length}
                    paginate={paginate}
                />

                <AddInfoModalHOC
                    open={openAddUserModal}
                    onClose={() => setOpenAddUserModal(false)}
                    modalTitle={"Add Operator"} >
                    <Modal
                        onSuccess={() => setOpenAddUserModal(false)} />
                </AddInfoModalHOC>

            </div>
            <Footer />
        </DashboardHOC>
    )
}

export default Operators;