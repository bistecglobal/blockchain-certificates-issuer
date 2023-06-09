import styles from './cart-page-certificates.module.css';
import { Select, Form, Button, notification, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons/lib/icons';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import { EthProvider } from 'apps/blockchain-frontend/contexts/EthContext';
import BlockchainVerifier from 'apps/blockchain-frontend/components/blockchain-verifier/BlockchainVerifier';

import { useRouter } from 'next/navigation';
import Image from 'next/image';


export function CartPageCertificates() {
  const [api, contextHolder] = notification.useNotification();

  const [courseval, setselectcourse] = useState('');
  const [traineeval, setselecttrainee] = useState('');
  const [trainerval, setselecttranier] = useState('');
  const [date, setDate] = React.useState(false);
  const [courses, setCourses] = useState([]);
  const [tainees, setDataTrainee] = useState([]);
  const [trainers, setDataTrainer] = useState([]);

  const navigate = useRouter();

  const certificateWrapper = React.createRef<HTMLDivElement>();

  const setSelectCourse = (value) => {
    setselectcourse(value);
  };
  const setSelectTrainee = (value) => {
    setselecttrainee(value);
  };

  const setSelectTrainer = (value) => {
    setselecttranier(value);
  };
  function setIssueDate(date, dateString) {
    setDate(dateString);
  }

  useEffect(() => {
    getData();
    getDataTrainee();
    getDataTrainer();
  }, []);

  const getData = () => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/courses?pageSize=10&pageNumber=1`
      )
      .then((result) => {
        setCourses(result.data);
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getDataTrainee = () => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/trainees?pageSize=10&PageNumber=1`
      )
      .then((result) => {
        setDataTrainee(result.data);
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getDataTrainer = () => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/trainers?pageSize=5&PageNumber=1`
      )
      .then((result) => {
        setDataTrainer(result.data);
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSave = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const data = {
      Course: courseval,
      Trainee: traineeval,
      Trainer: trainerval,
      CertificateIssueDateDate: date,
    };
    const key = 'updatable';
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}api/certificates`;
    axios
      .post(url, data)
      .then((result) => {
        console.log(result.data);
        api.open({
          key,
          message: 'Issue Cerificate.',
          description: 'Certificate created successfully',
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {contextHolder}
      <EthProvider>
        <BlockchainVerifier setValue={undefined} />
      </EthProvider>
      <div className={styles['container']}>
        <div className={styles['content']}>
          <Form>
            <p>Select Course</p>
            <Select
              placeholder="Select Course"
              style={{ width: 150 }}
              value={courseval}
              onChange={(value) => {
                setSelectCourse(value);
              }}
            >
              {courses.map((course, index) => (
                <Select.Option key={index} value={course.Title}>
                  {course.Title}
                </Select.Option>
              ))}
            </Select>

            <p>Select Trainee</p>
            <Select
              placeholder="Select Trainee"
              style={{ width: 150 }}
              value={traineeval}
              onChange={(value) => {
                setSelectTrainee(value);
              }}
            >
              {tainees.map((trainee, index) => (
                <Select.Option key={index} value={trainee.FirstName}>
                  {trainee.FirstName}{' '}
                </Select.Option>
              ))}
            </Select>
            <p>Select Trainer</p>
            <Select
              placeholder="Select Trainer"
              style={{ width: 150 }}
              value={trainerval}
              onChange={(value) => {
                setSelectTrainer(value);
              }}
            >
              {trainers.map((trainer, index) => (
                <Select.Option key={index} value={trainer.FirstName}>
                  {trainer.FirstName}{' '}
                </Select.Option>
              ))}
            </Select>
            <p>Select Certificate Issue Date</p>

            <div>
              <DatePicker onChange={setIssueDate} />
            </div>

            <p></p>
            <Form.Item>
              <Button
                htmlType="submit"
                icon={<PlusOutlined />}
                type="primary"
                onClick={(e) => {
                  handleSave(e);
                }}
              >
                Issue Certificate
              </Button>
            </Form.Item>
            {/* <Button type="primary" icon={<DownloadOutlined />} onClick={pdfGenerate}>
            Download
          </Button> */}

            <div className={styles['Meta']}>
              <div
                className={styles['certificateWrapper']}
                ref={certificateWrapper}
              >
                <p className={styles['p1']}>{courseval}</p>
                <p className={styles['p2']}>{traineeval}</p>
                <p className={styles['p3']}>{date}</p>
                <Image
                  src="/issue-cert.png"
                  width={500}
                  height={500}
                  alt=""
                />
              </div>
            </div>
            <br />
            <br />

            <Button
              style={{
                position: 'absolute',
                width: 110,
                left: '98%',
                top: '120%',
              }}
              type="primary"
              icon={<DownloadOutlined />}
              onClick={async (e) => {
                e.preventDefault();
                const { exportComponentAsPNG } = await import(
                  'react-component-export-image'
                );
                exportComponentAsPNG(certificateWrapper);
              }}
            >
              Download
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default CartPageCertificates;
