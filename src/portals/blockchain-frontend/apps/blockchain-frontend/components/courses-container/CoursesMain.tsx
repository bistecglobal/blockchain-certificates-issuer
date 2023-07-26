import { useState } from "react";
import CourseCardView from "./CouserCardView";
import { useComponentState } from "./state";
import CoursesContainer from "./CoursesContainer";

export default function CoursesMain() {
    const { dataSource } = useComponentState();
    const [isCardView, setIsCardView] = useState(true);
    const onClickHandler = () => switchToCardView();
    const switchToCardView = () => {
        setIsCardView(!isCardView);
    };
    return (
        <div>
            <div className="text-center md:text-left">
                <span className="ml-8 mt-4 text-2xl font-bold">Courses</span>
            </div>
            <div className="ml-8 mt-4 text-center md:text-left">
                <button className="bg-blue-500 text-white py-2 px-4 rounded flex items-center space-x-2 hover:bg-blue-600" onClick={onClickHandler} >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    <span>Add a course</span>
                </button>
            </div>
            <div className="mt-8 ml-8">
            {isCardView ?  <CourseCardView  coursesData={dataSource} /> : <CoursesContainer />}
               
            </div>
        </div>
    );



}