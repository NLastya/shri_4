import React from 'react';
import style from './pagination.module.css';
import Image from 'next/image'

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className={style.pagination}>
            <button className={style.btn} onClick={handlePrevious} disabled={currentPage === 1}>
                <Image src="./icons/arrow-leftarr.svg"
                width={16}
                height={16}
                alt="Arrow to the left"
                />
            </button>
            <span> {currentPage} / {totalPages} </span>
            <button className={style.btn} onClick={handleNext} disabled={currentPage === totalPages}>
                <Image src="./icons/arrow-rightarr.svg" alt="Next Page"
                width={16}
                height={16}
                alt="Arrow to the right"/>
            </button>
        </div>
    );
}

export default Pagination;
