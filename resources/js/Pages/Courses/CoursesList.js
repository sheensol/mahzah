import React, { useState } from 'react';
import CourseCardGrid from './CourseCardGrid';
import CourseCardList from './CourseCardList';
import SimpleSearchBar from './SimpleSearchBar';

const CoursesList = ({ courses }) => {
    const [isGrid, setIsGrid] = useState(
        localStorage.getItem('courses-display') ===  'list' ? false : true
    );

    const setIsGridListOption = (option) => {
        localStorage.setItem('courses-display', option);
        setIsGrid(option === 'grid');
    }

    return (
        <>
            <div className="w-100 p-5 bg-white d-flex justify-content-between align-items-center">
                <SimpleSearchBar placeHolder={"Search courses by name or instructor"} />
                <div className="card-toolbar">
                    <button type="button" className={`btn btn-sm mr-2 ${isGrid ? 'btn-primary' : 'btn-light-primary'}`} onClick={() => setIsGridListOption('grid')}><i className="bi bi-grid"></i> <span className="hidden md:inline-block">Grid</span></button>
                    <button type="button" className={`btn btn-sm ${isGrid ? 'btn-light-primary' : 'btn-primary'}`} onClick={() => setIsGridListOption('list')}><i className="bi bi-list-ul"></i> <span className="hidden md:inline-block">List</span></button>
                </div>
            </div>
            {(courses.length > 0 ? (isGrid ?
                <div className="row row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-sm-2 row-cols-1 mt-4">
                    {courses.map((item, key) => (
                        <CourseCardGrid
                            key={key} course={item} />
                    ))}
                </div> : <div>
                    {courses.map((item, key) => (
                        <CourseCardList
                            key={key} course={item} />
                    ))}
                </div>)
            : <div className="p-5 text-center">No data found.</div>
            )}
        </>
    )
}

export default CoursesList;