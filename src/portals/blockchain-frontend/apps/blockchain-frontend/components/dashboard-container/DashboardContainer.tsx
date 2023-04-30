import { Typography } from 'antd';
import styles from './DashboardContainer.module.css';

export default function DashboardContainer() {
  const { Title } = Typography;
  return (
    <div className={styles['container']}>
      <div className={styles['content']}>
        <Title level={2}>Welcome to Home</Title>
        <br />
      </div>
    </div>
  );
}
