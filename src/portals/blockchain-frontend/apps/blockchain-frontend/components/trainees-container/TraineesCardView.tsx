import React from 'react';
import { Card } from 'antd';
import {
  DeleteOutlined,
  ArrowsAltOutlined,
  EditOutlined,
} from '@ant-design/icons';
import PaginationContainer from '../shared/pagination/PaginationContainer';
import { useComponentState } from './state';
import { TraineeResponse } from 'apps/blockchain-frontend/interfaces/viewModels';
import DeleteConfirmationModal from '../shared/deleteConfirmation/DeleteConfirmationModal';
import SpinnerContainer from '../shared/spinner/SpinnerContainer';

function TraineesCardView() {
  const {
    dataSource,
    loading,
    handlePaginationChange,
    openDeleteModal,
    isDeleteModalOpen,
    closeDeleteModal,
    confirmDelete,
    total,
  } = useComponentState();

  return (
    <>
      {dataSource.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-2">
            {dataSource.map((trainee: TraineeResponse, index) => (
              <div
                key={index}
                className="w-auto bg-white rounded-b-lg border-t-4 border-green-400 px-4 py-5 flex flex-col justify-around shadow-md "
              >
                <p className="text-lg font-bold font-sans">
                  {' '}
                  {trainee.FirstName}
                </p>
                <div className="py-3">
                  <p className="text-gray-400 text-sm">{trainee.Id}</p>
                </div>

                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"></p>
                <div className="text-sm flex gap-2">
                  <button className="bg-blue-200 px-3 py-0.5 rounded-xl hover:bg-blue-400 transition-colors ease-in-out">
                    <a href={`/trainees?view=edit&id=${trainee.Id}`}>
                      <EditOutlined className="mb-1" />
                    </a>
                  </button>
                  <button
                    className="bg-red-200 px-3 py-0.5 rounded-xl hover:bg-red-400 transition-colors ease-in-out"
                    onClick={() => {
                      openDeleteModal(trainee.Id, trainee.Type);
                    }}
                  >
                    <DeleteOutlined className="mb-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div>
            <PaginationContainer
              data={dataSource}
              handlePaginationChange={handlePaginationChange}
              total={total}
            />
          </div>
        </div>
      ) : (
        <div className="fixed inset-0 ml-40 z-[-1] flex items-center justify-center">
          {loading ? (
            <div>
              <SpinnerContainer />
            </div>
          ) : (
            <div className="text-lg text-gray-600">No data available.</div>
          )}
        </div>
      )}

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onCancel={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </>
  );
}

export default TraineesCardView;
