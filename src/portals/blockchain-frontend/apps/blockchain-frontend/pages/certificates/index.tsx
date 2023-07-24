import styles from './cart-page-certificates.module.css';
import { Select, Form, Button, DatePicker, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons/lib/icons';
import React from 'react';
import { DownloadOutlined,CopyOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { usePageState } from '../../components/pages-state/certificates-state/state';


export function CartPageCertificates() {
  const { formik, contextHolder, courseData, trainerData, traineeData, copyTextToClipboard, copied, isRegister,
    registerIssuer, url, isIssue,isLording } = usePageState();
  const certificateWrapper = React.createRef<HTMLDivElement>();
  const {
    handleSubmit,
    setFieldValue,
    values,
  } = formik;


  return (
    <div className={`${isLording ? styles.loading : ''}`}>
      {contextHolder}
      <div className={styles['container']}>
        <div className={styles['content']}>
        {isLording && <Spin size="large" className={styles.spinner} />}
          {!isRegister && (
            <div className={styles['register']}>
              <h2>You have not Registered yet !</h2>
              <h4>Click on the below button to register,</h4>
              <b/>
              <Button
                type="primary"
                style={{backgroundColor:'#4096ff'}}
                onClick={registerIssuer}>Register Now</Button></div>
          )}
          {isRegister && (
            <div>
              <Form onFinish={handleSubmit}>
                <p>Select Course</p>
                <Select
                  placeholder="Select Course"
                  style={{ width: 150 }}
                  value={values.course}
                  onChange={value => {
                    setFieldValue("course", value);
                  }}
                >
                  {courseData.map((course, index) => (
                    <Select.Option key={index} value={course.Title}>
                      {course.Title}
                    </Select.Option>
                  ))}
                </Select>

                <p>Select Trainee</p>
                <Select
                  placeholder="Select Trainee"
                  style={{ width: 150 }}
                  value={values.trainee}
                  onChange={(value, data) => {
                    setFieldValue("trainee", value);
                    setFieldValue("traineeData", data);

                  }}
                >
                  {traineeData.map((trainee, index) => (
                    <Select.Option key={index} value={trainee.FirstName} data={trainee}>
                      {trainee.FirstName}{' '}
                    </Select.Option>
                  ))}
                </Select>
                <p>Select Trainer</p>
                <Select
                  placeholder="Select Trainer"
                  style={{ width: 150 }}
                  value={values.trainer}
                  onChange={value => {
                    setFieldValue("trainer", value);
                  }}
                >
                  {trainerData.map((trainer, index) => (
                    <Select.Option key={index} value={trainer.FirstName}>
                      {trainer.FirstName}{' '}
                    </Select.Option>
                  ))}
                </Select>
                <p>Select Certificate Issue Date</p>

                <div>
                  <DatePicker  onChange={value => {
                    setFieldValue("certificateIssueDate",value.format('YYYY-MM-DD'));
                  }}/>
                </div>
                <br/>
                <Form.Item>
                  <Button
                    htmlType="submit"
                    icon={<PlusOutlined />}
                    type="primary"
                    style={{backgroundColor:'#4096ff'}}
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
                    <p className={styles['p1']}>{values.course}</p>
                    <p className={styles['p2']}>{values.trainee}</p>
                    <p className={styles['p3']}>{values.certificateIssueDate}</p>
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
                    top: '550px',
                    backgroundColor:'#4096ff'
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

              {isIssue &&(
                <div className={styles['certificateUrl']}>
                  <p> <a href={url} target='_blank' >View Certificate</a></p>
                  <div className='mt-4'>
                  <Button  type="primary" style={{backgroundColor:'#4096ff'}} icon={<CopyOutlined/>}
                  onClick={copyTextToClipboard}>Copy URL</Button>
                    <br />
                  <label>{url}</label>
                  <br />
                  {copied && <p>URL Copied!</p>}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartPageCertificates;
