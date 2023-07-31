import { Card } from "antd";
import { DeleteOutlined,ArrowsAltOutlined} from '@ant-design/icons';


export default function CourseCardView({ coursesData }) {

    return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {coursesData.map((course, index) => (
            <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="flex">
                    <div className="ml-auto">
                        <ArrowsAltOutlined />
                    </div>
                </div>
                <div>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{course.Title}</h5>
                </div>

                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"></p>
                <div className="flex">
                    <div className="ml-auto">
                        <DeleteOutlined />
                    </div>
                </div>
            </div>
        ))}

    </div>
}