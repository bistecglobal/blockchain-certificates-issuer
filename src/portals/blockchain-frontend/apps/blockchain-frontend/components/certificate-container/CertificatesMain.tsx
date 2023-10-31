import React, { useState } from 'react';
import { useComponentState } from '../trainees-container/state';
import TraineeFormx from '../certificate-container/CertificateContainer';
import CertificateContainer from './CertificateContainer';
import CertificateForm from './CertificateForm';
import { PlusOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { usePageState } from './state';
import { Select, Form, Button, DatePicker, Spin } from 'antd';
import styles from './CertificateContainer.module.css';

function CertificatesMain() {
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
  const { view, id } = useComponentState();
  const router = useRouter();
  const [isCardView, setIsCardView] = useState(view === 'card');
  let content = null;
  let btnTitle = '';
  let title = '';
  let icon = null;

  if (view === 'form') {
    content = <CertificateForm />;
    btnTitle = 'Back';
    title = 'Issue a Certificate';
    icon = <ArrowLeftOutlined />;
  } else if (id) {
    content = <CertificateForm />;
    btnTitle = 'Back';
    title = 'Edit Trainee';
    icon = <ArrowLeftOutlined />;
  } else {
    content = <TraineeFormx />;
    btnTitle = 'Issue a certificate';
    title = 'Issued Certificates';
    icon = <PlusOutlined />;
  }

  const toggleView = () => {
    if (isCardView) {
      router.push(`?view=card`);
    } else {
      router.push(`?view=form`);
    }
    setIsCardView(!isCardView);
  };

  return (
    <>
      <div className="mx-auto px-4 py-16 text-center">
        <div className="text-center md:text-left mt-8">
          <span className="ml-8 mt-4 text-2xl font-bold">{title}</span>
        </div>
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
          {isRegister && (
            <>
              <div className="ml-8 mt-4 text-center md:text-left">
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded flex items-center space-x-2 hover:bg-blue-600"
                  onClick={toggleView}
                >
                  {icon}
                  <span>{btnTitle}</span>
                </button>
              </div>
              <div className="mt-8 ml-8">{content}</div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default CertificatesMain;
