import { DatePicker } from 'antd';
import { useComponentState } from './state';
import CancelConfirmationModal from '../shared/cancelConfirmation/CancelConfirmationModal';



export default function CourseForm() {
  const { formik,isCancelModalOpen, closeModalOpen, confirmCancel,handleCancel,isCancelDisable } = useComponentState();
  const {
    handleSubmit,
    handleChange,
    setFieldValue,
    handleBlur,
    values,
    errors,
  } = formik;
  return (
    <>
      <div className="p-8 flex justify-center items-center">
        <div className="bg-white p-4 shadow-md rounded-md sm:w-full md:w-full lg:w-2/3 xl:w-2/3">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-left font-medium text-gray-800">Course Name</label>
              <input
                type="text"
                id="title"
                name="title"
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                value={values.title}
                onChange={handleChange}
              />
            </div>

            <p className="text-left text-red-500 mb-2">
              {errors.title ? `${errors.title}` : null}
            </p>

            <div className="mb-6">
              <label htmlFor="message" className="block text-left font-medium text-gray-800">Description</label>
              <textarea
                id="description"
                name="description"
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                value={values.description}
                onChange={handleChange}
              ></textarea>
            </div>
            <p className="text-left  text-red-500 mb-2">
              {errors.description ? `${errors.description}` : null}
            </p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="startDate" className="block text-left font-medium text-gray-800">
                  Start date
                </label>
                <DatePicker
                  id="startDate"
                  name="startDate"
                  className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  value={values.startDate}
                  onChange={(date) => setFieldValue('startDate', date)}
                  onBlur={handleBlur}
                />
                <p className="text-left text-red-500 mb-2">
                  {errors.startDate ? `${errors.startDate}` : null}
                </p>
              </div>

              <div>
                <label htmlFor="endDate" className="block text-left font-medium text-gray-800">
                  End date
                </label>
                <DatePicker
                  id="endDate"
                  name="endDate"
                  className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  value={values.endDate}
                  onChange={(date) => setFieldValue('endDate', date)}
                  onBlur={handleBlur}
                />
                <p className="text-left text-red-500 mb-2">
                  { errors.endDate ? `${errors.endDate}` : null}
                </p>
              </div>
            </div>
            <div className='grid grid-cols-2 gap-4 mb-2'>
              <button
                type="submit"
                className={`w-full py-2 px-4 rounded-md focus:outline-none ${
                  formik.isValid ? 'bg-blue-500 text-white font-semibold hover:bg-blue-600' : 'bg-blue-500 text-white font-semibold cursor-not-allowed'
                }`}
              >
                Submit
              </button>
              <button
              type="button"
              className="w-full bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none"
             onClick={handleCancel} disabled= {isCancelDisable}>
              Cancel
            </button>
            </div>
          </form>
          <CancelConfirmationModal isOpen={isCancelModalOpen} onCancel={closeModalOpen} onConfirm={confirmCancel} />
        </div>
      </div>
    </>
  );
}