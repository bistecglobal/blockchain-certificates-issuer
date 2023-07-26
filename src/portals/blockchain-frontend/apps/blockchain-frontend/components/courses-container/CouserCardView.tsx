import { Card } from "antd";



export default function CourseCardView ({ coursesData }){

        return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {coursesData.map((course, index) => (
          <Card title={course.Title} key={index}>{course.content}</Card>
        ))}
      </div>
}