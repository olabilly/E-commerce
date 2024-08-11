import React, { useState } from 'react';

const Pagination = ({ totalItems, itemsPerPage, onPageChange,}) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handleNextPage = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        onPageChange(nextPage);
    }

    const handlePrevPage = () => {
        const prevPage = currentPage - 1;
        setCurrentPage(prevPage);
        onPageChange(prevPage);
    }

    return (
        <div className='pagination'>
            <button onClick={handlePrevPage} disabled={currentPage === 1} className='pagination-btn btn-prev'>Previous </button>
            <span>{currentPage}   of   {totalPages}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages} className='pagination-btn btn-next'>Next</button>
        </div>
    );
};

export default Pagination;