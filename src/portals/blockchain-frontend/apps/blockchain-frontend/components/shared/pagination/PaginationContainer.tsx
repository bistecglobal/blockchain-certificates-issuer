import { PaginationContainerProps } from "../../../interfaces/viewModels";
import { paginationComponentState } from "./state";

export default function PaginationContainer(props: PaginationContainerProps) {

    const { data, handlePaginationChange } = props;
    const { currentPage, totalPages, handleNextPage, handlePreviousPage } = paginationComponentState(data, handlePaginationChange);
    return (
        <div className="mt-4 flex justify-center">
            <button className="py-2 px-4 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300" disabled={currentPage === 1} onClick={handlePreviousPage}>
                Previous
            </button>
            <span className="mx-4 text-center py-2 px-4 rounded-md bg-gray-300 text-gray-700 ">{currentPage}</span>
            <button className="py-2 px-4 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300" onClick={handleNextPage}>
                Next
            </button>

        </div>
    );

}