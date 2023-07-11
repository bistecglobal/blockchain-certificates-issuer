import { Typography } from 'antd';
import styles from './DashboardContainer.module.css';
import { ShopTwoTone,UserOutlined,SafetyCertificateOutlined } from '@ant-design/icons';
import { BADFLAGS } from 'dns';

export default function DashboardContainer() {
  const { Title } = Typography;
  return (
    <div className={styles['container']}>
      <div className={styles['content']}>
        <div className={styles['title']}>
        <Title>Welcome to Home</Title>
        </div>
        <br />
        <table>
          <tbody>
            <tr>
              <td>
                <a href='/courses' style={{ textDecoration: 'none' , color:'black'}}>
                <div className={styles['tileContainer']}><h3>Course</h3>
                <p><ShopTwoTone style={{ fontSize: '40px', color: '#1677ff' }} /></p>
                </div>
                </a>
            
              </td>
              <td>
              <a href='/trainers' style={{ textDecoration: 'none' , color:'black'}}>
                <div className={styles['tileContainer']}><h3>Trainer</h3>
                <p><UserOutlined style={{ fontSize: '40px', color: '#1677ff' }} /></p>
                </div>
                </a>
              </td>
            </tr>
            <tr>
              <td>
              <a href='/trainees' style={{ textDecoration: 'none' , color:'black'}}>
                <div className={styles['tileContainer']}><h3>Trainee</h3>
                <p><UserOutlined  style={{ fontSize: '40px', color: '#1677ff' }} /></p>
                </div>
                </a>
              </td>
              <td>
              <a href='/certificates' style={{ textDecoration: 'none' , color:'black'}}>
                <div className={styles['tileContainer']}><h3>Certificate</h3>
                <p><SafetyCertificateOutlined style={{ fontSize: '40px', color: '#1677ff' }} /></p>
                </div>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
