import React from 'react';
import Layout from '@/Layouts/Admin/Layout';
import { usePage } from '@inertiajs/inertia-react';
import CourseTabs from './CourseTabs';
import SettingsTabs from './SettingsTabs';

const SettingsAdminsPayees = () => {
    const { course } = usePage().props;

    return (
        <CourseTabs activeTab='settings' course={course}>
            <SettingsTabs activeTab='adminsPayees' course={course}>

                <div className="section__header mb-4">
                    <h4 className="section__header__title">Admins, Revenue Partners, &amp; Affiliates</h4>
                </div>

                <p className="section__description mb-3">
                  Manage Course Admin, Revenue Partner, and Affiliate settings for this specific course. You can assign a role to a user in their user settings.
                  <a aria-label="Learn more about Roles in our Help Centre." target="_blank" href="#">Learn more</a>
                </p>

                <h5 className="mb-2 mt-7 flex items-center">
                  Add Course Admins
                  <div id="ember1618" className="ember-view">
                    <div id="ember1619" className="ember-view tooltipstered">
                      <i className="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip" title=""
                         data-bs-original-title="Course Admins cannot make general changes to your site, or access private information such as student data or revenue."
                         aria-label="Course Image"></i>
                    </div>
                  </div>
                </h5>
                <small>Course Admins can create new courses, edit existing courses they’re assigned to, or create new instructors.
                  <a target="_blank" href="#">Learn more</a>
                </small>

                <div className="section bg-light p-5 mt-6">
                  <div className="row">
                    <div className="col-lg-10 col-md-9 fv-row">
                      <select name="language" aria-label="Select a Language" data-control="select2" data-placeholder="Select a Person" className="form-select">
                        <option value="">Select a Person...</option>
                        <option data-kt-flag="flags/indonesia.svg" value="id">Person 1</option>
                        <option data-kt-flag="flags/malaysia.svg" value="msa">Person 2</option>
                        <option data-kt-flag="flags/canada.svg" value="ca">Person 3</option>
                      </select>
                    </div>
                    <div className="col-lg-2 col-md-3 fv-row">
                      <button className="btn w-100 btn-light-primary" data-ember-action="2278" disabled="">Add</button>
                    </div>
                  </div>
                </div>


                <h5 className="mb-2 mt-7 flex items-center">
                  Add Revenue Partners
                  <div id="ember1618" className="ember-view">
                    <div id="ember1619" className="ember-view tooltipstered">
                      <i className="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip" title=""
                         data-bs-original-title="Commission payouts need to be approved by the site owner and paid out manually."
                         aria-label="Course Image"></i>
                    </div>
                  </div>
                </h5>

              <small>
                If this course was a joint effort, easily split a percentage of the sales amongst all your creators/instructors. You can add them to this course and set their payout below.
                <a target="_blank" href="#">Learn more</a>
              </small>


                <div className="section bg-light p-5 mt-6">
                  <div className="row">
                    <div className="col-lg-10 col-md-9 fv-row">
                      Looks like none of your users are revenue partners.
                    </div>
                    <div className="col-lg-2 col-md-3 fv-row">
                      <a href='#' className="btn w-100 btn-light-primary">Assign partner</a>
                    </div>
                  </div>
                </div>



            </SettingsTabs>
        </CourseTabs>
    )
}

SettingsAdminsPayees.layout = page => {
    const courseTitle = page.props.course.title;
    return (<Layout title={courseTitle} children={page}
        breadcrumbs={[
            { name: 'Courses', path: route('courses.index') },
            { name: 'Admins, Revenue Partners, & Affiliates'}
        ]}
        openedMenu="2"
        activeLink="2.1"
    />);
};

export default SettingsAdminsPayees;
