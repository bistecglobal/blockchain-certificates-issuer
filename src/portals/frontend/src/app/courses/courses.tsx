import styles from './courses.module.css';

/* eslint-disable-next-line */
export interface CoursesProps {}

export function Courses(props: CoursesProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Courses!</h1>
    </div>
  );
}

export default Courses;
