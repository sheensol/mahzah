import React from 'react';
import CourseCardActionBar from './CourseCardActionBar';

const CourseCardGrid = ({ course }) => {
    return (
        <div className="col mt-4">
            <div className="card courses_box overflow-visible">
                <div className="card-img card-img-top">
                    <img src={course.img} className="img-fluid" alt={course.title} />
                </div>
                <div className="card-body p-3 h-24">
                    <h4 className="card-title h-auto">{course.title}</h4>
                    {(course.instructor && <div className="card__content-caption">{course.instructor.name}</div>)}
                </div>
                <div className="card-footer p-4">
                    <div className="flex">
                        <div className="flex-grow">
                            {course.status}
                        </div>
                        <div className="flex-grow text-right">
                            <CourseCardActionBar course={course} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseCardGrid;
