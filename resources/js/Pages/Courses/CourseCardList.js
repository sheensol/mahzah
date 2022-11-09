import React from 'react';
import CourseCardActionBar from './CourseCardActionBar';

const CourseCardList = ({ course }) => {
  return (
    <div className="sm:flex rounded-lg bg-white shadow-md border border-gray-300 font-sans mt-5 min-h-100px">
        <div className="w-sm-200px w-100 relative">
          <img src={course.img} alt={course.title} className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="flex-auto flex flex-wrap align-center p-6">
            <div className="flex-fill">
                <h1 className="text-2xl font-semibold text-slate-900">{course.title}</h1>
                <div className="text-md font-medium text-slate-700 mt-2">{course.instructor && <>{course.instructor.name}</>}</div>
            </div>

            <div className='flex items-center border-l text-slate-700 border-gray-300'>
              <div className="ml-6 h-6 w-12 flex-none">{course.status}</div>
              <div className="ml-6 h-6 w-6 flex-none"><CourseCardActionBar course={course} /></div>
            </div>
        </div>
    </div>
  )
}

export default CourseCardList;
