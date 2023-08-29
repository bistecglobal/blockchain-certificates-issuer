import React from 'react'
import { Card } from "antd";
import { DeleteOutlined, ArrowsAltOutlined } from '@ant-design/icons';
import PaginationContainer from '../shared/pagination/PaginationContainer';
import { useComponentState } from './state';
import { TraineeResponse } from 'apps/blockchain-frontend/interfaces/viewModels';
import DeleteConfirmationModal from '../shared/deleteConfirmation/DeleteConfirmationModal';
import SpinnerContainer from '../shared/spinner/SpinnerContainer';


function TraineesCardView() {
const {  dataSource, loading, handlePaginationChange, openDeleteModal, isDeleteModalOpen, closeDeleteModal, confirmDelete, total } = useComponentState();

  return (
    <>
            {dataSource.length > 0 ? (
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {dataSource.map((trainee: TraineeResponse, index) => (
                            <div key={index} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <div className="flex">
                                    <div className="ml-auto">
                                       <ArrowsAltOutlined />
                                    </div>
                                </div>
                                <div>
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{trainee.FirstName}</h5>
                                </div>

                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"></p>
                                <div className="flex">
                                    <div className="ml-auto">
                                        <button onClick={() => {
                                            openDeleteModal(trainee.Id, trainee.Type);
                                        }}><DeleteOutlined /></button>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div><PaginationContainer data={dataSource} handlePaginationChange={handlePaginationChange} total={total} /></div></div>)
                : (<div className='fixed inset-0 ml-40 z-[-1] flex items-center justify-center'>

                    {loading ? (<div>
                        <SpinnerContainer />
                    </div>) : (<div className="text-lg text-gray-600">No data available.</div>)}</div>)}


            <DeleteConfirmationModal isOpen={isDeleteModalOpen} onCancel={closeDeleteModal} onConfirm={confirmDelete} />
        </>
  );
}

export default TraineesCardView
