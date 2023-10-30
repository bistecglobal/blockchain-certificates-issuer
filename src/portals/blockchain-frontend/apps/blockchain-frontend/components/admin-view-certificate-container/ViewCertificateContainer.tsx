import styles from './ViewCertificateContainer.module.css';
import { Button, Spin } from 'antd';
import React from 'react';
import {
  ShareAltOutlined,
  DownloadOutlined,
  EyeOutlined,
  CopyOutlined,
} from '@ant-design/icons';
import Image from 'next/image';
import { usePageState } from './state';
import moment from 'moment';

export default function AdminViewCertificateContainer() {
  const {
    certificateDetail,
    isClick,
    viewCertificate,
    isShared,
    shareCertificate,
    contextHolder,
    url,
    copied,
    copyTextToClipboard,
    backToView,
    isLording,
  } = usePageState();
  const certificateWrapper = React.createRef<HTMLDivElement>();
  return (
    <div className={`${isLording ? styles.loading : ''}`}>
      {contextHolder}
      <div className={styles['container']}>
        <div className={styles['content']}>
          {isLording && <Spin size="large" className={styles.spinner} />}
          {!isClick && (
            <div className={styles['viewCertificate']}>
              <h3>Your Certificate is Ready!</h3>
              <Button
                type="primary"
                style={{ backgroundColor: '#4096ff' }}
                icon={<EyeOutlined />}
                onClick={viewCertificate}
              >
                Show Certificate
              </Button>
            </div>
          )}

          {isClick && (
            <div>
              {certificateDetail.length > 0 ? (
                <>
                  <div className="mt-2">
                    <h1 className="text-xl font-bold">Certificate Details</h1>
                  </div>
                  <p>Course:{certificateDetail[0].Course}</p>
                  <p>
                    Trainee:
                    {certificateDetail[0].Trainee[0].FirstName +
                      certificateDetail[0].Trainee[0].LastName}
                  </p>
                  <p>Trainer:{certificateDetail[0].Trainer}</p>
                  <p>
                    Issue date:
                    {moment(certificateDetail[0].CertificateIssueDate).format(
                      'YYYY-MM-DD'
                    )}
                  </p>

                  <div className={styles['Meta']}>
                    <div
                      className={styles['certificateWrapper']}
                      ref={certificateWrapper}
                    >
                      {/*  <p className={styles['p1']}>
                        {certificateDetail[0].Course}
                      </p> */}
                      <p className={styles['p2']}>
                        {certificateDetail[0].Trainee[0].FirstName} &nbsp;
                        {certificateDetail[0].Trainee[0].LastName}
                      </p>
                      <p className={styles['p3']}>
                        {moment(
                          certificateDetail[0].CertificateIssueDate
                        ).format('YYYY-MM-DD')}
                      </p>

                      <Image
                        src="/cert-temp.png"
                        width={700}
                        height={400}
                        alt=""
                      />
                    </div>
                  </div>
                  <br />
                  {isShared && (
                    <>
                      <br />
                      <p>
                        {' '}
                        <a href={url} target="_blank">
                          View Certificate
                        </a>
                      </p>
                      <Button
                        style={{ marginTop: 30, backgroundColor: '#4096ff' }}
                        type="primary"
                        icon={<CopyOutlined />}
                        onClick={copyTextToClipboard}
                      >
                        Copy URL
                      </Button>
                      <br />
                      <p style={{ marginTop: 20, width: 250 }}>{url}</p>
                      {copied && <p>URL Copied!</p>}
                    </>
                  )}
                </>
              ) : (
                <div className={styles['viewCertificate']}>
                  <h3>Your account has no access to view this certificate !</h3>
                  <Button
                    type="primary"
                    style={{ backgroundColor: '#4096ff' }}
                    onClick={backToView}
                  >
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
