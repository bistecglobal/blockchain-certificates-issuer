import { Typography, Button, Table, Form, Input } from 'antd';
//import { useComponentState } from './state';
import { DeleteOutlined } from '@ant-design/icons';
import { DefaultPagination } from 'apps/blockchain-frontend/interfaces/enums';
import { useComponentStates } from '../certificate-container/states';
import { useState } from 'react';

export default function TraineesContainerx() {
  const { Title } = Typography;
  const { formik, handleDelete, dataSource, fetchCertificates, total } =
    useComponentStates();
  const { handleSubmit, handleChange, values, errors } = formik;
  // State variables for search query and filtered data source
  const [searchQuery, setSearchQuery] = useState('');

  // Function to handle search input changes
  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  // Filter the data source based on the search query
  const filteredDataSource = dataSource.filter((item) => {
    // Filter by the 'Id' value
    return item.Id.includes(searchQuery) || item.Course.includes(searchQuery);
  });

  const columns = [
    {
      key: '1',
      title: 'Certificate ID',
      dataIndex: 'Id',
    },
    {
      key: '1',
      title: 'Course Name',
      dataIndex: 'Course',
    },
    /*
        {
      key: '2',
      title: 'Trainee',
      dataIndex: 'Trainee.FirstName',
    },
    */
    {
      key: '3',
      title: 'Trainer',
      dataIndex: 'Trainer',
    },
    {
      key: '4',
      title: 'Isued Date',
      dataIndex: 'CertificateIssueDate',
    },

    {
      key: '5',
      title: 'View Certificate',
      dataIndex: 'Id',
      render: (text, record) => (
        <a href={`/admin-view-certificate?view=${record.Id}`}>View</a>
      ),
    },
  ];
  const handlePaginationChange = (
    pageNumber: number,
    pageSize: number | undefined
  ) => {
    fetchCertificates(pageNumber, pageSize ?? DefaultPagination.pageSize);
  };
  return (
    <div className="p-8 flex justify-center items-center">
      <div className="bg-white p-4 shadow-md rounded-md sm:w-full md:w-full lg:w-2/3 xl:w-2/3">
        <Input
          placeholder="Search..."
          onChange={handleSearchInputChange}
          style={{ marginBottom: '10px' }}
        />
        <div id="trainee-grid">
          <Table
            loading={false}
            columns={columns}
            dataSource={filteredDataSource}
            pagination={{
              pageSize: DefaultPagination.pageSize,
              total: total,
              onChange: handlePaginationChange,
            }}
          ></Table>
        </div>
      </div>
    </div>
  );
}
