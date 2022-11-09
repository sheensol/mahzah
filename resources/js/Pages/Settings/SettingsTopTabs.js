import React from 'react';
import { Link } from '@inertiajs/inertia-react';

const SettingsTopTabs = ({ activeTab = 'site', children }) => {
    return (
        <>
            <ul className="nav nav-tabs main-course-tabs bg-white nav-line-tabs nav-line-tabs-2x fs-5">
            <li className="nav-item"><Link className={`nav-link ${activeTab == 'site' ? "active" : ""}`} href={route("settings.site")}>Site Details</Link></li>
            <li className="nav-item"><Link className={`nav-link ${activeTab == 'learning_content' ? "active" : ""}`} href={route("settings.learningContent")}>Learning Content</Link></li>
            <li className="nav-item"><Link className={`nav-link ${activeTab == 'payments' ? "active" : ""}`} href={route("settings.payments")}>Payments</Link></li>
            <li className="nav-item"><Link className={`nav-link ${activeTab == 'orders_accounts' ? "active" : ""}`} href={route("settings.ordersAccounts")}>Orders & Accounts</Link></li>
            <li className="nav-item"><Link className={`nav-link ${activeTab == 'code_analytics' ? "active" : ""}`} href={route("settings.codeAnalytics")}>Code & Analytics</Link></li>
            </ul>

            <div className="tab-content w-100">
                <div className="tab-pane fade show active" role="tabpanel">
                    {children}
                </div>
            </div>
        </>
    )
}

export default SettingsTopTabs;
