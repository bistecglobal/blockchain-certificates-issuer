import React, { useState } from 'react';
import { useComponentState } from './state';
//import TraineesContainer from './TraineesContainer';
import TraineeForm from './TraineeForm';
import TraineesCardView from './TraineesCardView';
import { ArrowLeftOutlined } from '@ant-design/icons';

function TraineesMain() {
  const { dataSource } = useComponentState();
  const [isCardView, setIsCardView] = useState(true);
  const onClickHandler = () => switchToCardView();
  const switchToCardView = () => {
    setIsCardView(!isCardView);
  };
  
  return (
    <>
      <div className="mx-auto px-4 py-16 text-center">
        <div className="text-center md:text-left mt-8">
          <span className="ml-8 mt-4 text-2xl font-bold">Trainees</span>
        </div>
        <div className="ml-8 mt-4 text-center md:text-left">
          {isCardView ? (
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded flex items-center space-x-2 hover:bg-blue-600"
              onClick={onClickHandler}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              <span>Add a trainee</span>
            </button>
          ) : (
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded flex items-center space-x-2 hover:bg-blue-600"
              onClick={onClickHandler}
            >
              <ArrowLeftOutlined />
              <span>Back</span>
            </button>
          )}
        </div>
        <div className="mt-8 ml-8">
          {isCardView ? (
            <TraineesCardView />
          ) : (
            <TraineeForm />
          )}
        </div>
      </div>
    </>
  );
}

export default TraineesMain;
