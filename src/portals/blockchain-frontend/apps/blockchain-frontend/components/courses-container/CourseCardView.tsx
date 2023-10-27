import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import SpinnerContainer from '../shared/spinner/SpinnerContainer';
import { useComponentState } from './state';
import PaginationContainer from '../shared/pagination/PaginationContainer';
import DeleteConfirmationModal from '../shared/deleteConfirmation/DeleteConfirmationModal';
import { CourseResponse } from '../../interfaces/viewModels';

export default function CourseCardView() {
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

  const formatDate = (date) =>
    new Date(date).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  return (
    <>
      {dataSource.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-2">
            {dataSource.map((course: CourseResponse, index) => (
              <div
                key={index}
                className="w-auto bg-white rounded-b-lg border-t-4 border-green-400 px-4 py-5 flex flex-col justify-around shadow-md "
              >
                <p className="text-lg font-bold font-sans"> {course.Title}</p>
                <div className="py-3">
                  <p className="text-gray-400 text-sm">{course.Description}</p>
                </div>

                <div className="flex justify-between mt-2">
                  <p className="text-black-400 text-sm font-bold">
                    {`${formatDate(course.StartDate)} to ${formatDate(
                      course.EndDate
                    )}`}
                  </p>
                  <div className="text-sm flex gap-2">
                    <button className="bg-blue-200 px-3 py-0.5 rounded-xl hover:bg-blue-400 transition-colors ease-in-out">
                      <a href={`/courses?view=edit&id=${course.Id}`}>
                        <EditOutlined className="mb-1" />
                      </a>
                    </button>
                    <button
                      className="bg-red-200 px-3 py-0.5 rounded-xl hover:bg-red-400 transition-colors ease-in-out"
                      onClick={() => {
                        openDeleteModal(course.Id, course.Type);
                      }}
                    >
                      <DeleteOutlined className="mb-1" />
                    </button>
                  </div>
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
