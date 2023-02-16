import styles from './cart-page-course.module.css';
import { useEffect, useState } from "react";
import { Avatar, Rate, Space, Table, Typography } from "antd";


/* eslint-disable-next-line */
export interface CartPageCourseProps {}

export function Courses(props: CartPageCourseProps) {
  

  return (
    <div className={styles['container']}>
      <h1>Welcome to CartPageCourse!</h1>
      <Typography>Courses</Typography>
     
    </div>
  );
}

export default Courses;
