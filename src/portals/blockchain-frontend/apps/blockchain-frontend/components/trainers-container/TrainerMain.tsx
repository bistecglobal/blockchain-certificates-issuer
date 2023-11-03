import React, { useState } from 'react';
//import CourseCardView from './TrainerCardView';
import { useComponentState } from './state';
import { PlusOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import TrainerForm from './TrainerForm';
import TrainerCardView from './TrainerCardView';
import { useRouter } from 'next/router';

export default function TrainerMain() {
  const { view, id } = useComponentState();
  const router = useRouter();
  const [isCardView, setIsCardView] = useState(view === 'card');
  let content = null;
  let btnTitle = '';
  let title = '';
  let icon = null;

  /*const { dataSource } = useComponentState();
  const [isCardView, setIsCardView] = useState(true);
  const onClickHandler = () => switchToCardView();
  const switchToCardView = () => {setIsCardView(!isCardView);};
  const btnTitle = isCardView ? 'Add a Trainer' : 'Back';
  const title = isCardView ? 'Trainers' : 'Add a Trainer';*/

  if (view === 'form') {
    content = <TrainerForm />;
    btnTitle = 'Back';
    title = 'Add a Trainer';
    icon = <ArrowLeftOutlined />;
  } else if (id) {
    content = <TrainerForm />;
    btnTitle = 'Back';
    title = 'Edit Trainer';
    icon = <ArrowLeftOutlined />;
  } else {
    content = <TrainerCardView />;
    btnTitle = 'Add a Trainer';
    title = 'Trainees';
    icon = <PlusOutlined />;
  }

  const toggleView = () => {
    if (isCardView) {
      router.push(`?view=card`);
    } else {
      router.push(`?view=form`);
    }
    setIsCardView(!isCardView);
  };

  return (
    <>
      <div className="mx-auto px-4 py-16 text-center">
        <div className="text-center md:text-left mt-8">
          <span className="ml-8 mt-4 text-2xl font-bold">{title}</span>
        </div>
        <div className="ml-8 mt-4 text-center md:text-left">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded flex items-center space-x-2 hover:bg-blue-600"
            onClick={toggleView}
          >
            {icon}
            <span>{btnTitle}</span>
          </button>
        </div>
        <div className="mt-8 ml-8">{content}</div>
      </div>
      {/*
    <>
      <div className="mx-auto px-4 py-16 text-center">
        <div className="text-center md:text-left mt-8">
          <span className="ml-8 mt-4 text-2xl font-bold">{title}</span>
        </div>
        <div className="ml-8 mt-4 text-center md:text-left">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded flex items-center space-x-2 hover:bg-blue-600"
            onClick={onClickHandler}
          >
            {isCardView ? <PlusOutlined /> : <ArrowLeftOutlined />}
            <span>{btnTitle}</span>
          </button>
        </div>
        
        <div className="mt-8 ml-8">
          {isCardView ? (
            <CourseCardView trainersData={dataSource} />
          ) : (
            <CourseForm />
          )}
        </div>
        
      </div>
    </>
  */}
    </>
  );
}
