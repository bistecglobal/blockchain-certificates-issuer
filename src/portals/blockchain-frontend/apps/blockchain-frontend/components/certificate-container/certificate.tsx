import styles from './CertificateContainer.module.css';
import { Select, Form, Button, DatePicker, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons/lib/icons';
import React from 'react';
import { DownloadOutlined, CopyOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { usePageState } from './state';

export default function CertificateContainer() {
  const {
    formik,
    contextHolder,
    courseData,
    trainerData,
    traineeData,
    copyTextToClipboard,
    copied,
    isRegister,
    registerIssuer,
    url,
    isIssue,
    isLording,
  } = usePageState();
  const certificateWrapper = React.createRef<HTMLDivElement>();
  const { handleSubmit, setFieldValue, values } = formik;

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
              <b />
              <Button
                type="primary"
                style={{ backgroundColor: '#4096ff' }}
                onClick={registerIssuer}
              >
                Register Now
              </Button>
            </div>
          )}
          {isRegister && <div>yeah</div>}
        </div>
      </div>
    </div>
  );
}
