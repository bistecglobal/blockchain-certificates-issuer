import { Table } from 'antd';
import { useComponentState } from './state';
import { DeleteOutlined } from '@ant-design/icons';
import { DefaultPagination } from 'apps/blockchain-frontend/interfaces/enums';

export default function TraineesContainer() {
  const { formik, handleDelete, dataSource, fetchTrainees, total } =
    useComponentState();
  const { handleSubmit, handleChange, values, errors } = formik;

  const columns = [
    {
      key: '1',
      title: 'First Name',
      dataIndex: 'FirstName',
      width: '25%',
    },
    {
      key: '2',
      title: 'Last Name',
      dataIndex: 'LastName',
      width: '25%',
    },
    {
      key: '3',
      title: 'Email',
      dataIndex: 'EmailAddress',
      width: '33%',
    },

    {
      key: '4',
      title: 'Action',
      render: (data) => {
        return (
          <>
            <DeleteOutlined
              onClick={() => {
                handleDelete(data.Type, data.Id);
              }}
              style={{ color: 'red', marginLeft: 4 }}
            />
          </>
        );
      },
    },
  ];
  const handlePaginationChange = (
    pageNumber: number,
    pageSize: number | undefined
  ) => {
    fetchTrainees(pageNumber, pageSize ?? DefaultPagination.pageSize);
  };
  return (
    <div className="p-8 flex justify-center items-center">
      <div className="bg-white p-4 shadow-md rounded-md sm:w-full md:w-full lg:w-2/3 xl:w-2/3">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="mb-4">
              <label
                htmlFor="firstName"
                className="block text-left font-medium text-gray-800"
              >
                First Name
              </label>

              <input
                name="firstName"
                type="text"
                placeholder="First Name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={handleChange}
                value={values.firstName}
              />

              <p className="text-left text-red-500 mb-2">
                {errors.firstName ? `${errors.firstName}` : null}
              </p>
            </div>
            <div className="mb-4">
              <label
                htmlFor="lastName"
                className="block text-left font-medium text-gray-800"
              >
                Last Name
              </label>

              <input
                name="lastName"
                type="text"
                placeholder="Last Name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={handleChange}
                value={values.lastName}
              />
              <p className="text-left text-red-500 mb-2">
                {errors.lastName ? `${errors.lastName}` : null}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="mb-4">
              <label
                htmlFor="emailAddress"
                className="block text-left font-medium text-gray-800"
              >
                Email Address
              </label>

              <input
                name="emailAddress"
                type="text"
                placeholder="Email Address"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={handleChange}
                value={values.emailAddress}
              />
              <p className="text-left text-red-500 mb-2">
                {errors.emailAddress ? `${errors.emailAddress}` : null}
              </p>
            </div>
            <div className="mb-4">
              <label
                htmlFor="walletAddress"
                className="block text-left font-medium text-gray-800"
              >
                Wallet Address
              </label>
              <input
                name="walletAddress"
                type="text"
                placeholder="Wallet Address"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={handleChange}
                value={values.walletAddress}
              />
              <p className="text-left text-red-500 mb-2">
                {errors.walletAddress ? `${errors.walletAddress}` : null}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-2">
            <button
              type="submit"
              className={`w-full py-2 px-4 rounded-md focus:outline-none ${
                formik.isValid
                  ? 'bg-blue-500 text-white font-semibold hover:bg-blue-600'
                  : 'bg-blue-500 text-white font-semibold cursor-not-allowed'
              }`}
            >
              Submit
            </button>
            <button
              type="button"
              className="w-full bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none"
            >
              Cancel
            </button>
          </div>
        </form>
        <div id="trainee-grid">
          <Table
            loading={false}
            columns={columns}
            dataSource={dataSource}
            pagination={{
              pageSize: DefaultPagination.pageSize,
              total: total,
              onChange: handlePaginationChange,
            }}
          ></Table>

          <div className="flex justify-end mt-4"></div>
        </div>
      </div>
    </div>
  );
}
