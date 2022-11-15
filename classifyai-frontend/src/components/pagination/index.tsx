import React from 'react'
import "./index.scss"
import {PaginationProps} from "./PaginationProps"

const Pagination = ({ usersPerPage, totalUsers, paginate }: PaginationProps) => {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <nav>
            <ul className='pagination__container'>
                {pageNumbers.map(number => (
                    <li key={number} className="pagination__element">
                        <button onClick={() => paginate(number)} className="pagination">
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination