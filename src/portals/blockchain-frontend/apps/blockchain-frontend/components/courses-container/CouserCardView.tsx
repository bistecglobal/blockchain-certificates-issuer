import { DeleteOutlined, ArrowsAltOutlined } from '@ant-design/icons';
import SpinnerContainer from '../Spinner/SpinnerContainer';
import { useComponentState } from './state';

export default function CourseCardView() {
    const { dataSource} = useComponentState();
    return (
        <>
            {dataSource.length > 0 ? (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {dataSource.map((course, index) => (
                    <div key={index} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
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
            </div>) : (<div className='fixed inset-0 ml-40 flex items-center justify-center'><SpinnerContainer /></div>)}


        </>
    );
}