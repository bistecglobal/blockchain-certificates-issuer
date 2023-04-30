import styles from './CoursesContainer.module.css';
import { Button, Space, Table, DatePicker, Form, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons/lib/icons';
import { DeleteOutlined } from '@ant-design/icons';
import { useComponentState } from './state';

export default function CoursesContainer() {
  const { handleSubmit, handleDelete } = useComponentState();
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
                handleDelete(data.Id);
              }}
              style={{ color: 'red', marginLeft: 4 }}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className={styles['container']}>
      <div className={styles['content']}>
        <Form>
          <p>Course</p>
          <Form.Item
            rules={[
              {
                required: true,
                message: 'Title is required',
              },
            ]}
          >
            <Input
              placeholder="My Awsome Course"
              value={''}
              onChange={() => {}}
            />
          </Form.Item>

          <p>Start date</p>
          <Space>
            <div>
              <DatePicker onChange={() => {}} style={{ width: 500 }} />
            </div>
          </Space>

          <p>End Date</p>
          <Space>
            <div>
              <DatePicker style={{ width: 500 }} onChange={() => {}} />
            </div>
          </Space>
          <p>Description</p>
          <TextArea
            rows={4}
            title="Description"
            name="Description"
            value={''}
            onChange={() => {}}
          />
          <br />
          <br />
          <Form.Item>
            <Button
              htmlType="submit"
              icon={<PlusOutlined />}
              type="primary"
              onClick={() => {}}
            >
              Add Courses
            </Button>
          </Form.Item>
        </Form>

        <Table
          loading={false}
          columns={columns}
          dataSource={[]}
          pagination={{
            pageSize: 3,
            total: 1,
            onChange: () => {},
          }}
        ></Table>
      </div>
    </div>
  );
}
