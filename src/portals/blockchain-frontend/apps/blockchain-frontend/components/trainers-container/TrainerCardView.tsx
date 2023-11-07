import { Card } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import SpinnerContainer from '../shared/spinner/SpinnerContainer';
import { useComponentState } from './state';
import PaginationContainer from '../shared/pagination/PaginationContainer';

export default function TrainerCardView({ trainersData }) {
  const { dataSource, loading, handleDelete, handlePaginationChange, total } =
    useComponentState();
  return (
    <>
      {dataSource.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-2">
            {dataSource.map((trainer, index) => (
              <div
                key={index}
                className="w-auto bg-white rounded-b-lg border-t-4 border-green-400 px-4 py-5 flex flex-col justify-around shadow-md "
              >
                <p className="text-lg font-bold font-sans">
                  {' '}
                  {trainer.FirstName}
                </p>
                <div className="py-3">
                  <p className="text-gray-400 text-sm">{trainer.Id}</p>
                </div>

                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"></p>
                <div className="flex">
                  <div className="text-sm flex gap-2">
                    <button className="bg-blue-200 px-3 py-0.5 rounded-xl hover:bg-blue-400 transition-colors ease-in-out">
                      <a href={`/trainers?view=edit&id=${trainer.Id}`}>
                        <EditOutlined className="mb-1" />
                      </a>
                    </button>
                    <button
                      className="bg-red-200 px-3 py-0.5 rounded-xl hover:bg-red-400 transition-colors ease-in-out"
                      onClick={() => {
                        handleDelete(trainer.Type, trainer.Id);
                      }}
                    >
                      <DeleteOutlined className="mb-1" />
                    </button>
                  </div>
                  <div className="ml-auto"></div>
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
    </>
  );
}
