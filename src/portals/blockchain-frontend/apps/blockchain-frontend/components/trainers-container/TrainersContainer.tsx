import { Typography, Button, Table, Form, Input } from 'antd';
import styles from './TrainersContainer.module.css';
import { useComponentState } from './state';
import { DeleteOutlined } from '@ant-design/icons';
import { PlusOutlined } from '@ant-design/icons/lib/icons';
import { DefaultPagination } from 'apps/blockchain-frontend/interfaces/enums';

export default function TrainersContainer() {
    const { Title } = Typography;
    const { formik, handleDelete, dataSource, fetchTrainers } = useComponentState();
    const {
        handleSubmit,
        handleChange,
        values,
        errors,
    } = formik;
    const columns = [
        {
            key: '1',
            title: 'First Name',
            dataIndex: 'FirstName',
        },
        {
            key: '2',
            title: 'Last Name',
            dataIndex: 'LastName',
        },
        {
            key: '3',
            title: 'Email',
            dataIndex: 'EmailAddress',
        },

        {
            key: '4',
            title: 'Action',
            render: (data) => {
                return (
                    <>
                    <DeleteOutlined
                     onClick={() => {
                      handleDelete(data.Type,data.Id,);
                    }}
                      style={{ color: 'red', marginLeft: 4 }}
                    />
                  </>
                );
            },
        },
    ];

    const handlePaginationChange = (pageNumber: number, pageSize: number | undefined) => {
        fetchTrainers(pageNumber, pageSize ?? DefaultPagination.pageSize);
    };
    return (
        <div className={styles['container']}>
            <div className={styles['content']}>
                <div id="trainer-add-form">
                    <Title level={3}>Add Trainer</Title>
                    <Form onFinish={handleSubmit}>
                        <Form.Item>
                            <label htmlFor="firstName">First Name</label>
                            <Input
                                name="firstName"
                                type="text"
                                placeholder="First Name"
                                onChange={handleChange}
                                value={values.firstName}
                            />
                            <sub style={{ color: 'red' }}>
                                {errors.firstName ? `${errors.firstName}` : null}
                            </sub>
                        </Form.Item>

                        <Form.Item>
                            <label htmlFor="lastName">Last Name</label>
                            <Input
                                name="lastName"
                                type="text"
                                placeholder="Last Name"
                                onChange={handleChange}
                                value={values.lastName}
                            />
                            <sub style={{ color: 'red' }}>
                                {errors.lastName ? `${errors.lastName}` : null}
                            </sub>
                        </Form.Item>
                        <Form.Item>
                            <label htmlFor="emailAddress">Email Address</label>
                            <Input
                                name="emailAddress"
                                type="text"
                                placeholder="Email Address"
                                onChange={handleChange}
                                value={values.emailAddress}
                            />
                            <sub style={{ color: 'red' }}>
                                {errors.emailAddress ? `${errors.emailAddress}` : null}
                            </sub>
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="submit" icon={<PlusOutlined />} type="primary">
                                Add Trainer
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
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