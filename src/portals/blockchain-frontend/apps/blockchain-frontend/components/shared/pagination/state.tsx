import { DefaultPagination } from "../../../interfaces/enums";
import { useState } from "react";

export function paginationComponentState(data,handlePaginationChange) {

    const [currentPage, setCurrentPage] = useState(DefaultPagination.pageNumber);
    const itemsPerPage = DefaultPagination.pageSize;
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage <= totalPages) {
            const nextPage = currentPage + 1;
            setCurrentPage(nextPage);
            handlePaginationChange(nextPage,DefaultPagination.pageSize)
        }
    };
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            const prevPage = currentPage - 1;
            setCurrentPage(prevPage);
            handlePaginationChange(prevPage,DefaultPagination.pageSize)
        }
    };

    return { currentPage, totalPages, handleNextPage, handlePreviousPage,handlePaginationChange };
}