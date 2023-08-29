import { PaginationContainerProps } from "../../../interfaces/viewModels";
import { paginationComponentState } from "./state";
import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';

const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
    if (type === 'prev') {
      return <button className="py-2 px-4 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 leading-4">Previous</button>;
    }
    if (type === 'next') {
      return <button className="py-2 px-4 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 leading-4">Next</button>;
    }
    return originalElement;
};

export default function PaginationContainer(props: PaginationContainerProps) {

    const { data, handlePaginationChange, total } = props;
    const { currentPage, totalPages, handleNextPage, handlePreviousPage } = paginationComponentState(data, handlePaginationChange);
    return (
        <div className="mt-4 flex justify-center">
            <Pagination defaultCurrent={1} total={total} itemRender={itemRender} onChange={handlePaginationChange} />
        </div>
    );

}