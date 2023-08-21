import { useState } from "react";
import CourseCardView from "./CourseCardView";
import { PlusOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import CourseForm from "./CourseForm";
import { useComponentState } from "./state";
import { useRouter } from "next/router";



export default function CoursesMain() {
    const { view, id } = useComponentState();
    const router = useRouter();
    const [isCardView, setIsCardView] = useState(view === 'card');
    let content = null;
    let btnTitle = '';
    let title = ''
    let icon = null

    if (view === 'form') {
        content = <CourseForm />;
        btnTitle = 'Back';
        title = 'Add a course'
        icon = <ArrowLeftOutlined />
    }
    else if (id) {
        content = <CourseForm />;
        btnTitle = 'Back';
        title = 'Edit course'
        icon = <ArrowLeftOutlined />
    } else {
        content = <CourseCardView />;
        btnTitle = 'Add a course';
        title = 'Courses'
        icon = <PlusOutlined />
    }

    const toggleView = () => {
        if (isCardView) {
            router.push(`?view=card`);
        } else {
            router.push(`?view=form`);
        }
        setIsCardView(!isCardView)
    };

    return (
        <>
            <div className="mx-auto px-4 py-16 text-center">
                <div className="text-center md:text-left mt-8">
                    <span className="ml-8 mt-4 text-2xl font-bold">{title}</span>
                </div>
                <div className="ml-8 mt-4 text-center md:text-left">
                    <button className="bg-blue-500 text-white py-2 px-4 rounded flex items-center space-x-2 hover:bg-blue-600" onClick={toggleView}>
                        {icon}
                        <span>{btnTitle}</span>
                    </button>
                </div>
                <div className="mt-8 ml-8">
                    {content}

                </div>
            </div>
        </>
    );
}