import styles from './view-certificate.module.css';
import { Button } from 'antd';
import React from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { usePageState } from '../../components/pages-state/view-certificate-state/state';
import moment from 'moment';

export function CartPageCertificates() {
  const { certificateDetail, isClick, viewCertificate, isShared, shareCertificate, contextHolder, url, copied, copyTextToClipboard,backToView } = usePageState();
  const certificateWrapper = React.createRef<HTMLDivElement>();
  return (
    <div>
      {contextHolder}
      <div className={styles['container']}>
        <div className={styles['content']}>
        
            {!isClick && (
              <div className={styles['viewCertificate']}>
                <h3>Your Certificate is Ready!</h3>
                <Button type='primary' onClick={viewCertificate}>Show Certificate</Button>
                </div>
            )}

          {isClick && (
            <div>
              {certificateDetail.length > 0 ? (
                <>
                <p>Course:{certificateDetail[0].Course}</p>
                <p>Trainee:{certificateDetail[0].Trainee[0].FirstName + certificateDetail[0].Trainee[0].LastName}</p>
                <p>Trainer:{certificateDetail[0].Trainer}</p>
                <p>Issue date:{moment(certificateDetail[0].CertificateIssueDate).format('YYYY-MM-DD')}</p>
                
                  <div className={styles['Meta']}>
                    <div
                      className={styles['certificateWrapper']}
                      ref={certificateWrapper}
                    >
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
                  <br />
                  <br />

                  <Button disabled={isShared}
                    type="primary"
                    icon={<DownloadOutlined />}
                    onClick={shareCertificate}>
                    Share Certificate with a Verifier
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
                <div  className={styles['viewCertificate']}>
                <h3>Your account has no access to view this certificate !</h3>
                <Button
                    type="primary"
                    onClick={backToView}>
                    Back
                  </Button>
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
