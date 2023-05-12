import { Typography, Button, Table, DatePicker, Form, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons/lib/icons';
import { DeleteOutlined } from '@ant-design/icons';
import styles from './CoursesContainer.module.css';
import { useComponentState } from './state';
import { useEffect } from 'react';
import { Pagination } from '../../interfaces/enums'
export default function CoursesContainer() {
  const { formik, deleteCourse,dataSource,fetchCourses } = useComponentState();
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
  const { Title } = Typography;
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
                deleteCourse(data.Id);
              }}
              style={{ color: 'red', marginLeft: 4 }}
            />
          </>
        );
      },
    },
  ];
  
  useEffect(() => {
    fetchCourses(Pagination.pageNumber, Pagination.pageSize);
  }, []);

  const handlePaginationChange = (pageNumber: number, pageSize: number | undefined) => {
    fetchCourses(pageNumber, pageSize ?? Pagination.pageSize);
  };
  return (
    <div className={styles['container']}>
      <div className={styles['content']}>
        <div id="course-add-form">
          <Title level={3}>Add Course</Title>
          <Form onFinish={handleSubmit}>
            <Form.Item>
              <label htmlFor="title">Course</label>
              <Input
                name="title"
                type="text"
                placeholder="My Awesome Course"
                onChange={handleChange}
                value={values.title}
              />
              <sub style={{ color: 'red' }}>
                {errors.title ? `${errors.title}` : null}
              </sub>
            </Form.Item>

            <Form.Item>
              <label htmlFor="startDate">Start Date</label>
              <DatePicker
                name="startDate"
                value={values.startDate}
                onChange={(date) => setFieldValue('startDate', date)}
                onBlur={handleBlur}
                disabled={isSubmitting}
                style={{ width: 500 }}
              />
              <sub style={{ color: 'red' }}>
                {errors.startDate ? `${errors.startDate}` : null}
              </sub>
            </Form.Item>

            <Form.Item>
              <label htmlFor="endDate">End Date</label>
              <DatePicker
                name="endDate"
                value={values.endDate}
                onChange={(date) => setFieldValue('endDate', date)}
                onBlur={handleBlur}
                disabled={isSubmitting}
                style={{ width: 500 }}
              />
              <sub style={{ color: 'red' }}>
                {errors.endDate ? `${errors.endDate}` : null}
              </sub>
            </Form.Item>

            <Form.Item>
              <label htmlFor="description">Description</label>
              <TextArea
                name="description"
                rows={4}
                value={values.description}
                onChange={handleChange}
              />
              <sub style={{ color: 'red' }}>
                {errors.description ? `${errors.description}` : null}
              </sub>
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" icon={<PlusOutlined />} type="primary">
                Add Courses
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div id="course-grid">
          <Table
          key={'1'}
            loading={false}
            columns={columns}
            dataSource={dataSource}
            pagination={{
              pageSize: Pagination.pageSize,
              total: Pagination.pageNumber,
              onChange: handlePaginationChange,
            }}
          ></Table>
        </div>
      </div>
    </div>
  );
}
