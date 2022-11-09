import React from 'react';
import { Link } from '@inertiajs/inertia-react';

const PlansTopTabs = ({ activeTab = 'plans', children }) => {
  return (
    <>
      <ul className="nav nav-tabs main-course-tabs bg-white nav-line-tabs nav-line-tabs-2x fs-5">
        <li className="nav-item"><Link className={`nav-link ${activeTab == 'primary_plan' ? "active" : ""}`} href={route("plans")}>Primary Plan</Link></li>
        <li className="nav-item"><Link className={`nav-link ${activeTab == 'additional_plan' ? "active" : ""}`} href={route("plans.additionalPlan")}>Additional Plan</Link></li>
      </ul>

      <div className="tab-content w-100">
        <div className="tab-pane fade show active">
          {children}
        </div>
      </div>
    </>
  )
}

export default PlansTopTabs;
