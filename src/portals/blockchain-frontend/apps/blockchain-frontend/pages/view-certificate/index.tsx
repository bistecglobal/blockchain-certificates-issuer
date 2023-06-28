import styles from './view-certificate.module.css';
import { Button } from 'antd';
import React from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { usePageState } from './state';
import moment from 'moment';

export function CartPageCertificates() {
  const { certificateDetail, isClick, viewCertificate,isShared } = usePageState();
  const certificateWrapper = React.createRef<HTMLDivElement>();
  return (
    <div>

      <div className={styles['container']}>
        <div className={styles['content']}>
          <div className={styles['Meta']}>
            {!isClick && (
              <div>   <button style={{
                position: 'absolute',
                width: 110,
                left: '98%',
                top: '150%',
              }} onClick={viewCertificate}>View Certificate</button></div>
            )}
          </div>
          {isClick && (
            <div>
              {certificateDetail.length > 0 ? (
                <>
                  <div className={styles['Meta']}>
                    <div
                      className={styles['certificateWrapper']}
                      ref={certificateWrapper}
                    >

                      <p className={styles['p1']}>{certificateDetail[0].Course}</p>
                      <p className={styles['p2']}>{certificateDetail[0].Trainee}</p>
                      <p className={styles['p3']}>{moment(certificateDetail[0].certificateIssueDate).format('YYYY-MM-DD')}</p>

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

                  <Button disabled = {isShared}
                    style={{
                      position: 'absolute',
                      width: 110,
                      left: '98%',
                      top: '120%',
                    }}
                    type="primary"
                    icon={<DownloadOutlined />}>
                    Share
                  </Button>
                </>) : (
                <p>No Data</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartPageCertificates;
