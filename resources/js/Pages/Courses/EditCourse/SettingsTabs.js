import React from 'react';
import { Link } from '@inertiajs/inertia-react';

const SettingsTabs = ({ activeTab = 'settings', course, children }) => {
    return (
        <div className="d-flex flex-column flex-md-row">
            <ul className="nav nav-tabs nav-pills border-0 flex-row flex-md-column inner_course_tabs mb-3 pt-10 mb-md-0 fs-6">
                <li className="nav-item w-md-200px"><Link className={`nav-link ${activeTab == 'settings' ? "active" : ""}`} href={route("courses.settings", course.id)}>Basic settings</Link></li>
                <li className="nav-item w-md-200px"><Link className={`nav-link ${activeTab == 'courseCard' ? "active" : ""}`} href={route("courses.settings.courseCard", course.id)}>Course card</Link></li>
                <li className="nav-item w-md-200px"><Link className={`nav-link ${activeTab == 'coursePlayer' ? "active" : ""}`} href={route("courses.settings.coursePlayer", course.id)}>Course player</Link></li>
                <li className="nav-item w-md-200px"><Link className={`nav-link ${activeTab == 'courseProgress' ? "active" : ""}`} href={route("courses.settings.courseProgress", course.id)}>Course progress</Link></li>
                <li className="nav-item w-md-200px"><Link className={`nav-link ${activeTab == 'settingsCode' ? "active" : ""}`} href={route("courses.settings.code", course.id)}>Page code</Link></li>
                <li className="nav-item w-md-200px"><Link className={`nav-link ${activeTab == 'adminsPayees' ? "active" : ""}`} href={route("courses.settings.adminsPayees", course.id)}>Admins, Revenue Partners, & Affiliates</Link></li>
                <li className="nav-item w-md-200px"><Link className={`nav-link ${activeTab == 'settingsSEO' ? "active" : ""}`} href={route("courses.settings.seo", course.id)}>SEO</Link></li>
            </ul>
            <div className="tab-content w-100 p-lg-11 p-5 bg-white">
                <div className="tab-pane fade active show" role="tabpanel">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default SettingsTabs;