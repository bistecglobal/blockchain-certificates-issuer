import { Typography, Button, Table, DatePicker, Form, Input } from 'antd';
import styles from '../trainees-container/TraineesContainer.module.css';
import { useComponentState } from '../trainees-container/state';
//import { usePageState } from './state';
import { useComponentStates } from './states';
import { DefaultPagination } from 'apps/blockchain-frontend/interfaces/enums';

export default function CertificateContainer() {
  const { Title } = Typography;
  const { formik, dataSource, fetchCertificates } = useComponentStates();
  //const { fetchAllCourses, dataSource } = usePageState();
  //const { handleSubmit, handleChange, values, errors } = formik;
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
      key: '4',
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
    <div className={styles['container']}>
      <div className={styles['content']}>
        {/*
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <input
            type="search"
            className="relative m-0 block flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="button-addon2"
          />

          
          <span
            className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
            id="basic-addon2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
        */}

        <div id="trainer-grid">
          <Table
            loading={false}
            columns={columns}
            dataSource={dataSource}
            pagination={{
              pageSize: DefaultPagination.pageSize,
              total: DefaultPagination.pageNumber,
              onChange: handlePaginationChange,
            }}
          ></Table>
        </div>
      </div>
    </div>
  );
}
