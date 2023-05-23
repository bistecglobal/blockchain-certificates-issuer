import { Typography, Button, Table, DatePicker, Form, Input } from 'antd';
import styles from './TraineesContainer.module.css';
import { useComponentState, useFetchTraineesEffect } from './state';
import { DeleteOutlined } from '@ant-design/icons';
import { PlusOutlined } from '@ant-design/icons/lib/icons';
import { DefaultPagination } from 'apps/blockchain-frontend/interfaces/enums';
export default function TraineesContainer() {
    const { Title } = Typography;
    const { formik, deleteTrainee, dataSource, fetchTrainees } = useComponentState();
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
                                deleteTrainee(data.Id);
                            }}
                            style={{ color: 'red', marginLeft: 4 }}
                        />
                    </>
                );
            },
        },
    ];
    useFetchTraineesEffect(fetchTrainees)
    const handlePaginationChange = (pageNumber: number, pageSize: number | undefined) => {
        fetchTrainees(pageNumber, pageSize ?? DefaultPagination.pageSize);
    };
    return (
        <div className={styles['container']}>
            <div className={styles['content']}>
                <div id="trainee-add-form">
                    <Title level={3}>Add Trainee</Title>
                    <Form onFinish={handleSubmit}>
                        <Form.Item>
                            <label htmlFor="firstName">First Name</label>
                            <Input
                                name="firstName"
                                type="text"
                                placeholder="First Name"
                                onChange={handleChange}
                                value={values.title}
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
                                value={values.title}
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
                                Add Trainee
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