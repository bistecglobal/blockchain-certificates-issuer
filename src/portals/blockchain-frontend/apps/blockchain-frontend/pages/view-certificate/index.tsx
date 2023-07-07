import styles from './view-certificate.module.css';
import { Button } from 'antd';
import React from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { usePageState } from '../../components/pages-state/view-certificate-state/state';
import moment from 'moment';

export function CartPageCertificates() {
  const { certificateDetail, isClick, viewCertificate, isShared, shareCertificate, contextHolder, url, copied, copyTextToClipboard } = usePageState();
  const certificateWrapper = React.createRef<HTMLDivElement>();
  return (
    <div>
      {contextHolder}
      <div className={styles['container']}>
        <div className={styles['content']}>
          <div className={styles['Meta']}>
            {!isClick && (
              <div><Button type='primary' onClick={viewCertificate}>View Certificate</Button></div>
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
                      <p className={styles['p2']}>{certificateDetail[0].Trainee[0].FirstName}</p>
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

                  <Button disabled={isShared}
                    type="primary"
                    icon={<DownloadOutlined />}
                    onClick={shareCertificate}>
                    Share
                  </Button>
          <br/>
                  {isShared && (
                    <>
                      <Button style={{marginTop :10}} type='primary' onClick={copyTextToClipboard}>Copy URL</Button>
                      <br/>
                      <p style={{marginTop :20,width:250}}>{url}</p>
                      {copied && <p>URL Copied!</p>}
                    </>
                  )}
                </>
              ) : (
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
