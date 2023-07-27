import { Typography, Button, Table, DatePicker, Form, Input, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons/lib/icons';
import { DeleteOutlined } from '@ant-design/icons';
import styles from './CoursesContainer.module.css';
import { useComponentState } from './state';
import { DefaultPagination } from '../../interfaces/enums';

export default function CoursesContainer() {
  const { formik, dataSource, fetchCourses, handleDelete } =
    useComponentState();
  const {
    handleSubmit,
    handleChange,
    setFieldValue,
    handleBlur,
    isSubmitting,
    values,
    errors,
  } = formik;

  const { TextArea } = Input;
  const columns = [
    {
      key: '1',
      title: 'Title',
      dataIndex: 'Title',
    },
    {
      key: '2',
      title: 'Description',
      dataIndex: 'Details',
    },
    {
      key: '3',
      title: 'StartDate',
      dataIndex: 'StartDate',
    },
    {
      key: '4',
      title: 'EndDate',
      dataIndex: 'EndDate',
    },
    {
      key: '5',
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
  const DatePickerField = ({
    name,
    value,
    onChange,
    onBlur,
    isSubmitting,
    placeholder,
    errors,
  }) => (
    <div className="relative z-0 w-full mb-6 group">
      <DatePicker
        name={name}
        className="block py-2.5 px-5 w-full text-sm text-gray-900 bg-transparent border-1 border-b-2 border-gray-400 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 "
        value={value}
        onChange={(date) => onChange(name, date)}
        onBlur={onBlur}
        disabled={isSubmitting}
        placeholder={placeholder}
      />
      <sub style={{ color: 'red' }}>
        {errors
          ? `Please select a ${name === 'startDate' ? 'start' : 'end'} date *`
          : null}
      </sub>
    </div>
  );

  const handlePaginationChange = (
    pageNumber: number,
    pageSize: number | undefined
  ) => {
    fetchCourses(pageNumber, pageSize ?? DefaultPagination.pageSize);
  };
  return (
    <div className="">
      <div className="mx-auto py-16  h-[100vh] center">
        <div className="text-center">
          <h1 className="mb-20 mt-10 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-5xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-indigo-700 from-indigo-700 uppercase">
              Add Course
            </span>
          </h1>
        </div>
        <div className="px-[100px]">
          <Card className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4  ">
            <Form onFinish={handleSubmit}>
              <div className="relative z-0 w-full mb-6 group ">
                <Input
                  name="title"
                  type="text"
                  className="block py-2.5 px-5 w-full text-sm text-gray-900 bg-transparent border-1 border-b-2 border-gray-400 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 "
                  placeholder="My Awesome Course"
                  onChange={handleChange}
                  value={values.title}
                />
                <sub style={{ color: 'red' }}>
                  {errors.title ? `Please fill out this field *` : null}
                </sub>
              </div>

              <div className="grid grid-cols-2 gap-7">
                <DatePickerField
                  name="startDate"
                  value={values.startDate}
                  onChange={setFieldValue}
                  onBlur={handleBlur}
                  isSubmitting={isSubmitting}
                  placeholder="Select Start Date"
                  errors={errors.startDate}
                />
                <DatePickerField
                  name="endDate"
                  value={values.endDate}
                  onChange={setFieldValue}
                  onBlur={handleBlur}
                  isSubmitting={isSubmitting}
                  placeholder="Select End Date"
                  errors={errors.endDate}
                />
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <TextArea
                    name="description"
                    rows={4}
                    value={values.description}
                    onChange={handleChange}
                    placeholder="Add Your Description"
                    className="block py-2.5 px-5 w-full text-sm text-gray-900 bg-transparent border-1 border-b-2 border-gray-400 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 "
                  />
                  <sub style={{ color: 'red' }}>
                    {errors.description ? `Please fill out this field *` : null}
                  </sub>
                </div>
              </div>

              <Button
                htmlType="submit"
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-6 border border-blue-500 hover:border-transparent rounded"
                type="primary"
              >
                ADD COURSE
              </Button>
            </Form>
          </Card>
        </div>
        <div className="mx-auto lg:px-[350px] md:px-[350px] lg:py-5"></div>
        <div id="course-grid" className="px-[100px]">
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
