import React from 'react';
import { Link } from '@inertiajs/inertia-react';

const BundlesTopTabs = ({ activeTab = 'bundles', children }) => {
  return (
    <>
      <ul className="nav nav-tabs main-course-tabs bg-white nav-line-tabs nav-line-tabs-2x fs-5">
        <li className="nav-item"><Link className={`nav-link ${activeTab == 'bundles' ? "active" : ""}`} href={route("bundles")}>Courses</Link></li>
        <li className="nav-item"><Link className={`nav-link ${activeTab == 'learning_content' ? "active" : ""}`} href={route("settings.learningContent")}>Settings</Link></li>
        <li className="nav-item"><Link className={`nav-link ${activeTab == 'payments' ? "active" : ""}`} href={route("settings.payments")}>Pricing</Link></li>
        <li className="nav-item"><Link className={`nav-link ${activeTab == 'orders_accounts' ? "active" : ""}`} href={route("settings.ordersAccounts")}>After Purchase</Link></li>
        <li className="nav-item"><Link className={`nav-link ${activeTab == 'code_analytics' ? "active" : ""}`} href={route("settings.codeAnalytics")}>Publish</Link></li>
      </ul>

      <div className="tab-content w-100">
        <div className="tab-pane fade show active" role="tabpanel">
          {children}
        </div>
      </div>
    </>
  )
}

export default BundlesTopTabs;
