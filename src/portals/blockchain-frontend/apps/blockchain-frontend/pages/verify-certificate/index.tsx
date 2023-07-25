import styles from './verify-certificate.module.css';
import { Button } from 'antd';
import React from 'react';
import { VerifiedOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { usePageState } from '../../components/pages-state/verify-certificate-state/state';
import moment from 'moment';

export function CartPageCertificates() {
  const { certificateDetail, isClick, verifyCertificate, isVerify, contextHolder } = usePageState();
  const certificateWrapper = React.createRef<HTMLDivElement>();
  return (
    <div>
      {contextHolder}
      <div className={styles['container']}>
        <div className={styles['content']}>
           
              {!isClick && (
                 <div className={styles['viewCertificate']}>
                 <h3>Your Certificate is Ready!</h3>
                <div>   <Button type='primary' style={{backgroundColor:'#4096ff'}} icon={<VerifiedOutlined />} onClick={verifyCertificate}>Verify Certificate</Button></div>
                </div>
              )}
     
          {isClick && (
            <div>
              {certificateDetail.length > 0 && isVerify ? (
                <>
                  <div className={styles['Meta']}>
                  <div className="mt-2 text-center"><h2>Certificate of Completion</h2></div>
                  <div className='mt-2'>
                    <div
                      className={styles['certificateWrapper']}
                      ref={certificateWrapper}>
                      <p className={styles['p1']}>{certificateDetail[0].Course}</p>
                      <p className={styles['p2']}>{certificateDetail[0].Trainee[0].FirstName}</p>
                      <p className={styles['p3']}>{moment(certificateDetail[0].CertificateIssueDate).format('YYYY-MM-DD')}</p>

                      <Image
                        src="/issue-cert.png"
                        width={500}
                        height={500}
                        alt=""
                      />
                    </div>
                  </div>
                  </div>
                  <br />
                  <br />
                </>) : (
                <p>Certificate verification failed</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartPageCertificates;
