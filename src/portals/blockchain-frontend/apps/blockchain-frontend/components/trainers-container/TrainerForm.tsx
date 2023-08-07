import { Typography, Button, Table, DatePicker, Form, Input, Card } from 'antd';
import { useComponentState } from './state';



export default function CourseForm() {
  const { formik } = useComponentState();
  const {
    handleSubmit,
    handleChange,
    values,
    errors,
  } = formik;
  return (
    <>
      <div className="p-8 flex justify-center items-center">
        <div className="bg-white p-4 shadow-md rounded-md sm:w-full md:w-full lg:w-2/3 xl:w-2/3">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="firstname" className="block text-left font-medium text-gray-800">First Name</label>
              <input
                type="text"
                id="fname"
                name="fname"
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                value={values.fname}
                onChange={handleChange}
              />
            </div>
 
            <p className="text-left text-red-500 mb-2">
              {errors.fname ? `${errors.fname}` : null}
            </p>

            <div className="mb-5">
              <label htmlFor="lastname" className="block text-left font-medium text-gray-800">Last Name</label>
              <input
                type="text"
                id="lname"
                name="lname"
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                value={values.lname}
                onChange={handleChange}
              />
            </div>
 
            <p className="text-left text-red-500 mb-2">
              {errors.lname ? `${errors.lname}` : null}
            </p>

            <div className="mb-6">
              <label htmlFor="email" className="block text-left font-medium text-gray-800">Email Address</label>
              <input
                type="text"
                id="email"
                name="email"
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                value={values.email}
                onChange={handleChange}
              />
            </div>
 
            <p className="text-left text-red-500 mb-2">
              {errors.email ? `${errors.email}` : null}
            </p>

            <div>
              <button
                type="submit"
                className="w-6/12 bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}