import React from 'react';
import Layout from '@/Layouts/Admin/Layout';

const Dashboard = () => {
  return (
    <div>
      <div className="row">
        <div className="col-md-3">
          <div className="md:flex items-center bg-primary px-6 py-8 rounded-2">
            <i className="bi text-white fs-2hx  bi-person-lines-fill"> </i>
            <div className="d-flex flex-column text-white ms-5">
              <span className="fw-bolder fs-2x">85</span>
              <span className="fw-bold fs-7">Students</span>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="md:flex items-center bg-danger px-6 py-8 rounded-2">
            <i className="bi text-white fs-2hx bi-book"> </i>
            <div className="d-flex flex-column text-white ms-5">
              <span className="fw-bolder fs-2x">85</span>
              <span className="fw-bold fs-7">Courses</span>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="md:flex items-center bg-success px-6 py-8 rounded-2">
            <i className="bi text-white fs-2hx bi-collection"> </i>
            <div className="d-flex flex-column text-white ms-5">
              <span className="fw-bolder fs-2x">5</span>
              <span className="fw-bold fs-7">Course Bundles</span>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="md:flex items-center bg-info px-6 py-8 rounded-2">
            <i className="bi text-white fs-2hx bi-person-workspace"> </i>
            <div className="d-flex flex-column text-white ms-5">
              <span className="fw-bolder fs-2x">3</span>
              <span className="fw-bold fs-7">Coaching</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

// Persistent layout
// Docs: https://inertiajs.com/pages#persistent-layouts
Dashboard.layout = page => <Layout title="Dashboard" children={page} openedMenu="1" />;

export default Dashboard;
