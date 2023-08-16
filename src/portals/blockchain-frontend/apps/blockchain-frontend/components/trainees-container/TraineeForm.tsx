import { Typography, Button, Table, Form, Input } from 'antd';
import { useComponentState } from './state';

export default function TraineesContainer() {
    const { Title } = Typography;
    const { formik, handleDelete, dataSource, fetchTrainees } = useComponentState();
    const {
        handleSubmit,
        handleChange,
        values,
        errors,
    } = formik;
    return (
        <div className="p-8 flex justify-center items-center">
            <div className="bg-white p-4 shadow-md rounded-md sm:w-full md:w-full lg:w-2/3 xl:w-2/3">
                <div id="trainee-add-form">
                    <Form onFinish={handleSubmit}>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <Form.Item>
                                <label htmlFor="firstName" className="block text-left font-medium text-gray-800">First Name</label>
                                <Input
                                    name="firstName"
                                    type="text"
                                    placeholder="First Name"
                                    className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                    onChange={handleChange}
                                    value={values.firstName}
                                />
                                <sub className="text-left text-red-500 mb-2">
                                    {errors.firstName ? `${errors.fisrtName}` : null}
                                </sub>
                            </Form.Item>
                            <Form.Item>
                                <label htmlFor="lastName" className="block text-left font-medium text-gray-800">Last Name</label>
                                <Input
                                    name="lastName"
                                    type="text"
                                    placeholder="Last Name"
                                    className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                    onChange={handleChange}
                                    value={values.lastName}
                                />
                                <sub className="text-left text-red-500 mb-2">
                                    {errors.lastName ? `${errors.lastName}` : null}
                                </sub>
                            </Form.Item>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <Form.Item>
                                <label htmlFor="emailAddress" className="block text-left font-medium text-gray-800">Email Address</label>
                                <Input
                                    name="emailAddress"
                                    type="text"
                                    placeholder="Email Address"
                                    className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                    onChange={handleChange}
                                    value={values.emailAddress}
                                />
                                <sub className="text-left text-red-500 mb-2">
                                    {errors.emailAddress ? `${errors.emailAddress}` : null}
                                </sub>
                            </Form.Item>
                            <Form.Item>
                                <label htmlFor="walletAddress" className="block text-left font-medium text-gray-800">Wallet Address</label>
                                <Input
                                    name="walletAddress"
                                    type="text"
                                    placeholder="Wallet Address"
                                    className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                    onChange={handleChange}
                                    value={values.walletAddress}
                                />
                                <sub className="text-left text-red-500 mb-2">
                                    {errors.walletAddress ? `${errors.walletAddress}` : null}
                                </sub>
                            </Form.Item>
                        </div>
                        <div className='grid grid-cols-2 gap-4 mb-2'>
                            <button
                                type="submit"
                                className={`w-full py-2 px-4 rounded-md focus:outline-none ${formik.isValid ? 'bg-blue-500 text-white font-semibold hover:bg-blue-600' : 'bg-blue-500 text-white font-semibold cursor-not-allowed'
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
                    </Form>
                </div>
            </div>
        </div>
    );

}