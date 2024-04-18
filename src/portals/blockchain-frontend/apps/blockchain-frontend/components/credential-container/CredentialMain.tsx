import { Select, Form, Button, DatePicker, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons/lib/icons';
import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import { usePageState } from './state';
import { createCredential } from '../../api/fetchData';

export default function CredentialMain() {
  const { contextHolder, courseData, trainerData, traineeData } =
    usePageState();

  const [issuedUrl, setIssuedUrl] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values) => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const requestData = {
        course_name: values.course,
        date: values.issueDate.format('DD/MM/YYYY'),
        trainee: values.trainee,
        trainer: values.trainer,
      };

      const url = await createCredential(requestData);

      console.log('Certificate issued successfully');
      console.log('Response URL:', url);
      setIsSubmitting(true);
      setIssuedUrl(url);
    } catch (error) {
      console.error('Error issuing certificate:', error);
      message.error('Error issuing certificate. Please try again.');
    } finally {
      setIsSubmitting(true);
    }
  };

  return (
    <div className="container p-20">
      {contextHolder}
      <div>
        <div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Generate a Certificate
            </h2>

            <Form onFinish={handleSubmit}>
              <Form.Item
                name="course"
                label="Course"
                className="block text-left font-medium text-gray-800"
              >
                <Select
                  placeholder="Select Course"
                  className="ml-7"
                  style={{ width: 150 }}
                >
                  {courseData.map((course, index) => (
                    <Select.Option key={index} value={course.Title}>
                      {course.Title}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="trainee"
                label="Trainee"
                className="block text-left font-medium text-gray-800"
              >
                <Select
                  placeholder="Select Trainee"
                  className="ml-7"
                  style={{ width: 150 }}
                >
                  {traineeData.map((trainee, index) => (
                    <Select.Option
                      key={index}
                      value={trainee.FirstName}
                      data={trainee}
                    >
                      {trainee.FirstName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="trainer"
                label="Trainer"
                className="block text-left font-medium text-gray-800 "
              >
                <Select
                  placeholder="Select Trainer"
                  className="ml-7"
                  style={{ width: 150 }}
                >
                  {trainerData.map((trainer, index) => (
                    <Select.Option key={index} value={trainer.FirstName}>
                      {trainer.FirstName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="issueDate"
                label="Date"
                className="block text-left font-medium text-gray-800"
              >
                <DatePicker className="ml-10" />
              </Form.Item>

              <Form.Item>
                <Button
                  htmlType="submit"
                  icon={<PlusOutlined />}
                  type="primary"
                  style={{ backgroundColor: '#4096ff' }}
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? 'Issuing Certificate...'
                    : 'Issue Certificate'}
                </Button>
              </Form.Item>
            </Form>

            {issuedUrl && (
              <div>
                <QRCode value={issuedUrl} size={164} level="L" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
