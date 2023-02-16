import styles from './cart-page-course.module.css';
import {Form} from 'antd'
import Input from 'antd/es/input';
import Button from 'antd/es/button';
import {PlusOutlined} from '@ant-design/icons/lib/icons'


/* eslint-disable-next-line */
export interface CartPageCourseProps {}

export function CartPageCourse(props: CartPageCourseProps) {
  return (
    <div className={styles['container']}>
     <Form>
      <Form.Item name ={"Title"} label=" Title">
      <Input placeholder='Title'/>
      </Form.Item>
      <Form.Item name ={"Details"} label=" Details">
      <Input placeholder='Details'/>
      </Form.Item>
      <Form.Item name ={"Start Date"} label="Start Date">
      <Input placeholder='Start Date'/>
      </Form.Item>
      <Form.Item name ={"End Date"} label="End Date">
      <Input placeholder='End Date'/>
      </Form.Item>
     </Form>
     <Form.Item>
      <Button icon={<PlusOutlined/>} type="dashed" block  onClick={()=>{
        
      }}> Add a Course</Button>
     </Form.Item>
    </div>

  );
}

export default CartPageCourse;
