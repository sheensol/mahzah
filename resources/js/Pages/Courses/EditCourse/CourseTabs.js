import React from 'react';
import { Link } from '@inertiajs/inertia-react';

const CourseTabs = ({ activeTab = 'curriculum', course, children }) => {
    return (
        <>
            <ul className="nav nav-tabs main-course-tabs bg-white nav-line-tabs nav-line-tabs-2x fs-5">
                <li className="nav-item"><Link className={`nav-link ${activeTab == 'curriculum' ? "active" : ""}`} href={route("courses.edit", course.id)}>Curriculum</Link></li>
                <li className="nav-item"><Link className={`nav-link ${activeTab == 'bulkImporter' ? "active" : ""}`} href={route("courses.bulkImporter", course.id)}>Bulk importer</Link></li>
                <li className="nav-item"><Link className={`nav-link ${activeTab == 'settings' ? "active" : ""}`} href={route("courses.settings", course.id)}>Settings</Link></li>
                <li className="nav-item"><Link className={`nav-link ${activeTab == 'drip' ? "active" : ""}`} href={route("courses.drip", course.id)}>Drip</Link></li>
                <li className="nav-item"><Link className={`nav-link ${activeTab == 'pricing' ? "active" : ""}`} href={route("courses.pricing", course.id)}>Pricing</Link></li>
                <li className="nav-item"><Link className={`nav-link ${activeTab == 'grade' ? "active" : ""}`} href={route("courses.grade", course.id)}>Grade</Link></li>
                <li className="nav-item"><Link className="nav-link" href="#">Publish Course</Link></li>
            </ul>

            <div className="tab-content w-100">
                <div className="tab-pane fade show active" role="tabpanel">
                    {children}
                </div>
            </div>
        </>
    )
}

export default CourseTabs;
