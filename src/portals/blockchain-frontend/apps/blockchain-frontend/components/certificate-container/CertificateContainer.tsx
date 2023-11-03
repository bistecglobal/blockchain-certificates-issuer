import { Typography, Button, Table, Form, Input } from 'antd';
import { DefaultPagination } from 'apps/blockchain-frontend/interfaces/enums';
import { usePageState } from './state';

export default function TraineesContainerx() {
  const {
    filteredDataSource,
    total,
    handleSearchInputChange,
    fetchCertificates,
  } = usePageState();
  const columns = [
    {
      key: '1',
      title: 'Certificate ID',
      dataIndex: 'Id',
    },
    {
      key: '2',
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
          placeholder="Search by course ID, Course Name"
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
